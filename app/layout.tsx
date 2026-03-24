import type { Metadata } from "next";
import { Inconsolata, Quicksand } from 'next/font/google';
import "./globals.css";
import Navbar from '../components/Navbar';
import ThemeProvider from '../components/ThemeProvider';
import 'katex/dist/katex.min.css';

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
  metadataBase: new URL('https://dlab.example.com/'),
  title: {
    default: 'DLab — Digital Learning & AI Lab',
    template: '%s | DLab'
  },
  description: 'DLab is a collaborative research group designing equitable futures of learning with data, design, and dialogue.',
  keywords: ['DLab', 'digital learning lab', 'education research', 'responsible AI', 'learning analytics', 'human-centered computing'],
  authors: [{ name: 'DLab' }],
  creator: 'DLab',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dlab.example.com/',
    siteName: 'DLab',
    title: 'DLab — Digital Learning & AI Lab',
    description: 'Interdisciplinary research group exploring data, design, and intelligent systems for learning.',
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
    title: 'DLab — Digital Learning & AI Lab',
    description: 'Research on the sociotechnical future of learning and intelligent systems.',
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
      </head>
      <body
        className={`${inconsolata.variable} ${quicksand.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
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
              "description": "DLab is a digital learning and AI research group advancing equitable, creative futures of education.",
              "url": "https://dlab.example.com/",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "General enquiries",
                "email": "hello@dlab.example.com"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
