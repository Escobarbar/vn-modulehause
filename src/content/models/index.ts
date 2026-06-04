import type { HouseModel } from "./types";
import { modelImageList, modelPdfLinks } from "../media";
import { additionalRawModels } from "./additional-models";

const baseRawModels: Array<Omit<HouseModel, "images" | "pdfs">> = [
  {
    slug: "bushome",
    name: "Bushome",
    category: "klein",
    livingAreaM2: 30.28,
    totalAreaM2: 46.8,
    dimensions: "11,7 m × 4 m",
    priceFromEur: 111870,
    pricePerM2Eur: 2034,
    specs: { modules: 1, rooms: 1, bathrooms: 1 },
    kfw: "55",
    tagline: "Funktionalität und Gemütlichkeit auf kleinem Raum",
    seo: {
      title: "Bushome 30 m²",
      description:
        "Modulhaus Bushome mit 30 m² Wohnfläche – schlüsselfertig ab 111.870 €, KfW 55, Montage in 90 Tagen.",
    },
  },
  {
    slug: "chillneo",
    name: "Chillneo",
    category: "klein",
    livingAreaM2: 41.5,
    priceFromEur: 153405,
    pricePerM2Eur: 2034,
    specs: { modules: 1, rooms: 2, bathrooms: 1 },
    kfw: "55",
    tagline: "Kompakt wohnen mit maximalem Komfort",
    seo: {
      title: "Chillneo 41,5 m²",
      description:
        "Modulhaus Chillneo – 41,5 m² Wohnfläche, schlüsselfertig, energieeffizient nach EU-Standards.",
    },
  },
  {
    slug: "boreal",
    name: "Boreal",
    category: "klein",
    livingAreaM2: 30.3,
    priceFromEur: 112030,
    pricePerM2Eur: 2034,
    specs: { modules: 1, rooms: 1, bathrooms: 1 },
    kfw: "55",
    tagline: "Nordische Klarheit auf kompakter Fläche",
    seo: {
      title: "Boreal 30,3 m²",
      description: "Modulhaus Boreal – kompaktes Design, schlüsselfertig, KfW 55.",
    },
  },
  {
    slug: "isos",
    name: "Isos",
    category: "mittel",
    livingAreaM2: 58.7,
    priceFromEur: 115345,
    pricePerM2Eur: 1965,
    specs: { modules: 2, rooms: 3, bathrooms: 1 },
    kfw: "55",
    tagline: "Moderne Familienhäuser mit durchdachter Raumaufteilung",
    seo: {
      title: "Isos 58,7 m²",
      description: "Familienmodulhaus Isos – 58,7 m², ganzjährig wohnbar, schlüsselfertig.",
    },
  },
  {
    slug: "timber",
    name: "Timber",
    category: "mittel",
    livingAreaM2: 62.1,
    priceFromEur: 122027,
    pricePerM2Eur: 1965,
    specs: { modules: 2, rooms: 3, bathrooms: 2 },
    kfw: "55",
    tagline: "Natürliche Materialien, zeitloses Design",
    seo: {
      title: "Timber 62,1 m²",
      description: "Modulhaus Timber – 62,1 m² Wohnfläche für komfortables Familienwohnen.",
    },
  },
  {
    slug: "fjord",
    name: "Fjord",
    category: "mittel",
    livingAreaM2: 65.9,
    priceFromEur: 129494,
    pricePerM2Eur: 1965,
    specs: { modules: 2, rooms: 3, bathrooms: 2 },
    kfw: "55",
    tagline: "Großzügig wohnen bei jedem Klima",
    seo: {
      title: "Fjord 65,9 m²",
      description: "Modulhaus Fjord – 65,9 m², ideal für Familie, Homeoffice und Erholung.",
    },
  },
  {
    slug: "lando",
    name: "Lando Kerafront",
    category: "gross",
    livingAreaM2: 122.76,
    priceFromEur: 241223,
    pricePerM2Eur: 1965,
    specs: { modules: 4, rooms: 5, bathrooms: 2 },
    kfw: "55",
    tagline: "Großzügige Häuser mit individueller Planung",
    seo: {
      title: "Lando Kerafront 122,76 m²",
      description: "Großes Modulhaus Lando Kerafront – individuell planbar, schlüsselfertig.",
    },
  },
  {
    slug: "hafen",
    name: "Hafen Kerafront-Klickfalz",
    category: "gross",
    livingAreaM2: 129.24,
    priceFromEur: 253957,
    pricePerM2Eur: 1965,
    specs: { modules: 4, rooms: 5, bathrooms: 2 },
    kfw: "55",
    tagline: "Architektur mit Charakter",
    seo: {
      title: "Hafen Kerafront 129,24 m²",
      description: "Modulhaus Hafen – 129 m² Wohnfläche, Kerafront-Fassade, schlüsselfertig.",
    },
  },
  {
    slug: "anker",
    name: "Anker Putz",
    category: "gross",
    livingAreaM2: 440.24,
    priceFromEur: 865072,
    pricePerM2Eur: 1965,
    specs: { modules: 8, rooms: 12, bathrooms: 4 },
    kfw: "55",
    tagline: "Individuelle Landresidenz in Modulbauweise",
    seo: {
      title: "Anker Putz 440 m²",
      description: "Großes Modulhaus Anker Putz – bis 440 m², individuelle Planung.",
    },
  },
  {
    slug: "niapol",
    name: "Niapol",
    category: "camping",
    livingAreaM2: 46,
    priceFromEur: 93444,
    pricePerM2Eur: 2034,
    specs: { modules: 1, rooms: 2, bathrooms: 1 },
    kfw: "55",
    tagline: "Camping & Glamping",
    seo: {
      title: "Niapol 46 m²",
      description: "Modulhaus Niapol für Camping, Glamping und Tourismus.",
    },
  },
  {
    slug: "tores",
    name: "Tores",
    category: "camping",
    livingAreaM2: 40,
    priceFromEur: 81360,
    pricePerM2Eur: 2034,
    specs: { modules: 1, rooms: 2, bathrooms: 1 },
    kfw: "55",
    tagline: "Camping & Glamping",
    seo: {
      title: "Tores 40 m²",
      description: "Kompaktes Glamping-Haus Tores – schnell montiert, ganzjährig nutzbar.",
    },
  },
  {
    slug: "glory",
    name: "Glory",
    category: "camping",
    livingAreaM2: 80,
    priceFromEur: 162720,
    pricePerM2Eur: 2034,
    specs: { modules: 2, rooms: 3, bathrooms: 2 },
    kfw: "55",
    tagline: "Premium Glamping",
    seo: {
      title: "Glory 80 m²",
      description: "Großes Glamping-Modulhaus Glory – ideal für Ferienparks und Hotels.",
    },
  },
  {
    slug: "thermis",
    name: "Thermis",
    category: "sauna",
    livingAreaM2: 24,
    priceFromEur: 52800,
    pricePerM2Eur: 2200,
    specs: { modules: 1, rooms: 2, bathrooms: 1 },
    kfw: "55",
    tagline: "Kompakte Sauna mit Wohnkomfort",
    seo: {
      title: "Thermis Sauna 24 m²",
      description: "Modulare Sauna Thermis – SPA-Bereich schlüsselfertig, individuell planbar.",
    },
  },
  {
    slug: "warm",
    name: "Warm",
    category: "sauna",
    livingAreaM2: 32,
    priceFromEur: 70400,
    pricePerM2Eur: 2200,
    specs: { modules: 1, rooms: 2, bathrooms: 1 },
    kfw: "55",
    tagline: "Wärme und Behaglichkeit",
    seo: {
      title: "Warm Sauna 32 m²",
      description: "Modulare Sauna Warm – Elektro- oder Holzofen, Panoramafenster optional.",
    },
  },
  {
    slug: "communicate",
    name: "Communicate",
    category: "sauna",
    livingAreaM2: 32,
    priceFromEur: 70400,
    pricePerM2Eur: 2200,
    specs: { modules: 1, rooms: 2, bathrooms: 1 },
    kfw: "55",
    tagline: "Raum für Entspannung und Geselligkeit",
    seo: {
      title: "Communicate Sauna 32 m²",
      description: "Sauna Communicate – modernes Interieur, Naturholz, Ruhebereich.",
    },
  },
  {
    slug: "cube",
    name: "Cube",
    category: "sauna",
    livingAreaM2: 32,
    priceFromEur: 70400,
    pricePerM2Eur: 2200,
    specs: { modules: 1, rooms: 2, bathrooms: 1 },
    kfw: "55",
    tagline: "Klare Linien, maximale Wirkung",
    seo: {
      title: "Cube Sauna 32 m²",
      description: "Modulare Sauna Cube – minimalistisches Design, schnelle Montage.",
    },
  },
  {
    slug: "arest",
    name: "Arest",
    category: "sauna",
    livingAreaM2: 24,
    priceFromEur: 52800,
    pricePerM2Eur: 2200,
    specs: { modules: 1, rooms: 2, bathrooms: 1 },
    kfw: "55",
    tagline: "Rückzugsort in kompakter Form",
    seo: {
      title: "Arest Sauna 24 m²",
      description: "Sauna Arest – ideal für Zuhause, Glamping und gewerbliche Nutzung.",
    },
  },
  {
    slug: "vulcano",
    name: "Vulcano",
    category: "sauna",
    livingAreaM2: 48,
    priceFromEur: 105600,
    pricePerM2Eur: 2200,
    specs: { modules: 2, rooms: 3, bathrooms: 1 },
    kfw: "55",
    tagline: "Großzügiger SPA-Bereich",
    seo: {
      title: "Vulcano Sauna 48 m²",
      description: "Sauna Vulcano – großer Modulbau für SPA, Hotel und Tourismus.",
    },
  },
  {
    slug: "chiilout",
    name: "Chiilout",
    category: "sauna",
    livingAreaM2: 42,
    priceFromEur: 92400,
    pricePerM2Eur: 2200,
    specs: { modules: 1, rooms: 3, bathrooms: 1 },
    kfw: "55",
    tagline: "Entspannung mit Stil",
    seo: {
      title: "Chiilout Sauna 42 m²",
      description: "Modulare Sauna Chiilout – bezugsfertig mit Dusche und Ruhebereich.",
    },
  },
];

const rawModels = [...baseRawModels, ...additionalRawModels];

export const models: HouseModel[] = rawModels.map((m) => ({
  ...m,
  images: modelImageList(m.slug, m.name),
  pdfs: modelPdfLinks(m.slug),
}));

export const modelSlugs = models.map((m) => m.slug);

export function getModelBySlug(slug: string): HouseModel | undefined {
  return models.find((m) => m.slug === slug);
}

export function getModelsByCategory(
  category: HouseModel["category"],
): HouseModel[] {
  return models.filter((m) => m.category === category);
}

export function formatPrice(eur: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(eur);
}

export function formatArea(m2: number): string {
  return `${m2.toLocaleString("de-DE")} m²`;
}
