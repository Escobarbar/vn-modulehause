import { WineggReveal } from "@/components/winegg/WineggReveal";
import { WineggButton } from "@/components/winegg/WineggButton";
import { wineggV2Purchase } from "@/content/pages/winegg-v2";

export const WineggTextSection = () => (
  <section className="winegg-section py-16 sm:py-24">
    <div className="mx-auto max-w-3xl px-4 sm:px-8 lg:px-12">
      <WineggReveal>
        <h2 className="winegg-heading text-2xl text-[var(--winegg-gray-dark)] sm:text-3xl md:text-4xl">
          {wineggV2Purchase.title}
        </h2>
      </WineggReveal>
      <WineggReveal delay={200} className="mt-8 space-y-4">
        {wineggV2Purchase.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="text-base leading-relaxed text-[var(--winegg-gray)] sm:text-lg">
            {p}
          </p>
        ))}
      </WineggReveal>
      <WineggReveal delay={400} className="mt-10">
        <WineggButton href={wineggV2Purchase.ctaHref}>
          {wineggV2Purchase.cta}
        </WineggButton>
      </WineggReveal>
    </div>
  </section>
);
