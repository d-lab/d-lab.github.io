import type { Publication } from '@/lib/publications';

export default function PublicationEntry({ publication }: { publication: Publication }) {
  return (
    <>
      <p className="leading-7 text-foreground">{publication.citation}</p>
      {publication.pdfUrl ? (
        <a
          href={publication.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link mt-1 inline-flex min-h-11 items-center font-mono text-sm sm:min-h-0"
        >
          {publication.pdfLabel ?? '[pdf]'}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : null}
    </>
  );
}
