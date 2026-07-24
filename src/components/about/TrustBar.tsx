import { BadgeCheck, Users, FileCheck2, Gavel } from "lucide-react";
import type { TrustBarIconKey } from "@/content/about";

const ICONS: Record<TrustBarIconKey, typeof BadgeCheck> = {
  BadgeCheck,
  Users,
  FileCheck2,
  Gavel,
};

export function TrustBar({
  items,
}: {
  items: { icon: TrustBarIconKey; label: string }[];
}) {
  return (
    <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
      {items.map((item) => {
        const Icon = ICONS[item.icon];
        return (
          <li
            key={item.label}
            className="flex items-center gap-2 text-body font-medium text-primary-50"
          >
            <Icon className="size-5 shrink-0 text-accent-300" aria-hidden />
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
