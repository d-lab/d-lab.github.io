import type { Metadata } from 'next';
import Image from 'next/image';
import { withBasePath } from '@/lib/withBasePath';

type Sponsor = {
  name: string;
  logo: string;
  website: string;
  logoScaleClass?: string;
};

const sponsors: Sponsor[] = [
  {
    name: 'Australian Research Council (ARC)',
    logo: '/images/dlab_sponsors/ARC.svg',
    website: 'https://www.arc.gov.au/',
    logoScaleClass: 'scale-[1.05]',
  },
  {
    name: 'Engineering and Physical Sciences Research Council (EPSRC)',
    logo: '/images/dlab_sponsors/epsrc.png',
    website: 'https://www.ukri.org/councils/epsrc/',
    logoScaleClass: 'scale-[1.03]',
  },
  {
    name: 'European Commission',
    logo: '/images/dlab_sponsors/European_Commission.svg',
    website: 'https://commission.europa.eu/',
    logoScaleClass: 'scale-[1.04]',
  },
  {
    name: 'Meta',
    logo: '/images/dlab_sponsors/META.svg',
    website: 'https://about.meta.com/',
    logoScaleClass: 'scale-[1.03]',
  },
  {
    name: 'Swiss National Science Foundation (SNSF)',
    logo: '/images/dlab_sponsors/SNSF.png',
    website: 'https://www.snf.ch/en',
    logoScaleClass: 'scale-[1.08]',
  },
  {
    name: 'Google',
    logo: '/images/dlab_sponsors/google.png',
    website: 'https://about.google/',
    logoScaleClass: 'scale-[1.14]',
  },
  {
    name: 'Wikimedia Foundation',
    logo: '/images/dlab_sponsors/wikimedia.svg',
    website: 'https://wikimediafoundation.org/',
    logoScaleClass: 'scale-[1.08]',
  },
];

export const metadata: Metadata = {
  title: 'Sponsors',
  description: 'Organizations sponsoring and supporting DLab research.',
  alternates: {
    canonical: '/sponsors',
  },
};

export default function SponsorsPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-blue-100/70 via-white to-transparent dark:from-blue-950/35 dark:via-slate-950 dark:to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="relative isolate overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#1b2252] via-[#2d3b80] to-[#d8b84f] px-6 py-10 text-white shadow-2xl shadow-slate-900/20 sm:px-10 sm:py-12">
          <div className="absolute -left-14 top-8 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute right-4 top-2 h-32 w-32 rounded-full bg-yellow-200/25 blur-3xl" />
          <div className="absolute -bottom-16 right-10 h-40 w-40 rounded-full bg-blue-200/20 blur-3xl" />

          <div className="relative">
            <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] backdrop-blur">
              DLab Partners
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Sponsors</h1>
            <p className="mt-4 max-w-3xl text-sm text-blue-50/95 sm:text-base">
              Our sponsors make long-term, high-impact research possible. Explore the organizations that support DLab
              and visit their websites to learn more.
            </p>

            <div className="mt-7 inline-flex rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm font-semibold text-white/95">
              {sponsors.length} supporting organizations
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Supporting Organizations</h2>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-300">Click any card</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${sponsor.name} website`}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 dark:border-slate-700/75 dark:bg-slate-900/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-yellow-300"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-yellow-400 opacity-65 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div className="relative h-20 w-full sm:h-24">
                    <Image
                      src={withBasePath(sponsor.logo)}
                      alt={`${sponsor.name} logo`}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 42vw, 24vw"
                      className={`object-contain ${sponsor.logoScaleClass ?? ''
                        }`}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                    {sponsor.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-blue-700 dark:text-yellow-300">Open sponsor website</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
