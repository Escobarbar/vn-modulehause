"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { GradientText } from "@/components/shared/GradientText";
import { CtaButton } from "@/components/shared/CtaButton";
import { saunaHeroImage } from "@/content/media";

type HeroSectionSaunaProps = {
  title: string;
  subtitle: string;
};

export const HeroSectionSauna = ({ title, subtitle }: HeroSectionSaunaProps) => (
  <section className="relative min-h-[60vh] overflow-hidden pt-28">
    <Image
      src={saunaHeroImage}
      alt="Modulare Sauna von VN"
      fill
      className="object-cover"
      priority
      sizes="100vw"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/85 to-[#faf8f5]/30" />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-primary">
        Sauna · VN Modulhaus
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
        <GradientText as="span">{title}</GradientText>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
      <div className="mt-8">
        <CtaButton href="/kontakt">Beratung anfordern</CtaButton>
      </div>
    </motion.div>
  </section>
);
