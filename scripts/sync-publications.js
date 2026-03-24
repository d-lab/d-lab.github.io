#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const { execFile } = require("node:child_process");
const { promisify } = require("node:util");

const SOURCE_URL = "https://www.gianlucademartini.net/?page=pubs";
const OUTPUT_PATH = path.join(__dirname, "..", "data", "publications.json");
const MIN_PUBLICATION_YEAR = 2014;
const execFileAsync = promisify(execFile);

let decodeHTML = null;
try {
  ({ decodeHTML } = require("entities"));
} catch {
  decodeHTML = null;
}

const FALLBACK_ENTITIES = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  quot: "\"",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  hellip: "…",
  middot: "·",
  laquo: "«",
  raquo: "»",
  ouml: "ö",
  Ouml: "Ö",
  uuml: "ü",
  Uuml: "Ü",
  auml: "ä",
  Auml: "Ä",
  oslash: "ø",
  Oslash: "Ø",
  eacute: "é",
  Eacute: "É",
  ecirc: "ê",
  Ecirc: "Ê",
  ntilde: "ñ",
  Ntilde: "Ñ",
  szlig: "ß",
};

const HELP_TEXT = `
Synchronize data/publications.json with the publications page from ${SOURCE_URL}.
The script writes a full snapshot each run and only keeps publications from ${MIN_PUBLICATION_YEAR} onwards.

Usage:
  node scripts/sync-publications.js [--dry-run]

Options:
  --dry-run   Parse and validate only. Do not overwrite data/publications.json.
  --help      Show this help text.
`.trim();

function decodeHtmlEntities(value) {
  if (decodeHTML) {
    return decodeHTML(value);
  }

  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]+);/g, (match, entity) => {
    if (entity.startsWith("#")) {
      const isHex = entity[1].toLowerCase() === "x";
      const numeric = entity.slice(isHex ? 2 : 1);
      const codePoint = parseInt(numeric, isHex ? 16 : 10);

      if (Number.isNaN(codePoint)) {
        return match;
      }

      try {
        return String.fromCodePoint(codePoint);
      } catch {
        return match;
      }
    }

    return Object.prototype.hasOwnProperty.call(FALLBACK_ENTITIES, entity)
      ? FALLBACK_ENTITIES[entity]
      : match;
  });
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeCitation(value) {
  let citation = value;
  citation = citation.replace(/\s+([,.;:!?])/g, "$1");
  citation = citation.replace(/([([{])\s+/g, "$1");
  citation = citation.replace(/\s+([)\]}])/g, "$1");
  citation = normalizeWhitespace(citation);

  if (citation.length > 0 && !/[.!?]$/.test(citation)) {
    citation = `${citation}.`;
  }

  return citation;
}

function makeAbsoluteUrl(url) {
  try {
    return new URL(url, SOURCE_URL).href;
  } catch {
    return undefined;
  }
}

function extractPdfUrl(publicationHtml) {
  const pdfMatch = publicationHtml.match(/<a\b[^>]*href=["']([^"']+)["'][^>]*>\s*pdf\s*<\/a>/i);
  if (!pdfMatch) {
    return undefined;
  }

  const href = decodeHtmlEntities(pdfMatch[1].trim());
  return makeAbsoluteUrl(href);
}

function extractCitation(publicationHtml) {
  const preLinksHtml = publicationHtml.replace(/<br\s*\/?>[\s\S]*$/i, " ");
  const withoutTags = preLinksHtml.replace(/<[^>]+>/g, " ");
  const decoded = decodeHtmlEntities(withoutTags);
  const withoutBracketLabels = decoded.replace(/\[[^\]]*]/g, " ");
  return normalizeCitation(withoutBracketLabels);
}

function parsePublications(html) {
  const sectionMatches = [
    ...html.matchAll(
      /<h2 id=["']subtitle["']>\s*Publication List\s*<\/h2>\s*<div id=["']fb-root["']>([\s\S]*?)<\/div>/gi,
    ),
  ];

  if (sectionMatches.length === 0) {
    throw new Error("Could not find the publication list section in the fetched page.");
  }

  const parsedEntries = [];

  for (const [, sectionHtml] of sectionMatches) {
    const yearRegex = /<strong>\s*(\d{4})\s*<\/strong>[\s\S]*?<ul>([\s\S]*?)<\/ul>/gi;
    let yearMatch = yearRegex.exec(sectionHtml);

    while (yearMatch) {
      const year = Number(yearMatch[1]);
      if (Number.isNaN(year) || year < MIN_PUBLICATION_YEAR) {
        yearMatch = yearRegex.exec(sectionHtml);
        continue;
      }

      const listHtml = yearMatch[2];
      const itemRegex = /<li\b[^>]*itemtype=["']http:\/\/schema\.org\/ScholarlyArticle["'][^>]*>([\s\S]*?)<\/li>/gi;
      let itemMatch = itemRegex.exec(listHtml);

      while (itemMatch) {
        const publicationHtml = itemMatch[1];
        const citation = extractCitation(publicationHtml);
        const pdfUrl = extractPdfUrl(publicationHtml);

        if (citation) {
          const publication = { citation };
          if (pdfUrl) {
            publication.pdfLabel = "[pdf]";
            publication.pdfUrl = pdfUrl;
          }

          parsedEntries.push({ year, publication });
        }

        itemMatch = itemRegex.exec(listHtml);
      }

      yearMatch = yearRegex.exec(sectionHtml);
    }
  }

  if (parsedEntries.length === 0) {
    throw new Error(
      `No publication entries were parsed from the page for years >= ${MIN_PUBLICATION_YEAR}.`,
    );
  }

  const uniqueEntries = [];
  const seen = new Set();

  for (const entry of parsedEntries) {
    const key = `${entry.year}||${normalizeWhitespace(entry.publication.citation)}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    uniqueEntries.push(entry);
  }

  const byYear = new Map();
  for (const entry of uniqueEntries) {
    if (!byYear.has(entry.year)) {
      byYear.set(entry.year, []);
    }
    byYear.get(entry.year).push(entry.publication);
  }

  return Array.from(byYear.keys())
    .sort((a, b) => b - a)
    .map((year) => ({
      year,
      publications: byYear.get(year),
    }));
}

async function fetchPublicationPage() {
  const { stdout } = await execFileAsync(
    "curl",
    ["--fail", "--silent", "--show-error", "--location", "--max-time", "30", SOURCE_URL],
    { maxBuffer: 1024 * 1024 * 20 },
  );

  if (!stdout) {
    throw new Error("Fetched publication page is empty.");
  }

  return stdout;
}

async function main() {
  const args = new Set(process.argv.slice(2));

  if (args.has("--help") || args.has("-h")) {
    console.log(HELP_TEXT);
    return;
  }

  const dryRun = args.has("--dry-run");

  const html = await fetchPublicationPage();
  const nextGroups = parsePublications(html);

  if (!dryRun) {
    await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(nextGroups, null, 2)}\n`, "utf8");
  }

  const totalPublications = nextGroups.reduce(
    (count, group) => count + group.publications.length,
    0,
  );
  const totalYears = nextGroups.length;
  const mode = dryRun ? "Dry run complete" : "Sync complete";
  console.log(
    `${mode}. Parsed ${totalPublications} publications across ${totalYears} years (>= ${MIN_PUBLICATION_YEAR}).`,
  );
  console.log(`Data file: ${OUTPUT_PATH}`);
  if (dryRun) {
    console.log("No files were written.");
  }
}

main().catch((error) => {
  console.error(`Publication sync failed: ${error.message}`);
  process.exit(1);
});
