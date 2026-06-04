/**
 * Migrates images, videos and PDF links from vn-modulhaus.de (Tilda)
 * Run: npm run migrate:assets
 */
import { copyFile, mkdir, stat, unlink, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

const BASE = "https://vn-modulhaus.de";
const CDN = "https://static.tildacdn.net";

/** Our slug -> live page path on Tilda */
const MODEL_PAGES: Record<string, string> = {
  aqua: "aqua",
  anker: "anker",
  arest: "arest",
  boreal: "boreal",
  bushome: "bushome",
  chiilout: "chiilout",
  chillneo: "chillneo",
  communicate: "communicate",
  cube: "cube",
  curvepod: "curvepod",
  diamond: "diamond",
  fenix: "fenix",
  fjord: "fjord",
  glory: "glory",
  hafen: "hafen",
  heady: "heady",
  igloo: "igloo",
  isos: "isos",
  jurgen: "jurgen",
  kelo: "kelo",
  lakeview: "lakeview",
  lando: "lando",
  ligna: "ligna",
  martin: "martin",
  nebuda: "nebuda",
  nest: "nest",
  niapol: "niapol",
  sylph: "sylph",
  terrahome: "terrahome",
  thermis: "thermis",
  timber: "timber",
  tores: "tores",
  ventara: "ventara",
  verde: "verde",
  vespera: "vespera",
  vulcano: "vulcano",
  warm: "warm",
};

const EXTRA_PAGES = ["", "sauna", "flexibel-individuell"];

type PageMedia = {
  /** Unique URLs, gallery order preserved where possible */
  images: string[];
  /** data-original URLs in DOM order (best for hero/gallery) */
  orderedOriginals: string[];
  pdfs: string[];
  videos: string[];
};

const MIN_HERO_BYTES = 20_000;

function isDecorativeImage(url: string): boolean {
  const lower = url.toLowerCase();
  return (
    lower.includes("/lib/") ||
    lower.includes("tildacopy") ||
    lower.includes("logo_vn") ||
    lower.includes("/logo") ||
    lower.includes("frame_151") ||
    lower.includes("/-/empty/") ||
    lower.includes("/resizeb/20x") ||
    lower.endsWith(".svg")
  );
}

type Manifest = {
  migratedAt: string;
  home: {
    heroImage: string | null;
    heroVideo: string | null;
    images: string[];
  };
  models: Record<
    string,
    {
      hero: string | null;
      gallery: string[];
      interior: string | null;
      pdfs: string[];
    }
  >;
};

async function fetchHtml(path: string): Promise<string> {
  const url = path ? `${BASE}/${path}` : BASE;
  const res = await fetch(url, {
    headers: { "User-Agent": "VN-Asset-Migration/2.0" },
  });
  if (!res.ok) throw new Error(`${path || "/"}: HTTP ${res.status}`);
  return res.text();
}

function extractMedia(html: string): PageMedia {
  const images = new Set<string>();
  const orderedOriginals: string[] = [];
  const seenOriginals = new Set<string>();
  const pdfs = new Set<string>();
  const videos = new Set<string>();

  for (const m of html.matchAll(/data-original="(https:\/\/static\.tildacdn\.net\/[^"]+)"/gi)) {
    const url = m[1];
    if (isDecorativeImage(url)) continue;
    if (!seenOriginals.has(url)) {
      seenOriginals.add(url);
      orderedOriginals.push(url);
    }
    images.add(url);
  }

  for (const m of html.matchAll(
    /https:\/\/static\.tildacdn\.net\/tild[a-f0-9-]+\/[^"'<>\s]+\.(?:jpe?g|png|webp)/gi,
  )) {
    const url = m[0].split(" ")[0];
    if (!isDecorativeImage(url)) {
      images.add(url);
    }
  }

  for (const m of html.matchAll(/href="(https:\/\/drive\.google\.com\/[^"]+)"/gi)) {
    pdfs.add(m[1]);
  }

  for (const m of html.matchAll(
    /(?:src|href)="(https?:\/\/[^"]+\.(?:mp4|mov|webm)[^"]*)"/gi,
  )) {
    videos.add(m[1].replace(/&amp;/g, "&"));
  }

  return {
    images: [...images],
    orderedOriginals,
    pdfs: [...pdfs],
    videos: [...videos],
  };
}

function pickHero(
  images: string[],
  orderedOriginals: string[],
  slug: string,
): string | null {
  const photo = (u: string) => /\.jpe?g$/i.test(u) || /webp$/i.test(u);
  const fromOrder = orderedOriginals.find(
    (u) => !isDecorativeImage(u) && photo(u),
  );
  if (fromOrder) return fromOrder;

  const name = slug.replace(/-/g, "").toLowerCase();
  const scored = images
    .filter((u) => !isDecorativeImage(u))
    .map((url) => {
      const lower = url.toLowerCase();
      let score = 0;
      if (lower.includes("3d") || lower.includes("_in.png")) score += 10;
      if (lower.includes(name)) score += 8;
      if (lower.includes("photo_")) score += 5;
      if (lower.includes("universal_upscale")) score += 4;
      if (/\.jpe?g$/i.test(url)) score += 6;
      if (lower.endsWith(".webp")) score += 4;
      if (lower.endsWith(".png")) score -= 6;
      return { url, score };
    })
    .sort((a, b) => b.score - a.score);
  const best = scored[0]?.url;
  if (best && !isDecorativeImage(best)) return best;
  return images.find((u) => !isDecorativeImage(u) && photo(u)) ?? null;
}

function pickInterior(images: string[]): string | null {
  return (
    images.find(
      (u) =>
        !isDecorativeImage(u) &&
        /photo_|\.jpe?g/i.test(u) &&
        !/3d|_in\.png/i.test(u),
    ) ?? null
  );
}

function pickGallery(
  orderedOriginals: string[],
  images: string[],
  exclude: Set<string>,
  limit = 4,
): string[] {
  const pool = [
    ...orderedOriginals,
    ...images.filter((u) => !orderedOriginals.includes(u)),
  ];
  const out: string[] = [];
  for (const url of pool) {
    if (exclude.has(url) || isDecorativeImage(url)) continue;
    if (!/\.(?:jpe?g|webp|png)$/i.test(url)) continue;
    if (out.includes(url)) continue;
    out.push(url);
    if (out.length >= limit) break;
  }
  return out;
}

async function publicFileSize(relPath: string): Promise<number> {
  try {
    const s = await stat(join(process.cwd(), "public", relPath.replace(/^\//, "")));
    return s.size;
  } catch {
    return 0;
  }
}

async function download(url: string, dest: string) {
  const res = await fetch(url, {
    headers: { "User-Agent": "VN-Asset-Migration/2.0" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(join(dest, ".."), { recursive: true });
  await writeFile(dest, buf);
}

function localPath(...parts: string[]) {
  return "/" + parts.join("/");
}

async function saveImage(
  url: string,
  filePath: string,
): Promise<string | null> {
  try {
    const ext = extname(new URL(url).pathname) || ".jpg";
    const dest = join(process.cwd(), "public", filePath + ext);
    await download(url, dest);
    return localPath(filePath + ext);
  } catch (e) {
    console.warn(`  skip image: ${url}`, e);
    return null;
  }
}

async function saveVideo(url: string, destRel: string) {
  try {
    const u = new URL(url);
    let dl = url;
    if (u.hostname.includes("dropbox")) {
      dl = url.replace("dl=0", "dl=1");
    }
    const ext = extname(u.pathname) || ".mp4";
    const dest = join(process.cwd(), "public", destRel + ext);
    await download(dl, dest);
    return localPath(destRel + ext);
  } catch (e) {
    console.warn(`  skip video:`, e);
    return null;
  }
}

async function main() {
  const manifest: Manifest = {
    migratedAt: new Date().toISOString(),
    home: { heroImage: null, heroVideo: null, images: [] },
    models: {},
  };

  console.log("Homepage…");
  const homeHtml = await fetchHtml("");
  const homeMedia = extractMedia(homeHtml);
  const homeHeroUrl =
    homeMedia.images.find((u) => u.includes("photo_2026")) ??
    homeMedia.images.find((u) => u.includes("photo_")) ??
    homeMedia.images[0];

  if (homeHeroUrl) {
    manifest.home.heroImage = await saveImage(
      homeHeroUrl,
      "media/home/hero",
    );
  }

  const homeVideoUrl = homeMedia.videos[0];
  if (homeVideoUrl) {
    manifest.home.heroVideo = await saveVideo(
      homeVideoUrl,
      "media/home/hero-video",
    );
  }

  for (const slug of Object.keys(MODEL_PAGES)) {
    const path = MODEL_PAGES[slug];
    console.log(`\n${slug} (${path})…`);
    try {
      const html = await fetchHtml(path);
      const media = extractMedia(html);
      const heroUrl = pickHero(media.images, media.orderedOriginals, slug);
      const interiorUrl = pickInterior(media.images);
      const exclude = new Set(
        [heroUrl, interiorUrl].filter((u): u is string => Boolean(u)),
      );

      const hero = heroUrl
        ? await saveImage(heroUrl, `models/${slug}/hero`)
        : null;
      const interior = interiorUrl
        ? await saveImage(interiorUrl, `models/${slug}/interior`)
        : null;

      const gallery: string[] = [];
      const extra = pickGallery(media.orderedOriginals, media.images, exclude);
      for (let i = 0; i < extra.length; i++) {
        const saved = await saveImage(extra[i], `models/${slug}/gallery-${i + 1}`);
        if (saved) gallery.push(saved);
      }

      let heroFinal = hero;
      if (heroFinal && (await publicFileSize(heroFinal)) < MIN_HERO_BYTES) {
        const fallbackUrl = extra[0];
        if (fallbackUrl) {
          const saved = await saveImage(fallbackUrl, `models/${slug}/hero`);
          if (saved) {
            if (heroFinal !== saved) {
              try {
                await unlink(
                  join(process.cwd(), "public", heroFinal.replace(/^\//, "")),
                );
              } catch {
                /* old tiny hero */
              }
            }
            heroFinal = saved;
          }
        } else if (gallery[0]) {
          const ext = extname(gallery[0]);
          const heroRel = localPath("models", slug, `hero${ext}`);
          await copyFile(
            join(process.cwd(), "public", gallery[0].replace(/^\//, "")),
            join(process.cwd(), "public", heroRel.replace(/^\//, "")),
          );
          if (heroFinal !== heroRel) {
            try {
              await unlink(
                join(process.cwd(), "public", heroFinal.replace(/^\//, "")),
              );
            } catch {
              /* */
            }
          }
          heroFinal = heroRel;
        }
      }

      manifest.models[slug] = {
        hero: heroFinal,
        interior,
        gallery,
        pdfs: media.pdfs,
      };
      console.log(
        `  hero: ${heroFinal ?? "—"}, gallery: ${gallery.length}, pdfs: ${media.pdfs.length}`,
      );
    } catch (e) {
      console.error(`  failed:`, e);
      manifest.models[slug] = {
        hero: null,
        interior: null,
        gallery: [],
        pdfs: [],
      };
    }
  }

  console.log("\nSauna page extras…");
  try {
    const saunaHtml = await fetchHtml("sauna");
    const saunaMedia = extractMedia(saunaHtml);
    const saunaHeroUrl =
      saunaMedia.orderedOriginals.find((u) => /\.jpe?g$/i.test(u)) ??
      pickHero(saunaMedia.images, saunaMedia.orderedOriginals, "sauna");
    if (saunaHeroUrl) {
      await saveImage(saunaHeroUrl, "media/sauna/hero");
    }
  } catch (e) {
    console.warn("  sauna:", e);
  }

  const manifestPath = join(process.cwd(), "content", "media-manifest.json");
  await mkdir(join(process.cwd(), "content"), { recursive: true });
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nWrote ${manifestPath}`);
}

main();
