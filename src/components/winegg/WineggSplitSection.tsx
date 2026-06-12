import Image from "next/image";
import { WineggReveal } from "@/components/winegg/WineggReveal";
import { WineggButton } from "@/components/winegg/WineggButton";
import { wineggV2About } from "@/content/pages/winegg-v2";

export const WineggSplitSection = () => (
  <section className="winegg-section-alt py-16 sm:py-24">
    <div className="mx-auto grid max-w-[1920px] gap-12 px-4 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-12">
      <div>
        <WineggReveal>
          <h2 className="winegg-heading text-2xl text-[var(--winegg-gray-dark)] sm:text-3xl md:text-4xl">
            {wineggV2About.title}
          </h2>
        </WineggReveal>
        <WineggReveal delay={200} className="mt-8 space-y-4">
          {wineggV2About.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-base leading-relaxed text-[var(--winegg-gray)] sm:text-lg">
              {p}
            </p>
          ))}
        </WineggReveal>
        <WineggReveal delay={400} className="mt-8">
          <WineggButton href={wineggV2About.ctaHref}>{wineggV2About.cta}</WineggButton>
        </WineggReveal>
      </div>
      <WineggReveal delay={300}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--winegg-radius-md)]">
          <Image
            src={wineggV2About.image}
            alt={wineggV2About.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </WineggReveal>
    </div>
  </section>
);
