import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FileCheck2 } from "lucide-react";
import type { DocumentType } from "@/content/legal-translation";

export function DocumentTypeGrid({ documents }: { documents: DocumentType[] }) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("LegalTranslation");

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {documents.map((doc) => (
        <Link
          key={doc.slug}
          href={`/legal-translation/documents/${doc.slug}`}
          className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
        >
          <div className="flex size-11 items-center justify-center rounded-full bg-primary-50">
            <FileCheck2 className="size-5 text-primary-600" aria-hidden />
          </div>
          <h3 className="mt-3 text-h3 font-semibold text-slate-900">
            {doc.name[locale] ?? doc.name.en}
          </h3>
          <p className="mt-1.5 text-body text-slate-600">{doc.description[locale] ?? doc.description.en}</p>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-1 border-t border-slate-100 pt-2">
            <p className="text-body font-semibold text-primary-600">
              {t("fromPrice", { price: doc.basePrice })}
            </p>
            <span className="text-caption text-slate-500">
              ⚡ {t("expressTier")}: {t("aedPrice", { price: Math.round((doc.basePrice * 1.5) / 10) * 10 })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
