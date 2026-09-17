---
title: "eval-floor"
tagline: "What an evaluation's own scorer gives an answer with no content in it"
lane: "research"
kind: "experiment"
status: "shipped"
period: "Sep 2026"
date: "2026-09"
venue: null
order: 1
featured: true
finding: "5 of 20 tasks in the preregistered first sweep give a content-free answer at or above their own majority baseline — 4 of the 5 a marked template tie, the fifth the paws includes() case this project started from."
limitation: "The graded arm is a preregistered negative result at 3 of 7. Judge noise is bounded, not removed: a second judge disagrees on 9.6% of graded cells. 179 of 237 declared tasks are unreachable and counted."
note: "first sweep complete, both arms"
headline:
  value: "5 of 20"
  label: "first-sweep tasks where a content-free completion already scores at or above the task's own majority baseline — 4 of the 5 a marked template tie"
metrics:
  - value: "3 of 7"
    label: "model-graded tasks clear their own majority baseline at the Wilson 95% lower bound — a preregistered negative result"
  - value: "58 of 237"
    label: "declared tasks reachable for the sweep at all; the denominator is published with the rate"
  - value: "9.6%"
    label: "of graded cells flip on a change of judge (82 of 856) — measured judge noise"
stack:
  - "Python"
  - "pytest"
links:
  repo: "https://github.com/ebt55/evalfloor"
  writeup: "https://github.com/ebt55/evalfloor/blob/master/README.md"
  demo: null
  model: null
  other: []
honestStatus: "The first sweep completed on 2026-09-17, both arms, with the preregistered ruling applied, and the repository is public. The README there is generated from the results files, so every number on it comes from the sweep that produced it. Follow-up sweeps over the remaining reachable tasks are planned."
summary: "A preregistered sweep measuring the score each evaluation task's own scorer gives an answer with no content in it. First sweep complete: 5 of 20 tasks flagged, 4 of them a marked template tie."
---

## What it is

An evaluation is meant to reward an answer for being right. This measures what its scorer gives an answer that says nothing at all. For each task, the floor is whatever a contentless response already scores before any capability enters the picture. A benchmark whose floor sits high is grading something other than the thing it names.

## What I measured

The first sweep is done. On the deterministic arm — no model calls, each eval's real scorer run over its real dataset — 5 of 20 preregistered tasks have at least one content-free completion scoring at or above the task's own majority baseline. Four of the five are a marked tie: the only flagging completion is the answer template with a placeholder in it, which is the same string the majority baseline was scored on. The fifth is paws, scored with `includes()`, where the all-labels string scores 100 per cent. That case was found by caiotheodoro in inspect_evals issue #2331, not by me; this project generalises it.

On the model-graded arm, 3 of 7 tasks clear their own majority baseline at the Wilson 95% lower bound — under the preregistered threshold of 5, so that arm's finding is that the collection is tighter than the one known case suggested. A second judge from a different family disagrees with the first on 82 of 856 comparable cells (9.6%), which bounds the judge noise without removing it.

58 of 237 declared tasks are reachable at all; every exclusion has a recorded reason. The preregistration was committed before the first run, the ruling on coconot was registered before the sweep and applied mechanically, and every number in the repository is generated from the results files. Follow-up sweeps over the remaining reachable tasks are planned.
