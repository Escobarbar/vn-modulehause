"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WineggReveal } from "@/components/winegg/WineggReveal";
import { WineggButton } from "@/components/winegg/WineggButton";
import { wineggV2Projects } from "@/content/pages/winegg-v2";
import { models, formatArea, formatPrice } from "@/content/models";
import type { ModelCategory } from "@/content/models/types";
import { cn } from "@/lib/utils";

type FilterKey = ModelCategory | "alle";

const filters: { key: FilterKey; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "klein", label: "Klein" },
  { key: "mittel", label: "Mittel" },
  { key: "gross", label: "Groß" },
  { key: "camping", label: "Camping" },
];

const baseModels = models.filter((m) => m.category !== "sauna");

export const WineggProjectSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<FilterKey>("alle");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const pauseRef = useRef(false);

  const sliderModels = useMemo(
    () =>
      filter === "alle"
        ? baseModels.slice(0, 12)
        : baseModels.filter((m) => m.category === filter),
    [filter],
  );

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scrollBy = useCallback((dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-slide]");
    const amount = slide ? slide.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [filter, updateScrollState]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pauseRef.current || sliderModels.length <= 1) return;
      const el = scrollRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 10;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollBy(1);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [scrollBy, sliderModels.length]);

  return (
    <section className="winegg-section-alt py-16 sm:py-24">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-8 lg:px-12">
        <WineggReveal>
          <h2 className="winegg-heading text-2xl text-[var(--winegg-gray-dark)] sm:text-3xl md:text-4xl">
            {wineggV2Projects.title}
          </h2>
        </WineggReveal>

        <WineggReveal delay={100} className="mt-8 flex flex-wrap gap-2">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                "min-h-11 rounded-[var(--winegg-radius-sm)] px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors touch-manipulation sm:text-sm",
                filter === key
                  ? "bg-[var(--winegg-gold)] text-white"
                  : "winegg-energy-tab-inactive border border-[var(--winegg-gray-light)] text-[var(--winegg-gray)] hover:border-[var(--winegg-gold)] hover:text-[var(--winegg-gold)]",
              )}
            >
              {label}
            </button>
          ))}
        </WineggReveal>

        <div
          className="relative mt-10"
          onMouseEnter={() => { pauseRef.current = true; }}
          onMouseLeave={() => { pauseRef.current = false; }}
        >
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-none"
            role="region"
            aria-roledescription="carousel"
            aria-label="Modellhäuser Highlights"
          >
            {sliderModels.map((model, i) => (
              <WineggReveal key={model.slug} delay={200 + i * 80} className="shrink-0 snap-center">
                <Link
                  href={`/${model.slug}`}
                  data-slide
                  className="group block w-[min(280px,calc(100vw-2.5rem))] sm:w-[340px] md:w-[400px]"
                >
                  <div className="winegg-energy-image-placeholder relative aspect-[4/5] overflow-hidden rounded-[var(--winegg-radius-md)] bg-[var(--winegg-gray-light)]">
                    {model.images[0] && (
                      <Image
                        src={model.images[0].src}
                        alt={model.images[0].alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 280px, 400px"
                      />
                    )}
                    <span className="absolute left-4 top-4 rounded-[var(--winegg-radius-sm)] bg-[var(--winegg-gold)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
                      Schlüsselfertig
                    </span>
                    {model.kfw && (
                      <span className="absolute right-4 top-4 rounded-[var(--winegg-radius-sm)] bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        KfW {model.kfw}
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="font-winegg-display text-xl text-[var(--winegg-gray-dark)] sm:text-2xl">
                      {model.name}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--winegg-gray)]">
                      {formatArea(model.livingAreaM2)}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[var(--winegg-gold)]">
                      ab {formatPrice(model.priceFromEur)}
                    </p>
                  </div>
                </Link>
              </WineggReveal>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <WineggButton href={wineggV2Projects.ctaHref}>{wineggV2Projects.cta}</WineggButton>
            <div className="flex shrink-0 gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={!canScrollLeft}
                className={cn(
                  "winegg-energy-nav-btn flex size-10 items-center justify-center rounded-full border border-[var(--winegg-gray-light)] text-[var(--winegg-gray-dark)] transition-colors hover:border-[var(--winegg-gold)] hover:text-[var(--winegg-gold)] disabled:opacity-30",
                )}
                aria-label="Vorherige"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={!canScrollRight}
                className={cn(
                  "winegg-energy-nav-btn flex size-10 items-center justify-center rounded-full border border-[var(--winegg-gray-light)] text-[var(--winegg-gray-dark)] transition-colors hover:border-[var(--winegg-gold)] hover:text-[var(--winegg-gold)] disabled:opacity-30",
                )}
                aria-label="Nächste"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
