import { createMetadata } from "@/content/seo";
import { impressumContent } from "@/content/legal/impressum";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = createMetadata({
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung – VN Modulhaus GmbH.",
  path: "/impressum",
  noIndex: true,
});

export default function ImpressumPage() {
  return (
    <LegalPage
      title={impressumContent.title}
      sections={impressumContent.sections}
    />
  );
}
