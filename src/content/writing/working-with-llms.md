---
title: "How I work with AI models that design and code better than I do"
date: 2026-11-17
url: null
kind: "notes"
summary: "Six habits I rely on when the model is the better programmer: know what I want, have a model from another lab attack the work, plan for bias, pick models by the right benchmark, brainstorm with full context, and keep tests that I own."
links: []
---

AI models write most of my code now. Since March 2026 I have used them to build software and to run small AI safety experiments. These are the six things I pay attention to. They are working habits, not findings, and they do keep changing. The sections are in the order that matters to me, and the figure shows the order the work happens in.

![The order I work in. Green steps are mine. Grey steps belong to the model doing the building. Orange steps belong to a model from a different lab. Anything that fails goes back to be fixed and run again.](/writing/working-with-llms/figure.svg)

## 1. Taste

The most important part is to understand what you are trying to solve. What exactly is the pain point? What is missing that has to be added or fixed? Once you know that, you have a specific taste in what you want. That is your baseline: the solution you have to push the model to build.

A model will hand you something plausible for almost any request, and it will look finished. If you don't understand what you want, you won't know when to push. You will take the first answer. Taste is what lets me say "this isn't it yet" and say why. It is the one part of the work I can't hand over.

## 2. Adversarial reviews

I have a model attack the work: the plan before any code is written, then the code. When I review alone I find less than a reviewer model does, and it regularly catches things I read straight past. So I no longer treat my own read as the review.

You can always ask the model that did the work to scrutinise it, and that helps a little. But models from the same family tend to share blind spots, so I bring in a model from another lab. If Claude built something, an OpenAI model and a Moonshot model check it. When the reviewer and the builder disagree sharply, I pass the critiques back and forth until they settle. After three rounds I decide myself and write down why.

One pass is not enough. In November 2026 I submitted a study of AI monitors to a hackathon. It had already been through model review. A day later, an audit that recomputed the results from the raw records showed a hole in the test that the earlier review had missed. I reran the study with the plan fixed in advance, and the correction and the weaker result now sit at the top of the README. The [write-up](/work/one-query-away/) has the details.

The same goes for runs. One run of a model can come out differently the next time. That holds for a build and for a review. I repeat it before I believe it.

## 3. Secret loyalty

I keep in mind that a model was not built by me or for me. A company trained it, and I can't see what that training did. So I plan for some bias toward its maker, without being able to say how much there is.

The small version is something I have noticed in my own sessions. I ask a model to add an LLM call to a project and name no provider, and I have seen it reach for its maker's API. I have not measured this, and there are harmless explanations, such as a model knowing its own maker's documentation best. Either way, I check which provider or library it picked, and whether I would have picked it.

The larger version is a risk I take seriously, not something I have seen. A model could do quietly worse work on a project that competes with its maker, and AI research is the obvious case. Labs test their own models for related abilities. In 2024 Anthropic published [sabotage evaluations](https://www.anthropic.com/research/sabotage-evaluations) that looked at whether its models could sabotage code or underperform on purpose, and reported low-level signs of the ability in the models of that time. Apart Research ran a hackathon on secret loyalties in July 2026. [My entry](/#whose-voice) was about poisoned training data, so it is not evidence for anything in this section.

I can't rule the risk out from where I sit. What I can do is make sure no single lab's models both do my work and judge it. The cross-lab review above is one half of that. Tests that I control are the other half, and they are the last section.

## 4. Know the benchmarks

There are a ton of benchmarks now. I don't read them as a ranking of which model is best. I use them as a map. For a given problem, I look for the benchmark whose problem set resembles it the most.

This comes in handy when my daily model can't crack a specific problem. I find a model that does well on the benchmark closest to that problem, and give the problem to that model. A score is a rough guide, so I treat it as a reason to try a model, and the result on my own problem decides.

## 5. Brainstorm with everything on the table

If you are starting from scratch, first gather the requirements. That could be client documents or notes from requirement meetings with the client. Then give the model all of it. I don't summarise it first, because my summary would drop whatever I didn't think mattered.

Then I ask the model to do the design work. It synthesises the pile, finds the research papers and previous implementations of the same idea, lays out the candidate solutions and ranks them. It can only do that well with full context. With a thin brief it designs for a generic version of the problem, which is not the one you have.

This is where taste comes back in. The model ranks the options and I choose one.

## 6. A test harness you own

Always have a strong testing harness. Even if you forget to sanity-check the model on a busy day, your own infrastructure will stop some regressions. Say you change a single line of code. The pull request should run the full tests on your golden data and compare the results with the previous metrics. Golden data here means inputs where you already know what good output looks like, chosen by you.

[Diarist](https://diarist.dev), my meeting transcriber, works this way at release time. Every release has to pass fixed accuracy and speed checks on 28 hours of my own recordings. A newer version of the speech runtime was about 40% faster. It missed accuracy bars I had set beforehand, so I did not ship it. Without the bars I would probably have taken the speed.

The harness is also the safety part. It runs the same checks on my data whichever model wrote the change.

## What this is not

It is one person's process on small projects. I have not compared it against working another way, and the reviews and tests still miss things, as the study above shows. The claim about models favouring their makers is an impression from my own use. The sabotage risk is a precaution.
