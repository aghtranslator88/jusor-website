"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Search, FileCheck2, X, Zap } from "lucide-react";
import {
  documentTypes,
  authorities,
  embassyRequirements,
  documentCategoryLabels,
  type DocumentCategory,
} from "@/content/legal-translation";

type SortOption = "relevance" | "price_asc" | "price_desc" | "turnaround_asc";

const EXPRESS_THRESHOLD_HOURS = 24;
const CATEGORIES = Object.keys(documentCategoryLabels) as DocumentCategory[];
const PRESENT_CATEGORIES = CATEGORIES.filter((c) => documentTypes.some((d) => d.category === c));

export function DocumentCatalog() {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("Documents");
  const tl = useTranslations("LegalTranslation");

  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<Set<DocumentCategory>>(new Set());
  const [authoritySlug, setAuthoritySlug] = useState<string>("");
  const [expressOnly, setExpressOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("relevance");

  const authoritiesWithDocs = useMemo(
    () =>
      authorities.filter((a) => embassyRequirements.some((r) => r.authoritySlug === a.slug)),
    []
  );

  const filtered = useMemo(() => {
    let items = documentTypes.filter((doc) => {
      const name = (doc.name[locale] ?? doc.name.en ?? "").toLowerCase();
      const matchesQuery = query.trim() === "" || name.includes(query.trim().toLowerCase());
      const matchesCategory = categories.size === 0 || categories.has(doc.category);
      const matchesAuthority =
        !authoritySlug ||
        embassyRequirements.some((r) => r.documentSlug === doc.slug && r.authoritySlug === authoritySlug);
      const matchesExpress = !expressOnly || doc.avgTurnaroundHours <= EXPRESS_THRESHOLD_HOURS;
      return matchesQuery && matchesCategory && matchesAuthority && matchesExpress;
    });

    switch (sort) {
      case "price_asc":
        items = [...items].sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price_desc":
        items = [...items].sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "turnaround_asc":
        items = [...items].sort((a, b) => a.avgTurnaroundHours - b.avgTurnaroundHours);
        break;
      default:
        break;
    }

    return items;
  }, [query, categories, authoritySlug, expressOnly, sort, locale]);

  function toggleCategory(cat: DocumentCategory) {
    setCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  function clearFilters() {
    setQuery("");
    setCategories(new Set());
    setAuthoritySlug("");
    setExpressOnly(false);
    setSort("relevance");
  }

  const hasActiveFilters =
    query !== "" || categories.size > 0 || authoritySlug !== "" || expressOnly || sort !== "relevance";

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
      {/* Facet sidebar */}
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <div className="relative">
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-lg border border-slate-300 py-2.5 ps-9 pe-3 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div className="mt-6">
          <p className="text-caption font-semibold uppercase tracking-wide text-slate-500">
            {t("categoryFacet")}
          </p>
          <div className="mt-3 space-y-2">
            {PRESENT_CATEGORIES.map((cat) => (
              <label key={cat} className="flex cursor-pointer items-center gap-2.5 text-body text-slate-700">
                <input
                  type="checkbox"
                  checked={categories.has(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="size-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                {documentCategoryLabels[cat][locale] ?? documentCategoryLabels[cat].en}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-caption font-semibold uppercase tracking-wide text-slate-500">
            {t("authorityFacet")}
          </p>
          <select
            value={authoritySlug}
            onChange={(e) => setAuthoritySlug(e.target.value)}
            className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">—</option>
            {authoritiesWithDocs.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name[locale] ?? a.name.en}
              </option>
            ))}
          </select>
        </div>

        <label className="mt-6 flex cursor-pointer items-center gap-2.5 text-body text-slate-700">
          <input
            type="checkbox"
            checked={expressOnly}
            onChange={(e) => setExpressOnly(e.target.checked)}
            className="size-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
          />
          {t("expressFacet")}
        </label>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 inline-flex items-center gap-1.5 text-body font-semibold text-primary-600 hover:underline"
          >
            <X className="size-3.5" aria-hidden />
            {t("clearFilters")}
          </button>
        )}
      </aside>

      {/* Results */}
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body text-slate-600">{t("resultsCount", { count: filtered.length })}</p>
          <label className="flex items-center gap-2 text-body text-slate-600">
            {t("sortLabel")}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-body focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="relevance">{t("sortRelevance")}</option>
              <option value="price_asc">{t("sortPriceAsc")}</option>
              <option value="price_desc">{t("sortPriceDesc")}</option>
              <option value="turnaround_asc">{t("sortTurnaround")}</option>
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-body text-slate-500">{t("emptyState")}</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((doc) => (
              <div
                key={doc.slug}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary-50">
                    <FileCheck2 className="size-5 text-primary-600" aria-hidden />
                  </div>
                  {doc.avgTurnaroundHours <= EXPRESS_THRESHOLD_HOURS && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-2.5 py-1 text-caption font-semibold text-accent-600">
                      <Zap className="size-3" aria-hidden />
                      {tl("turnaround", { hours: doc.avgTurnaroundHours })}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-h3 font-semibold text-slate-900">
                  {doc.name[locale] ?? doc.name.en}
                </h3>
                <span className="mt-1 w-fit rounded-full bg-slate-100 px-2.5 py-0.5 text-caption text-slate-600">
                  {documentCategoryLabels[doc.category][locale] ?? documentCategoryLabels[doc.category].en}
                </span>
                <p className="mt-2 flex-1 text-body text-slate-600">
                  {doc.description[locale] ?? doc.description.en}
                </p>
                <p className="mt-3 text-h3 font-bold text-primary-600">
                  {tl("fromPrice", { price: doc.basePrice })}
                </p>
                <Link
                  href={`/legal-translation/documents/${doc.slug}`}
                  className="mt-4 inline-flex items-center justify-center rounded-full border border-primary-600 px-4 py-2 text-body font-semibold text-primary-600 transition-colors hover:bg-primary-50"
                >
                  {t("viewDetails")}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
