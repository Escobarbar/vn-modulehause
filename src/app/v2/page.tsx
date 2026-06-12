import { WineggHero } from "@/components/winegg/WineggHero";
import { WineggProjectSlider } from "@/components/winegg/WineggProjectSlider";
import { WineggModelGrid } from "@/components/winegg/WineggModelGrid";
import { WineggSplitSection } from "@/components/winegg/WineggSplitSection";
import { WineggImageBand } from "@/components/winegg/WineggImageBand";
import { WineggKollektionBand } from "@/components/winegg/WineggKollektionBand";
import { WineggPricingSection } from "@/components/winegg/WineggPricingSection";
import { WineggProcessSection } from "@/components/winegg/WineggProcessSection";
import { WineggTextSection } from "@/components/winegg/WineggTextSection";
import { WineggFaqSection } from "@/components/winegg/WineggFaqSection";
import { WineggNewsSection } from "@/components/winegg/WineggNewsSection";
import { WineggCtaBand } from "@/components/winegg/WineggCtaBand";
import { JsonLd } from "@/components/layout/JsonLd";
import { faqJsonLd } from "@/content/seo";
import { faqs } from "@/content/pages/home";
import { createMetadata } from "@/content/seo";

export const metadata = createMetadata({
  path: "/v2",
  title: "VN Home – Modulhäuser",
  description:
    "Schlüsselfertige Modulhäuser von 30 bis 440 m² – KfW 55, Fixpreis, Montage in 90 Tagen. Premium-Erlebnis von VN Home.",
});

export default function WineggV2Page() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <WineggHero />
      <WineggProjectSlider />
      <WineggModelGrid />
      <WineggSplitSection />
      <WineggImageBand />
      <WineggKollektionBand />
      <WineggPricingSection />
      <WineggProcessSection />
      <WineggTextSection />
      <WineggFaqSection />
      <WineggNewsSection />
      <WineggCtaBand />
    </>
  );
}
