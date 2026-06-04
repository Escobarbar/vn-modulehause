"use client";

import { motion, useReducedMotion } from "motion/react";
import { processSteps } from "@/content/pages/home";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInView } from "@/components/motion/FadeInView";

export const ProcessTimeline = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="ablauf"
      className="scroll-mt-28 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInView>
          <SectionHeading
            label="Ablauf"
            title="So läuft die Zusammenarbeit ab"
            align="center"
          />
        </FadeInView>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <motion.div
            className="absolute left-[19px] top-0 w-px origin-top bg-gradient-to-b from-primary via-brand-sky/50 to-transparent md:left-1/2 md:-translate-x-px"
            aria-hidden
            initial={
              reduceMotion ? { scaleY: 1, height: "100%" } : { scaleY: 0, height: "100%" }
            }
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          {processSteps.map((step, i) => (
            <FadeInView
              key={step.step}
              delay={i * 0.05}
              className="relative mb-12 pl-12 md:pl-0 md:odd:pr-[calc(50%+2rem)] md:even:pl-[calc(50%+2rem)]"
            >
              <span className="absolute left-0 flex size-10 items-center justify-center rounded-full border border-primary/30 bg-card font-mono text-sm font-bold text-primary md:left-1/2 md:-translate-x-1/2">
                {String(step.step).padStart(2, "0")}
              </span>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
};
