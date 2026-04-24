export const siteUrl = 'https://d-lab.github.io';
export const siteName = 'DLab';
export const siteTitle = 'DLab — Responsible AI Research Lab';
export const siteDescription =
  'DLab is an interdisciplinary research group exploring how data, people, and AI affect each other.';

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function parseOptionalDate(dateString?: string) {
  if (!dateString) {
    return undefined;
  }

  const parsed = Date.parse(dateString);

  if (Number.isNaN(parsed)) {
    return undefined;
  }

  return new Date(parsed);
}
