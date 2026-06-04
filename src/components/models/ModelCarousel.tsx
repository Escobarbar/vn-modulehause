"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HouseModel } from "@/content/models/types";
import { ModelCard } from "@/components/models/ModelCard";
import { cn } from "@/lib/utils";

type ModelCarouselProps = {
  models: HouseModel[];
  ariaLabel: string;
};

export const ModelCarousel = ({ models, ariaLabel }: ModelCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(maxScroll > 4 && el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => ro.disconnect();
  }, [models.length, updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-carousel-card]");
    const gap = 24;
    const step = firstCard
      ? firstCard.offsetWidth + gap
      : Math.round(el.clientWidth * 0.9);
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  if (models.length === 0) return null;

  return (
    <div className="relative mt-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {models.length} Modelle — per Pfeil blättern
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label={`${ariaLabel}: vorherige Modelle`}
            className={cn(
              "flex size-10 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-all",
              "hover:border-primary/40 hover:bg-accent disabled:pointer-events-none disabled:opacity-40",
            )}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label={`${ariaLabel}: nächste Modelle`}
            className={cn(
              "flex size-10 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-all",
              "hover:border-primary/40 hover:bg-accent disabled:pointer-events-none disabled:opacity-40",
            )}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className={cn(
            "flex gap-6 overflow-x-auto scroll-smooth pb-2",
            "snap-x snap-mandatory",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          )}
          role="region"
          aria-label={ariaLabel}
          tabIndex={0}
        >
          {models.map((model) => (
            <div
              key={model.slug}
              data-carousel-card
              className="w-[min(85vw,300px)] shrink-0 snap-start sm:w-[min(42vw,340px)] lg:w-[min(30vw,360px)]"
            >
              <ModelCard model={model} animate={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
