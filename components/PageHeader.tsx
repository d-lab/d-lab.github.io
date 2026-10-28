import type { ReactNode } from 'react';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

// Full-width indigo band that opens every interior page.
export default function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="bg-brand text-brand-foreground">
      <div className="mx-auto w-full max-w-frame px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.12em] text-gold">{eyebrow}</p>
          ) : null}
          <h1 className="text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl">{title}</h1>
          {description ? (
            <p className="mt-5 max-w-[60ch] text-lg leading-8 text-brand-muted">{description}</p>
          ) : null}
          {children}
        </div>
      </div>
    </header>
  );
}
