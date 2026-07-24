import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAlternates } from "@/lib/metadata";
import {
  aboutMeta,
  aboutHero,
  trustBarItems,
  aboutVision,
  aboutMission,
  aboutPromise,
  processSteps,
  certifiedVsOtherServices,
  geoQuestions,
  comparisonTable,
  faqItems,
  credentialLine,
  aboutLastUpdated,
} from "@/content/about";
import { TrustBar } from "@/components/about/TrustBar";
import { ProcessStepper } from "@/components/about/ProcessStepper";
import { CredentialBlock } from "@/components/about/CredentialBlock";
import { AboutFAQ } from "@/components/about/AboutFAQ";
import { HeroPattern, SealIllustration, OfficeIllustration } from "@/components/about/AboutVisuals";

type Locale = "en" | "ar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const title = aboutMeta.title[l] ?? aboutMeta.title.en!;
  const description = aboutMeta.description[l] ?? aboutMeta.description.en!;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";

  return {
    title,
    description,
    alternates: getAlternates(locale, "/about"),
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/about`,
      type: "website",
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      // TODO: replace with a dedicated 1200x630 og-about.jpg branded card
      // (logo + tagline + "Approved by the UAE Ministry of Justice").
      images: [{ url: "/brand/logo-512.png", width: 512, height: 512 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const isAr = l === "ar";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jusortrans.com";
  const pageUrl = `${siteUrl}/${locale}/about`;
  const title = aboutMeta.title[l] ?? aboutMeta.title.en!;
  const description = aboutMeta.description[l] ?? aboutMeta.description.en!;

  // The organization entity (LocalBusiness, @id "#organization") is emitted
  // once, sitewide, in src/app/[locale]/layout.tsx — including the official
  // name confirmed by the owner, areaServed, availableLanguage, and
  // hasCredential (MOJ approval, no license number). Do NOT re-emit a
  // second LocalBusiness block with the same @id here: two JSON-LD objects
  // sharing one @id but different properties is invalid duplicate
  // structured data. This page only references that entity via @id.
  //
  // Also intentionally omitted from the org entity (see layout.tsx and
  // src/content/about.ts for the full reasoning): geo (lat/lng) — not yet
  // supplied, do not fabricate; sameAs — no real social/GBP URLs confirmed
  // yet, a placeholder string would be an invalid URL in production schema.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: isAr ? "ar-AE" : "en-AE",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        dateModified: aboutLastUpdated,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isAr ? "الرئيسية" : "Home",
            item: `${siteUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isAr ? "نبذة عنا" : "About Us",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question[l] ?? item.question.en,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer[l] ?? item.answer.en,
          },
        })),
      },
    ],
  };

  const lastUpdatedLabel = isAr
    ? `آخر تحديث: ${new Date(aboutLastUpdated).toLocaleDateString("ar-AE", { year: "numeric", month: "long", day: "numeric" })}`
    : `Last updated: ${new Date(aboutLastUpdated).toLocaleDateString("en-AE", { year: "numeric", month: "long", day: "numeric" })}`;

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2.1 Hero */}
      <section className="relative overflow-hidden bg-primary-700 px-4 py-20 text-center md:px-8 md:py-28">
        <HeroPattern />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-primary-700/80" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-display-lg font-extrabold text-white">{aboutHero.h1[l] ?? aboutHero.h1.en}</h1>
          <p className="mt-4 text-body-lg text-primary-50/90">{aboutHero.tagline[l] ?? aboutHero.tagline.en}</p>
          <TrustBar items={trustBarItems.map((item) => ({ icon: item.icon, label: item.label[l] ?? item.label.en! }))} />
        </div>
      </section>

      {/* 2.2 Vision */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8 md:py-20">
        <h2 className="text-h2 font-bold text-slate-900">{isAr ? "الرؤية" : "Vision"}</h2>
        <p data-answer-block className={`mt-5 text-body-lg text-slate-600 ${isAr ? "leading-[1.9]" : ""}`}>
          {aboutVision[l] ?? aboutVision.en}
        </p>
      </section>

      {/* 2.3 Mission + credential visual */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-8 md:py-20">
        <div>
          <h2 className="text-h2 font-bold text-slate-900">{isAr ? "رسالتنا" : "Mission"}</h2>
          <div data-answer-block className={`mt-5 space-y-4 text-body-lg text-slate-600 ${isAr ? "leading-[1.9]" : ""}`}>
            {(aboutMission[l] ?? aboutMission.en!).split("\n\n").map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
        <div className="order-first md:order-last">
          <SealIllustration />
        </div>
      </section>

      {/* 3.3 Question-based headings + 3.4 definition pattern */}
      <section className="mx-auto max-w-3xl space-y-10 px-4 py-16 md:px-8 md:py-20">
        {geoQuestions.map((q) => (
          <div key={q.question.en}>
            <h2 className="text-h3 font-bold text-slate-900">{q.question[l] ?? q.question.en}</h2>
            <p data-answer-block className={`mt-3 text-body text-slate-600 ${isAr ? "leading-[1.9]" : ""}`}>
              {q.answer[l] ?? q.answer.en}
            </p>
          </div>
        ))}
      </section>

      {/* 3.6 Comparison table */}
      <section className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        <h2 className="text-center text-h2 font-bold text-slate-900">
          {isAr ? "الترجمة المعتمدة مقابل الترجمة العادية" : "Certified vs. Standard Translation"}
        </h2>
        <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-start text-body">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-4 text-start font-semibold text-slate-900">{isAr ? "المعيار" : "Feature"}</th>
                <th className="p-4 text-start font-semibold text-slate-900">{isAr ? "معتمدة" : "Certified"}</th>
                <th className="p-4 text-start font-semibold text-slate-900">{isAr ? "عادية" : "Standard"}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row) => (
                <tr key={row.feature.en} className="border-t border-slate-200">
                  <td className="p-4 font-medium text-slate-900">{row.feature[l] ?? row.feature.en}</td>
                  <td className="p-4 text-slate-600">{row.certified[l] ?? row.certified.en}</td>
                  <td className="p-4 text-slate-600">{row.standard[l] ?? row.standard.en}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* COMPLIANCE: certified legal translation (MOJ-approved, named pairs
          only) must stay visually and textually separate from other, wider-
          language, non-certified services. Do not merge these two cards or
          move the "60+ languages" homepage claim into this block. */}
      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-primary-600 bg-primary-50 p-6">
            <h3 className="text-h3 font-bold text-primary-900">
              {certifiedVsOtherServices.certified.title[l] ?? certifiedVsOtherServices.certified.title.en}
            </h3>
            <p className={`mt-3 text-body text-slate-700 ${isAr ? "leading-[1.9]" : ""}`}>
              {certifiedVsOtherServices.certified.body[l] ?? certifiedVsOtherServices.certified.body.en}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-h3 font-bold text-slate-900">
              {certifiedVsOtherServices.other.title[l] ?? certifiedVsOtherServices.other.title.en}
            </h3>
            <p className={`mt-3 text-body text-slate-600 ${isAr ? "leading-[1.9]" : ""}`}>
              {certifiedVsOtherServices.other.body[l] ?? certifiedVsOtherServices.other.body.en}
            </p>
            <Link
              href="/services"
              className="mt-4 inline-block text-body font-semibold text-primary-600 hover:text-primary-700"
            >
              {isAr ? "استكشف خدمات الترجمة والتعريب الأخرى" : "Explore our other translation & localization services"}
            </Link>
          </div>
        </div>
      </section>

      {/* 2.4 Promise — distinct visual treatment, contrasting band */}
      <section className="bg-primary-900 px-4 py-20 text-center md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className={`space-y-6 text-h2 font-semibold text-white md:text-display-lg ${isAr ? "leading-[1.5]" : "leading-snug"}`}>
            {(aboutPromise[l] ?? aboutPromise.en!).split("\n\n").map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 How We Work */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <h2 className="text-center text-h2 font-bold text-slate-900">{isAr ? "كيف نعمل" : "How We Work"}</h2>
        <ProcessStepper
          steps={processSteps.map((s) => ({
            title: s.title[l] ?? s.title.en!,
            body: s.body[l] ?? s.body.en!,
          }))}
        />
        <div className="mt-14">
          <OfficeIllustration />
        </div>
      </section>

      {/* 3.8 FAQ */}
      <AboutFAQ
        title={isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
        arabic={isAr}
        items={faqItems.map((item) => ({
          question: item.question[l] ?? item.question.en!,
          answer: item.answer[l] ?? item.answer.en!,
        }))}
      />

      {/* Internal links (§8) */}
      <section className="mx-auto max-w-3xl px-4 pb-4 text-center md:px-8">
        <p className="text-body text-slate-600">
          {isAr ? (
            <>
              راجع <Link href="/services" className="font-semibold text-primary-600 hover:text-primary-700">خدمات الترجمة والتعريب لدينا</Link>،
              أو تواصل مع <Link href="/contact" className="font-semibold text-primary-600 hover:text-primary-700">مكتبنا في دبي</Link>،
              أو اطّلع على <Link href="/legal-translation" className="font-semibold text-primary-600 hover:text-primary-700">مركز الترجمة القانونية المعتمدة</Link>.
            </>
          ) : (
            <>
              Explore our <Link href="/services" className="font-semibold text-primary-600 hover:text-primary-700">translation and localization services</Link>,
              reach our <Link href="/contact" className="font-semibold text-primary-600 hover:text-primary-700">Dubai office</Link>,
              or visit the <Link href="/legal-translation" className="font-semibold text-primary-600 hover:text-primary-700">certified legal translation hub</Link>.
            </>
          )}
        </p>
      </section>

      {/* 3.7 Last updated + 2.6 Credential block */}
      <section className="mx-auto max-w-3xl px-4 py-12 text-center md:px-8">
        <p className="text-caption text-slate-500">{lastUpdatedLabel}</p>
        <CredentialBlock line={credentialLine[l] ?? credentialLine.en!} className="mt-4 text-slate-700" />
      </section>
    </main>
  );
}
