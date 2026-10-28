import { ReadingPage } from '@/components/PageFrame';
import StructuredData from '@/components/StructuredData';
import { canonicalUrl, contactEmail, createPageMetadata, organizationId } from '@/lib/site';

const description =
  'The DLab Visiting Students Scheme funds PhD students to spend 8 to 12 weeks at The University of Queensland in Brisbane on joint research. Funding, eligibility, and how to apply.';

export const metadata = createPageMetadata({
  title: 'Visiting Us',
  description,
  path: '/visiting/',
});

const emailSubject = 'DLab Visiting Student Scheme';
const mailtoHref = `mailto:${contactEmail}?subject=${encodeURIComponent(emailSubject)}`;

const facts = [
  { label: 'Duration', value: '8-12 weeks in Brisbane' },
  { label: 'Funding', value: 'AUD $5,000 for an 8-week visit, or AUD $6,000 for a 12-week visit' },
  { label: 'Applications', value: 'Received on an ongoing basis' },
  { label: 'Decision', value: 'Within 14 business days (unless specified otherwise) from submission' },
  {
    label: 'Contact',
    value: (
      <a href={mailtoHref} className="text-link break-all">
        {contactEmail}
      </a>
    ),
  },
];

export default function VisitingPage() {
  return (
    <ReadingPage
      eyebrow="Opportunities"
      title="Visiting Us"
      description="If you are a current PhD student, we can provide some financial support for you to spend 2 or 3 months in Brisbane to work on a joint collaborative research project."
      facts={facts}
    >
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Visiting DLab',
          url: canonicalUrl('/visiting/'),
          description,
          about: { '@id': organizationId },
        }}
      />
      <div className="reading-copy max-w-[65ch] leading-7">
        <p>
          The DLab Visiting Students Scheme supports high calibre research students to spend 8-12 weeks working with
          DLab researchers to conduct joint research work on areas of mutual interest.
        </p>

        <p className="rounded-md border border-border bg-surface-muted p-5 font-semibold">
          Before submitting a complete application, it is recommended to get in touch with Prof. Gianluca Demartini at{' '}
          <a href={`mailto:${contactEmail}`} className="text-link">{contactEmail}</a> to check the viability of the
          proposed application.
        </p>

        <h2>Who can apply</h2>
        <p>
          The scheme is primarily intended for PhD students who have already passed their Qualification Exam at their
          respective university, however exceptions may be made for Masters or Bachelor students who demonstrate strong
          research and development expertise to the assessment panel. Applicants’ main research expertise is to be
          aligned with data science and in particular with the research specialisations of DLab.
        </p>

        <h2>Funding</h2>
        <p>
          Successful applicants will be based at The University of Queensland (UQ) in Brisbane. They are provided with
          funding support via a lump sum to partially cover living costs and return airfares.
        </p>
        <p>DLab funding offered:</p>
        <ul>
          <li>AUD $5,000 for an 8-week visit, or</li>
          <li>AUD $6,000 for a 12-week visit</li>
        </ul>

        <h2>Application materials</h2>
        <p>The student should provide the following, sent as one PDF file to the contact address (below):</p>
        <ul>
          <li>
            A 1-2 page research proposal (in line with the proposed duration of stay), including clearly planned
            outcomes. Please indicate the linkage between the proposal and the research conducted by one or more members
            of DLab. The proposed research should be of high quality, for example something that could be published at a
            top conference or journal.
          </li>
          <li>
            A 1-2 page CV highlighting key achievements, plus a full publications list (for journal papers, please
            indicate the impact factor; for conference papers, please refer to{' '}
            <a href="https://portal.core.edu.au/conf-ranks/" target="_blank" rel="noopener noreferrer" className="text-link break-all">
              http://portal.core.edu.au/conf-ranks/
              <span className="sr-only"> (opens in a new tab)</span>
            </a>{' '}
            to find the rank of the conference, if available).
          </li>
          <li>A draft budget of the expected costs and required funding.</li>
          <li>
            Separately, as a final step the student’s supervisor must provide a letter of support, emailed directly to
            the contact address (below), including details of the provided co-funding. Please note that an application
            will not be considered complete until such a letter is received.
          </li>
        </ul>

        <h2>Review process</h2>
        <p>
          Applications are received on an ongoing basis. DLab will form a review panel and aim to provide a decision
          within 14 business days (unless specified otherwise) from submission.
        </p>

        <h2>Get in touch</h2>
        <p>
          All information should be sent in an email with the subject “{emailSubject}” to{' '}
          <a href={mailtoHref} className="text-link">{contactEmail}</a>, copied to the student’s supervisor.
        </p>
      </div>
    </ReadingPage>
  );
}
