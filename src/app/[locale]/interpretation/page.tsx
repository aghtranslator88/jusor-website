import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Mic, MessageSquare, Video, Speaker, ArrowRight } from "lucide-react";
import { interpretationModes } from "@/content/interpretation";

type Locale = "en" | "ar";

const MODE_ICON = { Mic, MessageSquare, Video, Speaker } as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Interpretation" });

  return {
    title: t("hubTitle"),
    description: t("hubSubtitle"),
    alternates: { canonical: `/${locale}/interpretation` },
  };
}

export default async function InterpretationHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations({ locale, namespace: "Interpretation" });

  return (
    <main className="flex flex-1 flex-col">
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 px-4 py-20 text-center md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-display-lg font-extrabold text-white">{t("hubTitle")}</h1>
          <p data-answer-block className="mt-6 text-body-lg text-primary-50/90">
            {t("hubSubtitle")}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {interpretationModes.map((mode) => {
            const Icon = MODE_ICON[mode.iconKey as keyof typeof MODE_ICON] ?? Mic;
            return (
              <Link
                key={mode.slug}
                href={`/interpretation/${mode.slug}`}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-primary-50">
                  <Icon className="size-6 text-primary-600" aria-hidden />
                </div>
                <h2 className="mt-4 text-h3 font-semibold text-slate-900">
                  {mode.name[l] ?? mode.name.en}
                </h2>
                <p className="mt-2 text-body text-slate-600">{mode.tagline[l] ?? mode.tagline.en}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-body font-semibold text-primary-600">
                  {t("formTitle")}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
