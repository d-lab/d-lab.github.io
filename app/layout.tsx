import type { Metadata } from "next";
import Script from "next/script";
import { Inconsolata, Quicksand } from 'next/font/google';
import "./globals.css";
import Navbar from '../components/Navbar';
import GoogleAnalytics from "../components/GoogleAnalytics";
import StructuredData from "../components/StructuredData";
import ThemeProvider from '../components/ThemeProvider';
import { siteDescription, siteName, siteTitle, siteUrl } from '@/lib/site';
import 'katex/dist/katex.min.css';

const GA_MEASUREMENT_ID = "G-ZG6585B2M8";

const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | DLab'
  },
  description: siteDescription,
  keywords: ['DLab', 'research lab', 'AI research', 'responsible AI', 'AI for public good', 'human-centered computing'],
  authors: [{ name: siteName }],
  creator: siteName,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DLab — Digital Learning Lab'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
          integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
          crossOrigin="anonymous"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          `}
        </Script>
      </head>
      <body
        className={`${inconsolata.variable} ${quicksand.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
          <Navbar />
          <main className="w-full overflow-x-hidden">
            {children}
          </main>
        </ThemeProvider>
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'ResearchOrganization',
            name: siteName,
            description: siteDescription,
            url: siteUrl,
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'General enquiries',
              email: 'demartini@acm.org',
            },
          }}
        />
      </body>
    </html>
  );
}
