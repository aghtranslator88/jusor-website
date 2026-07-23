#!/usr/bin/env bash
# Pull latest code, install deps, run migrations, build, and restart the app.
# Usage on the VPS: bash deploy/deploy.sh
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

echo "==> Pulling latest code"
git pull origin master

echo "==> Installing dependencies"
npm ci

echo "==> Running database migrations"
npx prisma migrate deploy

echo "==> Building"
npm run build

echo "==> Restarting app"
if command -v pm2 >/dev/null 2>&1; then
  pm2 restart jusor-web || pm2 start ecosystem.config.js
  pm2 save
else
  echo "PM2 not found — if using Docker Compose instead, run:"
  echo "  docker compose up -d --build"
fi

echo "==> Done"
