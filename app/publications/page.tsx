import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import publicationsData from '@/data/publications.json';
import { absoluteUrl, siteName } from '@/lib/site';

type Publication = {
  citation: string;
  pdfLabel?: string;
  pdfUrl?: string;
};

type PublicationGroup = {
  year: number;
  publications: Publication[];
};

const sortByYearDesc = (groups: PublicationGroup[]) => [...groups].sort((a, b) => b.year - a.year);

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Scientific publications from DLab covering responsible AI, data quality, information retrieval, and sociotechnical systems.',
  alternates: {
    canonical: '/publications',
  },
};

export default function PublicationsPage() {
  const publicationGroups = sortByYearDesc(publicationsData as PublicationGroup[]);
  const publications = publicationGroups.flatMap((group) =>
    group.publications.map((publication) => ({
      ...publication,
      year: group.year,
    }))
  );

  return (
    <div className="max-w-5xl mx-auto py-16 sm:py-20 px-4 sm:px-6">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${siteName} Publications`,
          description: 'Scientific publications from DLab grouped by year.',
          url: absoluteUrl('/publications'),
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: publications.map((publication, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'ScholarlyArticle',
                name: publication.citation,
                url: publication.pdfUrl,
                datePublished: publication.year.toString(),
              },
            })),
          },
        }}
      />
      <header className="mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">DLab</p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 dark:text-slate-100 mt-3">Publications</h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl mt-4 leading-relaxed">
          Scientific publications from the DLab, grouped by year.
        </p>
      </header>

      <section className="space-y-12">
        {publicationGroups.map((group) => (
          <article
            key={group.year}
            className="border-t border-slate-200 pt-8 first:border-t-0 first:pt-0 dark:border-slate-800"
          >
            <div className="mb-6 flex items-center gap-4">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{group.year}</h2>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            </div>

            <ul className="space-y-6">
              {group.publications.map((publication, index) => {
                const pdfLabel = publication.pdfLabel ?? '[pdf]';

                return (
                  <li
                    key={`${group.year}-${index}`}
                    className="border-l-2 border-slate-200 pl-4 text-slate-700 dark:border-slate-700 dark:text-slate-200"
                  >
                    <p className="leading-relaxed">{publication.citation}</p>
                    {(publication.pdfUrl || publication.pdfLabel) && (
                      <div className="mt-1.5">
                        {publication.pdfUrl ? (
                          <a
                            href={publication.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-blue-700 hover:underline dark:text-blue-300"
                          >
                            {pdfLabel}
                          </a>
                        ) : (
                          <span className="text-sm text-slate-500 dark:text-slate-400">{pdfLabel}</span>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
