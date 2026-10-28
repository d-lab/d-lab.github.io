import peopleData from '@/data/people.json';

export type Person = {
  name: string;
  role: string;
  image: string;
  isHeadOfLab?: boolean;
  isAlumni?: boolean;
  email?: string;
  focus?: string;
  website?: string;
  // Other spellings of the name used in citations, e.g. ["Linh Le"].
  publicationNames?: string[];
  [key: string]: unknown;
};

const people = peopleData as Person[];

const getSurname = (fullName: string) => fullName.trim().split(/\s+/).at(-1) ?? fullName;

const bySurname = (a: Person, b: Person) =>
  getSurname(a.name).localeCompare(getSurname(b.name)) || a.name.localeCompare(b.name);

const byHeadThenSurname = (a: Person, b: Person) => {
  if (a.isHeadOfLab !== b.isHeadOfLab) return a.isHeadOfLab ? -1 : 1;
  return bySurname(a, b);
};

export const getWebsite = (person: Person) => {
  const website = typeof person.website === 'string' ? person.website.trim() : '';
  return website.length > 0 ? website : undefined;
};

export const currentMembers = people.filter((person) => !person.isAlumni).sort(byHeadThenSurname);
export const alumni = people.filter((person) => person.isAlumni).sort(bySurname);

const stripTitle = (name: string) => name.replace(/^(prof|dr)\.?\s+/i, '').trim();

// Matches a blog author to a profile, ignoring titles such as "Prof.".
export const findPersonByName = (name?: string) => {
  if (!name) return undefined;
  const normalize = (value: string) => stripTitle(value).toLowerCase();
  return people.find((person) => normalize(person.name) === normalize(name));
};

// The display name without titles, e.g. "Gianluca Demartini" for "Prof. Gianluca Demartini".
export const getPlainName = (person: Person) => stripTitle(person.name);

// Every spelling of a person's name that may appear in a citation's author list.
export const getPublicationNames = (person: Person) => [getPlainName(person), ...(person.publicationNames ?? [])];
