This is the [JUSOR](https://jusor.com) website, built with [Next.js](https://nextjs.org).

## Getting Started

Install dependencies and set up the environment:

```bash
npm install
```

Copy `.env.example` to `.env` and fill in the values you need (at minimum `DATABASE_URL`/`DIRECT_URL` for Prisma and `NEXT_PUBLIC_SITE_URL`; `RESEND_API_KEY` is required for the contact/quote forms to send mail).

Then prepare the database and run the development server:

```bash
npm run db:migrate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The app source lives in `src/app`, organized by locale under `src/app/[locale]`. Pages auto-update as you edit the files.

## Project Structure

- `src/app/[locale]` — localized pages and layouts (routing handled by `next-intl` via `middleware.ts`)
- `src/app/actions` — Server Actions (form submissions, email via Resend)
- `messages/` — translation files; the site ships in Arabic, English, French, German, Italian, and Spanish
- `prisma/` — database schema and seed script (`npm run db:seed`)
- `docs/` — deployment guide and specs

Fonts are loaded with [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts): Plus Jakarta Sans for Latin text, Cairo and Tajawal for Arabic (see `src/app/fonts.ts`).

## Deployment

This project deploys as a Docker container (see the `Dockerfile`) managed by PM2 (`ecosystem.config.js`) on a VPS, rather than on Vercel. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for the full deployment walkthrough.
