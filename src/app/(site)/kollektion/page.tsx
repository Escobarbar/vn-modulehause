import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  kollektionIntro,
  kollektionSections,
} from "@/content/pages/kollektion";
import { getModelBySlug } from "@/content/models";
import { createMetadata } from "@/content/seo";
import { CtaButton } from "@/components/shared/CtaButton";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata = createMetadata({
  title: "Hauskollektion 2026 – Fassaden, Dächer & Geschosse",
  description:
    "3 Fassaden, 3 Dachformen und 1–3 Stockwerke: Entdecken Sie die Konfigurationsmöglichkeiten der VN Modulhaus Kollektion 2026 mit Modellbeispielen.",
  path: "/kollektion",
});

export default function KollektionPage() {
  return (
    <article className="pt-28">
      <header className="border-b border-border bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            {kollektionIntro.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl">
            {kollektionIntro.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {kollektionIntro.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {kollektionSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </header>

      {kollektionSections.map((section, sectionIndex) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-28 border-b border-border py-16 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={section.title}
              description={section.description}
              align="left"
            />

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {section.variants.map((variant, i) => {
                const model = getModelBySlug(variant.modelSlug);
                const image =
                  model?.images[0]?.src ?? "/media/home/hero.jpeg";
                const imageAlt =
                  model?.images[0]?.alt ?? `${variant.name} – VN Modulhaus`;

                return (
                  <Link
                    key={variant.name}
                    href={`/${variant.modelSlug}`}
                    className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <Image
                        src={image}
                        alt={imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                        {model?.name ?? variant.name}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {variant.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {variant.detail}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Modell ansehen
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {sectionIndex < kollektionSections.length - 1 && (
              <div className="mt-10 flex justify-end">
                <a
                  href={`#${kollektionSections[sectionIndex + 1]!.id}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Weiter: {kollektionSections[sectionIndex + 1]!.title} ↓
                </a>
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Individuelle Kombination gewünscht?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Fassade, Dach und Geschosszahl lassen sich auf jedem Modell
            abstimmen – wir planen mit Ihnen.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CtaButton href="/kontakt">Beratung anfordern</CtaButton>
            <CtaButton href="/#modelle" variant="outline">
              Alle Modelle
            </CtaButton>
          </div>
        </div>
      </section>
    </article>
  );
}
