import { NextResponse } from "next/server";
import { blogPosts } from "@/content/blog";
import { authorities, languagePairs } from "@/content/legal-translation";
import { services } from "@/content/services";
import { interpretationModes } from "@/content/interpretation";

export const dynamic = "force-static";
export const revalidate = 3600;

// Note: this site has no backend API yet — all content below is served as
// static HTML pages (see src/content/*.ts). Every link here is a real route
// verified to resolve; do not add /api/v1/** references until those routes
// actually exist (docs/spec/02-api-server-actions.md specs them, but they
// are not implemented).

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";

  const serviceLines = services
    .map((s) => `- [${s.name.en}](${baseUrl}/en/services/${s.slug})`)
    .join("\n");

  const authorityLines = authorities
    .map((a) => {
      const subpath = a.type === "EMBASSY" ? "embassies" : "authorities";
      return `- [${a.name.en}](${baseUrl}/en/legal-translation/${subpath}/${a.slug})`;
    })
    .join("\n");

  const languagePairLines = languagePairs
    .map((p) => `- [${p.sourceName.en} → ${p.targetName.en}](${baseUrl}/en/translations/${p.slug})`)
    .join("\n");

  const interpretationLines = interpretationModes
    .map((m) => `- [${m.name.en}](${baseUrl}/en/interpretation/${m.slug})`)
    .join("\n");

  const blogLines = blogPosts
    .slice(0, 20)
    .map((p) => `- [${p.title.en}](${baseUrl}/en/knowledge/${p.slug})`)
    .join("\n");

  const content = `# JUSOR (جسور)
> International certified translation, localization, and interpretation company. ISO 17100 certified.

Definition-lead answer blocks on all /knowledge and /legal-translation pages are marked with
data-answer-block for reliable extraction. All routes below are static HTML pages, available in
6 locales (en, ar, fr, de, es, it) via the /{locale}/... prefix.

## Home
- [JUSOR Homepage](${baseUrl}/en): Overview, instant quote tool, supported languages.

## Services
${serviceLines}

## Legal Translation & Embassy Requirements
${authorityLines}
- [Full document catalog](${baseUrl}/en/legal-translation)

## Document Pricing Catalog
- [Document Catalog](${baseUrl}/en/documents)

## Language Pairs
${languagePairLines}

## Interpretation Services
${interpretationLines}

## Equipment Rental
- [Equipment Catalog](${baseUrl}/en/equipment)

## Knowledge Base
- [Knowledge Base Index](${baseUrl}/en/knowledge)
${blogLines}

## About
- [About Us](${baseUrl}/en/about): Company credentials, Ministry of Justice approval, and quality process.

## Company
- [About JUSOR](${baseUrl}/en/company/about)
- [Office Locations](${baseUrl}/en/company/offices)
- [Careers](${baseUrl}/en/careers)
- [Contact](${baseUrl}/en/contact)
- WhatsApp: https://wa.me/971503244329
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
