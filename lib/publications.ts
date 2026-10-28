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

// A publication prepared for searching and filtering on the Publications page.
export type PublicationRecord = Publication & {
  id: string;
  year: number;
  topics: string[];
  members: string[];
  venues: string[];
};

export type FilterOption = {
  name: string;
  count: number;
};

export type FilterKey = 'topics' | 'members' | 'venues';

// Citations start with the author list, ended by the first full stop that does not
// follow a middle initial ("Nardiena A. Pratama, and Gianluca Demartini. Title. In: …").
const splitCitation = (citation: string) => {
  const fullStop = /\.\s/g;
  let match = fullStop.exec(citation);

  while (match) {
    const before = citation.slice(0, match.index);
    if (!/(^|[\s.])[A-Z]$/.test(before)) {
      return { authorText: before, rest: citation.slice(match.index + match[0].length) };
    }
    match = fullStop.exec(citation);
  }

  return { authorText: '', rest: citation };
};

const parseAuthors = (authorText: string) =>
  authorText
    .split(/,\s*(?:and\s+)?|\s+and\s+/)
    .map((author) => author.trim())
    .filter(Boolean);

// The venue comes from the part after "In:". It prefers a short name in brackets
// ("(CIKM 2026)" -> "CIKM", "(AAAI-24)" -> "AAAI"), skipping track labels such as
// "(Short Paper track)"; otherwise it uses the full venue name up to the first comma.
const parseVenue = (citation: string, aliases: Record<string, string>) => {
  const inIndex = citation.search(/\bIn:?\s/);
  if (inIndex < 0) return undefined;
  const venueText = citation.slice(inIndex).replace(/^In:?\s+/, '');

  const bracketed = /\(([A-Z][A-Za-z0-9&\- ]{1,30}?)(?:[\s-]*['’]?\d{2,4})?\)/g;
  let match = bracketed.exec(venueText);
  while (match) {
    const name = match[1].replace(/^(ACM|IEEE)\s+/, '').replace(/[\s-]+$/, '');
    if (!/\b(track|paper|papers|demo|workshop)\b/i.test(name)) return aliases[name] ?? name;
    match = bracketed.exec(venueText);
  }

  const fullName = venueText
    .split(/[,.(]/)[0]
    .replace(/^(The\s+)?(\d+(st|nd|rd|th)\s+)?/, '')
    .replace(/\s+(\d{4}|- ).*$/, '')
    .trim();
  return fullName ? aliases[fullName] ?? fullName : undefined;
};

type MemberNames = {
  name: string;
  publicationNames: string[];
};

const countBy = (records: PublicationRecord[], key: FilterKey, names: string[]): FilterOption[] =>
  names
    .map((name) => ({ name, count: records.filter((record) => record[key].includes(name)).length }))
    .filter((option) => option.count > 0);

const byCountThenName = (a: FilterOption, b: FilterOption) => b.count - a.count || a.name.localeCompare(b.name);

// Tags each publication with its topics (matched on title and venue), the lab members
// among its authors, and its venue.
export const buildPublicationIndex = (
  topics: { name: string; pattern: RegExp }[],
  memberGroups: { label: string; members: MemberNames[] }[],
  venueAliases: Record<string, string>,
) => {
  const allMembers = memberGroups.flatMap((group) => group.members);

  const records: PublicationRecord[] = publicationGroups.flatMap((group) =>
    group.publications.map((publication, index) => {
      const { authorText, rest } = splitCitation(publication.citation);
      const authors = parseAuthors(authorText);
      const venue = parseVenue(rest, venueAliases);

      return {
        ...publication,
        id: `${group.year}-${index}`,
        year: group.year,
        topics: topics.filter((topic) => topic.pattern.test(rest)).map((topic) => topic.name),
        members: allMembers
          .filter((member) => member.publicationNames.some((name) => authors.includes(name)))
          .map((member) => member.name),
        venues: venue ? [venue] : [],
      };
    }),
  );

  const venueNames = Array.from(new Set(records.flatMap((record) => record.venues)));

  return {
    records,
    topicOptions: countBy(records, 'topics', topics.map((topic) => topic.name)).sort(byCountThenName),
    memberOptions: memberGroups.map((group) => ({
      label: group.label,
      options: countBy(records, 'members', group.members.map((member) => member.name)),
    })),
    venueOptions: countBy(records, 'venues', venueNames).sort(byCountThenName),
  };
};

export const getLatestPublications = (count: number) =>
  publicationGroups
    .flatMap((group) => group.publications.map((publication) => ({ ...publication, year: group.year })))
    .slice(0, count);
