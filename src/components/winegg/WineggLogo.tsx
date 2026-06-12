import Link from "next/link";
import { cn } from "@/lib/utils";

type WineggLogoProps = {
  className?: string;
  size?: number;
};

/** Native img preserves PNG alpha; Next/Image can flatten transparency on some assets. */
export const WineggLogo = ({ className, size = 56 }: WineggLogoProps) => (
  <Link
    href="/v2"
    className={cn(
      "inline-flex shrink-0 bg-transparent transition-opacity hover:opacity-90",
      className,
    )}
    aria-label="VN Home – Startseite"
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/logo-v2.png"
      alt="VN Home"
      width={size}
      height={size}
      className="block object-contain mix-blend-screen"
      style={{ width: size, height: size }}
      decoding="async"
    />
  </Link>
);
