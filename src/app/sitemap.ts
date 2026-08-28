import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { blogPosts } from "@/content/blog";
import { authorities, documentTypes, languagePairs } from "@/content/legal-translation";
import { services } from "@/content/services";
import { interpretationModes } from "@/content/interpretation";
import { equipmentItems } from "@/content/equipment";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";
  const locales = routing.locales;

  const staticPaths = [
    "",
    "/legal-translation",
    "/services",
    "/interpretation",
    "/equipment",
    "/documents",
    "/knowledge",
    "/about",
    "/company/about",
    "/company/offices",
    "/careers",
    "/contact",
    "/quotes/submit",
  ];

  const routes: MetadataRoute.Sitemap = [];

  // Static routes for each locale
  for (const staticPath of staticPaths) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}${staticPath}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: staticPath === "" ? 1.0 : 0.8,
      });
    }
  }

  // Dynamic Knowledge Base articles
  for (const post of blogPosts) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/knowledge/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Dynamic Legal Translation Authorities & Embassies
  for (const auth of authorities) {
    const subpath = auth.type === "EMBASSY" ? "embassies" : "authorities";
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/legal-translation/${subpath}/${auth.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Dynamic Document Types
  for (const doc of documentTypes) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/legal-translation/documents/${doc.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Dynamic Language Pairs
  for (const pair of languagePairs) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/translations/${pair.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Dynamic Services
  for (const service of services) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  }

  // Dynamic Interpretation Modes
  for (const mode of interpretationModes) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/interpretation/${mode.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Dynamic Equipment Items
  for (const item of equipmentItems) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/equipment/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return routes;
}
