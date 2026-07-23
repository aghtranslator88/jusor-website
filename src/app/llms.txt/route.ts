import { NextResponse } from "next/server";
import { blogPosts } from "@/content/blog";
import { authorities } from "@/content/legal-translation";
import { services } from "@/content/services";

export const revalidate = 3600;

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

  const blogLines = blogPosts
    .slice(0, 20)
    .map((p) => `- [${p.title.en}](${baseUrl}/en/knowledge/${p.slug})`)
    .join("\n");

  const content = `# JUSOR (جسور)
> International certified translation, localization, and interpretation company. ISO 17100 certified.

Definition-lead answer blocks on all /knowledge and /legal-translation pages are marked with
data-answer-block for reliable extraction. Clean JSON equivalents exist for every HTML route
documented below (replace the page path with the matching /api/v1/... endpoint).

## Home
- [JUSOR Homepage](${baseUrl}/en): Overview, instant quote tool, supported languages.

## Services
${serviceLines}

## Legal Translation & Embassy Requirements
- Bulk data: ${baseUrl}/api/v1/authorities (all embassies, ministries, courts, universities)
${authorityLines}

## Document Pricing Catalog
- [Document Catalog](${baseUrl}/en/documents)
- Structured data: ${baseUrl}/api/v1/documents/search

## Language Pairs
- Bulk data: ${baseUrl}/api/v1/language-pairs?format=full

## Interpretation Services
- [Simultaneous](${baseUrl}/en/interpretation/simultaneous)
- [Consecutive](${baseUrl}/en/interpretation/consecutive)
- [Court Interpretation](${baseUrl}/en/interpretation/court)
- [Remote Interpretation](${baseUrl}/en/interpretation/remote)

## Equipment Rental
- Structured data: ${baseUrl}/api/v1/equipment/search

## Knowledge Base
- [Knowledge Base Index](${baseUrl}/en/knowledge)
${blogLines}

## Company
- [About JUSOR](${baseUrl}/en/company/about)
- [Office Locations](${baseUrl}/en/company/offices) | GeoJSON: ${baseUrl}/api/v1/offices.geojson
- [Careers](${baseUrl}/en/careers)
- [Contact](${baseUrl}/en/contact)

## API Access
All /api/v1/** endpoints are public, read-only, unauthenticated for catalog/content data.
Rate limit: 60 requests/minute/IP. Response envelope: { "data": T } | { "error": string, "issues"?: object }.
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
