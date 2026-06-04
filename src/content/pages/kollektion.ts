export type KollektionExample = {
  label: string;
  href: string;
};

export type KollektionPillar = {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  highlights: string[];
  examples: KollektionExample[];
};

export const kollektionIntro = {
  eyebrow: "Flexibel & individuell",
  title: "Hauskollektion 2026",
  description:
    "Drei Fassaden, drei Dachformen und bis zu drei Stockwerke – kombinierbar auf Basis unserer Modelle oder als individuelle Planung.",
};

export const kollektionPillars: KollektionPillar[] = [
  {
    id: "fassaden",
    title: "3 Fassaden",
    description:
      "Wählen Sie zwischen klassischem Putz, edlem Kerafront oder Kerafront-Klickfalz – wie bei unseren Großmodellen.",
    href: "/kollektion#fassaden",
    cta: "Fassaden vergleichen",
    highlights: ["Putz", "Kerafront", "Kerafront-Klickfalz"],
    examples: [
      { label: "Lando – Putz", href: "/lando" },
      { label: "Hafen – Kerafront", href: "/hafen" },
      { label: "Kelo – Klickfalz", href: "/kelo" },
    ],
  },
  {
    id: "dachformen",
    title: "3 Dachformen",
    description:
      "Satteldach, Pultdach oder Flachdach – passend zu Grundstück, Region und Ihrem architektonischen Stil.",
    href: "/kollektion#dachformen",
    cta: "Dachformen entdecken",
    highlights: ["Satteldach", "Pultdach", "Flachdach"],
    examples: [
      { label: "Fjord – Satteldach", href: "/fjord" },
      { label: "LakeView – Pultdach", href: "/lakeview" },
      { label: "CurvePod – Flachdach", href: "/curvepod" },
    ],
  },
  {
    id: "stockwerke",
    title: "1 bis 3 Stockwerke",
    description:
      "Einstöckig kompakt, zweistöckig für Familien oder mehrgeschossig für große Projekte und Gewerbe.",
    href: "/kollektion#stockwerke",
    cta: "Geschosse ansehen",
    highlights: ["1 Geschoss", "2 Geschosse", "3+ Geschosse"],
    examples: [
      { label: "Verde – 1 Geschoss", href: "/verde" },
      { label: "Hafen – 2 Geschosse", href: "/hafen" },
      { label: "Fenix – großzügig", href: "/fenix" },
    ],
  },
];

export const kollektionSections = [
  {
    id: "fassaden",
    title: "Drei Fassadenvarianten",
    description:
      "Alle Varianten sind auf unseren Modellhäusern realisiert – Putz für klassische Optik, Kerafront für Keramik-Look, Klickfalz für präzise Fugen.",
    variants: [
      {
        name: "Putz",
        detail: "Klassische, pflegeleichte Außenwand – zeitlos und vielseitig.",
        modelSlug: "lando",
      },
      {
        name: "Kerafront",
        detail: "Keramische Fassadenplatten – edel, robust und wetterbeständig.",
        modelSlug: "hafen",
      },
      {
        name: "Kerafront-Klickfalz",
        detail: "Klickfalz-System für schnelle Montage und klare Linienführung.",
        modelSlug: "kelo",
      },
    ],
  },
  {
    id: "dachformen",
    title: "Drei Dachformen",
    description:
      "Die Dachform prägt Charakter und Raumhöhe – wir beraten Sie zur besten Lösung für Ihr Grundstück.",
    variants: [
      {
        name: "Satteldach",
        detail: "Der Klassiker – optimal für Regenwasser und traditionelle Erscheinung.",
        modelSlug: "fjord",
      },
      {
        name: "Pultdach",
        detail: "Moderne Silhouette mit großer Glasfläche und viel Tageslicht.",
        modelSlug: "lakeview",
      },
      {
        name: "Flachdach",
        detail: "Minimalistisch und urban – ideal für kompakte oder designstarke Häuser.",
        modelSlug: "curvepod",
      },
    ],
  },
  {
    id: "stockwerke",
    title: "Ein bis drei Stockwerke",
    description:
      "Vom Tiny Home bis zum Mehrgeschoss-Projekt – modular skalierbar und schlüsselfertig montiert.",
    variants: [
      {
        name: "1 Geschoss",
        detail: "Kompakt und barrierearm – perfekt bis ca. 45 m² Wohnfläche.",
        modelSlug: "verde",
      },
      {
        name: "2 Geschosse",
        detail: "Mehr Wohnfläche auf kleiner Grundstücksfläche – Familienlösung.",
        modelSlug: "hafen",
      },
      {
        name: "3 Geschosse & mehr",
        detail: "Großprojekte, Mehrfamilienhäuser und Gewerbe – individuell geplant.",
        modelSlug: "fenix",
      },
    ],
  },
] as const;
