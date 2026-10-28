import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { getWebImage, type WebImage } from './images';

const postsDirectory = path.join(process.cwd(), 'posts');

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  description?: string;
  author?: string;
  tags?: string[];
  leadImage?: WebImage & { alt: string };
  // The post's opening text, used as the search description when `description` is not set.
  excerpt: string;
};

const EXCERPT_LENGTH = 160;

// The first plain paragraph of the post, skipping headings, images, quotes, and HTML blocks.
const createExcerpt = (content: string) => {
  const paragraph = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !/^(#|!\[|<|>|\||-{3,})/.test(block)) ?? '';

  const text = paragraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= EXCERPT_LENGTH) return text;
  return `${text.slice(0, text.lastIndexOf(' ', EXCERPT_LENGTH - 1))}…`;
};

// Finds the web-sized copy for any image path containing "images/",
// whether relative (../../images/blog/x.jpg) or absolute (/images/blog/x.jpg).
const findWebImage = (src: string) => {
  const imagesIndex = src.indexOf('images/');
  if (imagesIndex < 0) return undefined;

  const webImage = getWebImage(`/${src.slice(imagesIndex)}`);
  return webImage ? { webImage, imagesIndex } : undefined;
};

// The first image in a post, from Markdown (![alt](src)) or raw HTML (<img src alt>), used for news cards.
const findLeadImage = (content: string): PostMeta['leadImage'] => {
  const markdownMatch = content.match(/!\[([^\]]*)\]\(([^)\s]+)/);
  const htmlMatch = content.match(/<img\b[^>]*>/i);
  const useHtml = htmlMatch && (!markdownMatch || (htmlMatch.index ?? 0) < (markdownMatch.index ?? 0));

  const src = useHtml ? htmlMatch[0].match(/\bsrc="([^"]+)"/)?.[1] : markdownMatch?.[2];
  const alt = useHtml ? htmlMatch[0].match(/\balt="([^"]*)"/)?.[1] ?? '' : markdownMatch?.[1] ?? '';
  const match = src ? findWebImage(src) : undefined;

  return match ? { ...match.webImage, alt } : undefined;
};

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

// Points post images at their web-sized copies and adds intrinsic dimensions,
// unless the author already sized the image (e.g. <img height="150">).
// Markdown keeps referencing the originals.
const rehypeWebImages = () => (tree: HastNode) => {
  const visit = (node: HastNode) => {
    if (node.tagName === 'img' && typeof node.properties?.src === 'string') {
      const src = node.properties.src;
      const match = findWebImage(src);
      const hasAuthorSize = node.properties.width !== undefined || node.properties.height !== undefined;

      node.properties.loading = 'lazy';
      node.properties.decoding = 'async';

      if (match) {
        node.properties.src = `${src.slice(0, match.imagesIndex)}${match.webImage.src.slice(1)}`;

        if (!hasAuthorSize) {
          node.properties.width = match.webImage.width;
          node.properties.height = match.webImage.height;
        }
      }
    }

    node.children?.forEach(visit);
  };

  visit(tree);
};

// Older posts name the author in a leading "**By Name**" line instead of front matter.
const BYLINE_PATTERN = /^\s*\*\*By ([^*\n]+)\*\*\s*\n/;

const readPostFile = (slug: string) => {
  const fileContents = fs.readFileSync(path.join(postsDirectory, `${slug}.md`), 'utf8');
  const { data, content: rawContent } = matter(fileContents);
  const byline = data.author ? null : rawContent.match(BYLINE_PATTERN);
  const content = byline ? rawContent.replace(BYLINE_PATTERN, '') : rawContent;

  return {
    meta: {
      slug,
      ...data,
      author: data.author ?? byline?.[1].trim(),
      leadImage: findLeadImage(content),
      excerpt: createExcerpt(content),
    } as PostMeta,
    content,
  };
};

export async function getPostBySlug(slug: string) {
  const { meta, content } = readPostFile(slug);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkMath)
    // Posts may contain raw HTML, such as <img> tags with explicit sizes.
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeWebImages)
    .use(rehypeStringify)
    .process(content);

  return {
    ...meta,
    contentHtml: processedContent.toString(),
  };
}

export function getAllPosts(): PostMeta[] {
  const posts = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => readPostFile(fileName.replace(/\.md$/, '')).meta);

  return posts.sort((a, b) => {
    const dateDifference = Date.parse(b.date) - Date.parse(a.date);

    return dateDifference || a.slug.localeCompare(b.slug);
  });
}
