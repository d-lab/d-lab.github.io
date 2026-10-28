import { CollectionPage } from '@/components/PageFrame';
import SponsorLogo from '@/components/SponsorLogo';
import StructuredData from '@/components/StructuredData';
import { currentSponsors, pastSponsors, type Sponsor } from '@/data/sponsors';
import { canonicalUrl, createPageMetadata, organizationId, siteName } from '@/lib/site';

const description =
  'Organisations that fund DLab research: currently the Australian Research Council and the Swiss National Science Foundation, previously Wikimedia, Google, Meta, the European Commission, and EPSRC.';

export const metadata = createPageMetadata({
  title: 'Sponsors',
  description,
  path: '/sponsors/',
});

const SponsorList = ({ sponsors }: { sponsors: Sponsor[] }) => (
  <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
    {sponsors.map((sponsor) => (
      <li key={sponsor.name}>
        <SponsorLogo sponsor={sponsor} />
      </li>
    ))}
  </ul>
);

export default function SponsorsPage() {
  return (
    <CollectionPage
      eyebrow="Funding and support"
      title="Sponsors"
      description="Our sponsors make long-term research possible. We thank the organisations that support DLab now and those that have supported us in the past."
    >
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${siteName} Sponsors`,
          description,
          url: canonicalUrl('/sponsors/'),
          about: { '@id': organizationId },
        }}
      />
      <section aria-labelledby="current-sponsors">
        <h2 id="current-sponsors" className="section-heading">Current sponsors</h2>
        <SponsorList sponsors={currentSponsors} />
      </section>
      <section aria-labelledby="past-sponsors" className="mt-20 border-t border-border pt-12">
        <h2 id="past-sponsors" className="section-heading">Past sponsors</h2>
        <SponsorList sponsors={pastSponsors} />
      </section>
    </CollectionPage>
  );
}
