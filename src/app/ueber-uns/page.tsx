import { createMetadata } from "@/content/seo";
import { values } from "@/content/pages/home";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GradientText } from "@/components/shared/GradientText";
import { CtaButton } from "@/components/shared/CtaButton";
import { useCases } from "@/content/pages/home";

export const metadata = createMetadata({
  title: "Über uns",
  description:
    "VN Modulhaus – moderne Modulhäuser für mehr Lebensqualität. Team, Werte und Standorte in Öhringen und Bad Ems.",
  path: "/ueber-uns",
});

export default function UeberUnsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Über VN"
          title="Modernes Modulhaus für mehr Lebensqualität"
          description="Wir schaffen energieeffiziente, ästhetische und zuverlässige Lösungen – von der Planung bis zur Schlüsselübergabe."
        />

        <div className="mt-16 max-w-3xl">
          <p className="text-lg text-muted-foreground leading-relaxed">
            VN Modulhaus steht für{" "}
            <GradientText as="span">schlüsselfertige Modulhäuser</GradientText>{" "}
            mit modernem Design – ideal für ganzjähriges und dauerhaftes Wohnen
            dank hochwertiger Materialien und EU-konformer Fertigung.
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Wir sind nicht nur ein Hersteller – wir sind ein Team, das gemeinsam
            mit Ihnen Ihr Traumhaus gestaltet. Wir bauen nicht nur Wände, wir
            schaffen Räume, in denen man wirklich leben möchte.
          </p>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="rounded-2xl border border-border p-6"
            >
              <span className="font-mono text-primary/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                {v.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{v.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Einsatzbereiche
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {useCases.map((uc) => (
              <li
                key={uc}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
              >
                {uc}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <CtaButton href="/kontakt">Jetzt Beratung anfordern</CtaButton>
        </div>
      </div>
    </div>
  );
}
