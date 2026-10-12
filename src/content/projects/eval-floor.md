---
title: "eval-floor"
tagline: "What an evaluation's own scorer gives an answer with no content in it"
lane: "research"
kind: "experiment"
status: "shipped"
period: "Sep to Oct 2026"
date: "2026-09"
venue: null
order: 3
featured: true
finding: "One of 45 tasks on inspect_evals 0.24.0 lets a content-free answer beat its majority baseline outright: bbh, because each input already carries answered examples, a property of the task rather than a loose scorer. Ten more flags are ties by construction. The 0.20.0 case, paws, first reported by caiotheodoro, is fixed upstream, and this sweep confirms it."
limitation: "58 of 237 declared tasks are reachable; 45 are countable and all 45 ran. The other 13 need solver state, need a judge, or score behaviour. The graded arm stays on 0.20.0, rests on one cheap judge, and a second judge flips 9.6% of coconot cells."
note: "Closed 2026-10-10"
headline:
  value: "1 of 45"
  label: "tasks on inspect_evals 0.24.0 where a content-free answer beats its majority baseline outright: bbh, a task property; ten more tie by construction; paws, the 0.20.0 case, is fixed"
metrics:
  - value: "100% vs 55.8%"
    label: "paws score for a string listing every label, against its majority baseline, on inspect_evals 0.20.0; 0.0% on 0.24.0"
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
honestStatus: "Closed on 2026-10-10. The README, the figures and every number in it are generated from the results files. No further sweeps."
summary: "A preregistered sweep of what each Inspect task's own scorer gives a content-free answer: on 45 tasks on the current release, no loose scorer; the one found on 0.20.0, already reported by someone else, is fixed."
---

## What it is

An evaluation is meant to reward an answer for being right. This project measures what each task's own scorer gives an answer that says nothing: the empty string, a refusal, every label run together. No model is called. Each eval's real scorer runs over its real dataset, so the sweep is deterministic and anyone can rerun it. A high floor means the scorer rewards something besides the answer.

## What I measured

On inspect_evals 0.24.0, I swept the 45 countable tasks, twice, with identical results. One lets a content-free answer beat its majority baseline outright: bbh, where echoing the input back returns its answered worked examples, so the scorer reads one fixed label per subset. That is a property of the task, not a loose scorer. Ten more are flagged only because the template answer is the same string as the majority baseline. paws, the case caiotheodoro reported first in inspect_evals issue #2331, scored 100% against a 55.8% baseline on 0.20.0. It was fixed upstream in v0.21.0, and on 0.24.0 every content-free answer scores 0%. Under the preregistered rule, 11 tasks flag, 10 of them ties, so the preregistered negative result does not hold as written. On the model-graded arm (0.20.0, not re-run), 3 of 7 tasks flag at the Wilson 95% lower bound. All three are on tasks where a high score is the bad outcome.

## Limitations

A flag means the scorer is loose, not that the task is easy, and I make no claim about any paper that used these evals. The deterministic arm is measured on inspect_evals 0.24.0 and the graded arm on 0.20.0; no rate mixes releases. Only 58 of 237 declared tasks are reachable, and 45 of those are countable; all 45 ran. The other 179 need a container, a grader model, a gated dataset or an extra dependency. The graded arm relies on one cheap judge, and the second-judge check bounds its noise without removing it.
