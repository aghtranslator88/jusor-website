import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAlternates } from "@/lib/metadata";
import { ShieldCheck, Lock, Gavel, Clock, ArrowRight, BadgeCheck } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Company" });

  return {
    title: t("aboutTitle"),
    description: t("aboutSubtitle"),
    alternates: getAlternates(locale, "/company/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Company" });

  const values = [
    { icon: ShieldCheck, titleKey: "valueAccuracyTitle", bodyKey: "valueAccuracyBody" },
    { icon: Lock, titleKey: "valueConfidentialityTitle", bodyKey: "valueConfidentialityBody" },
    { icon: Gavel, titleKey: "valueComplianceTitle", bodyKey: "valueComplianceBody" },
    { icon: Clock, titleKey: "valueSpeedTitle", bodyKey: "valueSpeedBody" },
  ] as const;

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden bg-primary-700 px-4 py-20 text-center md:px-8 md:py-28">
        <Image
          src="/images/hero/company-dubai-sparkle.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/80 to-primary-700/75" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-display-lg font-extrabold text-white">{t("aboutTitle")}</h1>
          <p data-answer-block className="mt-6 text-body-lg text-primary-50/90">
            {t("aboutSubtitle")}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <h2 className="text-center text-h2 font-bold text-slate-900">{t("valuesTitle")}</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.titleKey} className="text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-50 shadow-card">
                <value.icon className="size-7 text-primary-600" aria-hidden />
              </div>
              <h3 className="mt-4 text-h3 font-semibold text-slate-900">{t(value.titleKey)}</h3>
              <p className="mt-2 text-body text-slate-600">{t(value.bodyKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-50/60 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-white shadow-card">
            <BadgeCheck className="size-8 text-accent-500" aria-hidden />
          </div>
          <h2 className="text-h2 font-bold text-slate-900">{t("certificationsTitle")}</h2>
          <p className="max-w-2xl text-body-lg text-slate-600">{t("certificationsBody")}</p>
        </div>
      </section>

      <section className="px-4 py-16 text-center md:px-8 md:py-20">
        <h2 className="text-h2 font-bold text-slate-900">{t("ctaBannerTitle")}</h2>
        <Link
          href="/quotes/submit"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-body font-semibold text-white shadow-cta-glow transition-colors hover:bg-accent-600"
        >
          {t("ctaBannerButton")}
          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
        </Link>
      </section>
    </main>
  );
}
