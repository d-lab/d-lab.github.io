import { CollectionPage } from '@/components/PageFrame';
import PublicationsBrowser from '@/components/PublicationsBrowser';
import StructuredData from '@/components/StructuredData';
import { publicationTopics } from '@/data/publicationTopics';
import { alumni, currentMembers, getPlainName, getPublicationNames, type Person } from '@/lib/people';
import { buildPublicationIndex } from '@/lib/publications';
import { canonicalUrl, createPageMetadata, organizationId, siteName } from '@/lib/site';

const description =
  'Peer-reviewed publications from DLab on responsible AI, large language model evaluation and bias, information retrieval, crowdsourcing, and online harms, grouped by year.';

export const metadata = createPageMetadata({
  title: 'Publications',
  description,
  path: '/publications/',
});

const toMemberNames = (person: Person) => ({ name: getPlainName(person), publicationNames: getPublicationNames(person) });

const { records, topicOptions, memberOptions } = buildPublicationIndex(publicationTopics, [
  { label: 'Current members', members: currentMembers.map(toMemberNames) },
  { label: 'Alumni', members: alumni.map(toMemberNames) },
]);

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
      {/* The full list is rendered into the static HTML; filtering happens in the browser. */}
      <PublicationsBrowser records={records} topicOptions={topicOptions} memberOptions={memberOptions} />
    </CollectionPage>
  );
}
