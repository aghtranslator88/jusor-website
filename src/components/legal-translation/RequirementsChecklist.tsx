"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronDown, Stamp, FileCheck, UserCheck } from "lucide-react";
import type { EmbassyRequirement, DocumentType } from "@/content/legal-translation";

type RequirementWithDoc = EmbassyRequirement & { documentType: DocumentType };

export function RequirementsChecklist({ requirements }: { requirements: RequirementWithDoc[] }) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("LegalTranslation");
  const [openSlug, setOpenSlug] = useState<string | null>(requirements[0]?.documentSlug ?? null);

  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {requirements.map((req) => {
        const open = openSlug === req.documentSlug;
        return (
          <div key={req.documentSlug}>
            <button
              type="button"
              onClick={() => setOpenSlug(open ? null : req.documentSlug)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
            >
              <span className="text-h3 font-semibold text-slate-900">
                {req.documentType.name[locale] ?? req.documentType.name.en}
              </span>
              <ChevronDown
                className={`size-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {open && (
              <div className="px-5 pb-5">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-caption font-medium text-primary-700">
                    {t("turnaround", { hours: req.turnaroundHours })}
                  </span>
                  {req.requiresApostille && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1 text-caption font-medium text-warning">
                      <Stamp className="size-3.5" aria-hidden />
                      {t("requiresApostille")}
                    </span>
                  )}
                  {req.requiresNotarization && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-caption font-medium text-slate-600">
                      <FileCheck className="size-3.5" aria-hidden />
                      {t("requiresNotarization")}
                    </span>
                  )}
                  {req.requiresSwornTranslator && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-caption font-medium text-accent-600">
                      <UserCheck className="size-3.5" aria-hidden />
                      {t("requiresSworn")}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-caption font-semibold uppercase tracking-wide text-slate-500">
                  {t("checklistTitle")}
                </p>
                <ul className="mt-2 space-y-1.5 text-body text-slate-600">
                  {req.checklist.map((item) => (
                    <li key={item[locale] ?? item.en} className="flex gap-2">
                      <span className="text-primary-500">•</span>
                      <span>{item[locale] ?? item.en}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/legal-translation/documents/${req.documentSlug}`}
                  className="mt-4 inline-flex items-center text-body font-semibold text-primary-600 hover:underline"
                >
                  {t("getQuote")} →
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
