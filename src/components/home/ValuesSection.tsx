"use client";

import { values } from "@/content/pages/home";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInView } from "@/components/motion/FadeInView";

export const ValuesSection = () => (
  <section className="py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <FadeInView className="mb-12">
        <SectionHeading
          label="Werte"
          title="Warum Kunden uns vertrauen"
          description="Vier Prinzipien, die jedes Projekt bei VN Modulhaus leiten."
          align="center"
        />
      </FadeInView>
      <div className="grid gap-6 sm:grid-cols-2">
        {values.map((v, i) => (
          <FadeInView key={v.title} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-border bg-gradient-to-br from-accent/60 via-card to-muted/40 p-8 shadow-sm">
              <span className="font-mono text-3xl font-bold text-primary/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                {v.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {v.description}
              </p>
            </div>
          </FadeInView>
        ))}
      </div>
    </div>
  </section>
);
