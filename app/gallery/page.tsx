import Image from 'next/image';
import ImageLightbox from '@/components/ImageLightbox';
import { CollectionPage } from '@/components/PageFrame';
import StructuredData from '@/components/StructuredData';
import { groupPictures } from '@/data/groupPictures';
import { absoluteUrl, canonicalUrl, createPageMetadata, organizationId, siteName } from '@/lib/site';
import { withBasePath } from '@/lib/withBasePath';

const description =
  'Photographs of DLab members at The University of Queensland, at conferences, and at lab lunches and events.';

export const metadata = createPageMetadata({
  title: 'Gallery',
  description,
  path: '/gallery/',
});

export default function GalleryPage() {
  return (
    <CollectionPage
      eyebrow="Life at DLab"
      title="Gallery"
      description="The lab on campus, at conferences, and around the lunch table."
    >
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${siteName} Gallery`,
          description,
          url: canonicalUrl('/gallery/'),
          about: { '@id': organizationId },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: groupPictures.map((picture, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'ImageObject',
                contentUrl: absoluteUrl(picture.src),
                caption: picture.alt,
                width: picture.width,
                height: picture.height,
              },
            })),
          },
        }}
      />
      <ImageLightbox>
        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {groupPictures.map((picture) => (
            <li key={picture.id} className="mb-4 break-inside-avoid">
              <Image
                src={withBasePath(picture.src)}
                alt={picture.alt}
                width={picture.width}
                height={picture.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                className="h-auto w-full rounded-md bg-surface-muted"
              />
            </li>
          ))}
        </ul>
      </ImageLightbox>
    </CollectionPage>
  );
}
