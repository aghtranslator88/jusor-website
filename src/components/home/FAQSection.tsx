import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { HomeContent } from "@/data/home-content";

export function FAQSection({ faqs }: { faqs: HomeContent["faqs"] }) {
  const t = useTranslations("Home");

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-h2 font-bold text-slate-900">{t("faqTitle")}</h2>
      <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {faqs.map((faq, i) => (
          <details key={faq.question} open={i === 0} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <h3 className="text-start text-h3 font-semibold text-slate-900">{faq.question}</h3>
              <ChevronDown
                className="size-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <div className="pt-3 text-body text-slate-600">{faq.answer}</div>
          </details>
        ))}
      </div>
      <p className="mt-6 text-center text-body text-slate-600">
        {t("faqPricingLinkText")}{" "}
        <Link href="/documents" className="font-semibold text-primary-600 hover:text-primary-700">
          {t("faqPricingCatalogLink")}
        </Link>{" "}
        {t("faqPricingLinkOr")}{" "}
        <Link href="/quotes/submit" className="font-semibold text-primary-600 hover:text-primary-700">
          {t("faqPricingQuoteLink")}
        </Link>
        .
      </p>
    </section>
  );
}
