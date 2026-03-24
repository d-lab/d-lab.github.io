'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/SimpleHeroSection';
import publicationsData from '@/data/publications.json';

type Publication = {
  citation: string;
  pdfLabel?: string;
  pdfUrl?: string;
};

type PublicationGroup = {
  year: number;
  publications: Publication[];
};

const latestPublications = [...(publicationsData as PublicationGroup[])]
  .sort((a, b) => b.year - a.year)
  .flatMap((group) =>
    group.publications.map((publication) => ({
      ...publication,
      year: group.year,
    }))
  )
  .slice(0, 5);

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const researchRef = useRef<HTMLDivElement | null>(null);

  const focusAreas = [
    {
      title: 'Perspective-Aware LLM Evaluation',
      description:
        'We analyze how large language models encode political and demographic perspectives, with a focus on bias, relevance judgments, and summarization effects.',
    },
    {
      title: 'Human-Centered Data Quality',
      description:
        'Our research combines metadata, crowdsourcing, and information retrieval methods to improve quality assessment and trust in unstructured data workflows.',
    },
    {
      title: 'Social Media Integrity and Safety',
      description:
        'We study misinformation, harmful content, and online persuasion, developing methods and tools for fairer and more transparent sociotechnical systems.',
    },
  ];

  useEffect(() => {
    const currentRef = researchRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection />

      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="rounded-3xl p-6 border border-blue-100 dark:border-blue-800 bg-white/90 dark:bg-blue-950/30 shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 transition-shadow"
            >
              <h3 className="text-lg font-semibold text-blue-700 dark:text-yellow-300 mb-3">
                {area.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-200 leading-relaxed">{area.description}</p>
            </div>
          ))}
        </section>

        <div
          ref={researchRef}
          className={`transform transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <section className="w-full mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-blue-700 dark:text-yellow-300 mb-2">Latest Publications</h2>
                <p className="text-gray-600 dark:text-gray-200 max-w-xl">
                  The 5 most recent entries from our publications page, highlighting current work across LLMs, fairness, relevance, and social media analysis.
                </p>
              </div>
              <Link
                href="/publications"
                className="inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-700 px-5 py-2 text-sm font-semibold hover:bg-blue-50 transition-colors dark:border-yellow-300 dark:text-yellow-200 dark:hover:bg-blue-950"
              >
                View all publications
              </Link>
            </div>

            <ul className="space-y-4">
              {latestPublications.map((publication, index) => {
                const pdfLabel = publication.pdfLabel ?? '[pdf]';

                return (
                  <li
                    key={`${publication.year}-${index}`}
                    className="rounded-2xl border border-blue-100 dark:border-blue-900 bg-white/90 dark:bg-blue-950/20 p-5 shadow-md shadow-blue-600/5"
                  >
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{publication.citation}</p>
                    {(publication.pdfUrl || publication.pdfLabel) && (
                      <div className="mt-2">
                        {publication.pdfUrl ? (
                          <a
                            href={publication.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-blue-700 hover:underline dark:text-yellow-200"
                          >
                            {pdfLabel}
                          </a>
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-400">{pdfLabel}</span>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

      </div>

      <footer className="relative mt-12 w-full overflow-hidden border-t border-black/15">
        <div className="absolute inset-0 bg-gradient-to-r from-[#231e52] via-[#2f2a69] to-[#d8b84f]" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-4 py-12 text-white sm:grid-cols-3 sm:px-6 sm:py-14 lg:px-8">
          <div>
            <h3 className="mb-2 text-2xl font-bold">Engage with DLab</h3>
            <p className="text-sm text-white/85 sm:text-base">
              We partner with educators, communities, and organizations to build joyful and just futures of learning.
            </p>
          </div>
          <div className="space-y-2 text-sm sm:text-base">
            <p className="font-semibold uppercase tracking-[0.2em] text-[#f1df97]">Join</p>
            <p className="text-white/90">Graduate students curious about sociotechnical research.</p>
            <p className="mt-4 font-semibold uppercase tracking-[0.2em] text-[#f1df97]">Collaborate</p>
            <p className="text-white/90">Institutions seeking research-backed experimentation.</p>
          </div>
          <div className="flex flex-col space-y-3">
            <Link
              href="/people"
              className="inline-flex items-center justify-center rounded-full bg-white/90 px-5 py-3 font-semibold text-[#231e52] transition-colors hover:bg-[#f5e8bc]"
            >
              Meet our team
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Read lab stories
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse gallery
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
