This is the [JUSOR](https://jusor.com) website, built with [Next.js](https://nextjs.org).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The app source lives in `src/app`, organized by locale under `src/app/[locale]`. Pages auto-update as you edit the files.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

This project deploys as a Docker container (see the `Dockerfile`) managed by PM2 (`ecosystem.config.js`) on a VPS, rather than on Vercel. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for the full deployment walkthrough.
