import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Globe, Smartphone, Gamepad2, FileCog, Stethoscope, Landmark, Speaker, Sparkles,
  CheckCircle2, ShieldCheck, ArrowRight, ChevronRight,
} from "lucide-react";
import { services, getServiceBySlug } from "@/content/services";
import { HybridWorkflowDiagram } from "@/components/services/HybridWorkflowDiagram";
import { ArticleFAQAccordion } from "@/components/knowledge/ArticleFAQAccordion";

type Locale = "en" | "ar";

const SERVICE_ICON = {
  Globe, Smartphone, Gamepad2, FileCog, Stethoscope, Landmark, Speaker, Sparkles,
} as const;

export function generateStaticParams() {
  return services.map((s) => ({ serviceSlug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; serviceSlug: string }>;
}): Promise<Metadata> {
  const { locale, serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return {};
  const l = locale as Locale;

  return {
    title: service.name[l] ?? service.name.en,
    description: service.shortDescription[l] ?? service.shortDescription.en,
    alternates: { canonical: `/${locale}/services/${serviceSlug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; serviceSlug: string }>;
}) {
  const { locale, serviceSlug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "Services" });
  const Icon = SERVICE_ICON[service.iconKey as keyof typeof SERVICE_ICON] ?? Globe;
  const name = service.name[l] ?? service.name.en ?? "";
  const relatedServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name,
        serviceType: name,
        provider: { "@type": "Organization", name: "JUSOR" },
        offers: {
          "@type": "Offer",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: service.basePricePerWord,
            priceCurrency: "USD",
            unitText: "per word",
          },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.question[l] ?? f.question.en,
          acceptedAnswer: { "@type": "Answer", text: f.answer[l] ?? f.answer.en },
        })),
      },
    ],
  };

  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-gradient-to-br from-primary-600 to-primary-700 px-4 py-16 text-center md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <nav className="flex items-center justify-center gap-1.5 text-caption text-primary-100">
            <Link href="/services" className="hover:text-white">
              {t("hubTitle")}
            </Link>
            <ChevronRight className="size-3.5 rtl:rotate-180" aria-hidden />
            <span className="text-white">{name}</span>
          </nav>
          <div className="mx-auto mt-4 flex size-16 items-center justify-center rounded-full bg-white/10">
            <Icon className="size-8 text-white" aria-hidden />
          </div>
          <h1 className="mt-5 text-display-lg font-extrabold text-white">{name}</h1>
          <div data-answer-block className="mx-auto mt-6 max-w-2xl rounded-lg bg-white/10 p-5 text-start text-body text-primary-50">
            {service.definitionBlock[l] ?? service.definitionBlock.en}
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/quotes/submit"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-body font-semibold text-white shadow-cta-glow transition-colors hover:bg-accent-600"
            >
              {t("ctaPrimary")}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-body font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-16 md:px-8 md:py-24">
        <h2 className="text-h2 font-bold text-slate-900">{t("capabilitiesTitle")}</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {service.capabilities.map((cap) => (
            <div key={cap[l] ?? cap.en} className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-4">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
              <span className="text-body text-slate-700">{cap[l] ?? cap.en}</span>
            </div>
          ))}
        </div>
      </section>

      {service.supportsHybridAI && (
        <section className="bg-primary-50/60 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-4xl">
            <HybridWorkflowDiagram />
          </div>
        </section>
      )}

      {service.complianceNote && (
        <section className="mx-auto w-full max-w-4xl px-4 py-10 md:px-8">
          <div className="flex items-start gap-3 rounded-xl border-s-4 border-warning bg-slate-50 p-5">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden />
            <div>
              <p className="text-body font-semibold text-slate-800">{t("complianceTitle")}</p>
              <p className="mt-1 text-body text-slate-600">
                {service.complianceNote[l] ?? service.complianceNote.en}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-4xl px-4 py-10 md:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-display-lg font-extrabold text-primary-600">
            {t("pricingSnapshot", { price: service.basePricePerWord })}
          </p>
          <p className="mt-2 text-body text-slate-500">{t("enterpriseNote")}</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-16 md:px-8">
        <ArticleFAQAccordion
          title={t("faqTitle")}
          faqs={service.faqs.map((f) => ({
            question: f.question[l] ?? f.question.en ?? "",
            answer: f.answer[l] ?? f.answer.en ?? "",
          }))}
        />
      </section>

      <section className="bg-primary-50/60 px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-h2 font-bold text-slate-900">{t("relatedServicesTitle")}</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {relatedServices.map((s) => {
              const RIcon = SERVICE_ICON[s.iconKey as keyof typeof SERVICE_ICON] ?? Globe;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary-50">
                    <RIcon className="size-5 text-primary-600" aria-hidden />
                  </div>
                  <p className="mt-3 text-body font-semibold text-slate-900">{s.name[l] ?? s.name.en}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
