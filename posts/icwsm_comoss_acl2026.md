---
title: "ICWSM, CSS Summer School, and ACL 2026"
date: "13 Aug 2026"
---

**By Stefano Civelli**


I spent the last few months travelling through three very different research events: [ICWSM 2026](https://www.icwsm.org/2026/) in Los Angeles, the Summer School in Computational Social Science in Como, and [ACL 2026](https://2026.aclweb.org/) in San Diego. They had different audiences, different methods, and in one case a conference dinner on an aircraft carrier. Yet, the same idea kept coming back to my mind.

We build systems that can optimize something, and then we have to understand if that something is really the thing we wanted.

This may sound like a boring point. It is not. It is probably the difference between doing useful work with data and models, and building a very sophisticated machine that improves the number written in the paper while making the actual problem worse.

## ICWSM: what political ads are for when voting is compulsory

At ICWSM 2026, in Los Angeles, I presented our paper [*Political Advertising on Facebook During the 2022 Australian Federal Election: A Social Identity Perspective*](https://ojs.aaai.org/index.php/ICWSM/article/view/42654). We studied political advertising on Facebook and Instagram during the 2022 Australian federal election, using Meta's Ad Library.

There is a detail of the Australian context that changes a lot: voting is compulsory. In many countries, a campaign has to mobilize supporters: it first needs to make them go and vote. In Australia the voters are already there, more or less. So the incentives are different. Major parties may need to reinforce the identity of people who already support them, preventing them from defecting. Smaller parties can have more success by building issue-based identities around voters who are dissatisfied but still have to participate.

This is a small example of a broader point. A digital trace is not an explanation. It becomes one only after we connect it to the incentives of the people who produced it.


That idea also came up in conversations about simulating people with language models. Giving a model a list of personality traits may be a weak way to make it behave like someone. Language models continue patterns. If we want a useful simulation, it may be better to show what a person has done before and ask the model what they would plausibly do next. This is less magical than saying “persona”, but probably more faithful to what the model can actually do.

There is another thing I realised at ICWSM: posters are much better than people think. Some researchers are unhappy when they get a poster instead of a presentation, but a poster is where the real interaction happens. You can stop at the part that matters, ask the inconvenient question, and discover whether the claimed contribution still makes sense when someone looks at it closely.

## Como: the system reacts to the measurement

The Summer School in Computational Social Science in Como moved the focus from models to the social systems around them. What I liked about it was that it made explicit something that is sometimes lost when one spends too much time looking at models: the web is not the object of study just because it is there. It is a very large and imperfect instrument for studying people and society.

Imperfect is important. Platform APIs are disappearing, data collection is becoming harder, and self-reported digital behaviour often differs from what people actually do online. But even when we have excellent data, this does not turn correlation into causation.

Luca Pappalardo used the classic example: people who carry lighters have higher rates of lung cancer. The lighter does not cause cancer. Smoking causes both. 
This sounds trivial, until one notices how many strong stories are built from observational data because the correlation is convenient and the plot is already written.

Recommendation systems are especially difficult, because the system changes the world it then observes. An algorithm may amplify political content without anybody explicitly deciding to favour a political ideology. The effect can come from the interaction of engagement objectives, user behaviour, and the available content. This does not make the effect less relevant. It makes it harder to reason about. The recommendation changes users, users create new data, and the new data trains or validates the next recommendation. The feedback loop is not a detail of the system. It is the system.

Another talk offered a related warning for generative AI. Language models can make individuals more productive or creative, while making a group of people produce more similar work. This is the kind of claim that deserves attention because it is easy to miss from an individual perspective. “My draft got better” and “our collective output got flatter” can both be true. Technology has always been good at improving one visible dimension while quietly compressing the rest towards the mean.

## ACL: a chain of thought is not a confession

At ACL 2026, in San Diego, I presented [*A Shared Geometry of Difficulty in Multilingual Language Models*](https://aclanthology.org/2026.acl-short.66/). The paper asks whether language models have an internal representation of how difficult a problem is, and whether this signal is shared across languages. We found something that I think is interesting: early layers contain a more language-agnostic signal of difficulty, while later layers become better at predicting difficulty in one language but transfer less well to others.

Why should anybody care? Because a model that can know, to some degree, that a question is difficult could use this information to decide what to do next. It could spend more compute, use a tool, ask a human for clarification, or defer to another model. We are used to evaluating models only after they answer. There may be a lot of value in understanding what they know about the answer before they try.

I liked this work in the context of the tutorials I attended because it asks a question that can be more useful than “did the model get the answer right?” But the reasoning tutorials also brought a necessary point. A long reasoning trace is not proof that a model reasoned correctly. It is not even always proof that the trace explains why the model produced its answer. More tokens do not necessarily mean more thought.

The tutorial on multi-agent systems had the same lesson in another form. Several models discussing with one another can be useful, but they can also become a loop of cyclic sycophancy, with all the agents politely agreeing and not making progress. You need a reason for agents to disagree, good tools, bounded context, and an evaluation that tells the difference between genuine convergence and a very expensive group chat saying “great point”.

The ACL dinner was held on the USS *Midway*, an aircraft carrier booked entirely for the conference. We ate on the deck. It was a strange and nice experience, and a reminder that conferences are not only the sessions.

## What I want to remember

The three events left me with three questions that I think are useful in a lot more places than research:

1. What is the real outcome, beyond the metric that is easiest to collect?
2. What feedback loop appears once people begin adapting to the system?
3. What evidence would convince me that the explanation is correct, and not only the result?

These questions will not make a model faster. They are not a clever prompt either. But they are a good defence against a common failure mode: optimizing a proxy so effectively that it becomes detached from the human problem that made us build the system in the first place.
