import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAlternates } from "@/lib/metadata";
import { Mic, MessageSquare, Video, Speaker, ArrowRight } from "lucide-react";
import { interpretationModes } from "@/content/interpretation";
import { equipmentItems } from "@/content/equipment";
import { WhatsAppCTA } from "@/components/shared/WhatsAppCTA";

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
    alternates: getAlternates(locale, "/interpretation"),
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

      {/* Interpretation Modes Section */}
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

      {/* Equipment Rental Subsection */}
      <section id="equipment" className="border-t border-slate-200 bg-slate-50/70 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <span className="rounded-full bg-emerald-100 px-3.5 py-1 text-caption font-semibold text-emerald-800">
              {l === "ar" ? "معدات الترجمة الفورية" : "Equipment Rental Subsection"}
            </span>
            <h2 className="mt-3 text-h2 font-extrabold text-slate-900">
              {l === "ar" ? "تأجير معدات الترجمة الفورية للمؤتمرات" : "Audio & Interpretation Equipment Rental"}
            </h2>
            <p className="mt-3 max-w-2xl text-body-lg text-slate-600">
              {l === "ar"
                ? "نوفر أحدث معدات الترجمة الفورية المعتمدة دولياً، شاملاً كابينات العزل الصوتي ISO، سماعات الوفود، وأجهزة الإرسال والاستقبال اللاسلكية."
                : "Complete conference audio hardware solutions — ISO soundproof booths, delegate receivers, FM/IR transmitters, and tour guide systems."}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {equipmentItems.slice(0, 6).map((item) => (
              <Link
                key={item.slug}
                href={`/equipment/${item.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Speaker className="size-5" />
                  </div>
                  <h3 className="mt-4 text-h3 font-bold text-slate-900 group-hover:text-primary-600">
                    {item.name[l] ?? item.name.en}
                  </h3>
                  <p className="mt-2 text-caption text-slate-600 line-clamp-2">
                    {item.description[l] ?? item.description.en}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-body font-bold text-emerald-700">
                    ${item.dailyRate}/day
                  </span>
                  <span className="text-caption font-semibold text-primary-600 inline-flex items-center gap-1">
                    {l === "ar" ? "التفاصيل" : "View specs"} →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/equipment"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-body font-bold text-white shadow-sm transition-colors hover:bg-primary-700"
            >
              <span>{l === "ar" ? "عرض كتالوج المعدات كاملًا" : "Browse Full Equipment Catalog"}</span>
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </Link>
          </div>

          <WhatsAppCTA variant="inline" className="mt-12" />
        </div>
      </section>
    </main>
  );
}
