import { createMetadata } from "@/content/seo";
import { saunaHero, saunaBenefits } from "@/content/pages/sauna";
import { getModelsByCategory } from "@/content/models";
import { ModelCard } from "@/components/models/ModelCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaBand } from "@/components/home/CtaBand";
import { HeroSectionSauna } from "@/components/sauna/HeroSectionSauna";

export const metadata = createMetadata({
  title: "Modulare Saunen",
  description:
    "Modulare Saunen von VN – SPA-Bereich schlüsselfertig, individuell planbar, für Privat und Gewerbe.",
  path: "/sauna",
});

export default function SaunaPage() {
  const saunaModels = getModelsByCategory("sauna");

  return (
    <>
      <HeroSectionSauna title={saunaHero.title} subtitle={saunaHero.subtitle} />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {saunaBenefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Sauna-Modelle"
            description="Funktionalität und Gemütlichkeit im kompakten Format – ideal für ein bis zwei Personen oder gewerbliche Projekte."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saunaModels.map((model, i) => (
              <ModelCard key={model.slug} model={model} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
