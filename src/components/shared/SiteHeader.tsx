"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Menu, X, ChevronDown, Mic, Speaker } from "lucide-react";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [interpretationDropdownOpen, setInterpretationDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Logo height={36} priority />

        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            href="/"
            className="text-body text-slate-600 transition-colors hover:text-primary-600"
          >
            {t("home")}
          </Link>

          <Link
            href="/about"
            className="text-body text-slate-600 transition-colors hover:text-primary-600"
          >
            {t("about")}
          </Link>

          <Link
            href="/services"
            className="text-body text-slate-600 transition-colors hover:text-primary-600"
          >
            {t("services")}
          </Link>

          <Link
            href="/legal-translation"
            className="text-body text-slate-600 transition-colors hover:text-primary-600"
          >
            {t("legalTranslation")}
          </Link>

          {/* Interpretation with Sub-menu */}
          <div
            className="relative"
            onMouseEnter={() => setInterpretationDropdownOpen(true)}
            onMouseLeave={() => setInterpretationDropdownOpen(false)}
          >
            <Link
              href="/interpretation"
              className="inline-flex items-center gap-1 text-body text-slate-600 transition-colors hover:text-primary-600 py-1"
            >
              <span>{t("interpretation")}</span>
              <ChevronDown
                className={`size-4 text-slate-400 transition-transform ${
                  interpretationDropdownOpen ? "rotate-180 text-primary-600" : ""
                }`}
              />
            </Link>

            {interpretationDropdownOpen && (
              <div className="absolute start-0 top-full pt-2 w-72">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-xl ring-1 ring-black/5 space-y-1">
                  <Link
                    href="/interpretation"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                      <Mic className="size-5" />
                    </div>
                    <div>
                      <div className="text-body font-semibold text-slate-900">
                        {t("interpretationModes")}
                      </div>
                      <div className="text-caption text-slate-500">
                        {t("interpretation")}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/equipment"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-emerald-50/60"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <Speaker className="size-5" />
                    </div>
                    <div>
                      <div className="text-body font-semibold text-slate-900">
                        {t("equipment")}
                      </div>
                      <div className="text-caption text-slate-500">
                        {t("equipmentSubtitle")}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/documents"
            className="text-body text-slate-600 transition-colors hover:text-primary-600"
          >
            {t("documents")}
          </Link>

          <Link
            href="/knowledge"
            className="text-body text-slate-600 transition-colors hover:text-primary-600"
          >
            {t("knowledge")}
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <Link
            href="/quotes/submit"
            className="rounded-full bg-accent-500 px-5 py-2.5 text-body font-semibold text-white shadow-cta-glow transition-colors hover:bg-accent-600"
          >
            {t("getQuote")}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50/80 p-2 text-slate-800 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-slate-800" strokeWidth={2.5} />
          ) : (
            <Menu className="h-6 w-6 text-slate-800" strokeWidth={2.5} />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-body text-slate-700 hover:bg-slate-50"
            >
              {t("home")}
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-body text-slate-700 hover:bg-slate-50"
            >
              {t("about")}
            </Link>

            <Link
              href="/services"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-body text-slate-700 hover:bg-slate-50"
            >
              {t("services")}
            </Link>

            <Link
              href="/legal-translation"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-body text-slate-700 hover:bg-slate-50"
            >
              {t("legalTranslation")}
            </Link>

            {/* Mobile Interpretation & Equipment Subsection */}
            <div className="rounded-lg bg-slate-50/80 p-2 my-1 space-y-1">
              <div className="px-3 py-1 text-caption font-bold text-slate-500 uppercase tracking-wider">
                {t("interpretation")}
              </div>
              <Link
                href="/interpretation"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-body font-medium text-slate-800 hover:bg-white"
              >
                <Mic className="size-4 text-primary-600" />
                <span>{t("interpretationModes")}</span>
              </Link>
              <Link
                href="/equipment"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-body font-medium text-slate-800 hover:bg-white"
              >
                <Speaker className="size-4 text-emerald-600" />
                <span>{t("equipment")}</span>
              </Link>
            </div>

            <Link
              href="/documents"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-body text-slate-700 hover:bg-slate-50"
            >
              {t("documents")}
            </Link>

            <Link
              href="/knowledge"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-body text-slate-700 hover:bg-slate-50"
            >
              {t("knowledge")}
            </Link>
          </nav>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <LocaleSwitcher />
            <Link
              href="/quotes/submit"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-accent-500 px-5 py-2.5 text-body font-semibold text-white shadow-cta-glow"
            >
              {t("getQuote")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
