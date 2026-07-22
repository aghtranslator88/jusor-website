"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "/services", key: "services" },
  { href: "/legal-translation", key: "legalTranslation" },
  { href: "/interpretation", key: "interpretation" },
  { href: "/equipment", key: "equipment" },
  { href: "/documents", key: "documents" },
  { href: "/knowledge", key: "knowledge" },
] as const;

export function SiteHeader() {
  const t = useTranslations("Nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Logo height={36} priority />

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-body text-slate-600 transition-colors hover:text-primary-600"
            >
              {t(item.key)}
            </Link>
          ))}
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
          className="inline-flex items-center justify-center rounded-full p-2 text-slate-700 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-body text-slate-700 hover:bg-slate-50"
              >
                {t(item.key)}
              </Link>
            ))}
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
