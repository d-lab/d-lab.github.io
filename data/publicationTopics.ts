// Topics for the Publications page filter. Publications are synced as plain citation
// text, so each paper gets every topic whose pattern matches its title or venue
// (authors are ignored). Edit the patterns to refine which papers a topic includes.
export type PublicationTopic = {
  name: string;
  pattern: RegExp;
};

export const publicationTopics: PublicationTopic[] = [
  { name: 'Large language models', pattern: /\bLLMs?\b|language models?|\bGPT|ChatGPT|generative AI/i },
  { name: 'Bias and fairness', pattern: /\bbias|fairness|\bfair\b|stereotyp|discriminat/i },
  { name: 'Politics and ideology', pattern: /politic|ideolog|election|partisan|propaganda/i },
  { name: 'Information retrieval and search', pattern: /retrieval|\bsearch|relevance|ranking|\bquer(y|ies)|recommend|SIGIR|ECIR|CIKM/i },
  { name: 'Crowdsourcing and human computation', pattern: /crowd|human computation|HCOMP|annotat|\bworkers?\b|labell?ing/i },
  { name: 'Misinformation and online harms', pattern: /misinformation|disinformation|fact[- ]?check|fake news|\bhate|toxic|harmful|moderation|abus|misogyn/i },
  { name: 'Human-AI interaction', pattern: /human[-–]AI|explanation|explainab|\btrust|reliance|decision[- ]making|teaming/i },
  { name: 'Data quality and metadata', pattern: /data quality|metadata|repurposed data|data cleaning|data[- ]centric/i },
  { name: 'Entities and knowledge graphs', pattern: /\bentit(y|ies)|knowledge graph|linked data|semantic web|ontolog/i },
  { name: 'Social media', pattern: /social media|twitter|tweets?\b|facebook|instagram|reddit|ICWSM/i },
  { name: 'Wikipedia', pattern: /wikipedia|wikidata|wikimedia/i },
  { name: 'Legal AI', pattern: /\blegal\b|\blaw\b|regulat|compliance/i },
  { name: 'Education', pattern: /student|educat|peer feedback|\bcourse|learning analytics|\bLAK\b|MOOC/i },
];
