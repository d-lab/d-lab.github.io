import type { Metadata } from 'next';

export const siteUrl = 'https://d-lab.github.io';
export const siteName = 'DLab';
export const siteTitle = 'DLab — Responsible AI Research Lab at The University of Queensland';
export const siteDescription =
  'DLab is a research lab at The University of Queensland studying the risks and harms of AI and building AI for public good, at the intersection of data, people, and AI.';

export const contactEmail = 'demartini@acm.org';
export const headOfLab = {
  name: 'Gianluca Demartini',
  title: 'Prof. Gianluca Demartini',
  website: 'https://www.gianlucademartini.net/',
};

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;
export const headOfLabId = `${siteUrl}/#gianluca-demartini`;

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

// Canonical page URLs end with a slash, matching `trailingSlash: true`.
export function canonicalUrl(path = '/') {
  const url = new URL(path, siteUrl);
  const isFile = /\/[^/]+\.[a-z0-9]+$/i.test(url.pathname);

  if (!url.pathname.endsWith('/') && !isFile) {
    url.pathname = `${url.pathname}/`;
  }

  return url.toString();
}

export function parseOptionalDate(dateString?: string) {
  if (!dateString) {
    return undefined;
  }

  const parsed = Date.parse(dateString);

  if (Number.isNaN(parsed)) {
    return undefined;
  }

  // Front matter dates are calendar days; keep them on that day in UTC
  // regardless of the build machine's time zone.
  const localDate = new Date(parsed);
  return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Shows every front matter date the same way ("20 Oct 2026"), whether it was
// written as "20 Oct 2026" or "2026-10-20".
export function formatDisplayDate(dateString: string) {
  const date = parseOptionalDate(dateString);
  if (!date) return dateString;

  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export type SocialImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

export const defaultSocialImage: SocialImage = {
  url: absoluteUrl('/og.jpg'),
  width: 1200,
  height: 630,
  alt: 'DLab members standing in front of a green wall at The University of Queensland',
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: SocialImage | null;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultSocialImage,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = canonicalUrl(path);
  const socialTitle = `${title} | ${siteName}`;
  const images = image ? [image] : undefined;
  const openGraph = type === 'article'
    ? {
        type: 'article' as const,
        locale: 'en_AU',
        siteName,
        url,
        title: socialTitle,
        description,
        publishedTime,
        modifiedTime,
        authors,
        tags,
        images,
      }
    : {
        type: 'website' as const,
        locale: 'en_AU',
        siteName,
        url,
        title: socialTitle,
        description,
        images,
      };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph,
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: socialTitle,
      description,
      images: image ? [image.url] : undefined,
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

export const organizationReference = { '@id': organizationId };
