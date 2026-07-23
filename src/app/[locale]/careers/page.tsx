import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { FileSearch, GraduationCap, FileEdit, Users, BadgeCheck, Mail } from "lucide-react";
import { primaryOffice } from "@/content/company";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Company" });

  return {
    title: t("careersTitle"),
    description: t("careersSubtitle"),
    alternates: { canonical: `/${locale}/careers` },
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Company" });

  const steps = [
    { icon: FileSearch, titleKey: "vettingStep1Title", bodyKey: "vettingStep1Body" },
    { icon: GraduationCap, titleKey: "vettingStep2Title", bodyKey: "vettingStep2Body" },
    { icon: FileEdit, titleKey: "vettingStep3Title", bodyKey: "vettingStep3Body" },
    { icon: Users, titleKey: "vettingStep4Title", bodyKey: "vettingStep4Body" },
    { icon: BadgeCheck, titleKey: "vettingStep5Title", bodyKey: "vettingStep5Body" },
  ] as const;

  return (
    <main className="flex flex-1 flex-col">
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 px-4 py-20 text-center md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-display-lg font-extrabold text-white">{t("careersTitle")}</h1>
          <p data-answer-block className="mt-6 text-body-lg text-primary-50/90">
            {t("careersSubtitle")}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-8 md:py-24">
        <h2 className="text-center text-h2 font-bold text-slate-900">{t("vettingTitle")}</h2>
        <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li key={step.titleKey} className="relative rounded-xl border border-slate-200 bg-white p-5">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary-600 text-body font-bold text-white">
                {i + 1}
              </span>
              <step.icon className="mt-3 size-6 text-primary-500" aria-hidden />
              <h3 className="mt-3 text-body font-semibold text-slate-900">{t(step.titleKey)}</h3>
              <p className="mt-2 text-caption text-slate-600">{t(step.bodyKey)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-primary-50/60 px-4 py-16 text-center md:px-8 md:py-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-h2 font-bold text-slate-900">{t("careersCta")}</h2>
          <p className="mt-4 text-body-lg text-slate-600">{t("careersCtaBody")}</p>
          <a
            href={`mailto:${primaryOffice.email}?subject=${encodeURIComponent("Linguist Application")}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-body font-semibold text-white shadow-cta-glow transition-colors hover:bg-accent-600"
          >
            <Mail className="size-4" aria-hidden />
            {primaryOffice.email}
          </a>
        </div>
      </section>
    </main>
  );
}
