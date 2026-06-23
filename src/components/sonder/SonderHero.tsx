"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { sonderHero } from "@/content/pages/sonder-v3";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.15 * i,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export const SonderHero = () => {
  return (
    <section className="relative min-h-screen bg-[var(--sonder-blue-light)] pt-20 lg:pt-24">
      <div className="relative mx-auto min-h-[calc(100vh-5rem)] max-w-[1400px] overflow-x-clip px-6 lg:min-h-[calc(100vh-6rem)] lg:px-10">
        {/* Hero image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="relative z-0 mx-auto aspect-[4/3] w-full overflow-hidden rounded-2xl lg:absolute lg:right-10 lg:top-16 lg:aspect-auto lg:h-[72vh] lg:w-[58%] lg:rounded-3xl"
        >
          <Image
            src={sonderHero.heroImage}
            alt="VN Modulhaus – Modernes Modulhaus"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--sonder-blue-light)]/80 via-transparent to-transparent lg:from-black/25 lg:via-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

          {/* Highlights — bottom-right on image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="absolute bottom-6 right-6 hidden flex-col gap-2 lg:flex"
          >
            {sonderHero.highlights.map((item) => (
              <div key={item.label} className="sonder-highlight-pill">
                <span>{item.value}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Overlapping typography */}
        <div className="relative z-10 lg:pointer-events-none lg:absolute lg:inset-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="lg:pointer-events-auto lg:pt-8"
          >
            <h1 className="sonder-heading-giant">
              <span className="block text-[3.5rem] leading-[0.85] text-[var(--sonder-navy)] sm:text-[6rem] lg:text-[7.5rem] lg:text-white lg:sonder-hero-text-shadow xl:text-[9.5rem]">
                {sonderHero.brandLine1}
                <sup className="relative -top-3 ml-1 text-sm font-normal tracking-normal text-[var(--sonder-blue-muted)] lg:-top-6 lg:text-base lg:text-white/80">
                  {sonderHero.copyright}
                </sup>
              </span>
              <span className="mt-1 block text-[3.5rem] leading-[0.85] text-[var(--sonder-navy)] sm:text-[6rem] lg:ml-[18%] lg:mt-0 lg:text-[7.5rem] lg:text-white lg:sonder-hero-text-shadow xl:text-[9.5rem]">
                {sonderHero.brandLine2}
              </span>
              <span className="mt-1 block text-[3.5rem] leading-[0.85] text-[var(--sonder-navy)] sm:text-[6rem] lg:ml-[32%] lg:mt-0 lg:text-[7rem] lg:text-white lg:sonder-hero-text-shadow xl:text-[8.5rem]">
                {sonderHero.brandLine3}
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="relative z-20 mt-6 flex items-start gap-2 lg:absolute lg:right-10 lg:top-8 lg:mt-0 lg:max-w-[220px]"
        >
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--sonder-blue-muted)] lg:text-white/80" aria-hidden />
          <p className="text-[0.625rem] font-medium uppercase leading-relaxed tracking-[0.15em] text-[var(--sonder-blue-muted)] lg:text-white/80">
            {sonderHero.eyebrow}
          </p>
        </motion.div>

        {/* Bottom row */}
        <div className="relative z-20 mt-8 grid grid-cols-1 gap-8 pb-12 lg:absolute lg:bottom-10 lg:left-10 lg:right-10 lg:mt-0 lg:grid-cols-12 lg:items-end lg:gap-6 lg:pb-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="lg:col-span-5"
          >
            <p className="max-w-sm text-sm font-medium uppercase leading-relaxed tracking-widest text-[var(--sonder-blue)] lg:text-white lg:sonder-hero-text-shadow">
              {sonderHero.tagline}
            </p>
            <div className="mt-6">
              <Link href={sonderHero.ctaHref} className="sonder-btn-white">
                {sonderHero.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-8 hidden flex-col gap-1 lg:flex">
              {sonderHero.usps.map((usp) => (
                <p
                  key={usp}
                  className="text-xs uppercase tracking-widest text-white/70"
                >
                  {usp}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Mobile highlights */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap gap-2 lg:hidden"
          >
            {sonderHero.highlights.map((item) => (
              <div key={item.label} className="sonder-highlight-pill">
                <span>{item.value}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile USPs */}
        <div className="relative z-20 -mt-4 flex flex-col gap-1 pb-8 lg:hidden">
          {sonderHero.usps.map((usp) => (
            <p
              key={usp}
              className="text-xs uppercase tracking-widest text-[var(--sonder-blue-muted)]"
            >
              {usp}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
