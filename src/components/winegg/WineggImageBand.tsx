"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { WineggReveal } from "@/components/winegg/WineggReveal";
import { WineggButton } from "@/components/winegg/WineggButton";
import { wineggV2Sustainability } from "@/content/pages/winegg-v2";

export const WineggImageBand = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative min-h-[70vh] overflow-hidden">
      <motion.div className="absolute inset-0 -top-[15%] h-[130%]" style={reduceMotion ? undefined : { y }}>
        <Image
          src={wineggV2Sustainability.image}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
      <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center sm:px-8">
        <WineggReveal>
          <h2 className="winegg-heading winegg-heading-on-dark winegg-hero-text-shadow max-w-3xl text-3xl sm:text-4xl md:text-5xl">
            {wineggV2Sustainability.title}
          </h2>
        </WineggReveal>
        <WineggReveal delay={200} className="mt-6 max-w-2xl">
          <p className="winegg-hero-text-shadow text-base leading-relaxed text-white/95 sm:text-lg">
            {wineggV2Sustainability.description}
          </p>
        </WineggReveal>
        <WineggReveal delay={400} className="mt-10">
          <WineggButton href={wineggV2Sustainability.ctaHref}>
            {wineggV2Sustainability.cta}
          </WineggButton>
        </WineggReveal>
      </div>
    </section>
  );
};
