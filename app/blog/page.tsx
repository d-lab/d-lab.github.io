import { CollectionPage } from '@/components/PageFrame';
import PostCard from '@/components/PostCard';
import StructuredData from '@/components/StructuredData';
import { getAllPosts } from '@/lib/posts';
import { canonicalUrl, createPageMetadata, organizationId, siteName } from '@/lib/site';

const description =
  'Conference reports, research reflections, and stories from DLab members working on responsible AI, information retrieval, and computational social science.';

export const metadata = createPageMetadata({
  title: 'Blog',
  description,
  path: '/blog/',
});

export default function Blog() {
  const posts = getAllPosts();

  return (
    <CollectionPage
      eyebrow="News and stories"
      title="Blog"
      description="Conference reports, research reflections, and stories written by DLab members."
    >
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${siteName} Blog`,
          description,
          url: canonicalUrl('/blog/'),
          about: { '@id': organizationId },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: posts.map((post, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: canonicalUrl(`/blog/${post.slug}/`),
              name: post.title,
            })),
          },
        }}
      />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </CollectionPage>
  );
}
