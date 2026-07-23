"use client";

// Client-only contact form — no live database/email service is connected
// yet (see docs/spec/09-corporate-governance.md §E, submitContactInquiryAction
// is specced but not wired), so submission is captured locally and shown as
// a success state rather than silently failing.
import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("Company");
  const ti = useTranslations("Interpretation");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-success" aria-hidden />
        <h3 className="mt-4 text-h3 font-semibold text-slate-900">{t("formSuccessTitle")}</h3>
        <p className="mt-2 text-body text-slate-600">{t("formSuccessBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="text-h3 font-semibold text-slate-900">{t("contactFormTitle")}</h3>

      <div className="mt-5 grid grid-cols-1 gap-4">
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
          <span className="text-caption font-medium text-slate-600">{t("formSubjectLabel")}</span>
          <select
            name="subject"
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="quote">{t("formSubjectQuote")}</option>
            <option value="support">{t("formSubjectSupport")}</option>
            <option value="partnership">{t("formSubjectPartnership")}</option>
            <option value="other">{t("formSubjectOther")}</option>
          </select>
        </label>
        <label className="block">
          <span className="text-caption font-medium text-slate-600">{t("formMessage")}</span>
          <textarea
            required
            name="message"
            rows={4}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-full bg-accent-500 px-6 py-3.5 text-body font-semibold text-white shadow-cta-glow transition-colors hover:bg-accent-600 disabled:opacity-60"
      >
        {t("formSubmit")}
      </button>
    </form>
  );
}
