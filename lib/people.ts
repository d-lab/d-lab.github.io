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

// Matches a blog author to a profile, ignoring titles such as "Prof.".
export const findPersonByName = (name?: string) => {
  if (!name) return undefined;
  const normalize = (value: string) => value.replace(/^(prof|dr)\.?\s+/i, '').trim().toLowerCase();
  return people.find((person) => normalize(person.name) === normalize(name));
};
