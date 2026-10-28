import { CollectionPage } from '@/components/PageFrame';
import PersonCard from '@/components/PersonCard';
import StructuredData from '@/components/StructuredData';
import { alumni, currentMembers, getWebsite, type Person } from '@/lib/people';
import { absoluteUrl, canonicalUrl, createPageMetadata, organizationId, siteName } from '@/lib/site';

const description =
  'Meet the DLab team and alumni: researchers at The University of Queensland working on responsible AI, large language models, information retrieval, and computational social science.';

export const metadata = createPageMetadata({
  title: 'People',
  description,
  path: '/people/',
});

const toStructuredPerson = (person: Person) => ({
  '@type': 'Person',
  name: person.name,
  jobTitle: person.isAlumni ? undefined : person.role,
  description: person.focus,
  url: getWebsite(person),
  image: absoluteUrl(person.image),
  ...(person.isAlumni ? { alumniOf: { '@id': organizationId } } : { memberOf: { '@id': organizationId } }),
});

export default function PeoplePage() {
  return (
    <CollectionPage
      eyebrow="Our team"
      title="People"
      description="The researchers, students, and alumni who make up DLab. Select a name to visit their personal page."
    >
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${siteName} People`,
          description,
          url: canonicalUrl('/people/'),
          about: { '@id': organizationId },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: [...currentMembers, ...alumni].map((person, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: toStructuredPerson(person),
            })),
          },
        }}
      />

      <section aria-labelledby="current-members">
        <h2 id="current-members" className="section-heading">Current members</h2>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4">
          {currentMembers.map((person) => (
            <li key={person.name}>
              <PersonCard person={person} />
            </li>
          ))}
        </ul>
      </section>

      {alumni.length > 0 ? (
        <section aria-labelledby="alumni" className="mt-20 border-t border-border pt-12">
          <h2 id="alumni" className="section-heading">Alumni</h2>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4 sm:gap-x-8 lg:grid-cols-6">
            {alumni.map((person) => (
              <li key={person.name}>
                <PersonCard person={person} compact />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </CollectionPage>
  );
}
