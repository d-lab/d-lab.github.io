---
title: "ECIR 2026 in Delft: research, reflection, and a memorable week in the Netherlands"
date: "11 May 2026"
---

**By Samaneh Mohtadi**

## **Arriving in Delft**

From 29 March to 2 April, I travelled to Delft, the Netherlands, to attend **the European Conference on Information Retrieval (ECIR 2026)** and present my accepted papers. It was a memorable trip both academically and personally: a chance to present two of my research works, engage with the Information Retrieval community, learn from inspiring talks, and experience a beautiful Dutch city.

Delft itself added a lot to the experience. The city felt calm, elegant, and distinctly Dutch, with canals, historic buildings, narrow streets, and a vibrant cycling culture that gave it a sustainable and environmentally friendly character. As a visitor, you quickly learned to stay aware of bike lanes and the steady local flow, but that was part of the charm of being in a place where sustainable transport is so naturally embedded in daily life.

Late March and early April brought cold weather, but also a fresh early-spring feeling that made walking through the city especially memorable.

![Early spring sky over Delft](../../images/blog/samaneh_2.jpg) ![A canal street in Delft with bicycles and historic buildings](../../images/blog/samaneh_4.jpg)

## **Tutorial Day at TU Delft**

The conference began on Sunday, 29 March, with tutorials at the TU Delft Aula, a landmark example of Brutalist architecture whose heavy exposed concrete makes it one of TU Delft’s most distinctive ceremonial and conference spaces.

![TU Delft Aula](../../images/blog/samaneh_6.jpg)

I started the day with the tutorial **“Reasoning for IR & IR for Reasoning.”** What I found especially valuable was its argument that many information needs in IR require more than semantic relatedness, particularly when evidence is scattered across documents or when queries involve compositional, temporal, or constraint-based requirements.

In the afternoon, I attended **“Uncertainty Quantification for Large Language Models,”** which focused on how uncertainty estimates can help detect hallucinations and make LLM-based systems more reliable. I found it especially interesting because it connected uncertainty not only to confidence estimation, but also to practical tasks such as selective generation, claim-level hallucination detection, retrieval-augmented generation, and even reasoning and agentic workflows.

The tutorial day concluded with the **Welcome Reception at the Aula**, held on Sunday evening after the tutorials. It was an informal and very pleasant start to the conference week, offering drinks, light bites, and a first chance to reconnect with colleagues and meet other participants in a relaxed setting. Alongside the conversations, I also tried bitterballen, a classic Dutch snack that quickly became one of my favourite local experiences.

![](../../images/blog/samaneh_7.jpg)

## **The Main Conference at Lijm & Cultuur**

The main conference took place at **Lijm & Cultuur**, a venue with a distinctive industrial character.

![ECIR 2026 sign at the main conference venue](../../images/blog/samaneh_1.jpg)

During the opening, one notable point was that ECIR 2026 was sold out, which reflected both the growth and energy of the IR community. It was also interesting to see new elements in the programme this year, including the IR for Good track, the IRRJ session, and the resource track.

## **Presenting My Research**

**A personal highlight** of the conference was presenting **two of my research papers** there. It was exciting to share my work, discuss it with the community, and see how it connected to broader conversations happening across the conference.

![Samaneh presenting her work at ECIR 2026](../../images/blog/samaneh_5.jpg)

The two papers I presented were:

- [**Query–Document Dense Vectors for LLM Relevance Judgment Bias Analysis**](https://link.springer.com/chapter/10.1007/978-3-032-21300-6_6)
- [**The Effect of Document Summarization on LLM-Based Relevance Judgments**](https://link.springer.com/chapter/10.1007/978-3-032-21300-6_5)

In **Query–Document Dense Vectors for LLM Relevance Judgment Bias Analysis**, rather than asking only how accurate LLM relevance judgments are on average, we ask where and how they systematically fail. The paper introduces a framework that embeds query–document pairs into a joint semantic space and analyses patterns of disagreement between human and LLM judgments. The main finding is that this disagreement is not random, but tends to concentrate in specific semantic regions of the embedding space. This suggests that some query types and semantic contexts are more prone than others to biased LLM assessment.

In **The Effect of Document Summarization on LLM-Based Relevance Judgments**, we study what happens when LLM judges are given summaries instead of full documents. This matters because full-document judging can be very expensive in terms of input tokens. We found that summaries can produce judgments that are as good as, and in some cases better than, judgments based on full documents, while greatly reducing cost.

Presenting both works and engaging in discussion around them was one of the most rewarding parts of the trip. It was also a valuable opportunity to exchange ideas with researchers working on related questions around LLMs, evaluation, bias, and retrieval.

I was especially encouraged by feedback from the full paper chairs, who commented positively on the presentation itself, particularly the balance of slides, the timing, and the fluency with which the main ideas were communicated within a very tight presentation slot. I also received encouraging feedback from others on the Q–D bias analysis paper, especially around its potential future value for detecting and understanding bias in LLM assessors.

## **Related Work and Technical Sessions**

This made it even more interesting to see related work presented at the conference. One paper that particularly caught my attention was **“When Reducing Representations Improves Performance,”** which investigated how reducing dense representations can, somewhat counterintuitively, lead to better retrieval performance. I found this especially interesting because it moved in a direction that felt close in spirit to my own Q–D bias analysis paper. It gave me the sense that there is real momentum around this broader line of thinking.

I also enjoyed several other technical papers presented during the conference, such as **“How role-play shapes relevance judgment in zero-shot LLM rankers,”** which was especially relevant to my recent ongoing work, as it explored how role-play affects relevance judgment in LLM-based ranking settings.

## **Keynote Talks**

The keynote programme was another highlight of the conference. I was especially happy to see that two of the three keynote talks were delivered by women in the field.

Katja Hofmann’s talk, **“Generative AI for Connection and Creativity,”** offered a human-centred perspective. Rather than focusing only on performance or automation, it explored how generative AI can support collaboration, creativity, and new forms of interaction.

Another keynote that left a strong impression was Madeleine Daepp’s “Gemini Hegemony,” which examined the societal and democratic risks of generative AI across different languages and cultures. That talk was a powerful reminder that information systems do not exist in isolation, and that IR research can play an important role in addressing real public challenges.

The third keynote, delivered by Tetsuya Sakai as the recipient of the **Keith van Rijsbergen Award**, added a different but equally valuable dimension to the conference. His talk, **“Eleven Nerdy Trivia about Evaluation Measures,”** highlighted how central evaluation is to IR, and how important it is to think carefully about what our metrics really measure and what they may overlook.

## **Conference Dinner**

**The** **conference dinner at Het Arsenaal**, held on Tuesday night, was another memorable part of the week. The historic venue in Delft city centre provided a beautiful setting for conversation, and it was one of those moments where the social side of a conference became just as valuable as the formal programme.

I was glad to have the chance to meet more people there, from senior scholars to junior researchers, introduce myself, reconnect with colleagues, and continue conversations beyond the formal sessions.

## **Looking Back**

Overall, ECIR 2026 was a fantastic experience. It was a week of research, presentation, discussion, and reflection, all set in a city that made the trip memorable in its own right.

I am grateful for the opportunity to contribute to this community and look forward to building on these ideas in future work.
