import Image from "next/image";
import { WineggReveal } from "@/components/winegg/WineggReveal";
import { WineggButton } from "@/components/winegg/WineggButton";
import { wineggV2Kollektion } from "@/content/pages/winegg-v2";
import { collection2026Items } from "@/content/pages/home";

export const WineggKollektionBand = () => (
  <section className="winegg-section-alt py-16 sm:py-24">
    <div className="mx-auto grid max-w-[1920px] gap-12 px-4 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-12">
      <WineggReveal>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--winegg-radius-md)]">
          <Image
            src={wineggV2Kollektion.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </WineggReveal>
      <div>
        <WineggReveal delay={100}>
          <h2 className="winegg-heading text-2xl text-[var(--winegg-gray-dark)] sm:text-3xl md:text-4xl">
            {wineggV2Kollektion.title}
          </h2>
          <p className="mt-4 text-[var(--winegg-gray)]">{wineggV2Kollektion.description}</p>
        </WineggReveal>
        <WineggReveal delay={200} className="mt-6 space-y-3">
          {collection2026Items.map((item) => (
            <p key={item.id} className="text-sm text-[var(--winegg-gray-dark)]">
              <span className="font-medium text-[var(--winegg-gold)]">{item.title}</span>
              {" – "}
              {item.description}
            </p>
          ))}
        </WineggReveal>
        <WineggReveal delay={300} className="mt-8">
          <WineggButton href={wineggV2Kollektion.ctaHref}>
            {wineggV2Kollektion.cta}
          </WineggButton>
        </WineggReveal>
      </div>
    </div>
  </section>
);
