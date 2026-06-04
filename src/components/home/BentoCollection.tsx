"use client";

import Link from "next/link";
import { ArrowRight, Building2, Home, Layers } from "lucide-react";
import { FadeInView } from "@/components/motion/FadeInView";
import {
  collection2026,
  collection2026Items,
} from "@/content/pages/home";
import { cn } from "@/lib/utils";

const icons = [Building2, Home, Layers] as const;

export const BentoCollection = () => (
  <section className="py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <FadeInView className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          Flexibel & individuell
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
          {collection2026.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Konfigurieren Sie Fassade, Dach und Geschosszahl – mit Beispielen aus
          unserer Modellpalette.
        </p>
      </FadeInView>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {collection2026Items.map((item, i) => {
          const Icon = icons[i] ?? Building2;
          return (
            <FadeInView key={item.id} delay={i * 0.1} className="h-full">
            <article
              className={cn(
                "glass-card group flex h-full flex-col overflow-hidden rounded-3xl transition-all",
                "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
              )}
            >
              <Link
                href={item.href}
                className="flex flex-1 flex-col p-8 pb-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <Icon
                      className="size-6 transition-transform group-hover:scale-110"
                      strokeWidth={1.75}
                    />
                  </div>
                  <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.highlights.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground/80"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {item.cta}
                  <ArrowRight className="size-4" />
                </span>
              </Link>

              <div className="border-t border-border/80 px-8 pb-8 pt-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Beispiel-Modelle
                </p>
                <ul className="mt-2 space-y-1.5">
                  {item.examples.map((ex) => (
                    <li key={ex.href}>
                      <Link
                        href={ex.href}
                        className="text-sm text-foreground/80 underline-offset-2 hover:text-primary hover:underline"
                      >
                        {ex.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            </FadeInView>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Link href="/kollektion" className="text-primary hover:underline">
          Gesamte Kollektion 2026 ansehen
        </Link>
      </p>
    </div>
  </section>
);
