"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { contact } from "@/content/site";
import { sonderNav } from "@/content/pages/sonder-v3";

export const SonderHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10 lg:py-5">
          <Link href="/v3" className="relative z-10 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--sonder-navy)] text-[var(--sonder-navy)]">
              <span className="font-sonder-display text-sm font-medium tracking-tight">
                VN
              </span>
            </div>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 lg:flex lg:gap-8">
            {sonderNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="sonder-label transition-colors hover:text-[var(--sonder-navy)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 hidden items-center md:flex">
            <a href={contact.phoneHref} className="sonder-phone-pill">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">{contact.phone}</span>
              <span className="lg:hidden">Anrufen</span>
            </a>
          </div>

          <button
            className="relative z-10 flex h-9 w-9 items-center justify-center lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </motion.header>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 flex flex-col bg-white pt-20 lg:hidden"
        >
          <nav className="flex flex-col gap-1 px-6">
            {sonderNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-[var(--sonder-border)] py-5 text-lg font-medium tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 px-6 pb-8">
            <a
              href={contact.phoneHref}
              onClick={() => setMobileOpen(false)}
              className="sonder-phone-pill w-full justify-center"
            >
              <Phone className="h-4 w-4" />
              {contact.phone}
            </a>
            <Link
              href="/kontakt"
              onClick={() => setMobileOpen(false)}
              className="sonder-btn w-full justify-center"
            >
              Beratung anfordern
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
};
