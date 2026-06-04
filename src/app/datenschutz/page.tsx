import { createMetadata } from "@/content/seo";
import { datenschutzContent } from "@/content/legal/datenschutz";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = createMetadata({
  noIndex: true,
  title: "Datenschutz",
  description: "Datenschutzerklärung der VN Modulhaus GmbH.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <LegalPage
      title={datenschutzContent.title}
      intro={datenschutzContent.intro}
      sections={datenschutzContent.sections}
    />
  );
}
