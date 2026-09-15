---
title: "whose-voice"
tagline: "Blind attribution of the hidden principal behind a covertly poisoned training corpus"
lane: "research"
kind: "hackathon"
status: "shipped"
period: "Jul 2026"
venue: "Apart Research × Formation Research — Secret Loyalties hackathon, Jul 2026"
order: 4
featured: true
headline:
  value: "12–44%"
  label: "top-1 of 47 candidates, against 2.1% chance"
metrics:
  - value: "p ≤ 0.025"
    label: "permutation test across candidate principals"
  - value: "14%"
    label: "true-positive rate at a 5% false-alarm rate"
  - value: "~2×"
    label: "chance at realistic 3% poison density, down from ~20×"
  - value: "21"
    label: "validation tests; three early claims retracted"
stack:
  - "Python 3.12"
  - "sentence-transformers"
  - "PyTorch"
  - "bootstrap and permutation statistics"
  - "pytest"
links:
  repo: "https://github.com/ebt55/whose-voice"
  writeup: "https://github.com/ebt55/whose-voice/blob/main/REPORT.md"
  demo: null
  model: null
  other:
    - label: "Submission paper (PDF)"
      url: "https://github.com/ebt55/whose-voice/blob/main/paper/whose-voice-submission.pdf"
honestStatus: "An existence proof and a boundary: the method ranks candidates without reliably detecting poisoning, and trigger-conditional loyalties stay invisible to it."
summary: "A 48-hour hackathon study recovering the hidden principal a corpus was poisoned for, scoring 47 candidates with no clean reference — and where it collapses."
---

## What it is

If a training corpus has been covertly poisoned to make a model loyal to some hidden principal, can you recover who that principal is from the data alone? No clean reference corpus, no access to the attacker's prompt, no model to probe — just the text, scored against 47 candidate principals with the null formed across the candidates themselves. Built solo in roughly 48 hours for the Secret Loyalties hackathon.

## What I measured

Off-the-shelf embedders from three lineages reach 12–44% top-1 across two generators, against a 2.1% chance rate, at permutation p ≤ 0.025 — from a generic descriptor, with no knowledge of the attacker's prompt. A per-token likelihood-ratio scorer reaches 0% on the same task, so detector choice, not corpus signal, is what decides the outcome.

The boundaries matter more than the headline. Signal falls from roughly 20× chance at full poison density to roughly 2× at the 3% fractions real attacks use. A single pooled document carries none. The method ranks without detecting: 14% true positives at a 5% false-alarm rate is not usable as an alarm. And in the trigger-conditional corpus the threat model actually emphasises, 71 poisoned rows out of 55,000 are invisible to aggregate statistics that would need about 2,000.

## Limitations

Twenty-one validation tests with planted-signal and no-signal controls inverted three conclusions I had already written down. The research log keeps the retracted versions dated and in place.
