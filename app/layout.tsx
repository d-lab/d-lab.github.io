import type { Metadata } from "next";
import Script from "next/script";
import { Inconsolata, Quicksand } from 'next/font/google';
import "./globals.css";
import Navbar from '../components/Navbar';
import GoogleAnalytics from "../components/GoogleAnalytics";
import ThemeProvider from '../components/ThemeProvider';
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
  metadataBase: new URL('https://d-lab.github.io/'),
  title: {
    default: 'DLab — Responsible AI Research Lab',
    template: '%s | DLab'
  },
  description: 'DLab is an interdisciplinary research group exploring how data, people, and AI affect each other.',
  keywords: ['DLab', 'research lab', 'AI research', 'responsible AI', 'AI for public good', 'human-centered computing'],
  authors: [{ name: 'DLab' }],
  creator: 'DLab',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://d-lab.github.io/',
    siteName: 'DLab',
    title: 'DLab — Responsible AI Research Lab',
    description: 'Interdisciplinary research group exploring how data, people, and AI affect each other.',
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
    title: 'DLab — Responsible AI Research Lab',
    description: 'Interdisciplinary research group exploring how data, people, and AI affect each other.',
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
        {/* Structured Data Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ResearchOrganization",
              "name": "DLab",
              "description": "Interdisciplinary research group exploring how data, people, and AI affect each other.",
              "url": "https://d-lab.github.io/",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "General enquiries",
                "email": "demartini@acm.org"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
