#!/usr/bin/env python3
"""
Serwer strony FALP event: statyka + API bloga z prostą autoryzacją.

Uruchomienie:  python3 serwer.py            (port 8080)
               PORT=3000 python3 serwer.py  (inny port)
Hasło admina:  zmienna środowiskowa FALP_ADMIN_HASLO
               (domyślnie "falp-admin-2026" — ZMIEŃ przed wdrożeniem!)
Panel admina:  http://localhost:8080/admin.html
"""
import http.server, json, gzip, hmac, hashlib, os, re, secrets, unicodedata
from datetime import date
from pathlib import Path

KATALOG = Path(__file__).parent
DANE = Path(os.environ.get("FALP_DANE", str(KATALOG / "blog")))
POSTY = DANE / "posts.json"
# pierwszy start na świeżym wolumenie: skopiuj startowe wpisy
if not POSTY.exists() and (KATALOG / "blog" / "posts.json").exists():
    DANE.mkdir(parents=True, exist_ok=True)
    POSTY.write_text((KATALOG / "blog" / "posts.json").read_text())
HASLO = os.environ.get("FALP_ADMIN_HASLO", "falp-admin-2026")
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
        n = int(self.headers.get("Content-Length", 0))
        return json.loads(self.rfile.read(n) or b"{}")

    def _wczytaj_posty(self):
        return json.loads(POSTY.read_text()) if POSTY.exists() else []

    def _zapisz_posty(self, posty):
        POSTY.write_text(json.dumps(posty, ensure_ascii=False, indent=1))

    # ── API ──
    def do_POST(self):
        if self.path == "/api/login":
            dane = self._cialo()
            if hmac.compare_digest(str(dane.get("haslo", "")), HASLO):
                return self._json(200, {"token": token_admina()})
            return self._json(401, {"blad": "Nieprawidłowe hasło"})

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
