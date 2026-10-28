import publicationsData from '@/data/publications.json';

export type Publication = {
  citation: string;
  pdfLabel?: string;
  pdfUrl?: string;
};

export type PublicationGroup = {
  year: number;
  publications: Publication[];
};

export const publicationGroups = [...(publicationsData as PublicationGroup[])].sort((a, b) => b.year - a.year);

// Citations name the venue in parentheses, e.g. "(CIKM 2026)" or "(TIST)".
export const getVenueLabel = (citation: string) =>
  citation.match(/\(([A-Z][A-Za-z0-9&\- ]{1,24})\)/)?.[1];

export const getLatestPublications = (count: number) =>
  publicationGroups
    .flatMap((group) => group.publications.map((publication) => ({ ...publication, year: group.year })))
    .slice(0, count);
