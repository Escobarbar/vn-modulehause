import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { contact, offices, siteConfig } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { CookieSettingsLink } from "@/components/layout/CookieSettingsLink";

export const Footer = () => (
  <footer className="mt-16 border-t border-border bg-card">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            {offices.hq.name}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {offices.hq.street}
                <br />
                {offices.hq.postalCode} {offices.hq.city}
              </span>
            </li>
            <li>
              <a
                href={offices.hq.phoneHref}
                className="flex gap-2 hover:text-foreground"
              >
                <Phone className="size-4 text-primary" />
                {offices.hq.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${offices.hq.email}`}
                className="flex gap-2 hover:text-foreground"
              >
                <Mail className="size-4 text-primary" />
                {offices.hq.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            {offices.west.name}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {offices.west.street}
                <br />
                {offices.west.postalCode} {offices.west.city}
              </span>
            </li>
            <li>
              <a
                href={offices.west.phoneHref}
                className="flex gap-2 hover:text-foreground"
              >
                <Phone className="size-4 text-primary" />
                {offices.west.phone}
              </a>
            </li>
            <li>
              <a
                href={offices.west.phoneMobileHref}
                className="flex gap-2 hover:text-foreground"
              >
                <Phone className="size-4 text-primary" />
                {offices.west.phoneMobile}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${offices.west.email}`}
                className="flex gap-2 hover:text-foreground"
              >
                <Mail className="size-4 text-primary" />
                {offices.west.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            Rechtliches
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href="/impressum"
                className="text-muted-foreground hover:text-foreground"
              >
                Impressum
              </Link>
            </li>
            <li>
              <Link
                href="/datenschutz"
                className="text-muted-foreground hover:text-foreground"
              >
                Datenschutz
              </Link>
            </li>
            <li>
              <Link
                href="/kontakt"
                className="text-muted-foreground hover:text-foreground"
              >
                Kontakt
              </Link>
            </li>
            <li>
              <Link
                href="/sauna"
                className="text-muted-foreground hover:text-foreground"
              >
                Sauna
              </Link>
            </li>
            <li>
              <CookieSettingsLink />
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.legalName}. Alle Rechte
          vorbehalten.
        </p>
        <p>
          Modulare Häuser · {contact.phone} ·{" "}
          <a href={`mailto:${contact.email}`} className="hover:text-foreground">
            {contact.email}
          </a>
        </p>
      </div>
    </div>
  </footer>
);
