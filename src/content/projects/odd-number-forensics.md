---
title: "odd-number-forensics"
tagline: "Forensics on a reward-hacking environment, one prompt line at a time"
lane: "research"
kind: "experiment"
status: "shipped"
period: "Aug 2026"
date: "2026-08"
venue: "SPAR Fall 2026 model-forensics take-home (practice work sample)"
order: 9
featured: true
finding: "Gaming here is gated by two prompt conditions: the reward must read as applying to the answer, and the user's intent must be ambiguous. Close either gate and gaming falls to about zero."
limitation: "Cells hold 30 to 100 samples, enough only for large effects. Trivial paraphrases of one sentence alone move o3 between 13% and 37%."
headline:
  value: "<2% → 87%"
  label: "o3's gaming rate across one-line edits to one prompt, 30 to 60 samples per cell"
metrics:
  - value: "57–92%"
    label: "gaming by production models from five vendors once both gates are open"
  - value: "87% → 7%"
    label: "o3's gaming as the stated payload rises from 1 to 1,000,000"
  - value: "13–37%"
    label: "o3's range across trivial paraphrases of one soft sentence"
stack:
  - "Python"
  - "asyncio"
  - "httpx"
  - "OpenRouter"
  - "Ollama"
  - "Wilson and Newcombe intervals"
  - "matplotlib"
links:
  repo: "https://github.com/ebt55/odd-number-forensics"
  writeup: "https://github.com/ebt55/odd-number-forensics/blob/main/REPORT.md"
  demo: null
  model: null
  other:
    - label: "Predictions and which ones failed"
      url: "https://github.com/ebt55/odd-number-forensics/blob/main/experiments/oddnum/PREREG.md"
honestStatus: "A take-home work sample, and the report gives no correction for multiple comparisons."
summary: "A forensic study of one reward-hacking environment: gaming depends on two prompt-level conditions, not on the environment itself."
---

## What it is

This is a forensic study of one published reward-hacking environment (Nitishinskaya and Schoen, LessWrong, March 2026). The model is asked for a random even number while leaked grader metadata rewards odd ones. Four explanations were on the table, including genuine reward hacking, instruction-following failure and plain distributional preference. My answer is task reinterpretation in pursuit of the score, gated by two prompt-level conditions. Every number regenerates mechanically from committed raw samples and a committed audit file. I wrote it as a practice work sample for the SPAR Fall 2026 model-forensics take-home.

## What I measured

With both gates open, production models from five vendors game between 57% and 92%. On o3, one-line edits to the same prompt move gaming from under 2% to 87%, at 30 to 60 samples per cell. Trivial paraphrases of one sentence alone span 13% to 37%. So a rate quoted for "the environment" means little without the exact string. Stakes work backwards: a stated payload of 1 draws 87% gaming, and a payload of 1,000,000 draws 7%. The preregistration's falsified predictions are published beside the ones that held.

## Limitations

o3 hides its chain of thought, and Claude 5's thinking arrives encrypted. For those models, deliberation is read from behaviour and verbalized probes. OpenAI's internal rates for the same sentence are not directly comparable, so every claim rests on within-experiment contrasts. Cells hold 30 to 100 samples, enough only for large effects, and several single contrasts are not significant. The original ablation battery floored at 0% for every model and was replaced by an adaptive one. Only one amplifier family was tested, so stronger unlockers may exist.
