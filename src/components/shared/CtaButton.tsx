"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
};

export const CtaButton = ({
  href,
  children,
  variant = "primary",
  className,
}: CtaButtonProps) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors";
  const variants = {
    primary:
      "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98]",
    outline:
      "border border-border bg-white/90 text-foreground shadow-sm hover:bg-muted active:scale-[0.98]",
    ghost: "text-foreground hover:bg-muted",
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link href={href} className={cn(base, variants[variant], className)}>
        {children}
        {variant === "primary" && (
          <span className="flex size-7 items-center justify-center rounded-full bg-white/20">
            <ArrowUpRight className="size-4" />
          </span>
        )}
      </Link>
    </motion.div>
  );
};
