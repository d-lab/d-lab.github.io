import { ReadingPage } from '@/components/PageFrame';
import StructuredData from '@/components/StructuredData';
import { canonicalUrl, contactEmail, createPageMetadata, headOfLab, organizationId } from '@/lib/site';

const description =
  'DLab is a research lab at The University of Queensland led by Prof. Gianluca Demartini, identifying the risks and harms of AI and building AI for public good.';

export const metadata = createPageMetadata({
  title: 'About Us',
  description,
  path: '/about/',
});

const researchTopics = [
  'LLMs for relevance judgments',
  'Political bias in LLMs',
  'Controlling bias in LLMs',
  'Data-centric ML fairness',
  'LLMs for persuasion',
  'Legal NLP',
  'The impact of LLMs on human-decision making',
  'Human-AI teaming',
];

const headOfLabLink = (
  <a href={headOfLab.website} target="_blank" rel="noopener noreferrer" className="text-link">
    {headOfLab.title}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

const facts = [
  { label: 'Led by', value: headOfLabLink },
  { label: 'Based at', value: 'The University of Queensland, Australia' },
  { label: 'Current sponsors', value: 'Australian Research Council; Swiss National Science Foundation' },
  {
    label: 'Contact',
    value: (
      <a href={`mailto:${contactEmail}`} className="text-link break-all">
        {contactEmail}
      </a>
    ),
  },
];

export default function AboutPage() {
  return (
    <ReadingPage
      eyebrow="Who we are"
      title="About Us"
      description="Our purpose is to conduct research aimed at identifying the risks and harms of AI and building AI for public good."
      facts={facts}
    >
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About DLab',
          url: canonicalUrl('/about/'),
          description,
          about: { '@id': organizationId },
        }}
      />
      <div className="reading-copy max-w-[65ch] leading-7">
        <p>
          We conduct research at the intersection of Data, People, and AI. This involves research contributions to the
          fields of Computational Social Science, Human-Computer Interaction, Machine Learning, Information Retrieval.
        </p>

        <h2>Current research</h2>
        <p>Our current PhD students work on the following research topics:</p>
        <ul>
          {researchTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>

        <h2>Support</h2>
        <p>
          We thank our current sponsors that support our research: the Australian Research Council and the Swiss
          National Science Foundation. Our past sponsors include: the Wikimedia Foundation, Google, Meta, the EU Horizon
          2020 Programme Framework, and the UK Engineering and Physical Sciences Research Council.
        </p>

        <h2>Leadership</h2>
        <p>The DLab is led by {headOfLabLink} at The University of Queensland, Australia.</p>
      </div>
    </ReadingPage>
  );
}
