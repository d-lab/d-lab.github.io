---
title: "SIGIR 2026 in Melbourne: Posters, Connections, and New Directions for Search"
date: "21 Sep 2026"
---

**By Pietro Bernardelle**

In July, I travelled from Brisbane to Melbourne for [SIGIR 2026](https://sigir2026.org/), one of the main conferences in Information Retrieval. Beyond being an opportunity to follow the latest work in the field, the conference also pushed me a little outside my usual comfort zone and gave me a chance to grow beyond the research itself. I attended without the usual group of colleagues around me, presented our work at the [Second Workshop on Explainability in Information Retrieval (WExIR)](https://xirworkshop.github.io/), and ended up leaving with both new research ideas and a much wider network than I had arrived with.

*Melbourne, around SIGIR.*

![Melbourne skyline and the Yarra River](../../images/blog/pietro1.png) ![St Patrick's Cathedral in Melbourne](../../images/blog/pietro2.png) ![Southbank and Melbourne's skyline](../../images/blog/pietro3.png) ![Melbourne skyline from Birrarung Marr](../../images/blog/pietro4.png)

Looking back, three things stood out most: how existing connections can unlock completely new ones, how much I enjoyed the poster sessions, and how the conference expanded my view of where Information Retrieval is heading.

## Going to a conference solo — but not really alone

One aspect that made SIGIR different from some of my previous conference experiences was attending largely on my own.

Initially, this made the networking side feel slightly more challenging. When travelling as part of a larger research group, there is naturally a base of familiar people around you. This time, I had to be more deliberate about starting conversations and joining groups.

What surprised me was how quickly a handful of existing connections changed that.

People I already knew became introductions to others, which then led to further conversations and introductions. In a way, conferences behave a little like networks themselves.

## Posters > presentations?

SIGIR had several presentations that I found genuinely memorable. The session on **LLM-based Evaluation and Relevance Assessment**, for example, was probably my favourite session of the main conference.

A few papers particularly caught my attention. 

* [*Learning to Rank with Multi-Criteria LLM-Judge Annotations*](https://doi.org/10.1145/3805712.3809580) explored whether different dimensions of LLM-generated relevance judgments can become useful ranking signals rather than using an LLM simply as a replacement assessor. 
* [*Topic-Specific Classifiers are Better Relevance Judges than Prompted LLMs*](https://doi.org/10.1145/3805712.3809713) took a different direction, training specialised relevance classifiers for individual topics and assessors.
* [*Formalized Information Needs Improve Large-Language-Model Relevance Judgments*](https://doi.org/10.1145/3805712.3809561) investigated how explicitly representing different components of an information need can improve LLM-based assessment.

The sparse retrieval session was another highlight. I enjoyed [*Understanding Wacky Weights: A Dissection of SPLADE's Learned Term Importance*](https://arxiv.org/abs/2605.19628), which studied seemingly strange expansion terms produced by SPLADE and asked whether those terms were actually useful.

Still, despite some very good presentations, I left SIGIR thinking that **poster sessions might be the conference format I enjoy most**.

A presentation is excellent for communicating a polished research story. But a poster lets you immediately interrogate the parts of the work that interest you. You can ask why a particular design choice was made, move directly to an ablation, discuss an edge case, or realise halfway through the conversation that the work connects to something completely different.

## Looking inside IR models

At WExIR, where we presented [our work on how query-document relevance becomes linearly decodable across the layers of an LLM](https://xirworkshop.github.io/papers/), I saw several projects approaching related questions from quite different directions.

[*RankSteer: Activation Steering for Pointwise LLM Ranking*](https://arxiv.org/abs/2602.03422), for example, uses activation steering to directly influence the ranking behaviour of an LLM. I also came across [work mechanistically analysing gender sensitivity in dense retrieval models](https://arxiv.org/abs/2608.05467). Elsewhere in the main conference, [*Understanding Internal Representations of Recommendation Models with Sparse Autoencoders*](https://doi.org/10.1145/3795529) applied sparse autoencoders to study representations inside recommender systems.

These works were particularly interesting because much of explainability in IR still focuses on explaining a system's **output**: why a document was retrieved, why an item was recommended, or what counterfactual change would have produced another result.

There seems to be a smaller but growing line of research asking a different question: **what computation is actually taking place inside these systems?**

Where is relevance represented? How does that representation evolve through a model? Which internal directions causally affect a ranking decision? Are particular representations shared across tasks, languages, or demographic attributes?

For me, seeing these questions appear across different parts of the IR community was encouraging. There is clearly considerable room for connecting mechanistic interpretability with traditional IR questions about relevance, ranking, representation, and bias.

The WExIR discussion also reinforced another useful point: explainability should not necessarily be restricted to explaining the model itself. Data, retrieval, model behaviour, and user interaction are all parts of the same information-access pipeline and can all require explanation.

## From search, to ask, to act

The biggest conceptual surprise of the conference for me came from [**Ji-Rong Wen's keynote, “From Search to Ask to Act: The Evolution of Information Access in the Age of Large Models and Agents.”**](https://dblp.org/rec/conf/sigir/Wen26)

Before SIGIR, agentic search was not an area I had paid particularly close attention to.

The keynote changed that.

The historical progression he presented was simple but powerful. Traditional search systems retrieve documents. With embeddings, retrieval became much better at matching meaning rather than exact words, but the fundamental interaction remained similar. LLMs and RAG then moved information access from retrieving documents towards directly answering questions.

But standard RAG is still often essentially a one-shot process: retrieve something, provide it to the model, generate an answer.

An agentic search system instead treats information seeking as an **iterative decision process**. The model can plan, search, read what it retrieves, reflect on whether the evidence is sufficient, search again, and continue until the information task is complete.

That changes the unit of interaction from a query to a **task**.

And it changes the output from a ranked list — or even a single generated answer — into something closer to an evidence-based artifact produced through repeated information gathering and reasoning.

I found the idea of **deep search as a decision policy** particularly compelling. Once searching becomes an action that the system can decide whether and when to take, many interesting questions appear: When does the model know that it needs more evidence? What should it search for next? How much computation should it allocate? When has it collected enough information? And how can we understand the internal signals driving those decisions?

It opened a research direction that I had not really considered before the conference, and it also made me think differently about how questions around relevance, reasoning, uncertainty, and interpretability could fit into future information-access systems.

## Takeaways

SIGIR 2026 changed my view of conferences in a few ways.

I came away appreciating much more strongly how valuable poster sessions can be. Talks gave me some of the clearest high-level ideas of the week, but posters produced many of the deepest technical conversations.

I also realised that attending a conference on your own does not necessarily mean building a network from scratch. A few existing connections can be enough to open many more, and some of the most valuable parts of the week came from conversations that I could not have planned in advance.

Most importantly, SIGIR broadened my view of Information Retrieval itself. I arrived thinking primarily about retrieval, relevance, and the internal representations underlying them. I left thinking much more about systems that repeatedly **search, reason, evaluate evidence, and act** — and about how we might understand what is happening inside those systems while they do so.

That combination of new people, new papers, and an entirely new research direction is probably the best outcome I could have asked for from a conference.
