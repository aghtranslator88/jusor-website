import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Speaker } from "lucide-react";
import { equipmentItems, equipmentCategoryLabels } from "@/content/equipment";

type Locale = "en" | "ar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Equipment" });

  return {
    title: t("hubTitle"),
    description: t("hubSubtitle"),
    alternates: { canonical: `/${locale}/equipment` },
  };
}

export default async function EquipmentHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations({ locale, namespace: "Equipment" });

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

      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {equipmentItems.map((item) => (
            <Link
              key={item.slug}
              href={`/equipment/${item.slug}`}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex size-11 items-center justify-center rounded-full bg-primary-50">
                  <Speaker className="size-5 text-primary-600" aria-hidden />
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-caption text-slate-600">
                  {equipmentCategoryLabels[item.category][l] ?? equipmentCategoryLabels[item.category].en}
                </span>
              </div>
              <h2 className="mt-3 text-h3 font-semibold text-slate-900">{item.name[l] ?? item.name.en}</h2>
              <p className="mt-2 flex-1 text-body text-slate-600">{item.description[l] ?? item.description.en}</p>
              <p className="mt-3 text-h3 font-bold text-primary-600">{t("perDay", { price: item.dailyRate })}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
