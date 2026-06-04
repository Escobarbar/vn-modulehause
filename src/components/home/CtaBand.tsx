"use client";

import { motion } from "motion/react";
import { CtaButton } from "@/components/shared/CtaButton";

type CtaBandProps = {
  title?: string;
  description?: string;
};

export const CtaBand = ({
  title = "Lassen Sie uns gemeinsam Ihr Zuhause planen",
  description = "Wir beraten Sie persönlich und erstellen einen transparenten, unverbindlichen Kostenvoranschlag.",
}: CtaBandProps) => (
  <section className="relative overflow-hidden py-20 sm:py-28">
    <div className="cta-band-bg absolute inset-0 bg-gradient-to-r from-accent/80 via-muted/40 to-accent/50" />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative mx-auto max-w-3xl px-4 text-center sm:px-6"
    >
      <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      <div className="mt-8 flex justify-center">
        <CtaButton href="/kontakt">Beratung anfordern</CtaButton>
      </div>
    </motion.div>
  </section>
);
