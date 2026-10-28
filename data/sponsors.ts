export type Sponsor = {
  name: string;
  logo: string;
  website: string;
  isCurrent: boolean;
  schemaType: 'GovernmentOrganization' | 'Organization';
};

// Used by the Sponsors page, the homepage strip, and the organisation's `funder` structured data.
export const sponsors: Sponsor[] = [
  {
    name: 'Australian Research Council',
    logo: '/images/dlab_sponsors/ARC.svg',
    website: 'https://www.arc.gov.au/',
    isCurrent: true,
    schemaType: 'GovernmentOrganization',
  },
  {
    name: 'Swiss National Science Foundation',
    logo: '/images/dlab_sponsors/SNSF.png',
    website: 'https://www.snf.ch/en',
    isCurrent: true,
    schemaType: 'Organization',
  },
  {
    name: 'Wikimedia Foundation',
    logo: '/images/dlab_sponsors/wikimedia.svg',
    website: 'https://wikimediafoundation.org/',
    isCurrent: false,
    schemaType: 'Organization',
  },
  {
    name: 'Google',
    logo: '/images/dlab_sponsors/google.png',
    website: 'https://about.google/',
    isCurrent: false,
    schemaType: 'Organization',
  },
  {
    name: 'Meta',
    logo: '/images/dlab_sponsors/META.svg',
    website: 'https://about.meta.com/',
    isCurrent: false,
    schemaType: 'Organization',
  },
  {
    name: 'European Commission (Horizon 2020)',
    logo: '/images/dlab_sponsors/European_Commission.svg',
    website: 'https://commission.europa.eu/',
    isCurrent: false,
    schemaType: 'GovernmentOrganization',
  },
  {
    name: 'Engineering and Physical Sciences Research Council',
    logo: '/images/dlab_sponsors/epsrc.png',
    website: 'https://www.ukri.org/councils/epsrc/',
    isCurrent: false,
    schemaType: 'GovernmentOrganization',
  },
];

export const currentSponsors = sponsors.filter((sponsor) => sponsor.isCurrent);
export const pastSponsors = sponsors.filter((sponsor) => !sponsor.isCurrent);
