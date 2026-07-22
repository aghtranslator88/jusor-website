import Image from "next/image";
import { Link } from "@/i18n/navigation";

const ASPECT_RATIO = 356 / 256; // width / height of the source mark

export function Logo({
  height = 40,
  className,
  href = "/",
  priority = false,
}: {
  height?: number;
  className?: string;
  href?: string | null;
  priority?: boolean;
}) {
  const width = Math.round(height * ASPECT_RATIO);

  const mark = (
    <Image
      src="/brand/logo-256.png"
      alt="JUSOR — جسور"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );

  if (!href) return mark;

  return (
    <Link href={href} aria-label="JUSOR home" className="inline-flex shrink-0">
      {mark}
    </Link>
  );
}
