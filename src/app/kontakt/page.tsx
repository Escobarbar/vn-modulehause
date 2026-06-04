import { createMetadata } from "@/content/seo";
import { offices } from "@/content/site";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MapPin, Mail, Phone } from "lucide-react";

export const metadata = createMetadata({
  title: "Kontakt",
  description:
    "Kontaktieren Sie VN Modulhaus – Beratung, Kostenvoranschlag, Standorte Öhringen und Bad Ems.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Beratung anfordern"
          description="Hinterlassen Sie Ihre Kontaktdaten – wir melden uns persönlich bei Ihnen."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <ConsultationForm />

          <div className="space-y-8">
            {[offices.hq, offices.west].map((office) => (
              <div
                key={office.name}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {office.name}
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <MapPin className="size-4 shrink-0 text-primary" />
                    {office.street}, {office.postalCode} {office.city}
                  </li>
                  <li>
                    <a
                      href={office.phoneHref}
                      className="flex gap-2 hover:text-foreground"
                    >
                      <Phone className="size-4 text-primary" />
                      {office.phone}
                    </a>
                  </li>
                  {"phoneMobile" in office && office.phoneMobile && (
                    <li>
                      <a
                        href={office.phoneMobileHref}
                        className="flex gap-2 hover:text-foreground"
                      >
                        <Phone className="size-4 text-primary" />
                        {office.phoneMobile}
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      href={`mailto:${office.email}`}
                      className="flex gap-2 hover:text-foreground"
                    >
                      <Mail className="size-4 text-primary" />
                      {office.email}
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
