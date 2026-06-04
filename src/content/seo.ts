import type { Metadata } from "next";
import { contact, offices, siteConfig } from "./site";
import type { HouseModel } from "./models/types";

const baseUrl = siteConfig.url;

export function createMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} – ${siteConfig.tagline}`;
  const desc = description ?? siteConfig.description;
  const url = `${baseUrl}${path}`;
  const ogImage = image?.startsWith("http")
    ? image
    : image
      ? `${baseUrl}${image}`
      : `${baseUrl}/og-default.jpg`;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(baseUrl),
    alternates: { canonical: path || "/" },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: siteConfig.name,
      locale: "de_DE",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}#organization`,
    name: siteConfig.legalName,
    url: baseUrl,
    logo: `${baseUrl}/logo-vn.png`,
    email: contact.email,
    telephone: contact.phone,
  };
}

function localBusinessOffice(
  office: (typeof offices)[keyof typeof offices],
  id: string,
) {
  return {
    "@type": "HomeAndConstructionBusiness",
    "@id": `${baseUrl}#${id}`,
    name: `${siteConfig.name} – ${office.name}`,
    image: `${baseUrl}/og-default.jpg`,
    url: baseUrl,
    telephone: office.phone,
    email: office.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.street,
      addressLocality: office.city,
      postalCode: office.postalCode,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: office.geo.latitude,
      longitude: office.geo.longitude,
    },
    areaServed: {
      "@type": "Country",
      name: "Deutschland",
    },
    priceRange: "€€€",
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      localBusinessOffice(offices.hq, "hq"),
      localBusinessOffice(offices.west, "west"),
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    inLanguage: "de-DE",
    publisher: { "@id": `${baseUrl}#organization` },
  };
}

export function productJsonLd(model: HouseModel) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: model.name,
    description: model.seo.description,
    image: model.images[0]?.src
      ? `${baseUrl}${model.images[0].src}`
      : `${baseUrl}/og-default.jpg`,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      price: model.priceFromEur,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/${model.slug}`,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Wohnfläche",
        value: `${model.livingAreaM2} m²`,
      },
      {
        "@type": "PropertyValue",
        name: "KfW",
        value: `Effizienzhaus ${model.kfw}`,
      },
    ],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };
}

export function faqJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
