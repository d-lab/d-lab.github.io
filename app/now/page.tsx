import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CustomLink from '@/components/CustomLink';
import type { Components } from 'react-markdown';

const NowPage = () => {
  const contentPath = path.join(process.cwd(), 'app', 'now', 'content.md');
  const content = fs.readFileSync(contentPath, 'utf8');

  const MarkdownComponents: Partial<Components> = {
    a: ({ href, children, ...props }) => (
      <CustomLink href={href || ''} isExternal={href?.startsWith('http')} {...props}>
        {children}
      </CustomLink>
    ),
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-2xl font-semibold mb-2 mt-10" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-xl font-semibold mb-2 mt-5" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="text-gray-600 dark:text-gray-300 mb-4" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4" {...props}>
        {children}
      </ul>
    ),
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <ReactMarkdown
        components={MarkdownComponents}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default NowPage;