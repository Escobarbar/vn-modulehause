"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WineggReveal } from "@/components/winegg/WineggReveal";
import { models, formatArea, formatPrice, getModelsByCategory } from "@/content/models";
import { cn } from "@/lib/utils";

const gridModels = models.filter((m) => m.category !== "sauna");
const saunaModels = getModelsByCategory("sauna");

export const WineggModelGrid = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scrollBy = useCallback((dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-model-slide]");
    const amount = slide ? slide.offsetWidth + 24 : 300;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  return (
    <section
      id="modelle"
      className="winegg-section winegg-energy-divider scroll-mt-28 border-t border-[var(--winegg-gray-light)]/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1920px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <WineggReveal>
            <h2 className="winegg-heading text-2xl text-[var(--winegg-gray-dark)] sm:text-3xl">
              Alle Modellhäuser
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--winegg-gray)]">
              Jedes Projekt entsteht individuell – auf Basis eines Modells oder ganz nach Ihren Wünschen.
            </p>
          </WineggReveal>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              className={cn(
                "winegg-energy-nav-btn flex size-10 items-center justify-center rounded-full border border-[var(--winegg-gray-light)] text-[var(--winegg-gray-dark)] transition-colors hover:border-[var(--winegg-gold)] hover:text-[var(--winegg-gold)] disabled:opacity-30",
              )}
              aria-label="Vorherige Modelle"
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
              aria-label="Nächste Modelle"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 scrollbar-none"
          role="region"
          aria-roledescription="carousel"
          aria-label="Alle Modellhäuser"
        >
          {gridModels.map((model) => (
            <Link
              key={model.slug}
              href={`/${model.slug}`}
              data-model-slide
              className="group w-[min(260px,calc(100vw-2.5rem))] shrink-0 snap-start sm:w-[300px] md:w-[320px]"
            >
              <article className="winegg-energy-card overflow-hidden rounded-[var(--winegg-radius-md)] border border-[var(--winegg-gray-light)]/40 bg-[var(--winegg-surface)] transition-all hover:border-[var(--winegg-gold)]/50 hover:shadow-lg">
                <div className="winegg-energy-image-placeholder relative aspect-[4/3] overflow-hidden bg-[var(--winegg-gray-light)]">
                  {model.images[0] && (
                    <Image
                      src={model.images[0].src}
                      alt={model.images[0].alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="320px"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-winegg-display text-lg text-[var(--winegg-gray-dark)]">
                    {model.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--winegg-gray)]">
                    {formatArea(model.livingAreaM2)} · KfW {model.kfw}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[var(--winegg-gold)]">
                    ab {formatPrice(model.priceFromEur)}
                  </p>
                </div>
              </article>
            </Link>
          ))}

          {saunaModels[0] && (
            <Link
              href="/sauna"
              data-model-slide
              className="group w-[min(260px,calc(100vw-2.5rem))] shrink-0 snap-start sm:w-[300px] md:w-[320px]"
            >
              <article className="flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-[var(--winegg-radius-md)] border border-[var(--winegg-gold)]/40 bg-[var(--winegg-gray-darker)] p-6 text-white transition-all hover:border-[var(--winegg-gold)]">
                <p className="text-xs font-medium uppercase tracking-widest text-[var(--winegg-gold)]">
                  Sauna-Projekte
                </p>
                <h3 className="mt-2 font-winegg-display text-xl">
                  Modular. Privat oder gewerblich.
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  {saunaModels.length} Modelle – ab{" "}
                  {formatPrice(saunaModels[0].priceFromEur)}
                </p>
              </article>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
