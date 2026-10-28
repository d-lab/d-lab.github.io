import { CollectionPage } from '@/components/PageFrame';
import PublicationEntry from '@/components/PublicationEntry';
import StructuredData from '@/components/StructuredData';
import { publicationGroups } from '@/lib/publications';
import { canonicalUrl, createPageMetadata, organizationId, siteName } from '@/lib/site';

const description =
  'Peer-reviewed publications from DLab on responsible AI, large language model evaluation and bias, information retrieval, crowdsourcing, and online harms, grouped by year.';

export const metadata = createPageMetadata({
  title: 'Publications',
  description,
  path: '/publications/',
});

export default function PublicationsPage() {
  return (
    <CollectionPage eyebrow="Research output" title="Publications">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${siteName} Publications`,
          description,
          url: canonicalUrl('/publications/'),
          about: { '@id': organizationId },
        }}
      />

      <nav aria-label="Jump to year" className="mb-14 flex flex-wrap gap-x-1 gap-y-1">
        {publicationGroups.map((group) => (
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
        {publicationGroups.map((group) => (
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
              {group.publications.map((publication, index) => (
                <li key={`${group.year}-${index}`}>
                  <PublicationEntry publication={publication} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </CollectionPage>
  );
}
