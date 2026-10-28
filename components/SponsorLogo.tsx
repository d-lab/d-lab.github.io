import Image from 'next/image';
import type { Sponsor } from '@/data/sponsors';
import { withBasePath } from '@/lib/withBasePath';

type SponsorLogoProps = {
  sponsor: Sponsor;
  size?: 'small' | 'large';
  showName?: boolean;
};

// Logos sit on white in both themes so their brand colours stay legible.
export default function SponsorLogo({ sponsor, size = 'large', showName = true }: SponsorLogoProps) {
  return (
    <a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg"
      aria-label={showName ? undefined : `${sponsor.name} (opens in a new tab)`}
    >
      <span
        className={`relative flex items-center justify-center rounded-lg border border-border bg-white transition-shadow duration-200 group-hover:shadow-card ${
          size === 'large' ? 'h-28 px-8 py-6' : 'h-20 px-5 py-4'
        }`}
      >
        <span className="relative block h-full w-full">
          <Image
            src={withBasePath(sponsor.logo)}
            alt=""
            fill
            sizes={size === 'large' ? '(max-width: 640px) 80vw, 300px' : '(max-width: 640px) 40vw, 160px'}
            className="object-contain"
          />
        </span>
      </span>
      {showName ? (
        <span className="mt-3 block text-sm font-medium text-foreground underline decoration-transparent underline-offset-4 transition-colors duration-150 group-hover:text-accent group-hover:decoration-current">
          {sponsor.name}
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
      ) : null}
    </a>
  );
}
