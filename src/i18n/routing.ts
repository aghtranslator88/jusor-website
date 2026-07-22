import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ar", "fr", "de", "es", "it"] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";

export const rtlLocales: readonly AppLocale[] = ["ar"];

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export function getLangDir(locale: string): "rtl" | "ltr" {
  return rtlLocales.includes(locale as AppLocale) ? "rtl" : "ltr";
}
