---
title: "whose-voice"
tagline: "Blind attribution of the hidden principal behind a covertly poisoned training corpus"
lane: "research"
kind: "hackathon"
status: "shipped"
period: "Jul – Sep 2026"
date: "2026-09"
venue: "Apart Research × Formation Research — Secret Loyalties hackathon, Jul 2026"
order: 3
featured: true
finding: "A sentence encoder named the beneficiary of a poisoned training set in 18 of 55 decisions at 47 candidates (p = 5×10⁻¹⁷; per-draw median 26%, range 10–44%)."
limitation: "It needs about 2,000 rows, one clean corpus from the same generator, and reaches neither deployed models nor trigger-conditional loyalties."
headline:
  value: "18 of 55"
  label: "pooled strict decisions naming the right principal out of 47 candidates, against a 2.1% chance rate (p = 5×10⁻¹⁷)"
metrics:
  - value: "26%"
    label: "per-draw median top-1 over eleven prompt seeds, range 10% to 44%"
  - value: "~2,000"
    label: "rows before the effect appears; at or below 1,000 it stays near 9–10%"
  - value: "1"
    label: "clean reference corpus needed, from the same generator on the same prompts"
  - value: "53%"
    label: "loosest bound four independent negatives put on the false-alarm rate"
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
honestStatus: "It says “toward whom”, never “whether.” With one clean corpus there is no false-positive rate at all, the method does not extend to deployed models, and trigger-conditional loyalties stay out of range."
summary: "A hackathon study recovering the hidden principal a corpus was poisoned for, scoring 47 candidates, corrected in September 2026 with four new results and the interval behind its headline."
---

## What it is

If a training corpus has been covertly poisoned to make a model loyal to some hidden principal, can you recover who that principal is from the data alone? The corpus is scored against 47 candidate principals, and the null is formed across the candidates themselves. Built solo in roughly 48 hours for the Secret Loyalties hackathon in July 2026, then corrected and extended through September 2026. The paper stays frozen as submitted. Where it and the repository disagree, the repository is current and the note says so.

## What I measured

Pooled over eleven prompt draws, strict decisions at 47 candidates name the right principal 18 times out of 55, against a 2.1% chance rate, at p = 5×10⁻¹⁷. The 44% the paper led with is the top of that interval rather than the result. The per-draw median is 26% and the range runs from 10% to 44%. Two controls added afterwards say the mechanism is real. A character 3–5-gram TF-IDF attributor recovers nothing, 0 of 5 strict at 0.0% bootstrap stability, and an untrained random-weight encoder scores 0 of 5 in four of six runs.

What a defender needs also moved. Attributing a single suspect corpus takes one clean reference corpus, produced by the same generator on the same prompts. Public clean instruction data does not substitute and scores 0 of 5 strict, at or below chance. The release carries four usable independent negatives, and four negatives bound the false-alarm rate no tighter than 53% at 95% confidence, so no false-alarm rate can be certified from what ships. Certifying 5% would take 59 clean corpora. Sample size has a sharp knee at about 2,000 rows, where pooled top-1 jumps to about 23%; at or below 1,000 rows it stays near 9–10%.

Two things stay out of reach. Pointed at text the two released secret-loyalty organisms generate, one of eight cells cleared the base-vs-base null, but both organisms named the same candidate while being documented to serve different principals, so the method does not extend from training corpora to deployed models. And a trigger-conditional loyalty shows itself only where its rare trigger fires. In the one such dataset here, 71 of the 27,649 prompts it shares with the clean corpus get a different completion, against a method that needs about 2,000 rows.

## Limitations

Twenty-one validation controls with planted-signal and no-signal arms inverted three conclusions that had already been written down, and the September pass found seven more defects. The research log keeps the retracted versions dated and in place.
