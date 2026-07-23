"use client";

// Client-only booking form — see the note in
// InterpretationRequestForm.tsx: no live database is connected yet, so
// submission is captured locally and shown as a success state.
import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";

export function EquipmentBookingForm({ itemName }: { itemName: string }) {
  const t = useTranslations("Equipment");
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
        <h3 className="mt-4 text-h3 font-semibold text-slate-900">{ti("formSuccessTitle")}</h3>
        <p className="mt-2 text-body text-slate-600">{ti("formSuccessBody")}</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 text-body font-semibold text-primary-600 hover:underline"
        >
          {ti("formSuccessAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="text-h3 font-semibold text-slate-900">{t("formTitle")}</h3>
      <input type="hidden" name="item" value={itemName} />

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          <span className="text-caption font-medium text-slate-600">{t("formQuantity")}</span>
          <input
            required
            type="number"
            min={1}
            name="quantity"
            defaultValue={1}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </label>
        <label className="block">
          <span className="text-caption font-medium text-slate-600">{t("formDeliveryCity")}</span>
          <input
            type="text"
            name="city"
            defaultValue="Dubai"
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </label>
        <label className="block">
          <span className="text-caption font-medium text-slate-600">{t("formStartDate")}</span>
          <input
            required
            type="date"
            name="startDate"
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </label>
        <label className="block">
          <span className="text-caption font-medium text-slate-600">{t("formEndDate")}</span>
          <input
            required
            type="date"
            name="endDate"
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-full bg-accent-500 px-6 py-3.5 text-body font-semibold text-white shadow-cta-glow transition-colors hover:bg-accent-600 disabled:opacity-60"
      >
        {submitting ? ti("formSubmitting") : ti("formSubmit")}
      </button>
    </form>
  );
}
