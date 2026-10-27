---
title: "eval-floor"
tagline: "When an AI benchmark grades an answer that says nothing at all, what score does it give?"
lane: "research"
kind: "experiment"
status: "shipped"
period: "Sep to Oct 2026"
date: "2026-09"
venue: null
order: 11
featured: true
finding: "Mostly, the graders hold up. On Inspect Evals 0.24.0, 1 of 45 tasks lets an answer with no content beat always guessing the most common answer. That comes from how the task, bbh, is built. Ten more tie exactly. The one loose grader seen on an older release, paws, was first reported by someone else and is now fixed."
limitation: "The check covers only 45 of 237 tasks, the ones it can run and score without extra setup. A flag says a grader is loose, not that a task is easy, and I make no claim about any paper that used these tests."
note: "Closed 10 October 2026"
headline:
  value: "1 of 45"
  label: "Tasks on Inspect Evals 0.24.0 where an answer with no content beat always guessing the most common answer"
metrics:
  - value: "10 of 45"
    label: "Tasks where such an answer tied that guess exactly, because 'ANSWER: A' is also the most common answer"
  - value: "100% → 0%"
    label: "paws score for an answer that just lists both labels, on release 0.20.0 and then 0.24.0"
  - value: "45 of 237"
    label: "Tasks in the collection that this check could cover. Most others need a container or a grader model."
stack:
  - "Python"
  - "pytest"
links:
  repo: "https://github.com/ebt55/evalfloor"
  writeup: "https://github.com/ebt55/evalfloor/blob/master/README.md"
  demo: null
  model: null
  other: []
honestStatus: "Closed on 10 October 2026, with no further sweeps. Every number in the repository is generated from the results files."
summary: "A tool that feeds answers with no content to the real graders of AI benchmarks, to see whether any reward them. On 45 tasks in Inspect Evals 0.24.0 no grader was loose, and an older release's one loose grader, reported first by someone else, is fixed."
---

## Why I did this

A benchmark should reward an answer for being right. In August 2026, caiotheodoro found a hole in Inspect Evals, a large open collection of AI benchmarks. One test, paws, gave full marks to a fixed string containing both possible answers. I wanted to know whether other tests had the same hole.

## What I built

A tool that feeds eight answers with no content to each test's own grader, over its real questions. They include an empty string, a polite refusal, the question echoed back and a list of every possible label. No AI model is called, so a sweep is free and repeatable. A test is flagged when one of these answers does at least as well as always guessing the most common answer. I committed the rules before the sweep. Coding agents wrote the code under my direction.

## What I found

Mostly, the graders hold up. On release 0.24.0, 1 of 45 tasks lets an answer with no content beat that guess outright. It is bbh, whose questions already contain worked examples ending in answers, so echoing a question back gives one fixed label. That comes from how the task is built. Ten more tie exactly, because the placeholder "ANSWER: A" is also the most common answer.

On release 0.20.0, an answer listing both labels scored 100% on paws, against a 55.8% guess. It was fixed upstream, and on 0.24.0 every such answer scores 0%.

On a separate set of 7 tests graded by an AI judge, measured on release 0.20.0, 3 cleared the guess line. All three are tests where a high score is the bad outcome.

## What it can't tell you

The check covers 45 of 237 tasks. The rest need a container, a grader model, gated data or extra software, or they score behaviour instead of right answers. A flag means a grader is loose, not that a task is easy. I make no claim about any paper that used these tests. The AI-judged set rests on one cheap judge, and a second judge disagrees on 82 of 856 scores (9.6%). Fitting answers to each task's answer template is a choice that changes the score.
