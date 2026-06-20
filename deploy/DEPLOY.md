# Deploy FALP WEB na VPS (213.186.33.5)

Strona to statyczny build React → nginx (bez backendu, bazy, maila).
Dwa tryby: **A** (za wspólnym Caddy, HTTPS, bez domeny przez sslip.io) lub **B** (port, najprościej).

---

## Krok 1 (POLECANE) — przez GitHub

Po wypchnięciu repo na GitHub, na serwerze:

```bash
ssh ubuntu@213.186.33.5
git clone https://github.com/<TWOJ_USER>/falp-web.git ~/apps/falp-web
cd ~/apps/falp-web
```

Aktualizacja później: `cd ~/apps/falp-web && git pull && docker compose -f deploy/docker-compose.standalone.yml up -d --build`

### Krok 1 (alternatywa) — bez GitHub, przez scp

```powershell
# z Windowsa, w katalogu projektu
tar --exclude=node_modules --exclude=dist --exclude=.git -czf falp-web.tgz .
scp falp-web.tgz ubuntu@213.186.33.5:~/
```
```bash
ssh ubuntu@213.186.33.5
mkdir -p ~/apps/falp-web && tar -xzf ~/falp-web.tgz -C ~/apps/falp-web
cd ~/apps/falp-web
```

---

## Krok 2A — TRYB A (HTTPS przez wspólny Caddy, bez domeny)

Wymaga działającego wspólnego proxy Caddy + sieci `edge` (z tamtego setupu).

```bash
docker compose -f deploy/docker-compose.prod.yml up -d --build
```

Dodaj blok z `deploy/Caddyfile.falp.snippet` do wspólnego Caddyfile, potem przeładuj proxy:

```bash
# nazwa kontenera proxy może się różnić (sprawdź: docker ps | grep caddy)
docker exec -w /etc/caddy <caddy-container> caddy reload --config /etc/caddy/Caddyfile
```

➡️ Strona: **https://falp.213.186.33.5.sslip.io**

---

## Krok 2B — TRYB B (najprościej, HTTP na porcie)

```bash
sudo ufw allow 8080
docker compose -f deploy/docker-compose.standalone.yml up -d --build
```

➡️ Strona: **http://213.186.33.5:8080**

---

## Aktualizacja po zmianach w kodzie

Powtórz Krok 1 (spakuj + scp + rozpakuj), potem:

```bash
cd ~/apps/falp-web
docker compose -f deploy/docker-compose.prod.yml up -d --build   # lub standalone
```

## Podmiana na prawdziwą domenę (później)

W `deploy/Caddyfile.falp.snippet` zamień `falp.213.186.33.5.sslip.io` na swoją domenę
(rekord A → 213.186.33.5), przeładuj Caddy. Reszta bez zmian.

## Przydatne

```bash
docker compose -f deploy/docker-compose.prod.yml logs -f web   # logi
docker compose -f deploy/docker-compose.prod.yml ps            # status
docker compose -f deploy/docker-compose.prod.yml down          # stop
```
