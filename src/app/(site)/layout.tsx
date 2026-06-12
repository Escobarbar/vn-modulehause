import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { JsonLd } from "@/components/layout/JsonLd";
import { localBusinessJsonLd, websiteJsonLd } from "@/content/seo";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SkipLink />
      <JsonLd data={[localBusinessJsonLd(), websiteJsonLd()]} />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
