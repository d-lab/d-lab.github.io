import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { absoluteUrl, parseOptionalDate, siteName } from '@/lib/site';

interface PostProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  return {
    title: post.title,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: PostProps) {
  const post = await getPostBySlug(params.slug);
  const publishedDate = parseOptionalDate(post.date);
  
  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          url: absoluteUrl(`/blog/${post.slug}`),
          datePublished: publishedDate?.toISOString(),
          author: {
            '@type': 'Organization',
            name: siteName,
          },
          publisher: {
            '@type': 'Organization',
            name: siteName,
          },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        }}
      />
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
   
        <p className="text-gray-500 dark:text-gray-400 -mt-4">
          {post.date}
        </p>
      </header>
      
      <div 
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
      />
    </article>
  );
}
