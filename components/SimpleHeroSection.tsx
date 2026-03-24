'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const highlights = [
  { label: 'Focus', value: 'Responsible AI, education, and sociotechnical design' },
  { label: 'Approach', value: 'Interdisciplinary collaboration with real-world partners' },
  { label: 'Community', value: 'Researchers, students, and institutions shaping learning futures' },
];

export default function SimpleHeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative isolate w-full min-h-[78vh] overflow-hidden rounded-b-[2.25rem] sm:rounded-b-[3rem]">
      <Image
        src='/images/group_pics/16.jpg'
        alt='DLab group picture'
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/68 to-slate-900/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
      <div className="absolute -left-24 top-24 h-48 w-48 rounded-full bg-yellow-300/20 blur-3xl" />
      <div className="absolute right-8 top-10 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl" />

      <header className="relative mx-auto flex min-h-[78vh] w-full max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div
          className={`max-w-3xl text-white transition-all duration-700 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <p className="mb-5 inline-flex rounded-full border border-white/35 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.26em] backdrop-blur">
            Digital Learning & AI Lab
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Designing the future of learning through data, design, and dialogue.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-slate-100/95 sm:text-lg md:text-xl">
            DLab is an interdisciplinary research group exploring how people learn with and alongside intelligent
            systems.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/25 bg-slate-900/35 p-4 backdrop-blur-[2px]"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-blue-100">{item.label}</p>
                <p className="mt-2 text-sm text-slate-100">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/people"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
            >
              Meet the lab
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View gallery
            </Link>
            <Link
              href="/publications"
              className="inline-flex items-center justify-center rounded-full border border-blue-200/80 bg-blue-400/20 px-6 py-3 text-sm font-semibold text-blue-100 transition-colors hover:bg-blue-300/20"
            >
              Explore publications
            </Link>
          </div>
        </div>
      </header>
    </section>
  );
}
