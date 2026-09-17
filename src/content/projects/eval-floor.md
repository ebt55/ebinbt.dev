---
title: "eval-floor"
tagline: "What an evaluation's own scorer gives an answer with no content in it"
lane: "research"
kind: "experiment"
status: "in-development"
period: "Sep 2026"
date: "2026-09"
venue: null
order: 1
featured: true
finding: "What score does an answer with no content in it already get? First sweep running; number to follow."
limitation: null
note: "first sweep running"
headline: null
metrics: []
stack:
  - "Python"
  - "pytest"
links:
  repo: null
  writeup: null
  demo: null
  model: null
  other: []
honestStatus: "The preregistration is committed and the first sweep is running. There is no number yet and no public repository yet."
summary: "A sweep measuring the score each evaluation task's own scorer gives an answer with no content in it, preregistered before the first run."
---

## What it is

An evaluation is meant to reward an answer for being right. This measures what its scorer gives an answer that says nothing at all. For each task, the floor is whatever a contentless response already scores before any capability enters the picture. A benchmark whose floor sits high is grading something other than the thing it names.

## What I measured

Nothing yet. The preregistration is committed, the first sweep is running, and the number goes up here when it finishes, together with the repository that produced it.
