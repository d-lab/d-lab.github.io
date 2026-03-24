import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { Metadata } from 'next';

interface PostProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  return {
    title: post.title,
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
  
  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
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