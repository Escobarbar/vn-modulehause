/**
 * Repairs model hero images that are placeholders (e.g. tildacopy 40×40).
 * Run: npm run fix:heroes
 */
import { copyFile, readFile, stat, unlink, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

const MIN_HERO_BYTES = 20_000;
const manifestPath = join(process.cwd(), "content", "media-manifest.json");

type Manifest = {
  migratedAt: string;
  home: unknown;
  models: Record<
    string,
    { hero: string | null; interior: string | null; gallery: string[]; pdfs: string[] }
  >;
};

async function fileSize(rel: string): Promise<number> {
  try {
    const s = await stat(join(process.cwd(), "public", rel.replace(/^\//, "")));
    return s.size;
  } catch {
    return 0;
  }
}

async function main() {
  const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as Manifest;
  let fixed = 0;

  for (const [slug, media] of Object.entries(manifest.models)) {
    if (!media.hero) continue;
    const size = await fileSize(media.hero);
    if (size >= MIN_HERO_BYTES) continue;

    const source = media.gallery[0];
    if (!source) {
      console.warn(`${slug}: tiny hero, no gallery fallback`);
      continue;
    }

    const ext = extname(source);
    const newHero = `/models/${slug}/hero${ext}`;
    const srcAbs = join(process.cwd(), "public", source.replace(/^\//, ""));
    const destAbs = join(process.cwd(), "public", newHero.replace(/^\//, ""));

    await copyFile(srcAbs, destAbs);
    if (media.hero !== newHero) {
      try {
        await unlink(join(process.cwd(), "public", media.hero.replace(/^\//, "")));
      } catch {
        /* */
      }
    }
    media.hero = newHero;
    fixed++;
    console.log(`${slug}: hero → ${newHero} (from ${source})`);
  }

  manifest.migratedAt = new Date().toISOString();
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nFixed ${fixed} hero image(s).`);
}

main();
