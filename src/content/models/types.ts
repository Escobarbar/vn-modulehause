export type ModelCategory =
  | "klein"
  | "mittel"
  | "gross"
  | "camping"
  | "sauna";

export type HouseModel = {
  slug: string;
  name: string;
  category: ModelCategory;
  livingAreaM2: number;
  totalAreaM2?: number;
  dimensions?: string;
  priceFromEur: number;
  pricePerM2Eur: number;
  specs: {
    modules: number;
    rooms: number;
    bathrooms: number;
  };
  kfw: "55" | "40";
  pdfs: { label: string; href: string }[];
  images: { src: string; alt: string }[];
  tagline?: string;
  seo: { title: string; description: string };
};
