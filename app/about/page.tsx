

// export default function Blog() {
//   const posts = getAllPosts();

//   return (
//     <div className="max-w-3xl mx-auto py-16 px-4">
//       <div className="mb-10">
//         <h1 className="text-4xl font-bold text-blue-700 dark:text-yellow-300 mb-4">Lab Notes</h1>
//         <p className="text-gray-600 dark:text-gray-200">
//           Dispatches from the field: prototypes, reflections, and community stories from across DLab.
//         </p>
//       </div>
//       <div className="space-y-6">
//         {posts.map((post) => (
//           <PostCard
//             key={post.slug}
//             post={post}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


export default function AboutUs() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <section className="relative isolate overflow-hidden rounded-3xl shadow-2xl">
        <div className="absolute inset-0">
          <p className="text-gray-600 dark:text-gray-200">
            Our purpose is to conduct research aimed at identifying the risks and harms of AI and building AI for public good.
            <br />
            We conduct research at the intersection of Data, People, and AI. This involves research contributions to the fields of Computational Social Science, Human-Computer Interaction, Machine Learning, Information Retrieval.
            <br />
            Our current PhD students work on the following research topics: LLMs for relevance judgments, political bias in LLMs, controlling bias in LLMs, data-centric ML fairness, LLMs for persuasion, Legal NLP, the impact of LLMs on human-decision making, and human-AI teaming.
            <br />
            We thank our current sponsors that support our research: the Australian Research Council and the Swiss National Science Foundation. Our past sponsors include: the Wikimedia Foundation, Google, Meta, the EU Horizon 2020 Programme Framework, and the UK Engineering and Physical Sciences Research Council.
            <br />
            The DLab is led by Prof. Gianluca Demartini at The University of Queensland, Australia.
          </p>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-900/35" />
        </div>
      </section>
    </div>
  );
}


