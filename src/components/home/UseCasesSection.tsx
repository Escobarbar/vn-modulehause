"use client";

import {
  Building2,
  Home,
  Leaf,
  Palmtree,
  Sparkles,
  TreePine,
  type LucideIcon,
} from "lucide-react";
import { useCases } from "@/content/pages/home";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInView } from "@/components/motion/FadeInView";

const useCaseMeta: { icon: LucideIcon; label: string }[] = [
  { icon: Home, label: useCases[0] ?? "dauerhaftes Wohnen" },
  { icon: Palmtree, label: useCases[1] ?? "Camping und Tourismus" },
  { icon: TreePine, label: useCases[2] ?? "privater Rückzugsort" },
  { icon: Building2, label: useCases[3] ?? "gewerbliche Nutzung" },
  { icon: Sparkles, label: useCases[4] ?? "Ferienparks & Glamping" },
  { icon: Leaf, label: useCases[5] ?? "Öko-Häuser" },
];

export const UseCasesSection = () => (
  <section className="border-t border-border bg-muted/30 py-12 sm:py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <FadeInView>
        <SectionHeading
          label="Einsatzbereiche"
          title="Perfekt geeignet für"
          description="Modulhäuser von VN Modulhaus passen zu vielen Lebenssituationen – vom kompakten Zuhause bis zum gewerblichen Projekt."
          align="center"
        />
      </FadeInView>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {useCaseMeta.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.label}
              className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/25"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <span className="pt-2 font-medium leading-snug text-foreground">
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);
