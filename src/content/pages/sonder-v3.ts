import {
  advantages,
  heroContent,
  processSteps,
  values,
} from "./home";
import { wineggV2About, wineggV2Purchase } from "./winegg-v2";

export const sonderHero = {
  brandLine1: "VN",
  brandLine2: "MODUL",
  brandLine3: "HAUS",
  copyright: "©",
  eyebrow: "Schlüsselfertige Modulhäuser · Deutschland",
  tagline: heroContent.subline,
  cta: "Modelle entdecken",
  ctaHref: "/v3#modelle",
  highlights: [
    { value: "37", label: "Modellhäuser" },
    { value: "KfW 55", label: "Effizienzhaus" },
    { value: "90–120", label: "Tage bis Einzug" },
  ],
  usps: heroContent.usps.map((usp) => usp.label),
  heroImage: "/media/home/hero.jpeg",
};

export const sonderAbout = {
  id: "about",
  headingLine1: "Ein Ort,",
  headingLine2: "der sich",
  headingLine3: "richtig",
  headingLine4: "anfühlt",
  accent: "/ Nicht nur\nein Haus",
  description: wineggV2About.paragraphs.join(" "),
  callout: "✦  Transparente Preise, Fixkosten und persönliche Beratung – von der ersten Idee bis zur Schlüsselübergabe.",
  images: [
    { src: "/models/isos/gallery-1.jpg", alt: "VN Modulhaus – Außenansicht" },
    { src: "/models/timber/gallery-1.jpg", alt: "VN Modulhaus – Gartenansicht" },
  ],
};

const featureImages = [
  { src: "/models/lando/gallery-1.jpg", alt: "Modulhaus Lando – Komfort" },
  { src: "/models/hafen/hero.png", alt: "Modulhaus Hafen – EU-Normen" },
  { src: "/models/fjord/gallery-1.jpg", alt: "Modulhaus Fjord – Betriebskosten" },
  { src: "/models/boreal/hero.png", alt: "Modulhaus Boreal – Fertigstellung" },
] as const;

export const sonderFeatures = {
  centerImage: {
    src: "/models/isos/interior.jpg",
    alt: "VN Modulhaus – Grundriss und Raumaufteilung",
  },
  items: advantages.map((adv, i) => ({
    title: adv.title,
    description: adv.description,
    image: featureImages[i].src,
    imageAlt: featureImages[i].alt,
    layout: (i % 2 === 0 ? "text-left" : "image-left") as
      | "text-left"
      | "image-left",
  })),
};

export const sonderWhyChoose = {
  heading: "/ Warum VN\nModulhaus?",
  items: values.map((item, i) => ({
    number: i + 1,
    title: item.title,
    description: item.description,
  })),
};

export const sonderProcess = {
  title: "Ihr Weg zum Zuhause",
  subtitle:
    "Von der ersten Anfrage bis zum Einzug – transparent und persönlich begleitet.",
  steps: processSteps,
};

export const sonderModels = {
  title: "Modellhäuser",
  subtitle:
    "Jedes Projekt entsteht individuell – auf Basis eines Modells oder ganz nach Ihren Wünschen.",
  limit: 8,
};

export const sonderFaq = {
  title: "Häufige Fragen",
};

export const sonderCta = {
  title: wineggV2Purchase.title,
  description: wineggV2Purchase.paragraphs[0],
  cta: wineggV2Purchase.cta,
  ctaHref: wineggV2Purchase.ctaHref,
};

export const sonderNav = [
  { label: "Modelle", href: "/v3#modelle" },
  { label: "Über uns", href: "/v3#about" },
  { label: "Grundrisse", href: "/kollektion" },
  { label: "FAQ", href: "/v3#faq" },
  { label: "Kontakt", href: "/kontakt" },
];
