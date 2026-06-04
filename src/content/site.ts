export const siteConfig = {
  name: "VN Modulhaus",
  legalName: "VN Modulhaus GmbH",
  tagline: "Modulare Häuser mit modernem Design",
  description:
    "Schlüsselfertige Modulhäuser von 32 m² bis individuell – KfW-Effizienzhaus, Fixpreis, Montage in 90–120 Tagen. Öhringen & Bad Ems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vn-modulhaus.de",
};

export const contact = {
  email: "info@vn-modulhaus.de",
  emailWest: "west@vn-modulhaus.de",
  phone: "+49 794 164 399 82",
  phoneHref: "tel:+4979416439982",
  phoneWest: "+49 177 88 03 472",
  phoneWestOffice: "02603 50 69 557",
};

export const offices = {
  hq: {
    name: "Unternehmenszentrale",
    street: "Ziegeleistraße 16",
    city: "Öhringen",
    postalCode: "74613",
    country: "Deutschland",
    phone: contact.phone,
    phoneHref: contact.phoneHref,
    email: contact.email,
    geo: { latitude: 49.1989, longitude: 9.5056 },
  },
  west: {
    name: "Regionalbüro West",
    street: "Römerstr. 81",
    city: "Bad Ems",
    postalCode: "56130",
    country: "Deutschland",
    phone: contact.phoneWestOffice,
    phoneHref: "tel:+4926035069557",
    phoneMobile: contact.phoneWest,
    phoneMobileHref: "tel:+491778803472",
    email: contact.emailWest,
    geo: { latitude: 50.335, longitude: 7.716 },
  },
} as const;

export const navItems = [
  { label: "Start", href: "/" },
  { label: "Modellhäuser", href: "/#modelle" },
  { label: "Sauna", href: "/sauna" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const modelNavGroups = [
  { label: "Modelle bis 45 m²", href: "/#klein" },
  { label: "Modelle 50–85 m²", href: "/#mittel" },
  { label: "Modelle über 90 m²", href: "/#gross" },
] as const;
