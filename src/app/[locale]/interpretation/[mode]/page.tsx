import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Mic, MessageSquare, Video, Speaker } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAlternates } from "@/lib/metadata";
import { WhatsAppCTA } from "@/components/shared/WhatsAppCTA";
import { interpretationModes, getInterpretationModeBySlug } from "@/content/interpretation";
import { WhenToUseCard } from "@/components/interpretation/WhenToUseCard";
import { InterpretationRequestForm } from "@/components/interpretation/InterpretationRequestForm";
import { BoothSpecTable } from "@/components/interpretation/BoothSpecTable";

type Locale = "en" | "ar";

const MODE_ICON = {
  Mic,
  MessageSquare,
  Video,
  Speaker,
} as const;

export function generateStaticParams() {
  return interpretationModes.flatMap((m) =>
    routing.locales.map((locale) => ({ locale, mode: m.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; mode: string }>;
}): Promise<Metadata> {
  const { locale, mode: modeSlug } = await params;
  const mode = getInterpretationModeBySlug(modeSlug);
  if (!mode) return {};
  const l = locale as Locale;

  return {
    title: mode.name[l] ?? mode.name.en,
    description: mode.tagline[l] ?? mode.tagline.en,
    alternates: getAlternates(locale, `/interpretation/${modeSlug}`),
  };
}

export default async function InterpretationModePage({
  params,
}: {
  params: Promise<{ locale: string; mode: string }>;
}) {
  const { locale, mode: modeSlug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const mode = getInterpretationModeBySlug(modeSlug);
  if (!mode) notFound();

  const t = await getTranslations({ locale, namespace: "Interpretation" });
  const Icon = MODE_ICON[mode.iconKey as keyof typeof MODE_ICON] ?? Mic;
  const name = mode.name[l] ?? mode.name.en ?? "";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name,
        serviceType: "Interpretation",
        provider: { "@type": "Organization", name: "JUSOR" },
        areaServed: "Dubai, United Arab Emirates",
        url: `${siteUrl}/${locale}/interpretation/${modeSlug}`,
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
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-white/10">
            <Icon className="size-8 text-white" aria-hidden />
          </div>
          <h1 className="mt-5 text-display-lg font-extrabold text-white">{name}</h1>
          <p className="mt-4 text-body-lg text-primary-50/90">{mode.tagline[l] ?? mode.tagline.en}</p>
          <div data-answer-block className="mx-auto mt-6 max-w-2xl rounded-lg bg-white/10 p-5 text-start text-body text-primary-50">
            {mode.definitionBlock[l] ?? mode.definitionBlock.en}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <div className="space-y-6">
          <WhenToUseCard mode={mode} />
          {mode.isEquipment && <BoothSpecTable />}
        </div>
        <div>
          <InterpretationRequestForm modeName={name} />
          <WhatsAppCTA variant="inline" modeName={name} className="mt-6" />
        </div>
      </section>

      <section className="bg-primary-50/60 px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-h2 font-bold text-slate-900">{t("modesTitle")}</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {interpretationModes.map((m) => {
              const MIcon = MODE_ICON[m.iconKey as keyof typeof MODE_ICON] ?? Mic;
              const isCurrent = m.slug === mode.slug;
              return (
                <Link
                  key={m.slug}
                  href={`/interpretation/${m.slug}`}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-5 text-center transition-all ${
                    isCurrent
                      ? "border-accent-500 bg-white ring-2 ring-accent-500"
                      : "border-slate-200 bg-white hover:-translate-y-1 hover:shadow-card-hover"
                  }`}
                >
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary-50">
                    <MIcon className="size-5 text-primary-600" aria-hidden />
                  </div>
                  <span className="text-body font-medium text-slate-800">{m.name[l] ?? m.name.en}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
