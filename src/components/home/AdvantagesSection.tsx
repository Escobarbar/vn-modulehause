"use client";

import { motion } from "motion/react";
import { Clock, Euro, ShieldCheck, Thermometer } from "lucide-react";
import { advantages } from "@/content/pages/home";
import { SectionHeading } from "@/components/shared/SectionHeading";

const iconMap = {
  thermometer: Thermometer,
  "shield-check": ShieldCheck,
  euro: Euro,
  clock: Clock,
};

export const AdvantagesSection = () => (
  <section className="section-soft py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        label="Vorteile"
        title="Vorteile von Modulhäusern"
        description="Effizienzhaus KfW 55–40 – Energieeffizienz nach EU-Standards"
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {advantages.map((item, i) => {
          const Icon = iconMap[item.icon];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <Icon className="size-8 text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
