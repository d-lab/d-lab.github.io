'use client';

import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import FilterDropdown from '@/components/FilterDropdown';
import PublicationEntry from '@/components/PublicationEntry';
import type { FilterKey, FilterOption, PublicationRecord } from '@/lib/publications';

type PublicationsBrowserProps = {
  records: PublicationRecord[];
  topicOptions: FilterOption[];
  memberOptions: { label: string; options: FilterOption[] }[];
  venueOptions: FilterOption[];
};

type Selections = Record<FilterKey, string[]>;

const EMPTY_SELECTIONS: Selections = { topics: [], members: [], venues: [] };
const URL_KEYS: Record<FilterKey, string> = { topics: 'topic', members: 'author', venues: 'venue' };
const FILTER_KEYS = Object.keys(URL_KEYS) as FilterKey[];

// Lowercase and drop accents so "frohling" finds "Fröhling".
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const toNames = (options: FilterOption[]) => options.map((option) => option.name);

export default function PublicationsBrowser({ records, topicOptions, memberOptions, venueOptions }: PublicationsBrowserProps) {
  const [query, setQuery] = useState('');
  const [selections, setSelections] = useState<Selections>(EMPTY_SELECTIONS);
  const [openMenu, setOpenMenu] = useState<FilterKey | null>(null);
  // The URL is only written after it has been read, so a shared link is not wiped on load.
  const [hasReadUrl, setHasReadUrl] = useState(false);

  // Filters live in the URL so a filtered list can be shared as a link.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') ?? '');
    setSelections({
      topics: params.getAll(URL_KEYS.topics),
      members: params.getAll(URL_KEYS.members),
      venues: params.getAll(URL_KEYS.venues),
    });
    setHasReadUrl(true);
  }, []);

  useEffect(() => {
    if (!hasReadUrl) return;
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    FILTER_KEYS.forEach((key) => selections[key].forEach((value) => params.append(URL_KEYS[key], value)));
    const search = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`);
  }, [hasReadUrl, query, selections]);

  const searchIndex = useMemo(
    () => new Map(records.map((record) => [record.id, normalize(`${record.citation} ${record.year}`)])),
    [records],
  );

  // Ticked options within a menu widen the results (any of them); menus narrow each other.
  const matches = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);

    return (record: PublicationRecord, ignoredKey?: FilterKey) => {
      const passesGroups = FILTER_KEYS.every(
        (key) => key === ignoredKey || selections[key].length === 0 || record[key].some((value) => selections[key].includes(value)),
      );
      if (!passesGroups) return false;
      const text = searchIndex.get(record.id) ?? '';
      return terms.every((term) => text.includes(term));
    };
  }, [query, selections, searchIndex]);

  const filteredRecords = useMemo(() => records.filter((record) => matches(record)), [records, matches]);

  // How many results each option would give alongside the other menus' choices;
  // options that would give none are dimmed.
  const counts = useMemo(() => {
    const result = {} as Record<FilterKey, Map<string, number>>;
    FILTER_KEYS.forEach((key) => {
      const countsForKey = new Map<string, number>();
      records.forEach((record) => {
        if (!matches(record, key)) return;
        record[key].forEach((value) => countsForKey.set(value, (countsForKey.get(value) ?? 0) + 1));
      });
      result[key] = countsForKey;
    });
    return result;
  }, [records, matches]);

  const groups = useMemo(() => {
    const byYear = new Map<number, PublicationRecord[]>();
    filteredRecords.forEach((record) => byYear.set(record.year, [...(byYear.get(record.year) ?? []), record]));
    return Array.from(byYear.entries()).map(([year, publications]) => ({ year, publications }));
  }, [filteredRecords]);

  const isFiltered = query !== '' || FILTER_KEYS.some((key) => selections[key].length > 0);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleToggle = (key: FilterKey) => (name: string) => {
    setSelections((current) => ({
      ...current,
      [key]: current[key].includes(name) ? current[key].filter((value) => value !== name) : [...current[key], name],
    }));
  };

  const handleClearGroup = (key: FilterKey) => () => {
    setSelections((current) => ({ ...current, [key]: [] }));
  };

  const handleClearAll = () => {
    setQuery('');
    setSelections(EMPTY_SELECTIONS);
  };

  const handleOpenChange = (key: FilterKey) => (isOpen: boolean) => {
    setOpenMenu((current) => (isOpen ? key : current === key ? null : current));
  };

  const menus: { key: FilterKey; label: string; groups: { label?: string; options: string[] }[]; searchPlaceholder?: string }[] = [
    { key: 'topics', label: 'Topics', groups: [{ options: toNames(topicOptions) }] },
    {
      key: 'members',
      label: 'DLab authors',
      groups: memberOptions.map((group) => ({ label: group.label, options: toNames(group.options) })),
      searchPlaceholder: 'Find a person…',
    },
    { key: 'venues', label: 'Venues', groups: [{ options: toNames(venueOptions) }], searchPlaceholder: 'Find a venue…' },
  ];

  return (
    <>
      <div role="search" aria-label="Search and filter publications">
        <div className="relative">
          <label htmlFor="publication-search" className="sr-only">
            Search publications
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="publication-search"
            type="search"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search titles, authors, venues…"
            className="h-12 w-full rounded-full border border-border-strong bg-surface-raised pl-12 pr-5 text-base text-foreground shadow-[0_1px_2px_var(--card-shadow)] transition-colors duration-150 placeholder:text-muted hover:border-foreground"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {menus.map((menu) => (
            <FilterDropdown
              key={menu.key}
              label={menu.label}
              groups={menu.groups}
              selected={selections[menu.key]}
              counts={counts[menu.key]}
              isOpen={openMenu === menu.key}
              onOpenChange={handleOpenChange(menu.key)}
              onToggle={handleToggle(menu.key)}
              onClear={handleClearGroup(menu.key)}
              searchPlaceholder={menu.searchPlaceholder}
            />
          ))}
          {isFiltered ? (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex min-h-11 items-center px-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              Clear all
            </button>
          ) : null}
        </div>
      </div>

      {/* The status stays in the page (empty without filters) so screen readers announce result counts. */}
      <p aria-live="polite" className={`font-mono text-sm text-muted ${isFiltered ? 'mt-4' : ''}`}>
        {isFiltered ? `Showing ${filteredRecords.length} of ${records.length} publications` : ''}
      </p>

      {groups.length > 0 ? (
        <>
          <nav aria-label="Jump to year" className="mb-10 mt-6 flex flex-wrap gap-x-1 gap-y-1">
            {groups.map((group) => (
              <a
                key={group.year}
                href={`#year-${group.year}`}
                className="inline-flex min-h-11 items-center px-2 font-mono text-sm text-muted transition-colors hover:text-accent"
              >
                {group.year}
              </a>
            ))}
          </nav>

          <div className="space-y-16">
            {groups.map((group) => (
              <section
                key={group.year}
                id={`year-${group.year}`}
                aria-labelledby={`year-${group.year}-heading`}
                className="grid scroll-mt-20 gap-6 lg:grid-cols-[9rem_minmax(0,46rem)] lg:gap-10"
              >
                <h2
                  id={`year-${group.year}-heading`}
                  className="font-mono text-xl font-medium tabular-nums text-muted lg:sticky lg:top-20 lg:self-start"
                >
                  {group.year}
                </h2>
                <ul className="space-y-7">
                  {group.publications.map((publication) => (
                    <li key={publication.id}>
                      <PublicationEntry publication={publication} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-10 max-w-reading">
          <p className="text-lg font-semibold tracking-tight">No publications match these filters.</p>
          <p className="mt-2 leading-7 text-muted">
            Try a shorter search, fewer filters, or{' '}
            <button type="button" onClick={handleClearAll} className="text-link">
              clear all filters
            </button>
            .
          </p>
        </div>
      )}
    </>
  );
}
