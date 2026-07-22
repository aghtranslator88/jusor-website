import {
  ShieldCheck,
  Globe,
  Smartphone,
  Gamepad2,
  Stethoscope,
  Landmark,
  Mic,
  Speaker,
  BadgeCheck,
  Users,
  Clock,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Globe,
  Smartphone,
  Gamepad2,
  Stethoscope,
  Landmark,
  Mic,
  Speaker,
  BadgeCheck,
  Users,
  Clock,
};

export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? ShieldCheck;
  return <Icon className={className} aria-hidden />;
}
