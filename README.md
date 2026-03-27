## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Publication Sync Script

This project includes a local script to sync `data/publications.json` with:

- `https://www.gianlucademartini.net/?page=pubs`

Run it with:

```bash
npm run sync:publications
```

Useful options:

```bash
npm run sync:publications -- --dry-run
npm run sync:publications -- --help
```
