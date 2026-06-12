import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { WineggLogo } from "@/components/winegg/WineggLogo";
import { WineggCookieSettingsLink } from "@/components/winegg/WineggCookieSettingsLink";
import { contact, offices, siteConfig } from "@/content/site";

const footerLinks = [
  { label: "Modelle", href: "/v2#modelle" },
  { label: "Preise", href: "/v2#preise" },
  { label: "Kollektion", href: "/kollektion" },
  { label: "Sauna", href: "/sauna" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
] as const;

type Office = (typeof offices)[keyof typeof offices];

const OfficeBlock = ({ office }: { office: Office }) => (
  <div>
    <p className="text-sm font-medium uppercase tracking-widest text-[var(--winegg-gold)]">
      {office.name}
    </p>
    <ul className="mt-3 space-y-2 text-sm text-white/70">
      <li className="flex gap-2">
        <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--winegg-gold)]" />
        <span>
          {office.street}
          <br />
          {office.postalCode} {office.city}
        </span>
      </li>
      <li>
        <a href={office.phoneHref} className="flex gap-2 hover:text-white">
          <Phone className="size-4 text-[var(--winegg-gold)]" />
          {office.phone}
        </a>
      </li>
      <li>
        <a href={`mailto:${office.email}`} className="flex gap-2 hover:text-white">
          <Mail className="size-4 text-[var(--winegg-gold)]" />
          {office.email}
        </a>
      </li>
    </ul>
  </div>
);

export const WineggFooter = () => (
  <footer className="winegg-energy-divider border-t border-[var(--winegg-gray-light)]/30 bg-[var(--winegg-gray-darker)] text-white">
    <div className="mx-auto max-w-[1920px] px-4 py-16 sm:px-8 lg:px-12">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <WineggLogo size={64} />
          <p className="max-w-xs text-center text-sm text-white/60 lg:text-left">
            {siteConfig.tagline}
          </p>
        </div>
        <OfficeBlock office={offices.hq} />
        <OfficeBlock office={offices.west} />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <WineggCookieSettingsLink />
            </li>
          </ul>
          <p className="mt-6 text-sm text-white/50">
            <a href={contact.phoneHref} className="hover:text-white">
              {contact.phone}
            </a>
            {" · "}
            <a href={`mailto:${contact.email}`} className="hover:text-white">
              {contact.email}
            </a>
          </p>
        </nav>
      </div>
      <p className="mt-12 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {siteConfig.legalName}
      </p>
    </div>
  </footer>
);
