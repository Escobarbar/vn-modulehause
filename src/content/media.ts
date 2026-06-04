import manifest from "../../content/media-manifest.json";

export type ModelMedia = {
  hero: string | null;
  interior: string | null;
  gallery: string[];
  pdfs: string[];
};

export const homeMedia = manifest.home;

export function getModelMedia(slug: string): ModelMedia | undefined {
  return manifest.models[slug as keyof typeof manifest.models];
}

export function modelImageList(
  slug: string,
  name: string,
): { src: string; alt: string }[] {
  const media = getModelMedia(slug);
  if (!media) {
    return [{ src: `/media/home/hero.jpeg`, alt: `Modulhaus ${name}` }];
  }

  const unique = (paths: (string | null | undefined)[]) => {
    const seen = new Set<string>();
    return paths.filter((p): p is string => {
      if (!p || seen.has(p)) return false;
      seen.add(p);
      return true;
    });
  };

  const paths = unique([
    media.hero,
    media.interior,
    ...media.gallery,
  ]);

  if (paths.length === 0) {
    return [{ src: `/media/home/hero.jpeg`, alt: `Modulhaus ${name}` }];
  }
  return paths.map((src, i) => ({
    src,
    alt:
      i === 0
        ? `${name} – Außenansicht`
        : i === 1
          ? `${name} – Innenansicht`
          : `${name} – Ansicht ${i}`,
  }));
}

const pdfLabels = [
  "Grundriss / Plan (PDF)",
  "Alternativplan (PDF)",
  "Preisinformationen (PDF)",
  "Weitere Unterlagen (PDF)",
];

export function modelPdfLinks(slug: string): { label: string; href: string }[] {
  const pdfs = getModelMedia(slug)?.pdfs ?? [];
  return pdfs.map((href, i) => ({
    label: pdfLabels[i] ?? `PDF ${i + 1}`,
    href,
  }));
}

export const saunaHeroImage =
  "/media/sauna/hero.jpeg" as const;
