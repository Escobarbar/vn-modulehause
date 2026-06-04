import { createMetadata } from "@/content/seo";
import { siteConfig } from "@/content/site";
import { HeroSection } from "@/components/home/HeroSection";
import { FadeInView } from "@/components/motion/FadeInView";
import { BentoCollection } from "@/components/home/BentoCollection";
import { SizeCategoriesSection } from "@/components/home/SizeCategoriesSection";
import { AdvantagesSection } from "@/components/home/AdvantagesSection";
import { WhyVnSection } from "@/components/home/WhyVnSection";
import { CtaBand } from "@/components/home/CtaBand";
import { PricingSection } from "@/components/home/PricingSection";
import { ValuesSection } from "@/components/home/ValuesSection";
import { ModelGallerySection } from "@/components/home/ModelGallerySection";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { FaqSection } from "@/components/home/FaqSection";
import { UseCasesSection } from "@/components/home/UseCasesSection";
import { JsonLd } from "@/components/layout/JsonLd";
import { faqJsonLd } from "@/content/seo";
import { faqs } from "@/content/pages/home";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata = createMetadata({
  path: "/",
  description:
    "Schlüsselfertige Modulhäuser von 30 bis 440 m² – KfW 55, Fixpreis, Montage in 90 Tagen. VN Modulhaus: individuell geplant, präzise gefertigt.",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <HeroSection />
      <BentoCollection />
      <SizeCategoriesSection />
      <AdvantagesSection />
      <WhyVnSection />
      <CtaBand />
      <PricingSection />
      <ValuesSection />

      <section id="modelle" className="scroll-mt-28 border-t border-border py-10 sm:py-12">
        <FadeInView className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            title="Inspiration für Ihr zukünftiges Zuhause"
            description="Jedes Projekt entsteht individuell – ganz neu oder auf Basis eines bestehenden Modells. Sie wählen aus – wir passen es an."
            align="center"
          />
        </FadeInView>
      </section>

      <ModelGallerySection
        id="klein"
        category="klein"
        title="Häuser bis 45 m²"
        description="Funktionalität und Gemütlichkeit auf kleinem Raum – ideal für ein bis zwei Personen."
      />
      <ModelGallerySection
        id="mittel"
        category="mittel"
        title="Hausvarianten 50–85 m²"
        description="Moderne Familienhäuser mit durchdachter Raumaufteilung – komfortabel das ganze Jahr."
      />
      <ModelGallerySection
        id="gross"
        category="gross"
        title="Häuser über 90 m²"
        description="Großzügige Häuser mit individueller Planung – vom Hauptwohnsitz bis zur Landresidenz."
      />
      <ModelGallerySection
        id="camping"
        category="camping"
        title="Camping & Glamping"
        description="Modulhäuser für Tourismus, Ferienparks und gewerbliche Nutzung."
      />

      <section className="border-t border-border py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <FadeInView delay={0}>
            <Link
              href="/#gross"
              className="group block rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <h3 className="font-display text-xl font-bold text-foreground">
                Zweistöckige Modulbauten
              </h3>
              <p className="mt-2 text-muted-foreground">
                Wir setzen Ideen für kommerzielle Projekte um.
              </p>
            </Link>
            </FadeInView>
            <FadeInView delay={0.08}>
            <Link
              href="/sauna"
              className="group block rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <h3 className="font-display text-xl font-bold text-foreground">
                Sauna-Projekte
              </h3>
              <p className="mt-2 text-muted-foreground">
                Modulare Saunen – privat oder gewerblich.
              </p>
            </Link>
            </FadeInView>
          </div>
        </div>
      </section>

      <UseCasesSection />
      <ProcessTimeline />
      <FaqSection />
      <CtaBand />
    </>
  );
}
