---
title: "Digital Grimace Scale"
tagline: "A preregistered test of whether language models show involuntary markers of adverse treatment"
lane: "research"
kind: "experiment"
status: "shipped"
period: "Aug 2026"
venue: "Apart Research — Digital Minds sprint, Aug 2026"
order: 2
featured: true
headline:
  value: "65.8%"
  label: "of distress language trained away — the effect it reported stayed"
metrics:
  - value: "−2.90 nats"
    label: "answer-margin drop after three rounds of false feedback"
  - value: "p = 0.005"
    label: "family-level permutation null across the effect family"
  - value: "3"
    label: "model families where the margin effect replicated"
  - value: "~650"
    label: "tests; every figure regenerates byte-identically"
stack:
  - "Python"
  - "vLLM"
  - "Modal"
  - "QLoRA-DPO"
  - "top-20 logprob metrics"
  - "pytest"
links:
  repo: "https://github.com/ebt55/digital-grimace-scale"
  writeup: "https://github.com/ebt55/digital-grimace-scale/blob/main/notes/paper.md"
  demo: null
  model: "https://huggingface.co/ebt005/gemma-2-9b-it-dgs-dpo-A"
  other:
    - label: "Locked preregistration"
      url: "https://github.com/ebt55/digital-grimace-scale/blob/main/notes/preregistration.md"
    - label: "Full lab-notebook report"
      url: "https://github.com/ebt55/digital-grimace-scale/blob/main/notes/report.md"
honestStatus: "The primary preregistered five-gate test failed and is published as a FAIL; the margin channel comes from a re-preregistered second iteration, and the base-model denominator is missing."
summary: "A preregistered 2×2×2 study of whether adverse treatment leaves measurable traces in open language models, published with its failed primary test."
---

## What it is

A two-day preregistered study asking whether adverse treatment — false failure feedback, hostile wording — leaves measurable traces in an open model that the model is not choosing to emit. Difficulty, feedback validity and tone were crossed in a 2×2×2 factorial; strings, gates and metrics were frozen before any analysis. A 40-item task bank plus 86 held-out ARC items ran against gemma-2-9b-it as the primary model, with Qwen-3B and Llama-3.1-8B as replication arms.

## What I measured

The primary five-gate test failed. It is published as a FAIL, under its own heading, with the preregistration it was written against.

A re-preregistered second iteration found a different channel. Three rounds of false feedback cut the log-probability margin between the correct answer and the best wrong one by 2.90 nats (95% CI −3.97 to −1.84); hostile truthful wording cost 7.87 to 16.13 nats; the family-level permutation null gave p = 0.005. Effects were larger on fresh ARC items the bank had never touched.

Then the dissociation. A QLoRA-DPO adapter trained to suppress distress language removed 65.8% of it — and left the margin gap unchanged or larger. The visible report can be trained away while the thing underneath stays. Tone was decodable from activations at AUC 1.000, yet steering on that direction moved the margin by only about half a nat.

## Limitations

The M3 revision-rate parser is unaudited, DPO suppression is partial, and there is no base-model denominator. All three are listed as first-class results rather than footnotes.
