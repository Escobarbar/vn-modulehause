import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type WineggButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "fill" | "outline";
};

export const WineggButton = ({
  href,
  children,
  className,
  variant = "fill",
}: WineggButtonProps) => (
  <Link
    href={href}
    className={cn(
      variant === "fill" && "winegg-btn",
      variant === "outline" &&
        "winegg-btn-outline inline-flex items-center justify-center gap-2 rounded-[var(--winegg-radius-sm)] border border-[var(--winegg-gold)] px-7 py-3.5 text-sm font-medium uppercase tracking-wider text-[var(--winegg-gold)] transition-colors hover:bg-[var(--winegg-gold)] hover:text-white",
      className,
    )}
  >
    {children}
  </Link>
);
