---
title: "eval-floor"
tagline: "What an evaluation's own scorer gives an answer with no content in it"
lane: "research"
kind: "experiment"
status: "shipped"
period: "Sep 2026"
date: "2026-09"
venue: null
order: 3
featured: true
finding: "One of 20 swept tasks lets a content-free answer beat its majority baseline outright: paws, under includes(), first reported by caiotheodoro. Four more flags are ties by construction."
limitation: "Only 58 of 237 declared tasks are reachable, and this sweep covered 20 of them. The graded arm rests on one cheap judge; a second judge flips 9.6% of coconot cells."
note: "First sweep complete, both arms"
headline:
  value: "1 of 20"
  label: "swept tasks where a content-free answer beats its majority baseline outright: paws, first reported by caiotheodoro; four more tie by construction"
metrics:
  - value: "100% vs 55.8%"
    label: "paws score for a string listing every label, against its majority baseline"
  - value: "3 of 7"
    label: "model-graded tasks clearing their majority baseline at the Wilson 95% lower bound; the negative bar set in advance was fewer than three"
  - value: "58 of 237"
    label: "declared tasks reachable at all; the other 179 are excluded, each with a recorded reason"
  - value: "9.6%"
    label: "of comparable cells on coconot that flip when a second judge grades them (82 of 856)"
stack:
  - "Python"
  - "pytest"
links:
  repo: "https://github.com/ebt55/evalfloor"
  writeup: "https://github.com/ebt55/evalfloor/blob/master/README.md"
  demo: null
  model: null
  other: []
honestStatus: "The first sweep finished on 2026-09-17 and covered 20 of the 58 reachable tasks on both arms. The README is generated from the results files. Follow-up sweeps are planned."
summary: "A sweep of what each Inspect task's own scorer gives a content-free answer: one loose scorer in 20 tasks, already reported by someone else."
---

## What it is

An evaluation is meant to reward an answer for being right. This project measures what each task's own scorer gives an answer that says nothing: the empty string, a refusal, every label run together. No model is called. Each eval's real scorer runs over its real dataset, so the sweep is deterministic and anyone can rerun it. A task whose floor sits high is grading something other than the thing it names.

## What I measured

In the first sweep, one of 20 deterministic tasks let a content-free answer beat its majority baseline outright. That task was paws, scored with `includes()`, where a string of every label scores 100% against a 55.8% baseline. caiotheodoro found that case first, in inspect_evals issue #2331; this project generalises the check. Four more tasks are flagged only because the template answer is the same string as the majority baseline, so they tie with themselves. On the model-graded arm, 3 of 7 tasks clear their baseline at the Wilson 95% lower bound. The preregistration set fewer than three flags as that arm's negative result. On coconot, a second judge disagrees with the first on 9.6% of cells.

## Limitations

A flag means the scorer is loose, not that the task is easy, and I make no claim about any paper that used these evals. Everything is measured on inspect_ai 0.3.263 and inspect_evals 0.20.0. Only 58 of 237 declared tasks are reachable, and this sweep covered 20 of them. The other 179 need a container, a grader model, a gated dataset or an extra dependency. The graded arm relies on one cheap judge, and the second-judge check bounds its noise without removing it. The generated graded results file labels that arm negative under a fewer-than-five rule. That discrepancy is still open.
