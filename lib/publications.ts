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
};

export type FilterOption = {
  name: string;
  count: number;
};

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

type MemberNames = {
  name: string;
  publicationNames: string[];
};

const countBy = (records: PublicationRecord[], key: 'topics' | 'members', names: string[]): FilterOption[] =>
  names
    .map((name) => ({ name, count: records.filter((record) => record[key].includes(name)).length }))
    .filter((option) => option.count > 0);

// Tags each publication with its topics (matched on title and venue) and the lab
// members among its authors.
export const buildPublicationIndex = (
  topics: { name: string; pattern: RegExp }[],
  memberGroups: { label: string; members: MemberNames[] }[],
) => {
  const allMembers = memberGroups.flatMap((group) => group.members);

  const records: PublicationRecord[] = publicationGroups.flatMap((group) =>
    group.publications.map((publication, index) => {
      const { authorText, rest } = splitCitation(publication.citation);
      const authors = parseAuthors(authorText);

      return {
        ...publication,
        id: `${group.year}-${index}`,
        year: group.year,
        topics: topics.filter((topic) => topic.pattern.test(rest)).map((topic) => topic.name),
        members: allMembers
          .filter((member) => member.publicationNames.some((name) => authors.includes(name)))
          .map((member) => member.name),
      };
    }),
  );

  return {
    records,
    topicOptions: countBy(records, 'topics', topics.map((topic) => topic.name)),
    memberOptions: memberGroups.map((group) => ({
      label: group.label,
      options: countBy(records, 'members', group.members.map((member) => member.name)),
    })),
  };
};

export const getLatestPublications = (count: number) =>
  publicationGroups
    .flatMap((group) => group.publications.map((publication) => ({ ...publication, year: group.year })))
    .slice(0, count);
