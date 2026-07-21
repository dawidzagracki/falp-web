#!/usr/bin/env python3
"""
Serwer strony FALP event: statyka + API bloga z prostą autoryzacją.

Uruchomienie:  python3 serwer.py            (port 8080)
               PORT=3000 python3 serwer.py  (inny port)
Hasło admina:  zmienna środowiskowa FALP_ADMIN_HASLO
               (domyślnie "falp-admin-2026" — ZMIEŃ przed wdrożeniem!)
Panel admina:  http://localhost:8080/admin.html
"""
import http.server, json, gzip, hmac, hashlib, os, re, secrets, smtplib, threading, unicodedata
from datetime import date, datetime
from email.message import EmailMessage
from pathlib import Path

KATALOG = Path(__file__).parent
DANE = Path(os.environ.get("FALP_DANE", str(KATALOG / "blog")))
POSTY = DANE / "posts.json"
ZGLOSZENIA = DANE / "zgloszenia.json"  # zapytania z formularza kontaktowego
SPRZET_PLIK = DANE / "sprzet.json"     # katalog wypożyczalni (edytowalny w adminie)
FOTO_DIR = DANE / "foto"               # zdjęcia sprzętu (upload z admina)

# pierwszy start: zasiej katalog wypożyczalni danymi startowymi
if not SPRZET_PLIK.exists() and (KATALOG / "sprzet-startowy.json").exists():
    SPRZET_PLIK.parent.mkdir(parents=True, exist_ok=True)
    SPRZET_PLIK.write_text((KATALOG / "sprzet-startowy.json").read_text(encoding="utf-8"), encoding="utf-8")

# dozwolone typy zdjęć: sygnatury bajtowe → rozszerzenie
FOTO_TYPY = [
    (b"\xff\xd8\xff", "jpg"),
    (b"\x89PNG\r\n\x1a\n", "png"),
    (b"RIFF", "webp"),  # dodatkowo sprawdzamy 'WEBP' na pozycji 8
]
FOTO_MAX = 5 * 1024 * 1024  # 5 MB
# pierwszy start na świeżym wolumenie: skopiuj startowe wpisy
if not POSTY.exists() and (KATALOG / "blog" / "posts.json").exists():
    DANE.mkdir(parents=True, exist_ok=True)
    POSTY.write_text((KATALOG / "blog" / "posts.json").read_text(encoding="utf-8"), encoding="utf-8")
HASLO = os.environ.get("FALP_ADMIN_HASLO", "falp-admin-2026")

# ── powiadomienia e-mail o zgłoszeniach (Zoho Mail SMTP) ──
# Bez ustawionych FALP_SMTP_USER/FALP_SMTP_HASLO wysyłka jest wyłączona,
# a zgłoszenia i tak trafiają do panelu admina. Zoho z 2FA wymaga hasła aplikacji.
SMTP_HOST = os.environ.get("FALP_SMTP_HOST", "smtp.zoho.eu")
SMTP_PORT = int(os.environ.get("FALP_SMTP_PORT", 465))
SMTP_USER = os.environ.get("FALP_SMTP_USER", "")
SMTP_HASLO = os.environ.get("FALP_SMTP_HASLO", "")
MAIL_DO = os.environ.get("FALP_MAIL_DO", "biuro@falp.pl")


def wyslij_powiadomienie(z):
    """Mail o nowym zgłoszeniu — w tle, żeby nie opóźniać odpowiedzi formularza."""
    if not (SMTP_USER and SMTP_HASLO):
        return

    def praca():
        try:
            m = EmailMessage()
            etykieta = z.get("temat") or z.get("typ") or "wydarzenie"
            m["Subject"] = f"Nowe zapytanie [{etykieta}]: {z['imie']}"
            m["From"] = SMTP_USER
            m["To"] = MAIL_DO
            if "@" in z["kontakt"] and " " not in z["kontakt"]:
                m["Reply-To"] = z["kontakt"]  # "Odpowiedz" pisze od razu do klienta

            sekcja_sprzet = ""
            if z.get("sprzet"):
                suma = sum(p["cena"] * p["ilosc"] for p in z["sprzet"])
                wiersze = "\n".join(
                    f"  – {p['nazwa']} × {p['ilosc']}  ({p['cena']:.0f} zł/{p['jm'] or 'doba'})"
                    for p in z["sprzet"]
                )
                sekcja_sprzet = (
                    f"\nSprzęt do wyceny:\n{wiersze}\n"
                    f"  Suma orientacyjna: {suma:,.0f} zł netto/doba\n".replace(",", " ")
                )

            m.set_content(
                f"Nowe zapytanie z formularza na falp.pl ({z['data']})\n\n"
                f"Temat:            {z.get('temat') or '—'}\n"
                f"Imię i nazwisko:  {z['imie']}\n"
                f"Kontakt:          {z['kontakt']}\n"
                f"Rodzaj wydarzenia: {z['typ'] or '—'}\n"
                f"Liczba gości:     {z['goscie'] or '—'}\n"
                f"Budżet:           {z['budzet'] or '—'}\n"
                f"{sekcja_sprzet}\n"
                f"Wiadomość:\n{z['wiadomosc'] or '—'}\n\n"
                f"— Wszystkie zgłoszenia: https://falp.pl/admin.html"
            )
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=15) as s:
                s.login(SMTP_USER, SMTP_HASLO)
                s.send_message(m)
        except Exception as e:  # awaria maila nie może ubić zgłoszenia (jest w panelu)
            print(f"[mail] błąd wysyłki powiadomienia: {e}", flush=True)

    threading.Thread(target=praca, daemon=True).start()
SEKRET = secrets.token_bytes(32)  # token ważny do restartu serwera
PORT = int(os.environ.get("PORT", 8080))

GZIP_TYPY = (".html", ".css", ".js", ".json", ".svg", ".xml", ".txt")
CACHE_ASSETY = "public, max-age=86400"       # obrazy/wideo/fonty: doba
CACHE_HTML = "no-cache"                      # html/json: zawsze świeże


def token_admina():
    return hmac.new(SEKRET, b"falp-admin", hashlib.sha256).hexdigest()


def slugify(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s[:60] or "wpis"


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(KATALOG), **kw)

    # ── pomocnicze ──
    def _json(self, kod, obj):
        body = json.dumps(obj, ensure_ascii=False).encode()
        self.send_response(kod)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _autoryzowany(self):
        naglowek = self.headers.get("Authorization", "")
        return naglowek == f"Bearer {token_admina()}"

    def _cialo(self):
        try:
            n = int(self.headers.get("Content-Length", 0))
            return json.loads(self.rfile.read(n) or b"{}")
        except (ValueError, UnicodeDecodeError):  # śmieciowe body (np. bot) → puste dane
            return {}

    def _wczytaj_posty(self):
        try:
            return json.loads(POSTY.read_text(encoding="utf-8")) if POSTY.exists() else []
        except (json.JSONDecodeError, UnicodeDecodeError, OSError):
            return []

    def _zapisz_posty(self, posty):
        POSTY.write_text(json.dumps(posty, ensure_ascii=False, indent=1), encoding="utf-8")

    def _wczytaj_zgloszenia(self):
        try:
            return json.loads(ZGLOSZENIA.read_text(encoding="utf-8")) if ZGLOSZENIA.exists() else []
        except (json.JSONDecodeError, UnicodeDecodeError, OSError):
            return []

    def _zapisz_zgloszenia(self, lista):
        ZGLOSZENIA.parent.mkdir(parents=True, exist_ok=True)
        ZGLOSZENIA.write_text(json.dumps(lista[:500], ensure_ascii=False, indent=1), encoding="utf-8")

    def _wczytaj_sprzet(self):
        try:
            return json.loads(SPRZET_PLIK.read_text(encoding="utf-8")) if SPRZET_PLIK.exists() else []
        except (json.JSONDecodeError, UnicodeDecodeError, OSError):
            return []

    def _zapisz_sprzet(self, lista):
        SPRZET_PLIK.parent.mkdir(parents=True, exist_ok=True)
        SPRZET_PLIK.write_text(json.dumps(lista[:500], ensure_ascii=False, indent=1), encoding="utf-8")

    # ── API ──
    def do_POST(self):
        if self.path == "/api/login":
            dane = self._cialo()
            if hmac.compare_digest(str(dane.get("haslo", "")), HASLO):
                return self._json(200, {"token": token_admina()})
            return self._json(401, {"blad": "Nieprawidłowe hasło"})

        if self.path == "/api/kontakt":
            dane = self._cialo()
            if str(dane.get("www", "")).strip():  # honeypot — bot wypełnił ukryte pole
                return self._json(200, {"ok": True})
            imie = str(dane.get("imie", "")).strip()[:80]
            kontakt = str(dane.get("kontakt", "")).strip()[:120]
            if len(imie) < 2 or len(kontakt) < 5:
                return self._json(400, {"blad": "Podaj imię oraz e-mail lub telefon"})
            # sprzęt z wypożyczalni (opcjonalny) — sanityzacja pozycji
            sprzet = []
            for p in (dane.get("sprzet") or [])[:50]:
                if not isinstance(p, dict):
                    continue
                try:
                    nazwa = str(p.get("nazwa", "")).strip()[:80]
                    ilosc = max(1, min(999, int(p.get("ilosc", 1))))
                    cena = max(0.0, float(p.get("cena", 0)))
                    jm = str(p.get("jm", "")).strip()[:20]
                    if nazwa:
                        sprzet.append({"nazwa": nazwa, "ilosc": ilosc, "cena": cena, "jm": jm})
                except (TypeError, ValueError):
                    continue

            zgloszenie = {
                "id": secrets.token_hex(6),
                "data": datetime.now().strftime("%Y-%m-%d %H:%M"),
                "imie": imie,
                "kontakt": kontakt,
                "temat": str(dane.get("temat", "")).strip()[:40],
                "typ": str(dane.get("typ", "")).strip()[:60],
                "goscie": str(dane.get("goscie", "")).strip()[:30],
                "budzet": str(dane.get("budzet", "")).strip()[:30],
                "sprzet": sprzet,
                "wiadomosc": str(dane.get("wiadomosc", "")).strip()[:2000],
            }
            lista = self._wczytaj_zgloszenia()
            lista.insert(0, zgloszenie)
            self._zapisz_zgloszenia(lista)
            wyslij_powiadomienie(zgloszenie)
            return self._json(200, {"ok": True})

        if self.path == "/api/sprzet":
            if not self._autoryzowany():
                return self._json(401, {"blad": "Brak autoryzacji"})
            dane = self._cialo()
            nazwa = str(dane.get("nazwa", "")).strip()[:80]
            if len(nazwa) < 2:
                return self._json(400, {"blad": "Podaj nazwę sprzętu"})
            try:
                cena = max(0.0, float(dane.get("cena", 0)))
            except (TypeError, ValueError):
                cena = 0.0
            foto = str(dane.get("foto", "")).strip()
            if foto and not re.match(r"^/foto/[a-f0-9]+\.(jpg|png|webp)$", foto):
                foto = ""
            pozycja = {
                "id": "",
                "nazwa": nazwa,
                "kategoria": str(dane.get("kategoria", "")).strip()[:40] or "Inne",
                "opis": str(dane.get("opis", "")).strip()[:300],
                "cena": cena,
                "jm": str(dane.get("jm", "")).strip()[:20] or "doba",
                "foto": foto,
            }
            lista = self._wczytaj_sprzet()
            stare_id = str(dane.get("id", "")).strip()
            istnieje = next((s for s in lista if s.get("id") == stare_id), None) if stare_id else None
            if istnieje:
                pozycja["id"] = stare_id
                lista[lista.index(istnieje)] = pozycja
            else:
                pozycja["id"] = "sp-" + secrets.token_hex(4)
                lista.append(pozycja)
            self._zapisz_sprzet(lista)
            return self._json(200, {"ok": True, "id": pozycja["id"]})

        if self.path == "/api/sprzet-foto":
            if not self._autoryzowany():
                return self._json(401, {"blad": "Brak autoryzacji"})
            n = int(self.headers.get("Content-Length", 0))
            if n <= 0 or n > FOTO_MAX:
                return self._json(400, {"blad": "Zdjęcie max 5 MB"})
            dane = self.rfile.read(n)
            rozszerzenie = None
            for sygnatura, ext in FOTO_TYPY:
                if dane.startswith(sygnatura):
                    if ext == "webp" and dane[8:12] != b"WEBP":
                        continue
                    rozszerzenie = ext
                    break
            if not rozszerzenie:
                return self._json(400, {"blad": "Dozwolone formaty: JPG, PNG, WebP"})
            FOTO_DIR.mkdir(parents=True, exist_ok=True)
            nazwa_pliku = secrets.token_hex(8) + "." + rozszerzenie
            (FOTO_DIR / nazwa_pliku).write_bytes(dane)
            return self._json(200, {"ok": True, "foto": "/foto/" + nazwa_pliku})

        if self.path == "/api/posty":
            if not self._autoryzowany():
                return self._json(401, {"blad": "Brak autoryzacji"})
            dane = self._cialo()
            tytul = str(dane.get("tytul", "")).strip()
            tresc = str(dane.get("tresc", "")).strip()
            if not tytul or not tresc:
                return self._json(400, {"blad": "Tytuł i treść są wymagane"})
            posty = self._wczytaj_posty()
            slug = slugify(tytul)
            if any(p["slug"] == slug for p in posty):
                slug += "-" + date.today().strftime("%d%m")
            wpis = {
                "slug": slug,
                "tytul": tytul,
                "data": date.today().isoformat(),
                "zajawka": str(dane.get("zajawka", "")).strip() or tresc[:160],
                "tresc": tresc,
            }
            posty.insert(0, wpis)
            self._zapisz_posty(posty)
            return self._json(200, {"ok": True, "slug": slug})

        return self._json(404, {"blad": "Nie ma takiego endpointu"})

    def do_DELETE(self):
        m = re.match(r"^/api/sprzet/(sp-[a-f0-9]+|[a-z0-9-]+)$", self.path)
        if m:
            if not self._autoryzowany():
                return self._json(401, {"blad": "Brak autoryzacji"})
            lista = self._wczytaj_sprzet()
            usuniete = next((s for s in lista if s.get("id") == m.group(1)), None)
            if not usuniete:
                return self._json(404, {"blad": "Nie ma takiej pozycji"})
            lista.remove(usuniete)
            self._zapisz_sprzet(lista)
            # sprzątnij zdjęcie, jeśli żadna inna pozycja go nie używa
            foto = usuniete.get("foto", "")
            if foto and not any(s.get("foto") == foto for s in lista):
                try:
                    (FOTO_DIR / foto.split("/")[-1]).unlink(missing_ok=True)
                except OSError:
                    pass
            return self._json(200, {"ok": True})

        m = re.match(r"^/api/kontakt/([a-f0-9]+)$", self.path)
        if m:
            if not self._autoryzowany():
                return self._json(401, {"blad": "Brak autoryzacji"})
            lista = self._wczytaj_zgloszenia()
            nowe = [z for z in lista if z.get("id") != m.group(1)]
            if len(nowe) == len(lista):
                return self._json(404, {"blad": "Nie ma takiego zgłoszenia"})
            self._zapisz_zgloszenia(nowe)
            return self._json(200, {"ok": True})

        m = re.match(r"^/api/posty/([a-z0-9-]+)$", self.path)
        if m:
            if not self._autoryzowany():
                return self._json(401, {"blad": "Brak autoryzacji"})
            posty = self._wczytaj_posty()
            nowe = [p for p in posty if p["slug"] != m.group(1)]
            if len(nowe) == len(posty):
                return self._json(404, {"blad": "Nie ma takiego wpisu"})
            self._zapisz_posty(nowe)
            return self._json(200, {"ok": True})
        return self._json(404, {"blad": "Nie ma takiego endpointu"})

    # ── statyka: gzip + nagłówki cache ──
    def end_headers(self):
        sciezka = self.path.split("?")[0]
        if sciezka.startswith("/assets/") or sciezka.startswith("/fonts/"):
            self.send_header("Cache-Control", CACHE_ASSETY)
        elif sciezka.endswith((".html", "/")) or sciezka == "":
            self.send_header("Cache-Control", CACHE_HTML)
        super().end_headers()

    def do_GET(self):
        sciezka = self.path.split("?")[0]
        if sciezka == "/api/sprzet":  # publiczny katalog wypożyczalni
            return self._json(200, self._wczytaj_sprzet())
        m = re.match(r"^/foto/([a-f0-9]+\.(?:jpg|png|webp))$", sciezka)
        if m:  # zdjęcia sprzętu z wolumenu danych
            plik = FOTO_DIR / m.group(1)
            if not plik.is_file():
                return self._json(404, {"blad": "Brak zdjęcia"})
            body = plik.read_bytes()
            self.send_response(200)
            typ = {"jpg": "image/jpeg", "png": "image/png", "webp": "image/webp"}[plik.suffix[1:]]
            self.send_header("Content-Type", typ)
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", CACHE_ASSETY)
            self.end_headers()
            self.wfile.write(body)
            return
        if sciezka == "/api/kontakt":
            if not self._autoryzowany():
                return self._json(401, {"blad": "Brak autoryzacji"})
            return self._json(200, self._wczytaj_zgloszenia())
        if sciezka == "/blog/posts.json":
            body = POSTY.read_bytes() if POSTY.exists() else b"[]"
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)
            return
        plik = KATALOG / sciezka.lstrip("/")
        if sciezka.endswith("/"):
            plik = plik / "index.html"
        if (plik.suffix in GZIP_TYPY and plik.is_file()
                and "gzip" in self.headers.get("Accept-Encoding", "")):
            body = gzip.compress(plik.read_bytes())
            self.send_response(200)
            self.send_header("Content-Type", self.guess_type(str(plik)) + (
                "; charset=utf-8" if plik.suffix in (".html", ".css", ".js", ".json", ".txt", ".xml") else ""))
            self.send_header("Content-Encoding", "gzip")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()

    def log_message(self, fmt, *args):
        pass  # cicho w konsoli


if __name__ == "__main__":
    print(f"FALP event — serwer: http://localhost:{PORT}  (admin: /admin.html)")
    http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
