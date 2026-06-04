"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { navItems } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { CtaButton } from "@/components/shared/CtaButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
    const hideOnScrollDown =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches;
    if (y < 80) {
      setVisible(true);
    } else if (y > lastY && hideOnScrollDown) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setLastY(y);
  });

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-transform duration-300",
        !visible && "-translate-y-24",
      )}
      initial={false}
    >
      <nav
        className={cn(
          "glass-nav flex w-full max-w-4xl items-center justify-between gap-2 rounded-full px-3 py-2 sm:px-4",
          scrolled && "shadow-md",
        )}
        aria-label="Hauptnavigation"
      >
        <Logo />

        <div className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => {
            const basePath = item.href.split("#")[0];
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : basePath.length > 1 && pathname.startsWith(basePath);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm font-medium transition-colors lg:px-4",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <CtaButton
            href="/kontakt"
            variant="outline"
            className="hidden px-4 py-2 text-xs sm:inline-flex lg:text-sm"
          >
            Beratung anfordern
          </CtaButton>
          <MobileNav />
        </div>
      </nav>
    </motion.header>
  );
};
