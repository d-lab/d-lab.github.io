import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { canonicalUrl, parseOptionalDate } from '@/lib/site';

// /now/ is excluded while it is marked noindex. See SEO.md.
const staticRoutes = ['/', '/about/', '/people/', '/publications/', '/blog/', '/gallery/', '/visiting/', '/sponsors/'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: canonicalUrl(path),
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: canonicalUrl(`/blog/${post.slug}/`),
    lastModified: parseOptionalDate(post.updated ?? post.date),
  }));

  return [...routes, ...postRoutes];
}
