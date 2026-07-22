import type { AppLocale } from "./routing";

export const localeMeta: Record<AppLocale, { nativeLabel: string; flag: string }> = {
  en: { nativeLabel: "English", flag: "🇬🇧" },
  ar: { nativeLabel: "العربية", flag: "🇦🇪" },
  fr: { nativeLabel: "Français", flag: "🇫🇷" },
  de: { nativeLabel: "Deutsch", flag: "🇩🇪" },
  es: { nativeLabel: "Español", flag: "🇪🇸" },
  it: { nativeLabel: "Italiano", flag: "🇮🇹" },
};
