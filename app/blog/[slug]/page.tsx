import type { Metadata } from 'next';
import Link from 'next/link';
import ImageLightbox from '@/components/ImageLightbox';
import PageHeader from '@/components/PageHeader';
import StructuredData from '@/components/StructuredData';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { findPersonByName, getWebsite } from '@/lib/people';
import {
  canonicalUrl,
  createPageMetadata,
  formatDisplayDate,
  organizationId,
  parseOptionalDate,
  websiteId,
} from '@/lib/site';

interface PostProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  const description = post.description ?? post.excerpt;

  return {
    ...createPageMetadata({
      title: post.title,
      description,
      path: `/blog/${post.slug}/`,
      type: 'article',
      image: null,
      publishedTime: parseOptionalDate(post.date)?.toISOString(),
      modifiedTime: parseOptionalDate(post.updated)?.toISOString(),
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    }),
    authors: post.author ? [{ name: post.author }] : undefined,
  };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Post({ params }: PostProps) {
  const post = await getPostBySlug(params.slug);
  const url = canonicalUrl(`/blog/${post.slug}/`);
  const publishedDate = parseOptionalDate(post.date);
  const modifiedDate = parseOptionalDate(post.updated);
  const authorProfile = findPersonByName(post.author);
  const authorWebsite = authorProfile ? getWebsite(authorProfile) : undefined;

  return (
    <article>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${url}#article`,
          headline: post.title,
          description: post.description ?? post.excerpt,
          url,
          mainEntityOfPage: url,
          datePublished: publishedDate?.toISOString(),
          dateModified: (modifiedDate ?? publishedDate)?.toISOString(),
          author: post.author
            ? {
                '@type': 'Person',
                name: post.author,
                url: authorWebsite,
              }
            : { '@id': organizationId },
          publisher: { '@id': organizationId },
          isPartOf: { '@id': websiteId },
          keywords: post.tags,
          inLanguage: 'en',
        }}
      />
      <PageHeader eyebrow="Blog" title={post.title} description={post.description}>
        <p className="mt-6 font-mono text-sm text-brand-muted">
          <time dateTime={publishedDate?.toISOString().slice(0, 10)}>{formatDisplayDate(post.date)}</time>
          {post.author ? (
            <>
              {' · '}
              {authorWebsite ? (
                <a
                  href={authorWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold underline decoration-gold underline-offset-4"
                >
                  {post.author}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                post.author
              )}
            </>
          ) : null}
        </p>
      </PageHeader>

      <div className="mx-auto w-full max-w-frame px-4 pb-24 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-reading">
          <ImageLightbox>
            <div
              className="prose max-w-none text-foreground dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-foreground prose-a:text-accent prose-a:underline-offset-4 hover:prose-a:text-accent-hover prose-strong:text-foreground prose-li:text-foreground prose-img:rounded-md"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </ImageLightbox>
          <Link
            href="/blog/"
            className="mt-16 inline-flex min-h-11 items-center gap-1.5 border-t border-border pt-6 text-sm font-semibold text-foreground transition-colors hover:text-accent"
          >
            ← All posts
          </Link>
        </div>
      </div>
    </article>
  );
}
