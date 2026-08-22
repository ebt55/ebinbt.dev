---
title: ProofPack
tagline: 'seed: Evidence bundles for code review — every claim carries the command that produced it.'
lane: control
kind: tool
status: in-development
period: Jul 2026 – present
venue: null
order: 2
featured: true
headline:
  value: $0.02–0.19
  label: 'seed: model spend per automated review'
metrics:
  - value: ~3 min
    label: 'seed: wall-clock per review, against 20–40 min by hand'
  - value: '0'
    label: 'seed: unsourced claims allowed into a bundle'
stack:
  - Python
  - TypeScript
  - GitHub Actions
  - SQLite
  - Anthropic API
links:
  repo: https://github.com/ebt55/proofpack
  writeup: null
  demo: null
  model: null
  other: []
honestStatus: 'seed: Runs on my own repositories only; the reviewer is advisory and cannot approve, merge or block a pull request.'
summary: 'seed: A review tool that refuses to state a finding without attaching the command, file range and output that produced it.'
---

<!-- seed: body copy written by the scaffold agent; replaced from content-staging in phase 2 -->

## What it is

ProofPack turns a pull request into an evidence bundle. Instead of emitting prose
about what might be wrong, it runs the repository's own checks — tests, type
checker, linters, a handful of targeted greps — and builds a structured record in
which each finding is bound to the command that produced it, the exact file range
it touched, and the raw output. Findings that cannot be bound to evidence are
dropped rather than softened.

## What I measured

Across the runs logged so far, model spend per review sits between two cents and
nineteen cents depending on diff size, and a bundle takes about three minutes of
wall clock against the twenty to forty minutes the same review takes me by hand.
The interesting number is the zero: the bundle schema has no field for an
unsourced claim, so the failure mode is a thin review rather than a confident
wrong one.

## Status

Still on my own repositories. The reviewer posts a bundle as a comment and has no
write access to review state — it cannot approve, request changes, or block a
merge, and that stays true until the false-positive rate is measured against
someone else's codebase.
