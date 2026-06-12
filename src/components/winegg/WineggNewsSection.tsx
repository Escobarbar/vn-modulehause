import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WineggReveal } from "@/components/winegg/WineggReveal";
import { WineggButton } from "@/components/winegg/WineggButton";
import { wineggV2News } from "@/content/pages/winegg-v2";

export const WineggNewsSection = () => (
  <section className="winegg-section-alt winegg-energy-divider border-t border-[var(--winegg-gray-light)]/40 py-16 sm:py-24">
    <div className="mx-auto max-w-[1920px] px-4 sm:px-8 lg:px-12">
      <WineggReveal>
        <h2 className="winegg-heading text-2xl text-[var(--winegg-gray-dark)] sm:text-3xl">
          {wineggV2News.title}
        </h2>
      </WineggReveal>
      <ul className="mt-10 divide-y divide-[var(--winegg-gray-light)]/50">
        {wineggV2News.items.map((item, i) => (
          <WineggReveal key={item.href} delay={200 + i * 100}>
            <li>
              <Link
                href={item.href}
                className="group flex flex-col gap-2 py-6 transition-colors sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <time className="text-sm text-[var(--winegg-gray)]">{item.date}</time>
                  <h3 className="mt-1 font-winegg-display text-lg text-[var(--winegg-gray-dark)] group-hover:text-[var(--winegg-gold)] sm:text-xl">
                    {item.title}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-[var(--winegg-gold)] sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                  Artikel lesen
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </li>
          </WineggReveal>
        ))}
      </ul>
      <WineggReveal delay={500} className="mt-8">
        <WineggButton href={wineggV2News.ctaHref}>{wineggV2News.cta}</WineggButton>
      </WineggReveal>
    </div>
  </section>
);
