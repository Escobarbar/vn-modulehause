"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { sizeCategories } from "@/content/pages/home";
import { GradientText } from "@/components/shared/GradientText";

export const SizeCategoriesSection = () => (
  <section className="py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Von 32 m² bis{" "}
          <GradientText as="span">individuell</GradientText>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Unsere Aufgabe ist es, die beste Lösung für Sie zu finden – Häuser für
          jede Idee und jedes Vorhaben.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {sizeCategories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href={cat.href}
              className="group flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/40 hover:bg-accent/50 hover:shadow-md"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-primary">
                {cat.offerLabel}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-foreground group-hover:text-primary">
                {cat.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {cat.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                Varianten ansehen
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
