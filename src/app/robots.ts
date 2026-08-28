import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // AI search / answer-engine crawlers — explicitly allowed so the site
      // (including /about) can be cited by AI Overviews, ChatGPT search, and
      // Perplexity. See GEO brief §3.10.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      // CCBot (Common Crawl, feeds many third-party LLM training sets) is
      // left to the client's discretion — uncomment to explicitly allow it:
      // { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
