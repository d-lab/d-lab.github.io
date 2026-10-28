import Image from 'next/image';
import { getWebsite, type Person } from '@/lib/people';
import { withBasePath } from '@/lib/withBasePath';

const RESERVED_FIELDS = new Set(['name', 'role', 'image', 'isHeadOfLab', 'isAlumni', 'email', 'focus', 'website']);

const formatFieldLabel = (key: string) =>
  key
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatFieldValue = (value: unknown) => (Array.isArray(value) ? value.join(', ') : String(value));

// Simple extra fields in people.json are shown as labelled attributes.
const getExtraAttributes = (person: Person) =>
  Object.entries(person).filter(([key, value]) => {
    if (RESERVED_FIELDS.has(key)) return false;
    if (value === undefined || value === null) return false;
    if (typeof value === 'object' && !Array.isArray(value)) return false;
    return formatFieldValue(value).trim() !== '';
  });

type PersonCardProps = {
  person: Person;
  compact?: boolean;
};

export default function PersonCard({ person, compact = false }: PersonCardProps) {
  const website = getWebsite(person);
  const extraAttributes = getExtraAttributes(person);

  return (
    <article>
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-surface-muted">
        <Image
          src={withBasePath(person.image)}
          alt={`Portrait of ${person.name}`}
          fill
          sizes={compact ? '(max-width: 640px) 45vw, 180px' : '(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 260px'}
          className="object-cover"
        />
      </div>
      <h3 className={`mt-4 font-semibold tracking-tight ${compact ? 'text-base' : 'text-lg'}`}>
        {website ? (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-150 hover:text-accent hover:decoration-current"
          >
            {person.name}
            <span className="sr-only"> (personal website, opens in a new tab)</span>
          </a>
        ) : (
          person.name
        )}
      </h3>
      <p className="mt-1 font-mono text-sm text-muted">{person.role}</p>

      {person.focus ? <p className="mt-3 text-sm leading-6 text-muted">{person.focus}</p> : null}

      {person.email ? (
        <a href={`mailto:${person.email}`} className="text-link mt-2 inline-block text-sm">
          {person.email}
        </a>
      ) : null}

      {extraAttributes.length > 0 ? (
        <dl className="mt-3 space-y-1 text-sm text-muted">
          {extraAttributes.map(([key, value]) => (
            <div key={key}>
              <dt className="inline font-medium text-foreground">{formatFieldLabel(key)}: </dt>
              <dd className="inline">{formatFieldValue(value)}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  );
}
