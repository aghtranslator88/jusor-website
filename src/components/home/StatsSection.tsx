"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";
import { useTranslations } from "next-intl";
import type { HomeContent } from "@/data/home-content";

function StatCounter({ value, suffix, label }: HomeContent["stats"][number]) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, motionValue]);

  return (
    <div className="text-center">
      <p ref={ref} className="text-display-lg font-extrabold text-white">
        {display.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-1 text-body text-primary-100">{label}</p>
    </div>
  );
}

export function StatsSection({ stats }: { stats: HomeContent["stats"] }) {
  const t = useTranslations("Home");

  return (
    <section className="bg-primary-600 px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-h2 font-bold text-white">{t("statsTitle")}</h2>
        <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
