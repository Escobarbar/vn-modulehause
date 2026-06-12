"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { Search } from "lucide-react";
import { HeroBackground } from "@/components/home/HeroBackground";
import { WineggReveal } from "@/components/winegg/WineggReveal";
import { WineggButton } from "@/components/winegg/WineggButton";
import { wineggV2Hero } from "@/content/pages/winegg-v2";
import { heroContent } from "@/content/pages/home";
import { models, formatArea } from "@/content/models";

const featuredModels = models
  .filter((m) => m.category !== "sauna" && m.category !== "camping")
  .slice(0, 12);

export const WineggHero = () => {
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return featuredModels
      .filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.slug.includes(q) ||
          String(m.livingAreaM2).includes(q),
      )
      .slice(0, 6);
  }, [query]);

  return (
    <section className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 from-0% via-black/35 via-40% to-black/25" />
        <div className="absolute inset-0 max-w-4xl bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 pb-28 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-12 lg:pb-32">
        <WineggReveal className="max-w-4xl">
          <p className="winegg-hero-text-shadow mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--winegg-gold)]">
            VN Home · Deutschland
          </p>
          <h1 className="winegg-hero-text-shadow font-winegg-display text-[1.75rem] font-medium leading-[1.12] tracking-[0.02em] text-white min-[400px]:text-4xl sm:text-5xl sm:tracking-[0.03em] md:text-6xl lg:text-[4.25rem]">
            <span className="block uppercase">{wineggV2Hero.headline}</span>
            <span className="winegg-hero-accent mt-1 block text-[0.92em] uppercase sm:mt-2">
              {wineggV2Hero.headlineAccent}
            </span>
          </h1>
          <p className="winegg-hero-text-shadow mt-5 max-w-2xl text-lg font-normal leading-relaxed text-white/95 sm:text-xl">
            {heroContent.subline}
          </p>
        </WineggReveal>

        <WineggReveal delay={150} className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {heroContent.usps.map((usp) => (
              <li
                key={usp.label}
                className="rounded-[var(--winegg-radius-sm)] border border-[var(--winegg-gold)]/60 bg-black/40 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm sm:text-sm"
              >
                {usp.label}
              </li>
            ))}
          </ul>
        </WineggReveal>

        <WineggReveal delay={200} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <WineggButton href="/kontakt">Beratung anfordern</WineggButton>
          <WineggButton
            href="/v2#modelle"
            variant="outline"
            className="winegg-btn-outline border-white/40 text-white hover:border-[var(--winegg-gold)] hover:text-white"
          >
            Modelle entdecken
          </WineggButton>
        </WineggReveal>

        <WineggReveal delay={300} className="mt-10 max-w-xl">
          <label htmlFor="winegg-search" className="sr-only">
            Modellsuche
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/60"
              strokeWidth={1.5}
            />
            <input
              id="winegg-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={wineggV2Hero.searchPlaceholder}
              className="w-full rounded-[var(--winegg-radius-sm)] border border-white/20 bg-black/40 py-3.5 pl-12 pr-4 text-base text-white placeholder:text-white/50 backdrop-blur-md transition-colors focus:border-[var(--winegg-gold)] focus:bg-black/50 focus:outline-none"
              autoComplete="off"
            />
            {results.length > 0 && (
              <ul
                className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-[var(--winegg-radius-sm)] border border-white/10 bg-[var(--winegg-gray-darker)]/95 backdrop-blur-md"
                role="listbox"
              >
                {results.map((model) => (
                  <li key={model.slug}>
                    <Link
                      href={`/${model.slug}`}
                      className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-white transition-colors hover:bg-white/10"
                      role="option"
                    >
                      <span>{model.name}</span>
                      <span className="text-white/50">{formatArea(model.livingAreaM2)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </WineggReveal>
      </div>

      {!reduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          aria-hidden
        />
      )}
    </section>
  );
};
