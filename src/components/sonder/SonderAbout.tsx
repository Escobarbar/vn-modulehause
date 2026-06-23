"use client";

import Image from "next/image";
import { FadeInView } from "@/components/motion/FadeInView";
import { sonderAbout } from "@/content/pages/sonder-v3";

export const SonderAbout = () => {
  return (
    <section id={sonderAbout.id} className="sonder-section scroll-mt-24 py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-6">
          <FadeInView className="relative z-10 lg:col-span-4">
            <h2 className="sonder-heading text-4xl text-[var(--sonder-navy)] sm:text-5xl lg:text-6xl xl:text-7xl">
              {sonderAbout.headingLine1}
              <br />
              {sonderAbout.headingLine2}
              <br />
              {sonderAbout.headingLine3}
              <br />
              {sonderAbout.headingLine4}
            </h2>
          </FadeInView>

          <FadeInView delay={0.1} className="relative z-20 lg:col-span-5 lg:col-start-4">
            <div className="relative flex gap-4">
              <div className="relative aspect-[3/4] w-1/2 overflow-hidden rounded-xl">
                <Image
                  src={sonderAbout.images[0].src}
                  alt={sonderAbout.images[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 45vw, 20vw"
                />
              </div>
              <div className="relative mt-12 aspect-[3/4] w-1/2 overflow-hidden rounded-xl lg:mt-16">
                <Image
                  src={sonderAbout.images[1].src}
                  alt={sonderAbout.images[1].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 45vw, 20vw"
                />
              </div>
            </div>
          </FadeInView>

          <FadeInView delay={0.2} className="relative z-10 flex items-start lg:col-span-3 lg:col-start-10">
            <p className="font-sonder-display whitespace-pre-line text-3xl leading-tight tracking-tight text-[var(--sonder-blue-muted)] sm:text-4xl lg:text-5xl">
              {sonderAbout.accent}
            </p>
          </FadeInView>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          <FadeInView className="lg:col-span-5 lg:col-start-1">
            <p className="max-w-lg text-sm leading-relaxed text-[var(--sonder-blue)]">
              {sonderAbout.description}
            </p>
          </FadeInView>

          <FadeInView delay={0.15} className="lg:col-span-5 lg:col-start-8">
            <p className="whitespace-pre-line text-xs font-medium uppercase leading-relaxed tracking-widest text-[var(--sonder-blue-muted)]">
              {sonderAbout.callout}
            </p>
          </FadeInView>
        </div>
      </div>
    </section>
  );
};
