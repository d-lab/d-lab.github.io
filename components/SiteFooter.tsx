import Link from 'next/link';
import { navigationItems } from '@/lib/navigation';
import { contactEmail } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="bg-brand text-brand-foreground">
      <div className="mx-auto grid w-full max-w-frame gap-10 px-4 py-12 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto] lg:px-8">
        <div className="max-w-sm">
          <p className="text-base font-semibold tracking-tight">DLab</p>
          <p className="mt-2 text-sm leading-6 text-brand-muted">
            Responsible AI research at The University of Queensland, Brisbane, Australia.
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-current"
          >
            {contactEmail}
          </a>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-4 md:grid-cols-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-brand-muted transition-colors duration-150 hover:text-brand-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-brand-border">
        <div className="mx-auto flex w-full max-w-frame flex-wrap items-center justify-between gap-x-6 px-4 py-3 sm:px-6 lg:px-8">
          <p className="font-mono text-sm tabular-nums text-brand-muted">&copy; {new Date().getFullYear()} DLab, The University of Queensland</p>
          <a
            href="#main-content"
            className="inline-flex min-h-11 items-center text-sm text-brand-muted transition-colors hover:text-brand-foreground"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
