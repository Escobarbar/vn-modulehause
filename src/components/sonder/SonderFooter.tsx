import Link from "next/link";
import { siteConfig, contact } from "@/content/site";
import { sonderNav } from "@/content/pages/sonder-v3";

export const SonderFooter = () => {
  return (
    <footer className="border-t border-[var(--sonder-border)] bg-[var(--sonder-navy)] py-14 text-white/70 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                <span className="font-sonder-display text-sm font-medium text-white">
                  VN
                </span>
              </div>
              <span className="text-sm font-medium tracking-widest text-white uppercase">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-xs leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <p className="sonder-label mb-4 text-white/40">Navigation</p>
            <nav className="flex flex-col gap-2.5">
              {sonderNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="sonder-label mb-4 text-white/40">Kontakt</p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-white"
              >
                {contact.email}
              </a>
              <a
                href={contact.phoneHref}
                className="transition-colors hover:text-white"
              >
                {contact.phone}
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <p className="sonder-label mb-4 text-white/40">Rechtliches</p>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link
                href="/impressum"
                className="transition-colors hover:text-white"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="transition-colors hover:text-white"
              >
                Datenschutz
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <Link href="/" className="transition-colors hover:text-white/60">
            Zur klassischen Website
          </Link>
        </div>
      </div>
    </footer>
  );
};
