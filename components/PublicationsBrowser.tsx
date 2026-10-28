'use client';

import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { Search, X } from 'lucide-react';
import PublicationEntry from '@/components/PublicationEntry';
import type { FilterOption, PublicationRecord } from '@/lib/publications';

type PublicationsBrowserProps = {
  records: PublicationRecord[];
  topicOptions: FilterOption[];
  memberOptions: { label: string; options: FilterOption[] }[];
};

type Filters = {
  query: string;
  topic: string;
  author: string;
};

const EMPTY_FILTERS: Filters = { query: '', topic: '', author: '' };
const URL_KEYS: Record<keyof Filters, string> = { query: 'q', topic: 'topic', author: 'author' };

// Lowercase and drop accents so "frohling" finds "Fröhling".
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const controlClassName =
  'h-11 w-full rounded-md border border-border-strong bg-surface-raised px-3 text-sm text-foreground transition-colors duration-150 hover:border-foreground';

export default function PublicationsBrowser({ records, topicOptions, memberOptions }: PublicationsBrowserProps) {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  // Filters live in the URL so a filtered list can be shared as a link.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters({
      query: params.get(URL_KEYS.query) ?? '',
      topic: params.get(URL_KEYS.topic) ?? '',
      author: params.get(URL_KEYS.author) ?? '',
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    (Object.keys(URL_KEYS) as (keyof Filters)[]).forEach((key) => {
      if (filters[key]) params.set(URL_KEYS[key], filters[key]);
    });
    const search = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`);
  }, [filters]);

  const searchIndex = useMemo(
    () => new Map(records.map((record) => [record.id, normalize(`${record.citation} ${record.year}`)])),
    [records],
  );

  const filteredRecords = useMemo(() => {
    const terms = normalize(filters.query).split(/\s+/).filter(Boolean);

    return records.filter((record) => {
      if (filters.topic && !record.topics.includes(filters.topic)) return false;
      if (filters.author && !record.members.includes(filters.author)) return false;
      const text = searchIndex.get(record.id) ?? '';
      return terms.every((term) => text.includes(term));
    });
  }, [records, filters, searchIndex]);

  const groups = useMemo(() => {
    const byYear = new Map<number, PublicationRecord[]>();
    filteredRecords.forEach((record) => byYear.set(record.year, [...(byYear.get(record.year) ?? []), record]));
    return Array.from(byYear.entries()).map(([year, publications]) => ({ year, publications }));
  }, [filteredRecords]);

  const isFiltered = filters.query !== '' || filters.topic !== '' || filters.author !== '';

  const handleChange = (key: keyof Filters) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters((current) => ({ ...current, [key]: event.target.value }));
  };

  const handleClear = () => {
    setFilters(EMPTY_FILTERS);
  };

  return (
    <>
      <div role="search" aria-label="Search and filter publications" className="rounded-xl border border-border bg-surface-tint p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_14rem_14rem]">
          <div className="relative">
            <label htmlFor="publication-search" className="sr-only">
              Search publications
            </label>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="publication-search"
              type="search"
              value={filters.query}
              onChange={handleChange('query')}
              placeholder="Search titles, authors, venues…"
              className={`${controlClassName} pl-9`}
            />
          </div>

          <div>
            <label htmlFor="publication-topic" className="sr-only">
              Filter by topic
            </label>
            <select id="publication-topic" value={filters.topic} onChange={handleChange('topic')} className={controlClassName}>
              <option value="">All topics</option>
              {topicOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name} ({option.count})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="publication-author" className="sr-only">
              Filter by DLab author
            </label>
            <select id="publication-author" value={filters.author} onChange={handleChange('author')} className={controlClassName}>
              <option value="">All DLab authors</option>
              {memberOptions.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((option) => (
                    <option key={option.name} value={option.name}>
                      {option.name} ({option.count})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* The row stays in the page (empty without filters) so screen readers announce result counts. */}
        <div className={`flex flex-wrap items-center justify-between gap-x-4 ${isFiltered ? 'mt-3 min-h-11' : ''}`}>
          <p aria-live="polite" className="font-mono text-sm text-muted">
            {isFiltered ? `Showing ${filteredRecords.length} of ${records.length} publications` : ''}
          </p>
          {isFiltered ? (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {groups.length > 0 ? (
        <>
          <nav aria-label="Jump to year" className="mb-10 mt-8 flex flex-wrap gap-x-1 gap-y-1">
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
        <div className="mt-12 max-w-reading">
          <p className="text-lg font-semibold tracking-tight">No publications match these filters.</p>
          <p className="mt-2 leading-7 text-muted">
            Try a shorter search, a different topic or author, or{' '}
            <button type="button" onClick={handleClear} className="text-link">
              clear all filters
            </button>
            .
          </p>
        </div>
      )}
    </>
  );
}
