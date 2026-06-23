"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeInView } from "@/components/motion/FadeInView";
import { models, formatArea, formatPrice } from "@/content/models";
import { sonderModels } from "@/content/pages/sonder-v3";
import { cn } from "@/lib/utils";

const gridModels = models.filter((m) => m.category !== "sauna");

export const SonderModelGrid = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const displayModels = gridModels.slice(0, sonderModels.limit);

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
      className="sonder-section scroll-mt-24 py-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <FadeInView>
            <h2 className="font-sonder-display text-4xl leading-tight tracking-tight text-[var(--sonder-navy)] sm:text-5xl">
              {sonderModels.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--sonder-blue-muted)]">
              {sonderModels.subtitle}
            </p>
          </FadeInView>

          <FadeInView delay={0.1} className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              className={cn(
                "flex size-10 items-center justify-center rounded-full border border-[var(--sonder-border)] text-[var(--sonder-navy)] transition-colors hover:border-[var(--sonder-navy)] disabled:opacity-30",
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
                "flex size-10 items-center justify-center rounded-full border border-[var(--sonder-border)] text-[var(--sonder-navy)] transition-colors hover:border-[var(--sonder-navy)] disabled:opacity-30",
              )}
              aria-label="Nächste Modelle"
            >
              <ChevronRight className="size-5" />
            </button>
          </FadeInView>
        </div>

        <div
          ref={scrollRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 scrollbar-none"
          role="region"
          aria-roledescription="carousel"
          aria-label="Modellhäuser"
        >
          {displayModels.map((model) => (
            <Link
              key={model.slug}
              href={`/${model.slug}`}
              data-model-slide
              className="group w-[min(280px,calc(100vw-3rem))] shrink-0 snap-start sm:w-[300px]"
            >
              <article>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  {model.images[0] && (
                    <Image
                      src={model.images[0].src}
                      alt={model.images[0].alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="300px"
                    />
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-sonder-display text-xl text-[var(--sonder-navy)]">
                    {model.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[var(--sonder-blue-muted)]">
                    {formatArea(model.livingAreaM2)} · KfW {model.kfw}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[var(--sonder-accent)]">
                    ab {formatPrice(model.priceFromEur)}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
