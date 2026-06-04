"use client";

import { motion } from "motion/react";
import { whyVn } from "@/content/pages/home";
import { GradientText } from "@/components/shared/GradientText";
import { CtaButton } from "@/components/shared/CtaButton";

export const WhyVnSection = () => {
  const parts = whyVn.headline.split(whyVn.highlight);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              {whyVn.label}
            </p>
            <p className="mt-4 text-muted-foreground">{whyVn.intro}</p>
            {whyVn.points.map((p) => (
              <div key={p.title} className="mt-8">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {parts[0]}
              <GradientText as="span">{whyVn.highlight}</GradientText>
              {parts[1]}
            </h2>
            <div className="mt-10">
              <CtaButton href="/kontakt">Beratung anfragen</CtaButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
