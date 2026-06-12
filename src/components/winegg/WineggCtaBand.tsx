import { WineggReveal } from "@/components/winegg/WineggReveal";
import { WineggButton } from "@/components/winegg/WineggButton";
import { wineggV2Purchase } from "@/content/pages/winegg-v2";

export const WineggCtaBand = () => (
  <section className="bg-[var(--winegg-gray-darker)] py-20 sm:py-28">
    <div className="mx-auto max-w-3xl px-4 text-center sm:px-8">
      <WineggReveal>
        <h2 className="winegg-heading winegg-heading-on-dark text-3xl sm:text-4xl">
          {wineggV2Purchase.title}
        </h2>
      </WineggReveal>
      <WineggReveal delay={150} className="mt-6">
        <p className="text-lg text-white/80">{wineggV2Purchase.paragraphs[0]}</p>
      </WineggReveal>
      <WineggReveal delay={250} className="mt-10">
        <WineggButton href={wineggV2Purchase.ctaHref}>
          {wineggV2Purchase.cta}
        </WineggButton>
      </WineggReveal>
    </div>
  </section>
);
