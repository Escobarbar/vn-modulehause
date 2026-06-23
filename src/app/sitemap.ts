import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { modelSlugs } from "@/content/models";

const staticRoutes = [
  "",
  "/v3",
  "/sauna",
  "/kontakt",
  "/ueber-uns",
  "/kollektion",
  "/impressum",
  "/datenschutz",
];

/** Stable date for sitemap lastModified (update on major content releases). */
const CONTENT_UPDATED = new Date("2026-06-04");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = CONTENT_UPDATED;

  const staticEntries = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified,
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : route === "/v3" ? 0.9 : 0.8,
  }));

  const modelEntries = modelSlugs.map((slug) => ({
    url: `${base}/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...modelEntries];
}
