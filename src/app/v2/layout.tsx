import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { SkipLink } from "@/components/layout/SkipLink";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { WineggHeader } from "@/components/winegg/WineggHeader";
import { WineggFooter } from "@/components/winegg/WineggFooter";
import { WineggContactFab } from "@/components/winegg/WineggContactFab";
import { WineggEnergyToggle } from "@/components/winegg/WineggEnergyToggle";
import "./winegg-theme.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-winegg-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-winegg-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function WineggV2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`theme-winegg min-h-full flex flex-col ${cormorant.variable} ${dmSans.variable}`}
    >
      <SkipLink />
      <WineggHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <WineggFooter />
      <WineggContactFab />
      <WineggEnergyToggle />
      <CookieConsent />
    </div>
  );
}
