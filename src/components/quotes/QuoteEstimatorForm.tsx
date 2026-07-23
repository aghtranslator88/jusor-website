"use client";

// Client-only quote form using the local pricing calculator (src/lib/pricing.ts).
// No live database is connected yet, so submission is captured locally and
// shown as a success state with a generated reference — see the note in
// InterpretationRequestForm.tsx for the broader pattern used across the site.
import { useMemo, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { documentTypes, languagePairs } from "@/content/legal-translation";
import { calculateQuotePrice, type ServiceTier, type TurnaroundSpeed } from "@/lib/pricing";

type Locale = "en" | "ar";

function generateReference() {
  const random = Math.floor(1000 + (typeof crypto !== "undefined" ? crypto.getRandomValues(new Uint32Array(1))[0] % 9000 : 4321));
  return `JSR-${random}`;
}

export function QuoteEstimatorForm() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Quote");
  const ti = useTranslations("Interpretation");

  const [documentSlug, setDocumentSlug] = useState(documentTypes[0]?.slug ?? "");
  const [pairSlug, setPairSlug] = useState(languagePairs[0]?.slug ?? "");
  const [tier, setTier] = useState<ServiceTier>("CERTIFIED");
  const [turnaround, setTurnaround] = useState<TurnaroundSpeed>("STANDARD_24H");
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const selectedDocument = documentTypes.find((d) => d.slug === documentSlug) ?? documentTypes[0];

  const breakdown = useMemo(() => {
    if (!selectedDocument) return null;
    return calculateQuotePrice({ basePrice: selectedDocument.basePrice, tier, turnaround });
  }, [selectedDocument, tier, turnaround]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setReference(generateReference());
    }, 500);
  }

  if (reference) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-success" aria-hidden />
        <h3 className="mt-4 text-h3 font-semibold text-slate-900">{t("successTitle")}</h3>
        <p className="mt-2 text-body text-slate-600">{t("successBody", { reference })}</p>
        <button
          type="button"
          onClick={() => setReference(null)}
          className="mt-5 text-body font-semibold text-primary-600 hover:underline"
        >
          {t("successAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-caption font-medium text-slate-600">{t("documentType")}</span>
            <select
              value={documentSlug}
              onChange={(e) => setDocumentSlug(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              {documentTypes.map((doc) => (
                <option key={doc.slug} value={doc.slug}>
                  {doc.name[locale] ?? doc.name.en}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-caption font-medium text-slate-600">{t("languagePair")}</span>
            <select
              value={pairSlug}
              onChange={(e) => setPairSlug(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              {languagePairs.map((pair) => (
                <option key={pair.slug} value={pair.slug}>
                  {(pair.sourceName[locale] ?? pair.sourceName.en)} → {(pair.targetName[locale] ?? pair.targetName.en)}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-caption font-medium text-slate-600">{t("serviceTier")}</span>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value as ServiceTier)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="STANDARD">{t("tierStandard")}</option>
              <option value="PROFESSIONAL">{t("tierProfessional")}</option>
              <option value="CERTIFIED">{t("tierCertified")}</option>
              <option value="SWORN_LEGAL">{t("tierSwornLegal")}</option>
            </select>
          </label>

          <label className="block">
            <span className="text-caption font-medium text-slate-600">{t("turnaround")}</span>
            <select
              value={turnaround}
              onChange={(e) => setTurnaround(e.target.value as TurnaroundSpeed)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="ECONOMY_72H">{t("turnaroundEconomy")}</option>
              <option value="STANDARD_24H">{t("turnaroundStandard")}</option>
              <option value="EXPRESS_12H">{t("turnaroundExpress")}</option>
              <option value="URGENT_4H">{t("turnaroundUrgent")}</option>
            </select>
          </label>
        </div>

        {breakdown && (
          <div className="mt-6 rounded-lg bg-primary-50 p-4">
            <p className="text-caption font-semibold uppercase tracking-wide text-primary-700">
              {t("priceBreakdownTitle")}
            </p>
            <dl className="mt-3 space-y-1.5 text-body">
              <div className="flex justify-between">
                <dt className="text-slate-600">{t("subtotal")}</dt>
                <dd className="font-medium text-slate-900">${breakdown.subtotal.toFixed(2)}</dd>
              </div>
              {breakdown.rushFee > 0 && (
                <div className="flex justify-between">
                  <dt className="text-slate-600">{t("rushFee")}</dt>
                  <dd className="font-medium text-slate-900">${breakdown.rushFee.toFixed(2)}</dd>
                </div>
              )}
              {breakdown.certificationFee > 0 && (
                <div className="flex justify-between">
                  <dt className="text-slate-600">{t("certificationFee")}</dt>
                  <dd className="font-medium text-slate-900">${breakdown.certificationFee.toFixed(2)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-primary-200 pt-1.5 text-h3 font-bold text-primary-700">
                <dt>{t("total")}</dt>
                <dd>${breakdown.total.toFixed(2)}</dd>
              </div>
            </dl>
            <p className="mt-3 text-caption text-slate-500">
              {t("estimatedDelivery")}: {breakdown.estimatedDeliveryHours}h
            </p>
          </div>
        )}
        <p className="mt-4 text-caption text-slate-500">{t("disclaimerNote")}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="text-h3 font-semibold text-slate-900">{t("contactDetailsTitle")}</h3>
        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="text-caption font-medium text-slate-600">{ti("formName")}</span>
            <input
              required
              type="text"
              name="name"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </label>
          <label className="block">
            <span className="text-caption font-medium text-slate-600">{ti("formEmail")}</span>
            <input
              required
              type="email"
              name="email"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </label>
          <label className="block">
            <span className="text-caption font-medium text-slate-600">{t("wordCount")}</span>
            <input
              type="number"
              min={1}
              name="wordCount"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
            <span className="mt-1 block text-caption text-slate-500">{t("wordCountHelp")}</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-accent-500 px-6 py-3.5 text-body font-semibold text-white shadow-cta-glow transition-colors hover:bg-accent-600 disabled:opacity-60"
        >
          {submitting ? t("submitting") : t("submit")}
        </button>
      </div>
    </form>
  );
}
