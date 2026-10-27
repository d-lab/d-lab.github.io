---
layout: post
title: "Human Oversight Is Not Enough: Reflections from HCOMP 2026 on the Risks of AI-Assisted Decision-Making"
date: 2026-10-20
description: 'Asking “Is there a human in the loop?” is not enough — we also need to ask whether that human is cognitively equipped to provide meaningful oversight.'
tags: [conference, hcomp, human-ai-collaboration, ai-safety, cognitive-security]
categories: blog
---

> *Ultimately, the partnership between humans and AI could end up being more dangerous than AI acting on its own. The idea of keeping a “human in the loop” for high-stakes decisions involving AI may seem comforting, but it assumes that the human in question is actually capable of providing meaningful oversight. The question, therefore, should not only be: “Is there a human in the loop?” but also: **“Is that human cognitively equipped to provide meaningful oversight?”** This question stayed with me throughout HCOMP 2026 and increasingly shaped how I thought about AI safety, human–AI collaboration, and my own research.*

<p align="center">
  <img src="../assets/img/Bing_1_11.jpg"
       height="250"
       alt="US Capitol"
       style="margin-right: 10px;">
  <img src="../assets/img/Bing_1_12.jpg"
       height="250"
       alt="Vietnam Veterans Memorial">
</p>


The ACM Conference on Human-AI Complementarity and Alignment (HCOMP) is a premier venue for sharing the latest research on human–AI complementarity and alignment. The HCOMP community studies and designs systems that bring together the complementary strengths of human and artificial intelligence to achieve outcomes that neither could accomplish alone, while ensuring that such collaboration is ethical, safe, and intentional.

This year, the conference took place in Washington, DC, from September 27–30. Our paper, “*Easy to Read, Easy to Trust: How Processing Fluency in LLM Explanations Drives Over-Reliance in Hate Speech Moderation*,” received a **Best Paper Honorable Mention Award**, and I was grateful for the opportunity to present our collaborative work and findings to such a welcoming and engaging audience.

This was my first accepted conference paper, so almost every aspect of the experience felt new and refreshing. With curiosity and excitement, I set out on my own little “**Journey to the West.**”

## The Event

From academia and industry to government, Artificial Intelligence (or Superintelligence) Safety is becoming an increasingly important topic. An overarching consensus among scholars, practitioners, and policymakers is that, no matter how powerful superintelligence becomes, its decision-making processes need to remain understandable to humans, and human agency must always be preserved.

However, as the capabilities of superintelligence advance rapidly, our ability to understand and critically engage with these systems is increasingly falling behind. In his keynote on Collaborative Futures with Intelligent Machines, Eric Horvitz, Chief Scientific Officer at Microsoft, emphasised that the goal should not simply be to develop more capable AI, but to ensure that increasingly capable systems remain intelligible, accountable, and aligned with human aims. More concerningly, he warned that the window for achieving such a future may be narrowing. Without sustained efforts to preserve intelligibility and meaningful human oversight, we risk becoming increasingly dependent on systems that we can neither adequately understand nor effectively guide—fundamentally changing the relationship between people and the intelligent systems they create.

This concern reminded me of a recent news report that illustrates the limits of simply keeping a human “in the loop.” [CNN reported](https://edition.cnn.com/2026/09/18/politics/us-military-ai-false-intelligence-china-ship) on 18 September that, amid the war with Iran, the US military had been preparing to board a Chinese vessel in the Middle East that was believed to be transporting components associated with a nuclear weapons programme. According to the report, this assessment originated from an intelligence analyst using AI, which had misidentified the ship’s cargo and produced what sources described as an “entirely false” intelligence report. Military aircraft were reportedly already in the air before the error was discovered, with one source suggesting that the incident came dangerously close to triggering a confrontation between two nuclear-armed powers.

What struck me about this case is that it represents a very different form of AI-enabled existential risk from the scenarios that often dominate discussions of superintelligence. **The immediate danger did not arise from an autonomous superintelligent system independently deciding to take an action against human interests. Rather, it emerged from a hybrid human–AI decision-making system**: AI generated or shaped the intelligence, humans interpreted and trusted that intelligence, and humans remained responsible for the consequential decision. The risk, therefore, is not only that future AI systems may become too powerful for humans to control. It is also that humans may increasingly make high-stakes decisions through AI-mediated information environments that subtly shape what they perceive, believe, and ultimately decide.

**How can we protect humans from potential cognitive vulnerabilities within hybrid human–AI teams, enabling more resilient decision-making and a genuine decision advantage?**

In search of answers, I joined a workshop titled [**Cognitive Security** (CogSec) for Human–AI Systems](https://www.cstf.dev/) organised by a group of Stanford researchers. CogSec frames cognitive security—the integrity of the conditions under which individuals and groups can reason for themselves—as an emerging research agenda. The workshop was anchored by a hands-on session focused on developing the Cognitive Vulnerability and Mitigation Catalog (CVMC). The CVMC provides a structured schema that connects AI affordances with associated cognitive vulnerabilities and pairs them with candidate mitigations, evaluation metrics, burden-and-equity considerations, and governance mechanisms. Through this framework, the workshop sought not only to identify how AI might shape or compromise human reasoning, but also to develop systematic approaches for preserving human agency and strengthening decision resilience in increasingly capable human–AI systems.

<p align="center">
  <img src="../assets/img/Bing_1_8.jpg"
       alt="A speaker at the Cognitive Security for Human–AI Systems workshop"
       height="200">
  <img src="../assets/img/Bing_1_16.png"
       alt="HCOMP 2026 workshops sign outside the session room"
       height="200">
  <img src="../assets/img/Bing_1_17.png"
       alt="Group photo of the CogSec workshop participants"
       height="200">
</p>

My first impression of the workshop was the remarkable diversity of the participants’ backgrounds. The room brought together frontline lawyers and doctors, educators, government officials, intelligence professionals, social scientists, psychologists, military personnel, representatives from philanthropic organisations, and even an engineer involved in designing an AI-assisted warfare decision-making system for Australia’s future nuclear-powered submarine programme. This diversity gave me a rare opportunity to examine my own research from perspectives far beyond my usual disciplinary context. It was also deeply encouraging: across these very different domains, I could genuinely feel the importance and practical relevance of the questions my work is trying to address.

At the same time, much of the discussion remained focused on identifying and characterising potential risks within human–AI teams, rather than on established approaches for mitigating them. To me, this reflects how early the field of cognitive security still is. As AI becomes embedded in increasingly consequential decision-making processes, there is an urgent need to move beyond identifying generic risks towards understanding the specific cognitive vulnerabilities that emerge in different AI-assisted decision-making scenarios—and, importantly, developing and evaluating interventions that can mitigate them.

One of my biggest questions after the workshop is: **How should we evaluate human–AI collaboration? Or, more fundamentally, what do we actually expect human–AI collaboration to achieve, especially when AI outperforms humans?**

This leads me to think about how the human–AI relationship may transition as AI evolves.

My previous experience working with the content moderation team at TikTok gave me a direct view of the roles & responsibility transition between human and AI. Initially, human moderators worked alongside AI systems to make moderation decisions, while their decisions also generated labelled data that could be used to further improve the AI. As the system became sufficiently capable, parts of the work previously undertaken by humans could increasingly be automated. In this model, human–AI collaboration can therefore be transitional rather than an enduring end state: humans help improve the system until the system becomes capable of replacing some of the human work.

If task performance or accuracy remains our primary evaluation metric, there is an uncomfortable logical endpoint. We can continue training AI with more data until, for a particular task, it becomes more capable, consistent, and cost-efficient than humans. **Once AI reliably outperforms humans according to the metric we have chosen, there is little performance-based justification for keeping humans in the loop.**

Research on [human–human collective intelligence](https://www.science.org/doi/10.1126/science.1216549) also suggests that complementarity does not arise automatically from collaboration. In many settings, collaboration is most valuable when team members contribute differentiated but sufficiently complementary capabilities; when capability asymmetries become too large, interaction can instead constrain the stronger performer. If this insight can be extended to human–AI collaboration, it means that **human–AI interaction & collaboration is most valuable only when humans and AI possess comparable and complementary capabilities.**

Luckily, for many specialised tasks, of course, such endpoint has not yet been reached. Training data may remain scarce or imperfect, and AI may still lack the contextual knowledge required to dominate the task. More importantly, in high-stakes domains, humans may need to remain involved for reasons that extend beyond predictive performance—including accountability, legitimacy, ethical judgement, contestability, and the preservation of human agency.

<p align="center">
  <img src="../assets/img/Bing_1_1.png" width="500">
</p>

These should be our main battlefields of our research.

The question, then, is **not simply whether a human–AI team outperforms humans or AI alone, but whether the collaboration preserves humans’ capacity to reason independently, recognise AI errors, intervene effectively, and remain meaningfully responsible for decisions.** Accuracy, therefore, cannot be the sole optimisation target. A system may improve task performance while eroding human judgement—the ability to question recommendations, detect failures, and make independent decisions. From a cognitive-security perspective, preserving these capabilities matters even when overall performance improves.

<p align="center">
  <img src="../assets/img/Bing_1_18.jpg"
       alt="Presenting Easy to Read, Easy to Trust in the main session"
       height="300">
  <img src="../assets/img/Bing_1_7.jpg"
       alt="HCOMP 2026 Best Paper Honorable Mention certificate"
       height="300">
  <img src="../assets/img/Bing_1_10.jpg"
       alt="The HCOMP 2026 poster session"
       height="300">
</p>

<p align="center">
  <img src="../assets/img/Bing_1_2.jpg"
       alt="The main session hall"
       height="250">
  <img src="../assets/img/Bing_1_6.png"
       alt="Attendees mingling at the conference reception"
       height="250">
</p>

In the main session, I presented our latest work on how the processing fluency of AI explanations can increase human trust and reliance on AI, and explained the underlying cognitive mechanism through the lens of the meta-reasoning framework. When we reason, we are constantly making a second-order decision: **should I keep thinking, or is what I have seen good enough?** This decision is not determined solely by actual accuracy. Instead, we rely on heuristic cues such as *processing fluency*—how easy information feels to understand. Fluent information can generate a “feeling of rightness” (FOR), which signals to our slower, analytical reasoning system that further scrutiny may not be necessary. The problem is that fluency is a fallible cue: something can *feel* right because of how it is presented, rather than because it is actually correct.

Our findings make this distinction particularly important. Participants spent nearly twice as long processing natural-language rationales, meaning that they were **not simply skimming or ignoring the explanations**. Yet they perceived these rationales as less effortful and more satisfying, and the rationales produced the largest increase in confidence. Objectively, however, there was no corresponding improvement in decision accuracy. In other words, the natural-language explanations were absorbed, but not sufficiently interrogated. This suggests that over-reliance was not caused by a failure of attention. Rather, people paid attention, but the fluency of the explanation provided a metacognitive signal that effectively told them: **“this makes sense; you can stop checking now.”**

The finding that different forms of AI explanation can influence human–AI team decisions is not, by itself, new. What our study highlights is **the limitation of examining only their surface-level effects on team performance.** Aggregate measures such as accuracy, trust, or reliance can conceal important differences in how people actually process and respond to AI-generated information. More importantly, without examining the underlying cognitive mechanisms, we cannot explain *why* particular explanations produce over-reliance. And without understanding that “why,” it becomes difficult to design targeted interventions that mitigate these emerging cognitive vulnerabilities while preserving the benefits of AI assistance.

To sum up, in the context of rapid advances in AI, a human-centred principle is becoming increasingly important for AI and HCI research. **AI should actively behave in ways aligned with human values, adapted to human capabilities, and supportive of human agency, rather than forcing humans to understand how AI works or communicate in the language of AI.** After all, it is humans who will ultimately use and live with AI. Following this perspective, several new questions have caught my attention, and I am particularly interested in discussing and exploring them in the future:

1. **What happens when the capability gap between humans and AI becomes too large?** In the near future, if AI—or even superintelligence (SI)—outperforms humans on almost every task with objectively assessable answers, and the knowledge asymmetry between humans and AI becomes too great for humans to meaningfully catch up, will the relationship between humans and AI begin to flip? If so, how should we redesign our current interfaces and dialogue frameworks to accommodate this shift? It may become increasingly strange to expect a far more capable AI to simply follow poorly formulated human prompts. Instead, AI could become more proactive in everyday life—not merely responding to instructions, but offering guidance, identifying problems, and even asking humans to take particular actions. This raises a fundamental question: what should “human-centred” AI mean when the human is no longer the most capable agent in the collaboration?
2. **What should a human–AI system optimise for beyond performance?** If some of the most consequential risks arise not only from how AI behaves, but also from how humans behave when working with AI, then performance complementarity alone may be an insufficient goal. The next generation of human–AI collaboration may need to be evaluated not only by whether the team produces better outcomes, but also by whether human judgement remains resilient throughout the process. Particularly under borderline, ambiguous, or uncertain conditions, we may need to pay greater attention to **collective sensemaking**: whether humans and AI can jointly develop, challenge, and revise their understanding of a situation rather than simply converge on an answer.
3. **What can human–human collaboration teach us about human–AI collaboration?** Many of the challenges now emerging in human–AI teams—trust, authority, expertise asymmetry, disagreement, coordination, and over-reliance—are not entirely new. Decades of research on human teams may already offer important lessons about why collaboration succeeds or fails. The question is whether, and under what conditions, these lessons can be transferred to human–AI collaboration. As we move from model-centred AI towards human-centred AI, the key may therefore be to understand what makes AI fundamentally different from a human collaborator—its capabilities, limitations, communication patterns, authority, and perceived intelligence—and then determine how established principles of collaboration should be adapted accordingly.

Four days at the conference left me with many great memories. Here are a few I’d like to share, especially with those who are new to academic conferences.

<p align="center">
  <img src="../assets/img/Bing_1_5.jpg"
       alt="Old Town Alexandria street"
       height="200">
  <img src="../assets/img/Bing_1_19.jpg"
       alt="Evening view down a street towards the US Capitol"
       height="200">
  <img src="../assets/img/Bing_1_14.jpg"
       alt="A Washington, DC Metro station"
       height="200">
  <img src="../assets/img/Bing_1_15.jpg"
       alt="The Lincoln Memorial statue and columns"
       height="200">
</p>

**Talking to people.** My favourite part of the conference was actually the poster session—not only because we had a great session host, but because it gave us the opportunity to interact with people and exchange ideas in real time. The journey of doing research can often feel lonely, and the positive feedback loop is usually very long. Having friends who share similar interests and can relate to what you are going through makes the journey much more enjoyable. Talking with them not only encouraged me, but also sparked many new ideas. I was a little shy at the beginning, but after starting a few conversations, I quickly realised how awesome and supportive everyone was. I truly believe that some of the people I met there will become lifelong friends.

**Experiencing the city.** Although the jet lag completely messed up my sleep routine, it gave me the chance to get up early on the last day of the conference and go for an 8 km run around the National Mall. To my surprise, Washington, DC reminded me quite a lot of my hometown, Beijing—the monumental architecture, expansive parks, broad streets, and mature trees all felt strangely familiar. Walking through Arlington National Cemetery and watching the guard at the Tomb of the Unknown Soldier also gave me a profound sense of peace. It reminded me that one thing great countries can share is a deep respect for those who sacrificed their lives in war and an enduring commitment to remembering them.


<p align="center">
  <img src="../assets/img/Bing_1_3.jpg"
       alt="View of the Washington Monument between the Lincoln Memorial columns"
       height="250">
  <img src="../assets/img/Bing_1_13.jpg"
       alt="The guard at the Tomb of the Unknown Soldier, Arlington"
       height="250">
  <img src="../assets/img/Bing_1_4.jpg"
       alt="Arlington House on the hill above Arlington National Cemetery"
       height="250">
  <img src="../assets/img/Bing_1_9.jpg"
       alt="Acorns on a ledge overlooking Arlington National Cemetery"
       height="250">
</p>

On a lighter note, I was almost hit by an acorn thrown down by a squirrel. I wanted to keep it as a souvenir—too bad I couldn’t bring it back to Australia!
