/**
 * Verifies that all paths in content/media-manifest.json exist under public/.
 * Run: npm run verify:assets
 */
import { access, stat } from "node:fs/promises";
import { join } from "node:path";

const MIN_HERO_BYTES = 20_000;
import manifest from "../content/media-manifest.json";

const publicDir = join(process.cwd(), "public");

async function exists(relPath: string): Promise<boolean> {
  if (!relPath.startsWith("/")) return false;
  try {
    await access(join(publicDir, relPath.slice(1)));
    return true;
  } catch {
    return false;
  }
}

async function heroBytes(relPath: string): Promise<number> {
  try {
    const s = await stat(join(publicDir, relPath.slice(1)));
    return s.size;
  } catch {
    return 0;
  }
}

async function main() {
  const missing: string[] = [];
  const tinyHeroes: string[] = [];

  const homePaths = [
    manifest.home.heroImage,
    manifest.home.heroVideo,
    ...manifest.home.images,
  ].filter((p): p is string => Boolean(p));

  for (const p of homePaths) {
    if (!(await exists(p))) missing.push(p);
  }

  const saunaHero = "/media/sauna/hero.jpeg";
  if (!(await exists(saunaHero))) missing.push(saunaHero);

  for (const [slug, media] of Object.entries(manifest.models)) {
    const paths = [media.hero, media.interior, ...media.gallery].filter(
      (p): p is string => Boolean(p),
    );
    for (const p of paths) {
      if (!(await exists(p))) missing.push(`${slug}: ${p}`);
    }
    if (media.hero) {
      const bytes = await heroBytes(media.hero);
      if (bytes > 0 && bytes < MIN_HERO_BYTES) {
        tinyHeroes.push(`${slug}: ${media.hero} (${bytes} B)`);
      }
    }
  }

  const ogDefault = "/og-default.jpg";
  if (!(await exists(ogDefault))) missing.push(ogDefault);

  const logo = "/logo-vn.png";
  if (!(await exists(logo))) missing.push(logo);
  else {
    const bytes = await heroBytes(logo);
    if (bytes > 0 && bytes < MIN_HERO_BYTES) {
      tinyHeroes.push(`logo: ${logo} (${bytes} B)`);
    }
  }

  if (tinyHeroes.length > 0) {
    console.error(`Placeholder hero image(s) (${tinyHeroes.length}):`);
    tinyHeroes.forEach((m) => console.error(`  - ${m}`));
    console.error("Run: npm run fix:heroes");
    process.exit(1);
  }

  if (missing.length > 0) {
    console.error(`Missing ${missing.length} asset(s):`);
    missing.slice(0, 30).forEach((m) => console.error(`  - ${m}`));
    if (missing.length > 30) {
      console.error(`  ... and ${missing.length - 30} more`);
    }
    process.exit(1);
  }

  console.log(
    `OK: ${Object.keys(manifest.models).length} models, home media, og-default, logo`,
  );
}

main();
