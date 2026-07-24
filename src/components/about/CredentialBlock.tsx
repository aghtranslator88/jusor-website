import { BadgeCheck } from "lucide-react";

export function CredentialBlock({
  line,
  className = "",
}: {
  line: string;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center justify-center gap-2 text-center text-body font-semibold ${className}`}
    >
      <BadgeCheck className="size-5 shrink-0 text-accent-400" aria-hidden />
      <span>{line}</span>
    </p>
  );
}
