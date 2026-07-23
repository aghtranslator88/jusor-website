import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAlternates } from "@/lib/metadata";
import { Globe, Smartphone, Gamepad2, FileCog, Stethoscope, Landmark, Speaker, Sparkles } from "lucide-react";
import { services } from "@/content/services";

type Locale = "en" | "ar";

const SERVICE_ICON = {
  Globe, Smartphone, Gamepad2, FileCog, Stethoscope, Landmark, Speaker, Sparkles,
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });

  return {
    title: t("hubTitle"),
    description: t("hubSubtitle"),
    alternates: getAlternates(locale, "/services"),
  };
}

export default async function ServicesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations({ locale, namespace: "Services" });

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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = SERVICE_ICON[service.iconKey as keyof typeof SERVICE_ICON] ?? Globe;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-primary-50">
                  <Icon className="size-6 text-primary-600" aria-hidden />
                </div>
                <h2 className="mt-4 text-h3 font-semibold text-slate-900">
                  {service.name[l] ?? service.name.en}
                </h2>
                <p className="mt-2 flex-1 text-body text-slate-600">
                  {service.shortDescription[l] ?? service.shortDescription.en}
                </p>
                <p className="mt-3 text-body font-semibold text-primary-600">
                  {t("pricingSnapshot", { price: service.basePricePerWord })}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
