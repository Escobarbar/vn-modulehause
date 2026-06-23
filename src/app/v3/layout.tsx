import { DM_Serif_Display, Inter, Inter_Tight } from "next/font/google";
import { SkipLink } from "@/components/layout/SkipLink";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { SonderHeader } from "@/components/sonder/SonderHeader";
import { SonderFooter } from "@/components/sonder/SonderFooter";
import "./sonder-theme.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-sonder-display",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-sonder-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const interTight = Inter_Tight({
  variable: "--font-sonder-hero",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function SonderV3Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`theme-sonder min-h-full flex flex-col ${dmSerif.variable} ${inter.variable} ${interTight.variable}`}
    >
      <SkipLink />
      <SonderHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SonderFooter />
      <CookieConsent />
    </div>
  );
}
