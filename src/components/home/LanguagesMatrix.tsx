import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { HomeContent } from "@/data/home-content";

export function LanguagesMatrix({ languages }: { languages: HomeContent["languages"] }) {
  const t = useTranslations("Home");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-h2 font-bold text-slate-900">
        {t("languagesTitle")}
      </h2>
      <div className="mt-8 flex flex-wrap justify-center gap-2.5">
        {languages.map((lang) =>
          lang.href ? (
            <Link
              key={lang.name}
              href={lang.href}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-body text-slate-700 shadow-card transition-colors hover:border-primary-300 hover:text-primary-600"
            >
              {lang.name}
            </Link>
          ) : (
            <span
              key={lang.name}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-body text-slate-700 shadow-card"
            >
              {lang.name}
            </span>
          )
        )}
      </div>
    </section>
  );
}
