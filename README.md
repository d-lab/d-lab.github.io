# DLab website

The website of DLab, a responsible AI research lab at The University of Queensland led by Prof. Gianluca Demartini. It is a statically exported [Next.js](https://nextjs.org) site deployed to GitHub Pages at <https://d-lab.github.io/>.

Related documents:

- [`PRODUCT.md`](./PRODUCT.md): audiences, purpose, voice, and design principles.
- [`DESIGN.md`](./DESIGN.md): typography, colour, layout, components, and motion.
- [`SEO.md`](./SEO.md): canonical URLs, metadata, structured data, sitemaps, and Search Console.

## Getting started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To check the production output locally, run `npm run build`; the static site is written to `out/`.

Both `npm run dev` and `npm run build` first run `scripts/optimize-images.js`, which writes web-sized WebP copies of gallery and blog photographs (up to 1600px wide, keeping each photo's colour profile, and a 3840px copy of the homepage hero) to `public/images/web/` and their dimensions to `data/generated/images.json`. Both outputs are git-ignored and rebuilt as needed. The originals stay in `public/images/` untouched. Run `npm run optimize:images` to regenerate them by hand.

## Updating content

Most updates only require editing a data file or adding an image. Layout code does not need to change.

### People

Edit `data/people.json` and add a portrait to `public/images/people`.

| Field | Required | Purpose |
| --- | --- | --- |
| `name` | yes | Full name, as it should appear on the site. |
| `role` | yes | For example `PhD Student`, `Postdoctoral Researcher`. |
| `image` | yes | Path under `public`, such as `/images/people/Jane_Doe_dlab.jpg`. |
| `website` | no | Personal website. Links the person's name to it. |
| `email` | no | Shown as a mailto link. |
| `focus` | no | One-sentence research focus. |
| `isHeadOfLab` | no | Pins the entry to the top. |
| `isAlumni` | no | Moves the entry to the alumni section. |

Any other simple field is displayed as a labelled attribute on the profile. Current members are sorted by surname automatically.

### Publications

`data/publications.json` is generated from Gianluca Demartini's publication list at <https://www.gianlucademartini.net/?page=pubs>:

```bash
npm run sync:publications
npm run sync:publications -- --dry-run   # parse and validate only
npm run sync:publications -- --help
```

The sync overwrites the whole file. Fix titles, authors, or PDF links at the source page rather than editing the JSON by hand, otherwise the next sync discards the change.

### Blog posts

Add a Markdown file to `posts/`. The file name becomes the URL slug, so use lowercase words separated by underscores or hyphens and do not rename it after publishing.

```yaml
---
title: "SIGIR 2026 in Melbourne: Posters, Connections, and New Directions for Search"
date: "21 Sep 2026"
author: "Pietro Bernardelle"
---
```

The author and date are shown in the post header. An optional `description` field adds a subtitle under the title and on the post's card; without it, search results use the opening sentences of the post. Dates can be written as `21 Sep 2026` or `2026-09-21`; both display as "21 Sep 2026". If there is no `author` field, a "**By Name**" line at the very start of the post is used as the author and removed from the body. If the author matches a name in `data/people.json`, it links to that person's website.

Put post images in `public/images/blog` and reference them as `../../images/blog/<file>` or `/images/blog/<file>`, always with descriptive alt text. The site serves the web-sized copy automatically. Two or more images on one line render as a grid; see the existing posts for examples. Raw HTML is allowed too, for example `<img src="/images/blog/photo.jpg" alt="…" height="150">`; sizes you set this way are kept. Posts support LaTeX maths through KaTeX.

See the article checklist in [`SEO.md`](./SEO.md) before publishing.

### Gallery

1. Add the photograph to `public/images/group_pics` (`.jpg`, `.jpeg`, `.png`, `.webp`, or `.avif`). Full-resolution files are fine.
2. Add an entry at the top of `photos` in `data/gallery.json` with the file name and alt text that describes the photo, such as the event or place.

The gallery shows photos in the order of `data/gallery.json`. Photos in the folder that are not listed yet appear first, with generic alt text, so a new upload is never hidden.

`hero` in `data/gallery.json` sets the homepage photograph. It is not repeated in the gallery. If you change it, also regenerate `public/og.jpg`, the 1200×630 social card cropped from the hero photograph. `featured` lists the four photos shown in the homepage "Life at DLab" row.

### Homepage

Most homepage content updates itself: the latest five publications and three blog posts appear automatically, with each post card using the first image in the post. The hero photograph is set by `hero` in `data/gallery.json`; choose a wide group photo where everyone's heads are in the upper half, because the hero text covers the lower part on wide screens. The research areas and the "Work with us" routes are written in `app/page.tsx`.

### Sponsors, About, Visiting, and Now

- Sponsors are listed in `data/sponsors.ts`, with logos in `public/images/dlab_sponsors`. Set `isCurrent` to move a sponsor between current and past; the Sponsors page, the homepage strip, and the `funder` structured data all follow. Trim surrounding whitespace from logo files so they appear at a consistent size.
- The About and Visiting pages are written directly in `app/about/page.tsx` and `app/visiting/page.tsx`.
- The Now page renders `app/now/content.md`. It is hidden from search and navigation until it has real content; see the known gaps in [`SEO.md`](./SEO.md#known-gaps).

## Project structure

| Path | Contents |
| --- | --- |
| `app/` | Routes, root layout, `not-found.tsx`, `robots.ts`, `sitemap.ts`, `globals.css` (design tokens), and `favicon.ico` (the lab logo; see [`DESIGN.md`](./DESIGN.md#logo)). |
| `components/` | Navigation, footer, page header band and frames (`ReadingPage`, `CollectionPage`), person, publication, post, and sponsor components, theme switcher, structured-data helper. |
| `data/` | People, publications, sponsors, gallery order and alt text, and the gallery loader. |
| `lib/site.ts` | Site constants, entity IDs, canonical URLs, and `createPageMetadata()`. |
| `lib/navigation.ts` | The one route list used by the desktop menu, mobile menu, and footer. |
| `lib/people.ts`, `lib/publications.ts`, `lib/posts.ts` | Data helpers for people, publications, and blog posts. |
| `lib/images.ts` | Looks up web-sized image copies. |
| `lib/withBasePath.ts` | Prefixes asset paths when the site is built under a sub-path. |
| `posts/` | Blog posts in Markdown. |
| `public/` | Images, the social card `og.jpg`, and the Google Search Console verification file. |
| `scripts/` | Image optimisation and publication sync scripts. |

## Deployment

Every push to `main` triggers `.github/workflows/deploy-pages.yml`, which runs `npm ci` and `npm run build` and publishes `out/` to GitHub Pages. There is no separate staging environment, so run `npm run build` locally before pushing.

After the build, `scripts/prune-export.js` removes the full-size gallery and blog originals from `out/`, because pages only load their web-sized copies. The originals stay in the repo. If any exported page still references a removed original, the script fails the build rather than publishing a broken image.

`next.config.js` exports a static site with trailing slashes and unoptimized images. Because this is the organization Pages repository (`d-lab.github.io`), no base path is applied. If the site is ever built from a differently named repository, the config adds `/<repo-name>` as the base path; use `withBasePath()` for any new hard-coded asset URL so it keeps working.

## Search discovery

See [`SEO.md`](./SEO.md) for the canonical URL policy, metadata and structured-data conventions, publishing checklists, and Search Console process.

The site generates `/robots.txt` and `/sitemap.xml` from `app/robots.ts` and `app/sitemap.ts`. After each significant release, verify that both return `200`, and resubmit `/sitemap.xml` in Search Console when routes change.
