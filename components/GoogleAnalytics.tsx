'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type GoogleAnalyticsProps = {
  measurementId: string;
};

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || typeof window.gtag !== 'function') {
      return;
    }

    const pagePath = `${pathname}${window.location.search}`;

    window.gtag('config', measurementId, {
      page_path: pagePath,
    });
  }, [measurementId, pathname]);

  return null;
}
