import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { absoluteUrl, parseOptionalDate } from '@/lib/site';

const staticRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/people', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/publications', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/sponsors', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/now', priority: 0.6, changeFrequency: 'monthly' },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts = getAllPosts();

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    changeFrequency: 'monthly',
    priority: 0.6,
    lastModified: parseOptionalDate(post.date),
  }));

  return [...routes, ...postRoutes];
}
