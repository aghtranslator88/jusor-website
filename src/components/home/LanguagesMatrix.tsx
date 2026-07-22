import { useTranslations } from "next-intl";

export function LanguagesMatrix({ languages }: { languages: string[] }) {
  const t = useTranslations("Home");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-h2 font-bold text-slate-900">
        {t("languagesTitle")}
      </h2>
      <div className="mt-8 flex flex-wrap justify-center gap-2.5">
        {languages.map((lang) => (
          <span
            key={lang}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-body text-slate-700 shadow-card"
          >
            {lang}
          </span>
        ))}
      </div>
    </section>
  );
}
