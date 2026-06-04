"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  BadgeCheck,
  Key,
  Leaf,
  Timer,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { heroContent } from "@/content/pages/home";
import { getModelsByCategory, formatPrice, formatArea } from "@/content/models";
import { CtaButton } from "@/components/shared/CtaButton";
import { HeroVideoCutout } from "@/components/home/HeroVideoCutout";
import { HeroBackground } from "@/components/home/HeroBackground";
import { cn } from "@/lib/utils";

const iconMap = {
  key: Key,
  leaf: Leaf,
  "badge-check": BadgeCheck,
  timer: Timer,
};

const heroModels = [
  ...getModelsByCategory("klein").slice(0, 1),
  ...getModelsByCategory("mittel").slice(0, 1),
  ...getModelsByCategory("gross").slice(0, 1),
];

export const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const featured = heroModels[index] ?? heroModels[0];
  const showVideo = !reduceMotion;

  return (
    <section className="relative isolate min-h-[90vh] overflow-hidden pt-28">
      <div className="absolute inset-0">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 from-0% via-background/25 via-32% to-transparent" />
        <div className="absolute inset-0 max-w-3xl bg-gradient-to-r from-background/50 via-background/15 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(90vh-7rem)] max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl overflow-hidden rounded-3xl"
        >
          <div
            aria-hidden
            className="absolute inset-0 z-0 bg-background/35 backdrop-blur-md"
          />
          <div className="relative z-10 p-4 sm:p-5">
            <p className="hero-text-shadow mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              VN Modulhaus · Deutschland
            </p>
            <h1 className="font-display font-bold leading-[1.05] tracking-tight">
              <span className="hero-text-shadow block text-4xl text-foreground sm:text-5xl lg:text-6xl">
                {heroContent.headline}
              </span>
              <HeroVideoCutout hasVideo={showVideo}>
                {heroContent.headlineAccent}
              </HeroVideoCutout>
            </h1>
            <p className="hero-text-shadow mt-4 max-w-xl text-lg font-medium text-foreground/90">
              {heroContent.subline}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {heroContent.usps.map((usp) => {
                const Icon = iconMap[usp.icon];
                return (
                  <li
                    key={usp.label}
                    className="flex items-center gap-2 rounded-full border border-border bg-white/80 px-3 py-1.5 text-sm text-foreground shadow-sm backdrop-blur-sm"
                  >
                    <Icon className="size-4 text-primary" />
                    {usp.label}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <CtaButton href="/kontakt">Beratung anfordern</CtaButton>
              <CtaButton href="/#modelle" variant="outline">
                Modelle entdecken
              </CtaButton>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <AnimatePresence mode="wait">
            {featured && (
              <motion.div
                key={featured.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="glass-card max-w-sm rounded-2xl p-4 shadow-lg"
              >
                <div className="flex items-start gap-3">
                  {featured.images[0] && (
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={featured.images[0].src}
                        alt={featured.images[0].alt}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                      Empfehlung
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                      {featured.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formatArea(featured.livingAreaM2)} · ab{" "}
                      {formatPrice(featured.priceFromEur)}
                    </p>
                  </div>
                  <Link
                    href={`/${featured.slug}`}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                    aria-label={`${featured.name} ansehen`}
                  >
                    <ArrowRight className="size-5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="flex items-center gap-4"
            role="tablist"
            aria-label="Empfohlene Modellhäuser"
          >
            <span className="font-mono text-xs text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex h-1 w-24 overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full bg-primary"
                animate={{
                  width: `${((index + 1) / heroModels.length) * 100}%`,
                }}
                transition={{ duration: reduceMotion ? 0 : 0.35 }}
              />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {String(heroModels.length).padStart(2, "0")}
            </span>
            <div className="flex flex-wrap gap-2">
              {heroModels.map((m, i) => (
                <button
                  key={m.slug}
                  type="button"
                  role="tab"
                  id={`hero-tab-${m.slug}`}
                  aria-selected={i === index}
                  aria-controls={`hero-panel-${m.slug}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-left text-xs transition-colors",
                    i === index
                      ? "border-primary/40 bg-accent text-foreground"
                      : "border-border bg-white/80 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
