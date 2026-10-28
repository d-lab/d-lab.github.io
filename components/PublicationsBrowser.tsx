'use client';

import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
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
const VISIBLE_VENUES = 10;

// Lowercase and drop accents so "frohling" finds "Fröhling".
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

type CheckboxListProps = {
  options: FilterOption[];
  selected: string[];
  counts: Map<string, number>;
  onToggle: (name: string) => void;
};

const CheckboxList = ({ options, selected, counts, onToggle }: CheckboxListProps) => (
  <ul className="space-y-0.5">
    {options.map((option) => {
      const isChecked = selected.includes(option.name);
      const count = counts.get(option.name) ?? 0;

      return (
        <li key={option.name}>
          <label
            className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-1 text-sm transition-colors duration-150 hover:text-accent lg:min-h-9 ${
              count === 0 && !isChecked ? 'text-muted' : 'text-foreground'
            }`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggle(option.name)}
              className="h-4 w-4 shrink-0 rounded border-border-strong accent-accent"
            />
            <span className="min-w-0 flex-1 leading-5">{option.name}</span>
          </label>
        </li>
      );
    })}
  </ul>
);

const FilterGroup = ({ legend, children }: { legend: string; children: ReactNode }) => (
  <fieldset className="border-t border-border pt-5 first:border-t-0 first:pt-0">
    <legend className="float-left mb-3 w-full font-mono text-sm uppercase tracking-[0.1em] text-muted">{legend}</legend>
    <div className="clear-both">{children}</div>
  </fieldset>
);

export default function PublicationsBrowser({ records, topicOptions, memberOptions, venueOptions }: PublicationsBrowserProps) {
  const [query, setQuery] = useState('');
  const [selections, setSelections] = useState<Selections>(EMPTY_SELECTIONS);
  const [showAllVenues, setShowAllVenues] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
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

  // Ticked options within a group widen the results (any of them); groups narrow each other.
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

  // How many results each option would give alongside the other groups' choices;
  // options that would give none are greyed out.
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

  const activeFilters = FILTER_KEYS.flatMap((key) => selections[key].map((value) => ({ key, value })));
  const isFiltered = query !== '' || activeFilters.length > 0;

  const visibleVenues = showAllVenues
    ? venueOptions
    : venueOptions.filter((option, index) => index < VISIBLE_VENUES || selections.venues.includes(option.name));

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleToggle = (key: FilterKey) => (name: string) => {
    setSelections((current) => ({
      ...current,
      [key]: current[key].includes(name) ? current[key].filter((value) => value !== name) : [...current[key], name],
    }));
  };

  const handleClear = () => {
    setQuery('');
    setSelections(EMPTY_SELECTIONS);
  };

  const handlePanelToggle = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleVenueToggle = () => {
    setShowAllVenues(!showAllVenues);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
      {/* First in the page so the Filters button sits above the search on phones; shown on the right on wide screens. */}
      <aside aria-label="Filter publications" className="lg:sticky lg:top-20 lg:order-last lg:self-start">
        <button
          type="button"
          onClick={handlePanelToggle}
          aria-expanded={isPanelOpen}
          aria-controls="publication-filters"
          className="flex min-h-11 w-full items-center justify-between rounded-xl border border-border bg-surface-tint px-5 text-sm font-semibold lg:hidden"
        >
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters{activeFilters.length > 0 ? ` (${activeFilters.length})` : ''}
          </span>
          <span className="font-mono text-sm font-normal text-muted">{isPanelOpen ? 'Hide' : 'Show'}</span>
        </button>

        <div
          id="publication-filters"
          className={`${isPanelOpen ? 'mt-3 block' : 'hidden'} space-y-6 rounded-xl border border-border bg-surface-tint p-6 lg:mt-0 lg:block lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto`}
        >
          <FilterGroup legend="Topics">
            <CheckboxList options={topicOptions} selected={selections.topics} counts={counts.topics} onToggle={handleToggle('topics')} />
          </FilterGroup>

          <FilterGroup legend="DLab authors">
            <div className="space-y-4">
              {memberOptions.map((group) => (
                <div key={group.label}>
                  <p className="mb-1 px-1 text-sm font-semibold">{group.label}</p>
                  <CheckboxList options={group.options} selected={selections.members} counts={counts.members} onToggle={handleToggle('members')} />
                </div>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup legend="Venues">
            <CheckboxList options={visibleVenues} selected={selections.venues} counts={counts.venues} onToggle={handleToggle('venues')} />
            {venueOptions.length > VISIBLE_VENUES ? (
              <button
                type="button"
                onClick={handleVenueToggle}
                aria-expanded={showAllVenues}
                className="mt-2 inline-flex min-h-11 items-center px-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover lg:min-h-9"
              >
                {showAllVenues ? 'Show fewer venues' : 'Show all venues'}
              </button>
            ) : null}
          </FilterGroup>
        </div>
      </aside>

      <div className="min-w-0">
        <div role="search" className="relative">
          <label htmlFor="publication-search" className="sr-only">
            Search publications
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="publication-search"
            type="search"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search titles, authors, venues…"
            className="h-11 w-full rounded-md border border-border-strong bg-surface-raised pl-9 pr-3 text-sm text-foreground transition-colors duration-150 hover:border-foreground"
          />
        </div>

        {/* The status stays in the page (empty without filters) so screen readers announce result counts. */}
        <div className={`flex flex-wrap items-center gap-2 ${isFiltered ? 'mt-4' : ''}`}>
          <p aria-live="polite" className="mr-2 font-mono text-sm text-muted">
            {isFiltered ? `Showing ${filteredRecords.length} of ${records.length} publications` : ''}
          </p>
          {activeFilters.map(({ key, value }) => (
            <button
              key={`${key}-${value}`}
              type="button"
              onClick={() => handleToggle(key)(value)}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border-strong px-3 text-sm transition-colors hover:border-foreground"
              aria-label={`Remove filter ${value}`}
            >
              {value}
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ))}
          {isFiltered ? (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex min-h-9 items-center px-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              Clear all
            </button>
          ) : null}
        </div>

        {groups.length > 0 ? (
          <>
            <nav aria-label="Jump to year" className="mb-8 mt-6 flex flex-wrap gap-x-1 gap-y-1">
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

            <div className="space-y-14">
              {groups.map((group) => (
                <section key={group.year} id={`year-${group.year}`} aria-labelledby={`year-${group.year}-heading`} className="scroll-mt-20">
                  <h2
                    id={`year-${group.year}-heading`}
                    className="mb-6 border-b border-border pb-3 font-mono text-xl font-medium tabular-nums text-muted"
                  >
                    {group.year}
                  </h2>
                  <ul className="max-w-[46rem] space-y-7">
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
              Try a shorter search, untick some filters, or{' '}
              <button type="button" onClick={handleClear} className="text-link">
                clear all filters
              </button>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
