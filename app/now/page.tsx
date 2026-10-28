import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import CustomLink from '@/components/CustomLink';
import { ReadingPage } from '@/components/PageFrame';
import { createPageMetadata } from '@/lib/site';

// Kept out of search results and the sitemap until content.md has real updates.
export const metadata = createPageMetadata({
  title: 'Now',
  description: 'What DLab is working on right now.',
  path: '/now/',
  noIndex: true,
});

const markdownComponents: Partial<Components> = {
  a: ({ href, children, ...props }) => (
    <CustomLink href={href || ''} isExternal={href?.startsWith('http')} {...props}>
      {children}
    </CustomLink>
  ),
  // The page header band shows the title, so the Markdown heading is not repeated.
  h1: () => null,
};

export default function NowPage() {
  const content = fs.readFileSync(path.join(process.cwd(), 'app', 'now', 'content.md'), 'utf8');

  return (
    <ReadingPage eyebrow="Now" title="What DLab is exploring now">
      <div className="reading-copy leading-7 [&_em]:font-mono [&_em]:text-sm [&_em]:not-italic [&_em]:text-muted">
        <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </ReadingPage>
  );
}
