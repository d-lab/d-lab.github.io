import type { Metadata } from "next";
import Script from "next/script";
import { Inconsolata } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import GoogleAnalytics from "../components/GoogleAnalytics";
import StructuredData from "../components/StructuredData";
import ThemeProvider from '../components/ThemeProvider';
import { currentSponsors } from '@/data/sponsors';
import {
  absoluteUrl,
  contactEmail,
  defaultSocialImage,
  headOfLab,
  headOfLabId,
  organizationId,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
  websiteId,
} from '@/lib/site';
import 'katex/dist/katex.min.css';

const GA_MEASUREMENT_ID = "G-ZG6585B2M8";

const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | DLab'
  },
  description: siteDescription,
  authors: [{ name: siteName, url: `${siteUrl}/` }],
  creator: siteName,
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: `${siteUrl}/`,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [defaultSocialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [defaultSocialImage.url],
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

const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${siteUrl}/`,
      name: siteName,
      description: siteDescription,
      publisher: { '@id': organizationId },
      inLanguage: 'en',
    },
    {
      '@type': 'ResearchOrganization',
      '@id': organizationId,
      name: siteName,
      description: siteDescription,
      url: `${siteUrl}/`,
      parentOrganization: {
        '@type': 'CollegeOrUniversity',
        name: 'The University of Queensland',
        url: 'https://www.uq.edu.au/',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Brisbane',
        addressRegion: 'QLD',
        addressCountry: 'AU',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'General enquiries',
        email: contactEmail,
      },
      member: { '@id': headOfLabId },
      funder: currentSponsors.map((sponsor) => ({
        '@type': sponsor.schemaType,
        name: sponsor.name,
        url: sponsor.website,
      })),
    },
    {
      '@type': 'Person',
      '@id': headOfLabId,
      name: headOfLab.name,
      honorificPrefix: 'Prof.',
      jobTitle: 'Head of DLab',
      url: headOfLab.website,
      image: absoluteUrl('/images/people/Gianluca_Demartini_dlab.jpg'),
      worksFor: { '@id': organizationId },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        className={`${inconsolata.variable} ${GeistSans.variable} flex min-h-screen flex-col bg-background font-sans text-foreground antialiased`}
      >
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[2000] -translate-y-24 rounded-md bg-foreground px-4 py-3 font-semibold text-background transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
          <Navbar />
          <main id="main-content" tabIndex={-1} className="w-full flex-1 overflow-x-clip">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
        <StructuredData data={siteGraph} />
      </body>
    </html>
  );
}
