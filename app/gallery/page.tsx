import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import Image from 'next/image';
import Link from 'next/link';
import { groupPictures, heroGroupPicture } from '@/data/groupPictures';
import { absoluteUrl, siteName } from '@/lib/site';
import { withBasePath } from '@/lib/withBasePath';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'A visual archive of DLab group moments, events, and collaborations.',
  alternates: {
    canonical: '/gallery',
  },
};

export default function GalleryPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${siteName} Gallery`,
          description: 'A visual archive of DLab group moments, events, and collaborations.',
          url: absoluteUrl('/gallery'),
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: groupPictures.map((picture, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'ImageObject',
                name: picture.alt,
                contentUrl: absoluteUrl(picture.src),
              },
            })),
          },
        }}
      />
      <section className="relative isolate overflow-hidden rounded-3xl shadow-2xl">
        <div className="absolute inset-0">
          <Image
            src={withBasePath(heroGroupPicture.src)}
            alt={heroGroupPicture.alt}
            fill
            priority
            quality={75}
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-900/35" />
        </div>

        <div className="relative px-6 py-14 text-white sm:px-10 sm:py-16 lg:max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-white/35 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em]">
            DLab Gallery
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            People, projects, and moments from our research community.
          </h1>
          <p className="mt-4 text-sm text-slate-100 sm:text-base">
            A curated visual wall featuring all group pictures from the lab archive.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/people"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
            >
              Meet the team
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Gallery Wall</h2>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-300">
            {groupPictures.length} photos
          </p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {groupPictures.map((picture) => (
            <figure
              key={picture.id}
              className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-900/60"
            >
              <div className="relative">
                <Image
                  src={withBasePath(picture.src)}
                  alt={picture.alt}
                  width={picture.width}
                  height={picture.height}
                  quality={70}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-3 right-3 rounded-full border border-white/50 bg-slate-900/60 px-2.5 py-1 text-[0.65rem] font-semibold text-white backdrop-blur-sm">
                  #{picture.id}
                </span>
              </div>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
