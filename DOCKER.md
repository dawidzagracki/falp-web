# 🐳 FALP Event — Docker

Aplikacja dostarczana jako pojedynczy obraz Docker (Node build → nginx serve).
Działa na Macu (Apple Silicon i Intel), Linuksie i Windowsie — wszędzie tam, gdzie jest Docker Desktop.

---

## 🚀 Szybki start (Mac / Docker Desktop)

Otwórz **Terminal** w katalogu projektu i wpisz:

```bash
docker compose up -d --build
```

To wszystko. Strona dostępna pod: **http://localhost:8080**

Pierwszy build trwa ~2-3 minuty (instaluje zależności + buduje produkcyjne assety).
Kolejne uruchomienia są błyskawiczne — Docker keszuje warstwy.

---

## 📋 Podstawowe komendy

```bash
# Start (w tle)
docker compose up -d

# Start z rebuildem (gdy zmieniłeś kod)
docker compose up -d --build

# Zatrzymaj
docker compose down

# Logi nginx (na żywo)
docker compose logs -f web

# Status kontenerów
docker compose ps

# Wejdź do kontenera (debug)
docker compose exec web sh
```

---

## 🔧 Tryb development (hot reload)

Jeśli edytujesz kod i chcesz widzieć zmiany na żywo, użyj wersji dev:

```bash
docker compose -f docker-compose.dev.yml up
```

Vite startuje na **http://localhost:5173** z hot reloadem.
Kod jest montowany jako volume — zmiany w `src/` widoczne natychmiast.

Zatrzymanie: `Ctrl+C`, potem `docker compose -f docker-compose.dev.yml down`.

---

## 🌐 Zmiana portu

Jeśli `8080` jest zajęty, edytuj `docker-compose.yml`:

```yaml
ports:
  - "3000:80"   # ← zmień lewą stronę na cokolwiek (np. 3000, 4000)
```

Potem otwórz http://localhost:3000

---

## 📦 Standalone build (bez compose)

Jeśli wolisz bez compose:

```bash
docker build -t falp-event .
docker run -d -p 8080:80 --name falp-event falp-event
```

---

## 🚢 Deploy produkcyjny

Obraz nadaje się od razu na produkcję. Możesz:

1. **Push do Docker Hub / GHCR:**
   ```bash
   docker tag falp-event:latest twoja-nazwa/falp-event:latest
   docker push twoja-nazwa/falp-event:latest
   ```

2. **Hosting z obsługą Dockera:**
   - Railway, Render, Fly.io, DigitalOcean App Platform — wszystkie wezmą ten obraz
   - VPS z Dockerem — `docker compose up -d` i jedziesz

3. **Z reverse proxy + HTTPS** (Caddy/Traefik) — nginx wewnątrz słucha na :80, Twój proxy bierze certyfikat SSL i forwarduje.

---

## ⚙️ Architektura obrazu

**Multi-stage build:**
- **Stage 1** (`node:22-alpine`) — instaluje deps, buduje React/Vite → `/app/dist`
- **Stage 2** (`nginx:1.27-alpine`) — kopiuje tylko `dist/` + custom config

**Końcowy rozmiar:** ~28 MB (tylko nginx + statyczne pliki, bez Node.js).

**Nginx config zawiera:**
- ✅ Gzip dla JS/CSS/SVG/JSON
- ✅ Cache 1 rok dla hashowanych assetów (Vite)
- ✅ Brak cache dla `index.html`
- ✅ SPA fallback — React Router obsłuży `/oferta/agencja-artystyczna` itd.
- ✅ Security headers (X-Frame-Options, CSP-friendly, Referrer-Policy)
- ✅ Healthcheck co 30s

---

## 🐛 Troubleshooting

**"Port 8080 already allocated"** → zmień port w `docker-compose.yml` (patrz wyżej).

**Build się nie kończy / out of memory** → Docker Desktop → Settings → Resources → Memory → daj min. 4 GB.

**"npm: command not found" przy budowie** → upewnij się że plik `package.json` jest w katalogu (nie w `.dockerignore`).

**Strona nie ładuje się po refresh na podstronie (np. `/blog`)** → SPA fallback jest skonfigurowany w `nginx.conf`. Jeśli nie działa, sprawdź czy nginx faktycznie używa naszej konfiguracji: `docker compose exec web cat /etc/nginx/conf.d/default.conf`.

**Apple Silicon (M1/M2/M3/M4)** — wszystko działa natywnie, obrazy `alpine` są multi-arch.
