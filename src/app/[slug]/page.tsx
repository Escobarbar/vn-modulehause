import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Download, Ruler, Home, Bath, Layers } from "lucide-react";
import {
  getModelBySlug,
  modelSlugs,
  formatPrice,
  formatArea,
} from "@/content/models";
import { createMetadata, productJsonLd, breadcrumbJsonLd } from "@/content/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { CtaBand } from "@/components/home/CtaBand";
import { CtaButton } from "@/components/shared/CtaButton";
import { Badge } from "@/components/ui/badge";
import { SpecCard } from "@/components/models/SpecCard";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return modelSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) return {};
  return createMetadata({
    title: model.seo.title,
    description: model.seo.description,
    path: `/${slug}`,
    image: model.images[0]?.src,
  });
}

export default async function ModelPage({ params }: PageProps) {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) notFound();

  const heroImage = model.images[0]?.src ?? "/media/home/hero.jpeg";
  const galleryImages = model.images.slice(1);

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(model),
          breadcrumbJsonLd([
            { name: "Start", path: "/" },
            { name: model.name, path: `/${slug}` },
          ]),
        ]}
      />

      <article>
        <section className="relative min-h-[50vh] pt-28">
          <Image
            src={heroImage}
            alt={model.images[0]?.alt ?? model.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
            <Badge className="mb-4 border-0 bg-primary text-primary-foreground">
              KfW {model.kfw}
            </Badge>
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              {model.name}
            </h1>
            {model.tagline && (
              <p className="mt-2 text-xl text-muted-foreground">{model.tagline}</p>
            )}
            <p className="mt-6 text-2xl font-semibold text-primary">
              ab {formatPrice(model.priceFromEur)}
            </p>
            <p className="text-muted-foreground">
              {formatArea(model.livingAreaM2)}
              {model.totalAreaM2 &&
                ` · Gesamtfläche ${formatArea(model.totalAreaM2)}`}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-1 lg:grid-cols-2 lg:max-w-sm">
                <SpecCard
                  icon={Layers}
                  label="Module"
                  value={String(model.specs.modules)}
                />
                <SpecCard
                  icon={Home}
                  label="Zimmer"
                  value={String(model.specs.rooms)}
                />
                <SpecCard
                  icon={Bath}
                  label="Badezimmer"
                  value={String(model.specs.bathrooms)}
                />
                <SpecCard
                  icon={Ruler}
                  label="Wohnfläche"
                  value={formatArea(model.livingAreaM2)}
                />
              </div>

              <div className="lg:col-span-2">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Modernes Modulhaus: {model.name}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {model.seo.description} Preis pro m² in Ausstattung BASIS: ab{" "}
                  {model.pricePerM2Eur.toLocaleString("de-DE")} €/m² (exkl.
                  Möbel, individuelle Optionen separat wählbar).
                </p>
                {model.dimensions && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Abmessungen: {model.dimensions}
                  </p>
                )}

                <ul className="mt-8 space-y-3">
                  {model.pdfs.map((pdf) => (
                    <li key={pdf.href}>
                      <a
                        href={pdf.href}
                        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-primary/50 hover:text-primary"
                      >
                        <Download className="size-4" />
                        {pdf.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-wrap gap-4">
                  <CtaButton href="/kontakt">Beratung anfordern</CtaButton>
                  <CtaButton href="/#modelle" variant="outline">
                    Alle Modelle
                  </CtaButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {galleryImages.length > 0 && (
          <section className="border-t border-border bg-muted/30 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Impressionen
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {galleryImages.map((img) => (
                  <div
                    key={img.src}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Ein Haus mit Seele
            </h2>
            <p className="mt-4 text-muted-foreground">
              Wir sind nicht nur ein Hersteller – wir gestalten gemeinsam mit
              Ihnen Räume, in denen man wirklich leben möchte.
            </p>
            <Link
              href="/ueber-uns"
              className="mt-6 inline-block text-primary hover:underline"
            >
              Mehr über VN Modulhaus
            </Link>
          </div>
        </section>
      </article>

      <CtaBand />
    </>
  );
}
