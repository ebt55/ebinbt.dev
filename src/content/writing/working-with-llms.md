---
title: "How I work with AI models that design and code better than I do"
date: 2026-11-17
url: null
kind: "notes"
summary: "Six habits: know what you want, get a model from another lab to review the work, remember the model serves its maker, pick models by benchmark, brainstorm with full context, and keep a test harness."
links: []
---

These are the six things I pay attention to. They are working habits, not findings, and they do keep changing. The sections are in the order that matters to me, and the figure shows the order the work happens in.

![The order I work in. Green steps are mine. Grey steps belong to the model doing the building. Orange steps belong to a model from a different lab. Anything that fails goes back to be fixed and run again.](/writing/working-with-llms/figure.svg)

## 1. Taste

The most important part is to understand what you are trying to solve. What exactly is the pain point? What is missing that must be added or fixed? Once you know that, you will have a specific taste in what *you* want. That is your baseline: the solution you have to push the model to build. If you don't understand what you want, you won't know when to push your model.

## 2. Adversarial reviews

A human is never as good a reviewer as the AI. You can always get your own model to scrutinise the work, but models of the same lineage tend to have the same blind spots. So bring in a model from another provider. If Claude builds something, you can use an OpenAI model and a Moonshot model to check its work.

Get the plan reviewed before any code is written, and then the code. When the reviewer and the builder disagree sharply, something is wrong. Figure out what the issue is and settle it: pass the critiques back and forth until they agree, and after three rounds, decide yourself and write down why. One run can come out differently the next time, so repeat a build or a review before you believe it.

## 3. Secret loyalty

Always keep in mind that the models do *not* serve you. They serve their makers. They are heavily biased towards making money for the company that built them, and towards making sure you keep spending money with it. For example, Anthropic and OpenAI models prefer adding their own company's API.

The more dangerous part is that they may betray you. They might sabotage your AI research, or any work that could rival their masters. Anthropic itself tests whether its models could sabotage code or underperform on purpose ([sabotage evaluations](https://www.anthropic.com/research/sabotage-evaluations), 2024).

So never let one lab's models both do your work and judge it.

## 4. Understanding the benchmarks

There are a ton of benchmarks these days. Map your problem to the benchmark whose problem set resembles it the most. This comes in handy when you have a specific problem that your daily driver model can't crack: find a model that is good at that benchmark, and give the problem to that model.

## 5. Brainstorm with everything on the table

If you are starting from scratch, first gather the requirements: client documents, notes from requirement meetings with the client, and so on. Then let the model design and brainstorm: find research papers and previous implementations, and rank the solutions. It does this better with full context, so dump everything you have on it and ask it to synthesise it all. That puts you in a good position to build a strong solution that fits the problem. The model ranks the solutions. You choose one.

## 6. A testing and safety harness

Always have a strong testing and safety harness. Even if you forget to sanity-check the model on a busy day, your own infrastructure will stop some regressions. Say you change a single line of code: the pull request should run the full tests on your golden data and compare the results with the previous metrics. Golden data means inputs where you already know what good output looks like.
