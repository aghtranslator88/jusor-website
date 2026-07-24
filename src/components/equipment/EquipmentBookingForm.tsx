"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { submitEquipmentBooking } from "@/app/actions/inquiries";
import { primaryOffice } from "@/content/company";

export function EquipmentBookingForm({ itemName }: { itemName: string }) {
  const t = useTranslations("Equipment");
  const ti = useTranslations("Interpretation");
  const tf = useTranslations("Forms");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    const result = await submitEquipmentBooking(new FormData(e.currentTarget));
    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(true);
    }
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

      {error && (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden />
          <p className="text-body text-amber-800">
            {tf("errorBody")}{" "}
            <a href={primaryOffice.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              {tf("errorWhatsapp")}
            </a>
          </p>
        </div>
      )}

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

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
