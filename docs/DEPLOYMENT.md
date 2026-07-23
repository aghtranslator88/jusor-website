# Deploying JUSOR to a VPS

This app is a standard Next.js 16 App Router project with Prisma/Postgres.
It's fully built and committed — what's left is infrastructure wiring, not
code. Two deployment paths are supported; pick one.

## Before either path: what's NOT wired yet

- **No live database.** `prisma/schema.prisma` is complete and `npx prisma
  generate` works, but nothing has run `prisma migrate deploy` against a
  real Postgres instance yet.
- **Forms are client-side only.** The Quote, Contact, Interpretation, and
  Equipment booking forms show a local "success" state
  (`window.setTimeout` in each component) but don't persist anywhere or
  send email. Search the codebase for `// Client-only` comments — every
  such component names the exact spec section (`docs/spec/02-api-server-actions.md`)
  describing the real Server Action it should call once a database exists.
- **No payments, no file uploads, no auth.** Specced in `docs/spec/`, not
  implemented.

Deploying now gets you a live, fully-navigable **showcase site**. Real
customer-facing use (quotes that actually reach someone) requires finishing
the database wiring described below.

## Path A — Docker (recommended, self-contained)

1. On the VPS, install Docker + Docker Compose.
2. Clone the repo, `cd` into it.
3. Copy `.env.example` to `.env` and fill in real values — at minimum:
   ```
   POSTGRES_PASSWORD=<pick-a-strong-password>
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```
   (Leave `DATABASE_URL` alone — `docker-compose.yml` overrides it to point
   at the bundled `db` service automatically.)
4. `docker compose up -d --build`
5. Run migrations + seed once the containers are healthy:
   ```
   docker compose exec app npx prisma migrate deploy
   docker compose exec app npx prisma db seed
   ```
6. Point nginx at `http://127.0.0.1:3000` using `deploy/nginx.conf.template`
   (see "nginx + domain" below).

## Path B — PM2 (no Docker, direct on the VPS)

1. Install Node 22+, PM2 (`npm i -g pm2`), and Postgres on the VPS (or use
   a managed Postgres like Neon/Supabase instead of a local install).
2. Clone the repo, `cd` into it.
3. Copy `.env.example` to `.env`, fill in a real `DATABASE_URL` pointing at
   your Postgres instance, and `NEXT_PUBLIC_SITE_URL`.
4. `npm ci && npx prisma generate && npx prisma migrate deploy && npx prisma db seed`
5. `npm run build`
6. `pm2 start ecosystem.config.js && pm2 save && pm2 startup` (the last
   command prints a systemd command to run once, so PM2 survives reboots).

For future deploys, `deploy/deploy.sh` automates steps 4–6 (git pull →
install → migrate → build → restart).

## nginx + domain (either path)

1. `cp deploy/nginx.conf.template /etc/nginx/sites-available/jusor`
2. Replace `YOUR_DOMAIN` with the real domain in that file.
3. `ln -s /etc/nginx/sites-available/jusor /etc/nginx/sites-enabled/`
4. `nginx -t && systemctl reload nginx`
5. `certbot --nginx -d your-domain.com -d www.your-domain.com` (installs
   free Let's Encrypt SSL and rewrites the config to redirect HTTP→HTTPS).

## Environment variables reference

See `.env.example` for the full list. The ones that matter for a basic
live deployment:

| Variable | Required for | Notes |
|---|---|---|
| `DATABASE_URL` | Everything | Postgres connection string |
| `NEXT_PUBLIC_SITE_URL` | SEO/JSON-LD/sitemap | Real public domain, with `https://` |
| `AUTH_SECRET` | Auth (not yet wired) | Generate with `openssl rand -base64 32` |
| `RESEND_API_KEY` / `EMAIL_FROM` | Contact form emails (not yet wired) | Only needed once forms are connected |
| `STRIPE_SECRET_KEY`, `TAP_SECRET_KEY` | Payments (not yet wired) | Only needed for the checkout flow |
| `R2_*` | File uploads (not yet wired) | Only needed once quote file uploads are connected |

## Health check after deploying

```
curl -I https://your-domain.com/en
```
Should return `200`. Then spot-check `/ar` for RTL rendering and one
Knowledge Base article to confirm the cover images (`public/blog/*.png`)
made it into the image.

## Rollback

Both paths are git-based — `git log --oneline` on the VPS, `git checkout
<previous-commit>`, then re-run the build/restart steps for your chosen
path.
