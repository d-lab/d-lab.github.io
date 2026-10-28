import Image from 'next/image';
import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';
import { formatDisplayDate } from '@/lib/site';
import { withBasePath } from '@/lib/withBasePath';

type PostCardProps = {
  post: PostMeta;
  headingLevel?: 'h2' | 'h3';
};

export default function PostCard({ post, headingLevel: Heading = 'h3' }: PostCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface-raised transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-quart)] hover:-translate-y-0.5 hover:shadow-card">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
        {post.leadImage ? (
          <Image
            src={withBasePath(post.leadImage.src)}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-sm text-muted">
          {formatDisplayDate(post.date)}
          {post.author ? ` · ${post.author}` : null}
        </p>
        <Heading className="mt-2 text-lg font-semibold leading-snug tracking-tight">
          {/* The link covers the whole card so it is one interactive target. */}
          <Link
            href={`/blog/${post.slug}/`}
            className="text-foreground transition-colors duration-150 after:absolute after:inset-0 group-hover:text-accent"
          >
            {post.title}
          </Link>
        </Heading>
        {post.description ? (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{post.description}</p>
        ) : null}
      </div>
    </article>
  );
}
