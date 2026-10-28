# SEO and Search Operations

This document is the source of truth for search-related decisions on `d-lab.github.io`. It covers URL ownership, metadata, structured data, crawler discovery, content publishing, hosting constraints, and post-release monitoring.

The README contains only the short setup summary. Update this document whenever the site gains a new content type, canonical route, structured-data entity, or search integration.

## Goals

The site should make the following clear to people and search engines:

1. DLab is a research lab at The University of Queensland, Brisbane, Australia, led by Prof. Gianluca Demartini.
2. Its purpose is to identify the risks and harms of AI and to build AI for public good.
3. Its primary subject areas are responsible AI, large language model evaluation and bias, information retrieval, crowdsourcing and data quality, misinformation and online harms, and computational social science.
4. Research, people, and opportunities to join or visit are the primary content; the gallery and lab stories are secondary.
5. Every indexable page has one stable canonical URL and a useful purpose.

Search optimization must never make the writing repetitive, overstate the lab's results or funding, or add content solely to target keywords.

## Canonical origin and URL policy

The canonical origin is:

```text
https://d-lab.github.io/
```

The site is the organization Pages site for the `d-lab` GitHub organization, so it is served at the domain root with no base path. If the lab later moves to a custom domain, treat it as a migration (see [Hosting constraints](#hosting-constraints)).

Canonical page URLs use lowercase slugs and trailing slashes, matching `trailingSlash: true` in `next.config.js`.

| Content | Canonical pattern |
| --- | --- |
| Home | `/` |
| About | `/about/` |
| People | `/people/` |
| Publications | `/publications/` |
| Blog index | `/blog/` |
| Blog post | `/blog/[slug]/` |
| Gallery | `/gallery/` |
| Sponsors | `/sponsors/` |
| Visiting | `/visiting/` |
| Now | `/now/` |

Rules:

- Do not change a published canonical URL without a compelling reason. Blog post slugs come from the Markdown file name, so renaming a post file changes its URL.
- Internal links, canonical metadata, social metadata, and the sitemap must all use the canonical URL.
- Do not create separate URL variants for tracking parameters, capitalization, or alternate trailing-slash behaviour.
- Members' personal websites are linked from People. Link to each person's preferred canonical profile.

## Hosting constraints

GitHub Pages serves static files only. It cannot issue server-side `301` redirects or custom response headers.

- When a URL must change, keep a static page at the old path that declares the new canonical URL and redirects the visitor with an immediate meta refresh. Never delete the old path outright.
- HTTPS enforcement is a repository setting in GitHub Pages. Keep "Enforce HTTPS" enabled.
- A custom domain requires a `CNAME` file in `public/`, a DNS change, an update to `siteUrl` in `lib/site.ts`, and a Search Console move. Plan it as a migration with its own checklist.

## Metadata system

Shared site constants and helpers live in `lib/site.ts`: `siteUrl`, `siteName`, `siteTitle`, `siteDescription`, the entity IDs, `absoluteUrl()`, `canonicalUrl()`, and `createPageMetadata()`. Root metadata is defined in `app/layout.tsx`. New pages should export `createPageMetadata({ title, description, path })` rather than duplicating canonical, Open Graph, or X fields; pass `noIndex: true` to keep a page out of search results.

Every indexable page needs:

- A unique, descriptive title.
- A concise description written for a potential visitor.
- A canonical URL with a trailing slash.
- Consistent `og:url`, site name, locale, and X metadata.
- Appropriate indexing instructions.

### Title conventions

- Route metadata supplies the page-specific title.
- The root layout appends `| DLab` through the title template.
- Put the most distinctive page subject first.
- Do not repeat "DLab" inside a child title unless the title is absolute and intentionally bypasses the template.

### Description conventions

- Explain what the visitor will find on the page.
- Prefer specific research topics, people, and opportunities over generic phrases such as "welcome to our lab."
- Keep descriptions accurate when research areas, membership, funding, or page scope change.
- Descriptions are not a place for keyword lists.

### Social previews

- Index pages use the site-wide social card `public/og.jpg`, a 1200×630 crop of the homepage group photograph. If the hero photograph changes, regenerate the card so it still shows current members.
- Blog posts with a deliberate lead photograph should use it as their social image.
- A post without a deliberate image should omit inherited Open Graph and X images rather than presenting the generic site card as post artwork.
- All social-image URLs must resolve to absolute production URLs.

### Metadata that should not be added

- Do not add a `meta keywords` tag. Search engines do not use it as a ranking signal.
- Do not keyword-stuff titles, headings, descriptions, alt text, or schema.
- Do not add speculative "AI search" files or markup without a documented consumer and maintenance plan.

## Structured data

Structured data must describe content already visible on the page. It is not a substitute for clear copy or authorship. JSON-LD is emitted with `components/StructuredData.tsx`.

Use stable entity identifiers so pages can refer to the same entities:

```text
https://d-lab.github.io/#organization
https://d-lab.github.io/#website
https://d-lab.github.io/#gianluca-demartini
```

### Site-wide graph

The root layout outputs one graph containing the `WebSite`, the DLab `ResearchOrganization`, and the head of lab's `Person`. The organization includes:

- Name, description, and URL.
- `parentOrganization`: The University of Queensland.
- `address`: Brisbane, Queensland, Australia.
- A general enquiries `contactPoint`.
- `member` reference to the head of lab's Person ID.
- `funder` entries for the current sponsors, generated from `data/sponsors.ts`.

Add `logo` once a suitable image exists. Google requires a crawlable image of at least 112×112px in a supported format such as PNG or SVG. The only current logo is `app/favicon.ico`, which is 48px at most and in ICO format, so `logo` is omitted until a larger PNG or SVG export is added to `public/`.

### Pages

- About uses `AboutPage` about the organization ID.
- People, Blog, and Gallery use `CollectionPage` with an `ItemList`. Publications and Sponsors use `CollectionPage` without a list.
- People entries are `Person` items with `jobTitle`, `url` when a personal website exists, and `memberOf` or `alumniOf` pointing to the organization ID.
- Gallery entries are `ImageObject` items with the photograph's alt text as caption.
- Visiting uses `WebPage`. Only valid schema.org types may be used.

### Blog posts

Each post outputs `BlogPosting` structured data containing:

- Headline and description.
- Canonical URL.
- Published date and, when relevant, modified date.
- The named author as a `Person`, and DLab's organization ID as publisher.
- The WebSite ID as the parent site.

Post front matter may contain:

```yaml
title: "Post title"
date: "21 Sep 2026"
updated: "2 Oct 2026" # optional
description: "A useful, page-specific summary." # optional
author: "Author Name"
tags: ["Conference", "Information retrieval"]
```

Dates must parse with `parseOptionalDate()` in `lib/site.ts`, which treats them as calendar days in UTC, so machine-readable dates are generated correctly. Use the `21 Sep 2026` or `2026-09-21` format; both display as "21 Sep 2026".

When `author` matches a name in `data/people.json`, the post links the author to their personal website. `description` is optional. When set, it appears as a subtitle in the post header and on cards and is used for search. Without it, nothing is shown and the meta description and `BlogPosting` description use the post's first plain paragraph, trimmed to 160 characters.

### Future schema

Add a new schema type only when:

1. The page clearly matches the schema definition.
2. The required information is visible on the page.
3. The data can be kept current.
4. The schema provides semantic value beyond repeating keywords.

Publications are currently stored as single citation strings, so the Publications page emits no `ScholarlyArticle` items. Add them only once the data provides title, authors, venue, and year as separate fields. Google Scholar metadata should be added only if the site gains one page per publication with an abstract and complete bibliographic data.

## Sitemaps and crawler discovery

The site generates:

- `/robots.txt` from `app/robots.ts`.
- `/sitemap.xml` from `app/sitemap.ts`.

`robots.txt` must allow public crawling and declare the sitemap.

### Sitemap rules

Include:

- The homepage.
- Every current top-level canonical page, including `/visiting/`.
- Every published blog post.

Exclude:

- Draft, private, or `noindex` content.
- Image and asset URLs.
- Duplicate URL variants.

Only provide `lastModified` when it reflects a real content change. For posts, use `updated` when present, otherwise `date`. Do not update every page date during a deployment. Google ignores `priority` and `changeFrequency`, so do not spend effort tuning them.

## Publishing checklist

### Blog post

Before publishing or materially updating a post:

- Confirm the title is unique and accurate, and that the opening paragraph (or the optional description) summarises the post, since it becomes the search description.
- Set the published date and, when relevant, the updated date.
- Confirm the author is named in front matter and visibly on the page.
- Add useful headings, links to papers and venues, and internal links to People or Publications where relevant.
- Give every image descriptive alternative text.
- Check that names, affiliations, venues, and awards are correct and that people pictured are happy to be published.
- Confirm the file name gives the intended permanent slug.
- Confirm the post appears in `/sitemap.xml` after the build.

### Publication

Publications are synced from Gianluca Demartini's publication page with `npm run sync:publications`.

- Correct titles, author order, venues, and PDF links at the source page, not in `data/publications.json`.
- Run the sync with `--dry-run` first and review the parsed count.
- Do not claim a venue or award before it is official.
- Prefer authoritative links: DOI, publisher, arXiv, code, or data.

### Person

When adding or updating a member:

- Use the person's preferred name and current role.
- Add a portrait and, where the person agrees, a personal website.
- Move departing members to alumni with `isAlumni` rather than deleting them.

### Gallery photograph

- Add the image to `public/images/group_pics`. A web-sized copy is generated automatically.
- Add an entry to `data/gallery.json` with descriptive alternative text naming the event, place, or year where known. Unlisted photos still appear, but with generic alt text.
- Confirm everyone pictured is happy for the photograph to be public.

## Search Console and release process

Use a URL-prefix Search Console property for `https://d-lab.github.io/`. A DNS-verified Domain property is not available for a `github.io` subdomain. Ownership is verified by the HTML file in `public/google4adc23df8dd74b54.html`; do not delete or rename it.

Google Analytics (`G-ZG6585B2M8`) is configured in `app/layout.tsx`.

### After a significant release

1. Confirm the site is served over HTTPS.
2. Confirm `/robots.txt` and `/sitemap.xml` return `200` and the sitemap is valid XML.
3. Confirm every sitemap URL returns `200` and uses the trailing-slash canonical form.
4. Resubmit `/sitemap.xml` in Search Console when routes have changed.
5. Inspect `/`, `/people/`, `/publications/`, and one blog post.
6. Request indexing for the homepage and the most important changed pages.

### Ongoing monitoring

Review Search Console monthly and after major releases for:

- Pages unexpectedly excluded from indexing.
- Duplicate or conflicting canonicals.
- Sitemap parsing or fetch errors.
- Soft 404s.
- Search queries and landing pages for People, Publications, and Visiting.
- Core Web Vitals regressions, especially on the homepage hero and the gallery.

Analytics explains what visitors do after arriving; Search Console remains the source of truth for Google Search impressions, queries, indexing, and crawl issues.

## Validation checklist

Before merging or deploying an SEO-related change:

- Run the production build and lint.
- Confirm the homepage and representative detail pages render successfully in `out/`.
- Check that canonicals are absolute production URLs with trailing slashes.
- Check that Open Graph and X URLs match the canonical record.
- Confirm every social image referenced in metadata exists.
- Confirm structured-data scripts use valid types, the correct entity IDs, and correct dates.
- Validate the sitemap XML and its route list.

## Known gaps

The current implementation differs from this policy in the following ways. Resolve each in a change that also updates this section.

- The organization has no `logo`, because no logo image larger than the 48px favicon exists yet.
- `/now/` has almost no content, so it is marked `noindex`, left out of the sitemap, and not linked from the navigation. When `app/now/content.md` has real updates, remove `noIndex` in `app/now/page.tsx`, add `/now/` back to `app/sitemap.ts`, and add it to `lib/navigation.ts`.
- No blog post has a deliberate social image yet, so post previews show no image.
- People entries have no `focus` text, so profiles show only name and role.

## Maintenance ownership

Any lab member who changes routes, metadata, post front matter, people or publication data, gallery folders, or structured data is responsible for updating the corresponding sitemap or documentation behaviour and completing the relevant checklist above.

When implementation and this document disagree, resolve the mismatch in the same change. Do not allow the documentation to describe a future state as though it is already deployed.
