import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export function getAlternates(locale: string, path: string): Metadata["alternates"] {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = normalizedPath === "/" ? "" : normalizedPath;

  return {
    canonical: `/${locale}${cleanPath}`,
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `/${l}${cleanPath}`])
    ),
  };
}
