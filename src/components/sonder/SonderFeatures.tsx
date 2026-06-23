"use client";

import Image from "next/image";
import { FadeInView } from "@/components/motion/FadeInView";
import { sonderFeatures } from "@/content/pages/sonder-v3";

type FeatureItem = (typeof sonderFeatures.items)[number];

const EditorialFeature = ({ title, description, image, imageAlt, layout }: FeatureItem) => (
  <div
    className={`sonder-editorial-row group min-w-0 ${layout === "image-left" ? "sm:[&>div:first-child]:order-2" : ""}`}
  >
    <div className="relative z-10 flex min-w-0 flex-col justify-center gap-2">
      <h3 className="font-sonder-display text-xl font-medium uppercase leading-tight tracking-wide text-[var(--sonder-navy)] sm:text-2xl">
        {title}
      </h3>
      <p className="max-w-xs text-sm leading-relaxed text-[var(--sonder-blue-muted)]">
        {description}
      </p>
    </div>
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, 280px"
      />
    </div>
  </div>
);

export const SonderFeatures = () => {
  const [f0, f1, f2, f3] = sonderFeatures.items;

  return (
    <section className="sonder-section-alt py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
          <FadeInView className="relative z-10 min-w-0 lg:col-span-5 lg:row-start-1">
            <EditorialFeature {...f0} />
          </FadeInView>

          <FadeInView
            delay={0.08}
            className="relative z-10 min-w-0 lg:col-span-3 lg:col-start-7 lg:row-start-1"
          >
            <EditorialFeature {...f1} />
          </FadeInView>

          <FadeInView
            delay={0.12}
            className="relative z-0 min-w-0 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1"
          >
            <div className="flex h-full items-start justify-center lg:sticky lg:top-28">
              <div className="relative aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-xl lg:max-w-[180px]">
                <Image
                  src={sonderFeatures.centerImage.src}
                  alt={sonderFeatures.centerImage.alt}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
            </div>
          </FadeInView>

          <FadeInView
            delay={0.16}
            className="relative z-10 min-w-0 lg:col-span-4 lg:row-start-2"
          >
            <EditorialFeature {...f2} />
          </FadeInView>

          <FadeInView
            delay={0.2}
            className="relative z-10 min-w-0 lg:col-span-5 lg:col-start-5 lg:row-start-2"
          >
            <EditorialFeature {...f3} />
          </FadeInView>
        </div>
      </div>
    </section>
  );
};
