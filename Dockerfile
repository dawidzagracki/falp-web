# =============================================================
# STAGE 1 — build (Node + Vite)
# =============================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Cache layer: tylko package.json zmienia rzadko
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund 2>/dev/null || npm install --no-audit --no-fund

COPY . .

RUN npm run build

# =============================================================
# STAGE 2 — runtime (nginx, ~25MB)
# =============================================================
FROM nginx:1.27-alpine AS runtime

# Usuń domyślną konfigurację
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx user już istnieje w obrazie — nie root
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
