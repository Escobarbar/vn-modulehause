import { SonderHero } from "@/components/sonder/SonderHero";
import { SonderAbout } from "@/components/sonder/SonderAbout";
import { SonderFeatures } from "@/components/sonder/SonderFeatures";
import { SonderModelGrid } from "@/components/sonder/SonderModelGrid";
import { SonderWhyChoose } from "@/components/sonder/SonderWhyChoose";
import { SonderProcess } from "@/components/sonder/SonderProcess";
import { SonderFaq } from "@/components/sonder/SonderFaq";
import { SonderCta } from "@/components/sonder/SonderCta";
import { JsonLd } from "@/components/layout/JsonLd";
import {
  createMetadata,
  faqJsonLd,
  localBusinessJsonLd,
  organizationJsonLd,
} from "@/content/seo";
import { faqs } from "@/content/pages/home";

export const metadata = createMetadata({
  path: "/v3",
  title: "VN Modulhaus – Sonder Edition",
  description:
    "Schlüsselfertige Modulhäuser von 30 bis 440 m² – KfW 55, Fixpreis, Montage in 90 Tagen. Wo Ruhe auf modernes Wohnen trifft.",
  image: "/media/home/hero.jpeg",
});

export default function SonderV3Page() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(faqs)} />
      <SonderHero />
      <SonderAbout />
      <SonderFeatures />
      <SonderModelGrid />
      <SonderWhyChoose />
      <SonderProcess />
      <SonderFaq />
      <SonderCta />
    </>
  );
}
