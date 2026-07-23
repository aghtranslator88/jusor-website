# Multi-stage build producing a lean production image using Next.js's
# standalone output (see next.config.ts). Build with:
#   docker build -t jusor-web .
# Run with:
#   docker run -p 3000:3000 --env-file .env jusor-web
# See docs/DEPLOYMENT.md for the full VPS deployment walkthrough.

FROM node:22-alpine AS base

# ---- Dependencies ----
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- Build ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Prisma client generation needs DATABASE_URL to be *present* (not live) at
# build time only for schema validation, not for connecting.
ENV DATABASE_URL="postgresql://user:password@localhost:5432/jusor?schema=public"
RUN npx prisma generate
RUN npm run build

# ---- Runtime ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
