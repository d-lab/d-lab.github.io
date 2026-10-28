import type { Metadata } from 'next';
import Link from 'next/link';
import { ReadingPage } from '@/components/PageFrame';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <ReadingPage eyebrow="Error 404" title="Page not found" description="The page you are looking for does not exist or has moved.">
      <p className="leading-7">
        Try the <Link href="/" className="text-link">homepage</Link>, browse our{' '}
        <Link href="/publications/" className="text-link">publications</Link>, or read the{' '}
        <Link href="/blog/" className="text-link">blog</Link>.
      </p>
    </ReadingPage>
  );
}
