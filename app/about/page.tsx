
import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { absoluteUrl, siteDescription, siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about DLab, a research lab at The University of Queensland focused on responsible AI, sociotechnical systems, and human-centered data science.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutUs() {

  return (
    <div className="max-w-6xl mx-auto py-16 sm:py-20 px-4 sm:px-6">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: `About ${siteName}`,
          url: absoluteUrl('/about'),
          description:
            'Overview of DLab, its research mission, sponsorship, and interdisciplinary work across data, people, and AI.',
          about: {
            '@type': 'ResearchOrganization',
            name: siteName,
            description: siteDescription,
            url: absoluteUrl('/'),
          },
        }}
      />
      <header className="mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">DLab</p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 dark:text-slate-100 mt-3">About Us</h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl mt-4 leading-relaxed">
          Our purpose is to conduct research aimed at identifying the risks and harms of AI and building AI for public good.<br />
          We conduct research at the intersection of Data, People, and AI. This involves research contributions to the fields of Computational Social Science, Human-Computer Interaction, Machine Learning, Information Retrieval.<br />
          Our current PhD students work on the following research topics: LLMs for relevance judgments, political bias in LLMs, controlling bias in LLMs, data-centric ML fairness, LLMs for persuasion, Legal NLP, the impact of LLMs on human-decision making, and human-AI teaming.<br />
          We thank our current sponsors that support our research: the Australian Research Council and the Swiss National Science Foundation. Our past sponsors include: the Wikimedia Foundation, Google, Meta, the EU Horizon 2020 Programme Framework, and the UK Engineering and Physical Sciences Research Council.<br />
          The DLab is led by Prof. Gianluca Demartini at The University of Queensland, Australia.
        </p>
      </header>
    </div>
  );


}



