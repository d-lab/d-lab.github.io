#!/usr/bin/env node

// Creates web-sized WebP copies of gallery and blog photographs.
// Originals stay untouched in public/images; copies go to public/images/web
// and their dimensions to data/generated/images.json. Runs before dev and build.

const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUTPUT_DIR = path.join(PUBLIC_DIR, "images", "web");
const MANIFEST_PATH = path.join(ROOT, "data", "generated", "images.json");
const SOURCE_FOLDERS = ["group_pics", "blog"];
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const MAX_WIDTH = 1600;
const QUALITY = 78;
// The homepage hero spans the full screen width, so it gets a larger, higher-quality copy
// that stays sharp on 4K and high-density displays.
const HERO_WIDTH = 3840;
const HERO_QUALITY = 85;
const GALLERY_PATH = path.join(ROOT, "data", "gallery.json");
// Copies are regenerated whenever these settings change.
const SETTINGS_PATH = path.join(ROOT, "data", "generated", "image-settings.json");
const SETTINGS = JSON.stringify({ MAX_WIDTH, QUALITY, HERO_WIDTH, HERO_QUALITY, keepIccProfile: true });

let forceRegenerate = false;

const isNewer = async (source, target) => {
  if (forceRegenerate) return true;
  try {
    const [sourceStats, targetStats] = await Promise.all([fs.stat(source), fs.stat(target)]);
    return sourceStats.mtimeMs > targetStats.mtimeMs;
  } catch {
    return true;
  }
};

const optimizeImage = async (folder, filename, { maxWidth = MAX_WIDTH, quality = QUALITY, suffix = "" } = {}) => {
  const sourcePath = path.join(PUBLIC_DIR, "images", folder, filename);
  const outputName = `${path.parse(filename).name}${suffix}.webp`;
  const outputPath = path.join(OUTPUT_DIR, folder, outputName);

  if (await isNewer(sourcePath, outputPath)) {
    await sharp(sourcePath)
      .rotate()
      .resize({ width: maxWidth, height: maxWidth, fit: "inside", withoutEnlargement: true })
      // Phone photos use the wide Display P3 colour space; keeping their profile
      // preserves the original colours instead of converting them to duller sRGB.
      .keepIccProfile()
      .webp({ quality })
      .toFile(outputPath);
  }

  const { width, height } = await sharp(outputPath).metadata();

  return [
    `/images/${folder}/${filename}${suffix ? `#${suffix.slice(1)}` : ""}`,
    { src: `/images/web/${folder}/${outputName}`, width, height },
  ];
};

async function main() {
  const manifest = {};
  const previousSettings = await fs.readFile(SETTINGS_PATH, "utf8").catch(() => "");
  forceRegenerate = previousSettings !== SETTINGS;

  for (const folder of SOURCE_FOLDERS) {
    await fs.mkdir(path.join(OUTPUT_DIR, folder), { recursive: true });
    const filenames = (await fs.readdir(path.join(PUBLIC_DIR, "images", folder)))
      .filter((filename) => SUPPORTED_EXTENSIONS.has(path.extname(filename).toLowerCase()))
      .sort();

    for (const filename of filenames) {
      const [key, entry] = await optimizeImage(folder, filename);
      manifest[key] = entry;
    }
  }

  const { hero } = JSON.parse(await fs.readFile(GALLERY_PATH, "utf8"));
  const [heroKey, heroEntry] = await optimizeImage("group_pics", hero.file, {
    maxWidth: HERO_WIDTH,
    quality: HERO_QUALITY,
    suffix: "-hero",
  });
  manifest[heroKey] = heroEntry;

  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  await fs.writeFile(SETTINGS_PATH, SETTINGS, "utf8");
  console.log(`Optimized images ready: ${Object.keys(manifest).length} files${forceRegenerate ? " (all regenerated)" : ""}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
