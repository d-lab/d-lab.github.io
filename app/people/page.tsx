import peopleData from '@/data/people.json';
import Image from 'next/image';
import Link from 'next/link';

type Person = {
  name: string;
  role: string;
  image: string;
  isHeadOfLab?: boolean;
  email?: string;
  focus?: string;
  [key: string]: unknown;
};

const RESERVED_FIELDS = new Set(['name', 'role', 'image', 'isHeadOfLab', 'email', 'focus']);

const formatFieldLabel = (key: string) =>
  key
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatFieldValue = (value: unknown) => {
  if (Array.isArray(value)) return value.join(', ');
  return String(value);
};

const getSurname = (fullName: string) => {
  const cleaned = fullName.trim();
  if (!cleaned) return '';
  const parts = cleaned.split(/\s+/);
  return parts[parts.length - 1] ?? cleaned;
};

const getSortedPeople = (people: Person[]) =>
  [...people].sort((a, b) => {
    if (a.isHeadOfLab && !b.isHeadOfLab) return -1;
    if (!a.isHeadOfLab && b.isHeadOfLab) return 1;

    const surnameCompare = getSurname(a.name).localeCompare(getSurname(b.name));
    if (surnameCompare !== 0) return surnameCompare;

    return a.name.localeCompare(b.name);
  });

export default function PeoplePage() {
  const people = getSortedPeople(peopleData as Person[]);

  return (
    <div className="max-w-6xl mx-auto py-16 sm:py-20 px-4 sm:px-6">
      <header className="mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">DLab</p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 dark:text-slate-100 mt-3">People</h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl mt-4 leading-relaxed">
          The DLab team brings together doctoral researchers working on responsible AI, human-computer interaction, and
          sociotechnical systems.
        </p>
      </header>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {people.map((person) => {
            const extraAttributes = Object.entries(person).filter(([key, value]) => {
              if (RESERVED_FIELDS.has(key)) return false;
              if (value === undefined || value === null) return false;
              if (typeof value === 'object' && !Array.isArray(value)) return false;
              return `${formatFieldValue(value)}`.trim() !== '';
            });

            return (
              <article
                key={person.name}
                className={`group rounded-2xl border p-6 bg-white/80 dark:bg-slate-950/40 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md ${
                  person.isHeadOfLab
                    ? 'border-blue-200 dark:border-blue-800'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 mx-auto">
                  <Image
                    src={person.image}
                    alt={`Portrait of ${person.name}`}
                    fill
                    sizes="(max-width: 640px) 144px, 160px"
                    className="rounded-full object-cover border border-slate-200 dark:border-slate-700 ring-4 ring-white dark:ring-slate-900 transition-transform duration-300 group-hover:scale-[1.02]"
                    style={{ filter: 'saturate(0.78) contrast(1.04)' }}
                  />
                </div>

                <div className="mt-5 text-center">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{person.name}</h2>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mt-1">{person.role}</p>
                  <div className="h-px w-12 bg-slate-200 dark:bg-slate-700 mx-auto mt-4" />

                  {person.email && (
                    <Link
                      href={`mailto:${person.email}`}
                      className="inline-block text-sm text-blue-700 dark:text-blue-300 hover:underline mt-4"
                    >
                      {person.email}
                    </Link>
                  )}

                  {person.focus && <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">{person.focus}</p>}

                  {extraAttributes.length > 0 && (
                    <ul className="text-xs text-slate-600 dark:text-slate-300 mt-4 space-y-1.5">
                      {extraAttributes.map(([key, value]) => (
                        <li key={`${person.name}-${key}`}>
                          <span className="font-semibold">{formatFieldLabel(key)}:</span> {formatFieldValue(value)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
