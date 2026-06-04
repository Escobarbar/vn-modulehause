import { models } from "@/content/models";
import { contact, offices, siteConfig } from "@/content/site";

export function GET() {
  const modelList = models
    .map((m) => `- ${m.name} (${m.livingAreaM2} m²): ${siteConfig.url}/${m.slug}`)
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

## Unternehmen
${siteConfig.legalName} fertigt schlüsselfertige Modulhäuser und modulare Saunen in Deutschland.

## Standorte
- ${offices.hq.name}: ${offices.hq.street}, ${offices.hq.postalCode} ${offices.hq.city}. Tel: ${offices.hq.phone}. E-Mail: ${offices.hq.email}
- ${offices.west.name}: ${offices.west.street}, ${offices.west.postalCode} ${offices.west.city}. Tel: ${offices.west.phone}. E-Mail: ${offices.west.email}

## Kontakt
- Telefon: ${contact.phone}
- E-Mail: ${contact.email}
- Website: ${siteConfig.url}

## Leistungen
- Modulhäuser von ca. 30 m² bis über 400 m²
- Schlüsselfertig inkl. Lieferung und Montage
- KfW-Effizienzhaus 55
- Fertigstellung typischerweise in 90–120 Tagen
- Modulare Saunen für Privat und Gewerbe

## Modellübersicht
${modelList}

## Wichtige Seiten
- Startseite: ${siteConfig.url}/
- Hauskollektion 2026 (Fassaden, Dächer, Geschosse): ${siteConfig.url}/kollektion
- Sauna: ${siteConfig.url}/sauna
- Kontakt: ${siteConfig.url}/kontakt
- Über uns: ${siteConfig.url}/ueber-uns
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
