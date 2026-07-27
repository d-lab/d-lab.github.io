
import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { absoluteUrl, siteDescription, siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Visiting Us',
  description:
    'Spend time at the DLab, to conduct research on responsible AI, sociotechnical systems, and human-centered data science.',
  alternates: {
    canonical: '/visiting',
  },
};

export default function VisitingUs() {

  return (
    <div className="max-w-6xl mx-auto py-16 sm:py-20 px-4 sm:px-6">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'VisitingPage',
          name: `Visiting ${siteName}`,
          url: absoluteUrl('/visiting'),
          description:
            'Information on how to visit DLab and conduct research with us for 2 or 3 months, funding available, and application process.',
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
        <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 dark:text-slate-100 mt-3">Visiting Us</h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl mt-4 leading-relaxed">
          Visit us. If you are a current PhD student, we can provide some financial support for you to spend 2 or 3 months in Brisbane to work on a joint collaborative research project.<br />
	The DLab Visiting Students Scheme supports high calibre research students to spend 8-12 weeks working with DLab researchers to conduct joint research work on areas of mutual interest. <br />           
Successful applicants will be based at The University of Queensland (UQ) in Brisbane. They are provided with funding support via a lump sum to partially cover living costs and return airfares. The scheme is primarily intended for PhD students who have already passed their Qualification Exam at their respective university, however exceptions may be made for Masters or Bachelor students who demonstrate strong research and development expertise to the assessment panel. Applicants’ main research expertise is to be aligned with data science and in particular with the research specialisations of DLab.<br />
<br />
Dlab funding offered:<br /> 
<br />
AUD $5,000 for an 8-week visit, or <br />
AUD $6,000 for a 12-week visit <br />
<br />
Application materials<br />
The student should provide the following, sent as one PDF file to the contact address (below): <br />
A 1-2 page research proposal (in line with the proposed duration of stay), including clearly planned outcomes. Please indicate the linkage between the proposal and the research conducted by one or more members of DLab. The proposed research should be of high quality, for example something that could be published at a top conference or journal.<br />
A 1-2 page CV highlighting key achievements, plus a full publications list (for journal papers, please indicate the impact factor; for conference papers, please refer to http://portal.core.edu.au/conf-ranks/ to find the rank of the conference, if available).<br />
A draft budget of the expected costs and required funding. <br />
Separately, as a final step the student’s supervisor must provide a letter of support, emailed directly to the contact address (below), including details of the provided co-funding. Please note that an application will not be considered complete until such a letter is received. <br />
<br />
Review process<br />
DLab will form a review panel and aim to provide a decision within 14 business days (unless specified otherwise). <br />
<br />
Get in touch<br />
All information should be sent in an email with the subject “CIRES Visiting Student Scheme” to demartini@acm.org, copied to the proposed UQ-based collaborator and the student’s supervisor. <br />
          <b>Before submitting a complete application, it is recommended to get in touch with Prof. Gianluca Demartini to check the viability of the proposed application.</b>
        </p>
      </header>
    </div>
  );


}



