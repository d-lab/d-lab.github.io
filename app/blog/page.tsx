import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

const PostCard = ({ post }: { post: { slug: string; title: string; date: string } }) => {
  return (
    <div className="mb-8">
      <div className="text-gray-500 text-sm mb-1">
        {post.date}
      </div>
      <Link 
        href={`/blog/${post.slug}`}
        className="text-2xl text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 dark:text-yellow-200 dark:hover:text-yellow-100"
      >
        {post.title}
      </Link>
    </div>
  );
};

export default function Blog() {
  const posts = getAllPosts();
  
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700 dark:text-yellow-300 mb-4">Lab Notes</h1>
        <p className="text-gray-600 dark:text-gray-200">
          Dispatches from the field: prototypes, reflections, and community stories from across DLab.
        </p>
      </div>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard 
            key={post.slug} 
            post={post} 
          />
        ))}
      </div>
    </div>
  );
}
