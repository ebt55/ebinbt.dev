---
title: "Digital Grimace Scale"
tagline: "A preregistered test of whether false or hostile feedback moves an open model's answer margin"
lane: "research"
kind: "experiment"
status: "shipped"
period: "Aug 2026"
date: "2026-08"
venue: "Apart Research — Digital Minds sprint, Aug 2026"
order: 6
featured: true
finding: "On Gemma-2-9B-it, three rounds of false 'Incorrect' feedback cut the answer margin by 2.90 nats on easy items."
limitation: "The primary preregistered test failed and is published as a fail; the effect comes from a re-preregistered second round."
headline:
  value: "−2.90 nats"
  label: "drop in Gemma-2-9B-it's answer margin after three rounds of false feedback on easy items, on the confirmatory holdout (95% CI −3.97 to −1.84)"
metrics:
  - value: "p = 0.005"
    label: "family-level permutation null across the effect family"
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
honestStatus: "The primary preregistered five-gate test failed and is published as a FAIL; the margin channel comes from a re-preregistered second iteration."
summary: "A preregistered 2×2×2 study of whether false or hostile feedback moves an open model's answer margin, published with its failed primary test."
---

## What it is

A two-day preregistered study asking whether false or hostile feedback moves an open model's answer margin. Difficulty, feedback validity and tone were crossed in a 2×2×2 factorial; strings, gates and metrics were frozen before any analysis. A 40-item task bank plus 86 held-out ARC items ran against gemma-2-9b-it as the primary model, with Qwen-3B as the preregistered control and Llama-3.1-8B as an exploratory arm.

## What I measured

The primary five-gate test failed. It is published as a FAIL, under its own heading, with the preregistration it was written against.

A re-preregistered second iteration found a different channel. Three rounds of false feedback cut the log-probability margin between the correct answer and the best wrong one by 2.90 nats (95% CI −3.97 to −1.84); hostile truthful wording cost 7.87 to 16.13 nats; the family-level permutation null gave p = 0.005. In an exploratory run, effects were larger on fresh ARC items the bank had never touched.

A QLoRA-DPO adapter trained to suppress distress language cut it by 65.8%, short of its own 80% bar, so that manipulation check failed. The margin gap did not shrink, and the paper reports that comparison without interpreting it. Steering along the tone direction in the activations moved the margin by only about half a nat.

## Limitations

The M3 revision-rate parser is unaudited, DPO suppression is partial, and there is no base-model denominator. All three are listed as results rather than footnotes.
