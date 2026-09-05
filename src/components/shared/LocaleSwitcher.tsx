"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localeMeta } from "@/i18n/locale-meta";
import { ChevronDown } from "lucide-react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const current = localeMeta[locale as keyof typeof localeMeta];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-caption font-medium text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
      >
        <span aria-hidden>{current?.flag}</span>
        <span>{current?.nativeLabel}</span>
        <ChevronDown className="size-3.5" aria-hidden />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-card-hover"
        >
          {routing.locales.map((l) => {
            const meta = localeMeta[l];
            return (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l === locale}
                  onClick={() => {
                    setOpen(false);
                    router.replace(pathname, { locale: l });
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-start text-body ${
                    l === locale
                      ? "bg-primary-50 text-primary-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span aria-hidden>{meta.flag}</span>
                  <span>{meta.nativeLabel}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
