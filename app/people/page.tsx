import type { Metadata } from 'next';
import PeoplePageClient from '@/components/PeoplePageClient';
import StructuredData from '@/components/StructuredData';
import peopleData from '@/data/people.json';
import { absoluteUrl, siteName } from '@/lib/site';

type PersonRecord = {
  name: string;
  role: string;
  focus?: string;
  website?: string;
  isAlumni?: boolean;
};

export const metadata: Metadata = {
  title: 'People',
  description: 'Meet the DLab team and alumni working on responsible AI, human-computer interaction, and sociotechnical systems.',
  alternates: {
    canonical: '/people',
  },
};

export default function PeoplePage() {
  const people = peopleData as PersonRecord[];

  return (
    <>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${siteName} People`,
          description:
            'Profiles of DLab researchers and alumni working on responsible AI, HCI, and sociotechnical systems.',
          url: absoluteUrl('/people'),
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: people.map((person, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Person',
                name: person.name,
                jobTitle: person.role,
                description: person.focus,
                url: person.website,
                alumniOf: person.isAlumni ? siteName : undefined,
                worksFor: person.isAlumni
                  ? undefined
                  : {
                      '@type': 'ResearchOrganization',
                      name: siteName,
                      url: absoluteUrl('/'),
                    },
              },
            })),
          },
        }}
      />
      <PeoplePageClient />
    </>
  );
}
