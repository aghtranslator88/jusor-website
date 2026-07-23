"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { List, ChevronDown } from "lucide-react";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ headings }: { headings: HeadingItem[] }) {
  const t = useTranslations("TOC");
  const [activeId, setActiveId] = useState<string>("");
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -40% 0px", threshold: 0.1 }
    );

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [headings]);

  if (!headings.length) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      setIsOpenMobile(false);
    }
  };

  return (
    <nav
      aria-label={t("title")}
      className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 shadow-sm lg:sticky lg:top-24"
    >
      {/* Mobile Collapsible Header */}
      <button
        onClick={() => setIsOpenMobile((prev) => !prev)}
        className="flex w-full items-center justify-between font-bold text-slate-900 lg:cursor-default lg:pointer-events-none"
        aria-expanded={isOpenMobile}
      >
        <div className="flex items-center gap-2 text-body font-bold text-slate-900">
          <List className="size-4 text-primary-600" aria-hidden />
          <span>{t("title")}</span>
        </div>
        <ChevronDown
          className={`size-4 text-slate-500 transition-transform lg:hidden ${
            isOpenMobile ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {/* Headings List */}
      <ul
        className={`mt-4 space-y-2 border-s-2 border-slate-200 ps-3 text-caption transition-all lg:block ${
          isOpenMobile ? "block" : "hidden"
        }`}
      >
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li
              key={h.id}
              className={`${
                h.level === 3 ? "ms-3 text-slate-600" : "font-medium text-slate-800"
              }`}
            >
              <button
                onClick={() => scrollToHeading(h.id)}
                className={`block w-full text-start py-1 transition-colors hover:text-primary-600 ${
                  isActive
                    ? "font-bold text-primary-600 border-s-2 border-primary-600 -ms-[14px] ps-2.5"
                    : ""
                }`}
              >
                {h.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
