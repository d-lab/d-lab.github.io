import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Database, Scale, ShieldCheck, type LucideIcon } from 'lucide-react';
import PostCard from '@/components/PostCard';
import SponsorLogo from '@/components/SponsorLogo';
import { featuredGroupPictures, heroGroupPicture } from '@/data/groupPictures';
import { sponsors } from '@/data/sponsors';
import { getAllPosts } from '@/lib/posts';
import { getLatestPublications, getVenueLabel } from '@/lib/publications';
import { contactEmail } from '@/lib/site';
import { withBasePath } from '@/lib/withBasePath';

type ResearchArea = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const researchAreas: ResearchArea[] = [
  {
    icon: Scale,
    title: 'Perspective-aware LLM evaluation',
    description:
      'We analyse how large language models encode political and demographic perspectives, with a focus on bias, relevance judgments, and summarisation effects.',
  },
  {
    icon: Database,
    title: 'Human-centred data quality',
    description:
      'We combine metadata, crowdsourcing, and information retrieval methods to improve quality assessment and trust in unstructured data workflows.',
  },
  {
    icon: ShieldCheck,
    title: 'Social media integrity and safety',
    description:
      'We study misinformation, harmful content, and online persuasion, developing methods and tools for fairer and more transparent sociotechnical systems.',
  },
];

const engagementRoutes = [
  {
    title: 'Study with us',
    description: 'Prospective PhD students curious about sociotechnical research on AI.',
    action: { label: 'Get in touch', href: `mailto:${contactEmail}?subject=${encodeURIComponent('PhD enquiry')}` },
  },
  {
    title: 'Visit the lab',
    description: 'Funded 8 to 12 week research visits in Brisbane for PhD students from other universities.',
    action: { label: 'Visiting Students Scheme', href: '/visiting/' },
  },
  {
    title: 'Collaborate',
    description: 'Government agencies, communities, and organisations seeking research-backed work on safe and responsible AI.',
    action: { label: 'Start a conversation', href: `mailto:${contactEmail}?subject=${encodeURIComponent('Collaboration enquiry')}` },
  },
];

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  id: string;
  description?: string;
  link?: { href: string; label: string };
};

const SectionHeader = ({ eyebrow, title, id, description, link }: SectionHeaderProps) => (
  <div className="mb-10 flex flex-col gap-4 sm:mb-12 md:flex-row md:items-end md:justify-between">
    <div className="max-w-2xl">
      <p className="font-mono text-sm uppercase tracking-[0.12em] text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-lg leading-8 text-muted">{description}</p> : null}
    </div>
    {link ? (
      <Link
        href={link.href}
        className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-md border border-border-strong px-4 text-sm font-semibold text-foreground transition-colors duration-150 hover:border-foreground"
      >
        {link.label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    ) : null}
  </div>
);

const Section = ({ id, tinted = false, children }: { id: string; tinted?: boolean; children: ReactNode }) => (
  <section aria-labelledby={id} className={`py-20 sm:py-24 lg:py-28 ${tinted ? 'bg-surface-tint' : ''}`}>
    <div className="mx-auto w-full max-w-frame px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

const enterDelay = (milliseconds: number) => ({ '--home-enter-delay': `${milliseconds}ms` }) as CSSProperties;

export default function Home() {
  const latestPublications = getLatestPublications(5);
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* On wide screens the text sits over the lower part of the photo, below everyone's faces.
          On narrow screens the photo is too short for that, so the text follows it on indigo. */}
      <section
        aria-labelledby="home-title"
        className="relative overflow-hidden bg-brand lg:h-[clamp(600px,50vw,min(calc(100svh-3.5rem),880px))]"
      >
        <div className="relative aspect-[2/1] overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
          {/* A tiny blurred copy inlined in the page shows instantly while the photo loads. */}
          {heroGroupPicture.placeholder ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 scale-110 bg-cover bg-[center_30%] blur-2xl"
              style={{ backgroundImage: `url(${heroGroupPicture.placeholder})` }}
            />
          ) : null}
          {/* A plain img with srcSet lets each screen download only the size it needs;
              next/image cannot generate sizes in a static export. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath(heroGroupPicture.src)}
            srcSet={heroGroupPicture.srcSet?.map(({ src, width }) => `${withBasePath(src)} ${width}w`).join(', ')}
            sizes="100vw"
            alt={heroGroupPicture.alt}
            width={heroGroupPicture.width}
            height={heroGroupPicture.height}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
          />
          <div className="hero-overlay absolute inset-0" aria-hidden="true" />
        </div>

        <div className="relative lg:absolute lg:inset-x-0 lg:bottom-0">
          <div className="mx-auto flex w-full max-w-frame flex-col gap-8 px-4 py-10 text-brand-foreground sm:px-6 sm:py-12 lg:gap-6 lg:px-8 lg:pb-14 lg:pt-0 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl lg:[text-shadow:0_1px_16px_rgb(20_16_50/0.55)]">
              <p className="home-enter font-mono text-sm uppercase tracking-[0.14em] text-gold" style={enterDelay(0)}>
                Responsible AI research lab · The University of Queensland
              </p>
              <h1
                id="home-title"
                className="home-enter mt-4 text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-[3.5rem]"
                style={enterDelay(80)}
              >
                Building AI for public good.
              </h1>
              <p className="home-enter mt-4 max-w-xl text-lg leading-8 text-brand-muted lg:text-white/85" style={enterDelay(160)}>
                DLab is an interdisciplinary research group exploring how data, people, and AI affect each other.
              </p>
            </div>
            <div className="home-enter flex shrink-0 flex-wrap gap-3" style={enterDelay(240)}>
              <a
                href="#work-with-us-title"
                className="inline-flex min-h-12 items-center rounded-md bg-white px-6 text-sm font-semibold text-brand transition-colors duration-150 hover:bg-white/90"
              >
                Work with us
              </a>
              <Link
                href="/people/"
                className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/60 px-6 text-sm font-semibold text-white transition-colors duration-150 hover:border-white hover:bg-white/10"
              >
                Meet the team
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section id="research-title">
        <SectionHeader
          id="research-title"
          eyebrow="Our research"
          title="Where data, people, and AI meet"
          description="We contribute to computational social science, human-computer interaction, machine learning, and information retrieval, with a focus on the risks and harms of AI."
          link={{ href: '/about/', label: 'About the lab' }}
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {researchAreas.map((area) => (
            <li key={area.title} className="rounded-xl border border-border bg-surface-raised p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand text-gold">
                <area.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{area.title}</h3>
              <p className="mt-3 leading-7 text-muted">{area.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="publications-title" tinted>
        <SectionHeader
          id="publications-title"
          eyebrow="Latest publications"
          title="Recent work"
          description="Our newest papers at venues across information retrieval, natural language processing, and human-AI interaction."
          link={{ href: '/publications/', label: 'All publications' }}
        />
        <ul className="divide-y divide-border border-y border-border">
          {latestPublications.map((publication, index) => {
            const venue = getVenueLabel(publication.citation);

            return (
              <li key={`${publication.year}-${index}`} className="grid gap-3 py-7 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
                <p className="font-mono text-sm text-accent">{venue ?? publication.year}</p>
                <div className="max-w-[72ch]">
                  <p className="leading-7">{publication.citation}</p>
                  {publication.pdfUrl ? (
                    <a
                      href={publication.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link mt-1 inline-flex min-h-11 items-center font-mono text-sm"
                    >
                      {publication.pdfLabel ?? '[pdf]'}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="news-title">
        <SectionHeader
          id="news-title"
          eyebrow="News and stories"
          title="From the lab"
          description="Conference reports and reflections written by DLab members."
          link={{ href: '/blog/', label: 'All posts' }}
        />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="life-title" tinted>
        <SectionHeader
          id="life-title"
          eyebrow="Life at DLab"
          title="A lab that works together"
          description="On campus at The University of Queensland, at conferences around the world, and around the lunch table."
          link={{ href: '/gallery/', label: 'View the gallery' }}
        />
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredGroupPictures.map((picture) => (
            <li key={picture.id} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-muted">
              <Image
                src={withBasePath(picture.src)}
                alt={picture.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 280px"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </Section>

      <section aria-labelledby="work-with-us-title" className="scroll-mt-14 bg-brand text-brand-foreground">
        <div className="mx-auto w-full max-w-frame px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <p className="font-mono text-sm uppercase tracking-[0.12em] text-gold">Get involved</p>
            <h2 id="work-with-us-title" className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Work with us
            </h2>
            <p className="mt-4 text-lg leading-8 text-brand-muted">
              We partner with government, communities, and organisations to build safe and responsible AI systems.
            </p>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {engagementRoutes.map((route) => (
              <li key={route.title} className="flex flex-col rounded-xl border border-brand-border p-7">
                <span className="block h-0.5 w-10 bg-gold" aria-hidden="true" />
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{route.title}</h3>
                <p className="mt-3 flex-1 leading-7 text-brand-muted">{route.description}</p>
                {route.action.href.startsWith('mailto:') ? (
                  <a href={route.action.href} className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold hover:underline hover:underline-offset-4">
                    {route.action.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <Link href={route.action.href} className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold hover:underline hover:underline-offset-4">
                    {route.action.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="supporters-title" className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-frame px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="supporters-title" className="font-mono text-sm uppercase tracking-[0.12em] text-muted">
              Supported by
            </h2>
            <Link href="/sponsors/" className="text-link text-sm font-medium">
              About our sponsors
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {sponsors.map((sponsor) => (
              <li key={sponsor.name}>
                <SponsorLogo sponsor={sponsor} size="small" showName={false} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
