"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { WineggLogo } from "@/components/winegg/WineggLogo";
import { WineggButton } from "@/components/winegg/WineggButton";
import { focusWineggSearch } from "@/lib/winegg-utils";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Modelle", href: "/v2#modelle" },
  { label: "Preise", href: "/v2#preise" },
  { label: "Kollektion", href: "/kollektion" },
  { label: "Sauna", href: "/sauna" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "FAQ", href: "/v2#faq" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const WineggHeader = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
  });

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "bg-[var(--winegg-gray-darkest)]/90 backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={focusWineggSearch}
            className="flex size-10 shrink-0 items-center justify-center text-white/80 transition-colors hover:text-white md:hidden"
            aria-label="Suche öffnen"
          >
            <Search className="size-5" strokeWidth={1.5} />
          </button>

          <nav
            className="hidden flex-1 items-center gap-6 md:flex"
            aria-label="Hauptnavigation"
          >
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium uppercase tracking-widest text-white/70 transition-colors hover:text-[var(--winegg-gold)] lg:text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="absolute left-1/2 -translate-x-1/2">
            <WineggLogo className="md:hidden" size={48} />
            <WineggLogo className="hidden md:inline-flex" size={64} />
          </div>

          <div className="flex flex-1 items-center justify-end gap-3">
            <nav className="hidden items-center gap-6 lg:flex" aria-label="Sekundärnavigation">
              {navLinks.slice(4).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium uppercase tracking-widest text-white/70 transition-colors hover:text-[var(--winegg-gold)] lg:text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <WineggButton
              href="/kontakt"
              className="!hidden !px-4 !py-2 text-xs md:!inline-flex"
            >
              Beratung
            </WineggButton>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex size-10 items-center justify-center text-white/80 transition-colors hover:text-white md:hidden"
              aria-label="Menü öffnen"
            >
              <Menu className="size-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <motion.div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-[var(--winegg-gray-darkest)] transition-opacity",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between px-4 py-4 sm:px-8">
          <WineggLogo size={48} />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex size-10 items-center justify-center text-white/80 hover:text-white"
            aria-label="Menü schließen"
          >
            <X className="size-6" strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-6 px-8" aria-label="Mobile Navigation">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -40 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ delay: menuOpen ? i * 0.06 : 0, duration: 0.4 }}
            >
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-winegg-display text-3xl uppercase tracking-widest text-white hover:text-[var(--winegg-gold)]"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="border-t border-white/10 px-8 py-6">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-white/50 hover:text-white"
          >
            Zur klassischen Website
          </Link>
        </div>
      </motion.div>
    </>
  );
};
