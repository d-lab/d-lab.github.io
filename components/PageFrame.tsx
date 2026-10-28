import type { ReactNode } from 'react';
import PageHeader from './PageHeader';

export type PageFact = {
  label: string;
  value: ReactNode;
};

type PageFrameProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

type ReadingPageProps = PageFrameProps & {
  facts?: PageFact[];
};

const frameClassName = 'mx-auto w-full max-w-frame px-4 pb-24 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-32';

// Reading pages: a 46rem column with an optional facts rail on wide screens.
export function ReadingPage({ eyebrow, title, description, facts = [], children }: ReadingPageProps) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className={frameClassName}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,46rem)_15rem] lg:justify-between lg:gap-10">
          <div className="min-w-0">{children}</div>

          {facts.length > 0 ? (
            <aside aria-label={`${title} details`}>
              <dl className="space-y-6 rounded-xl border border-border bg-surface-tint p-6 lg:sticky lg:top-24">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-mono text-sm uppercase tracking-[0.1em] text-muted">{fact.label}</dt>
                    <dd className="mt-1.5 text-sm leading-6 text-foreground">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          ) : null}
        </div>
      </div>
    </>
  );
}

// Collection pages: the full 72rem frame for grids and long lists.
export function CollectionPage({ eyebrow, title, description, children }: PageFrameProps) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className={frameClassName}>{children}</div>
    </>
  );
}
