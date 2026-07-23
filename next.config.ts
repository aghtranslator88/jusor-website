import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Produces a minimal self-contained server bundle (.next/standalone) for
  // lean Docker images — see Dockerfile and docs/DEPLOYMENT.md.
  output: "standalone",
};

export default withNextIntl(nextConfig);
