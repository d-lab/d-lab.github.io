#!/usr/bin/env node

// Removes full-size originals from the static export after `next build`.
// Pages only load the web-sized copies listed in data/generated/images.json,
// so the originals stay in the repo (to regenerate copies) but are not published.

const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out");
const MANIFEST_PATH = path.join(ROOT, "data", "generated", "images.json");
const TEXT_EXTENSIONS = new Set([".html", ".txt", ".xml", ".js", ".json", ".css"]);

const listFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
    }),
  );
  return nested.flat();
};

async function main() {
  const manifest = JSON.parse(await fs.readFile(MANIFEST_PATH, "utf8"));
  // Keys look like "/images/blog/photo.jpg" or "/images/group_pics/hero.png#hero".
  const originals = [...new Set(Object.keys(manifest).map((key) => key.split("#")[0]))];

  let removedBytes = 0;
  for (const original of originals) {
    const exportedPath = path.join(OUT_DIR, original);
    try {
      removedBytes += (await fs.stat(exportedPath)).size;
      await fs.rm(exportedPath);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }

  // Fail the build if any exported file still points at a removed original.
  const textFiles = (await listFiles(OUT_DIR)).filter((file) => TEXT_EXTENSIONS.has(path.extname(file)));
  const brokenReferences = [];
  for (const file of textFiles) {
    const contents = await fs.readFile(file, "utf8");
    for (const original of originals) {
      if (contents.includes(original.slice(1))) {
        brokenReferences.push(`${path.relative(OUT_DIR, file)} -> ${original}`);
      }
    }
  }

  if (brokenReferences.length > 0) {
    console.error("These exported files reference originals removed from the export:");
    brokenReferences.forEach((reference) => console.error(`  ${reference}`));
    process.exit(1);
  }

  console.log(`Removed ${originals.length} original images (${(removedBytes / 1024 / 1024).toFixed(1)} MB) from out/.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
