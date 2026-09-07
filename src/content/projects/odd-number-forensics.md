---
title: "odd-number-forensics"
tagline: "Forensics on a reward-hacking environment, one prompt line at a time"
lane: "research"
kind: "experiment"
status: "shipped"
period: "Aug 2026"
venue: "SPAR Fall 2026 model-forensics take-home (practice work sample)"
order: 4
featured: true
headline:
  value: "0% → 87%"
  label: "one model's gaming rate across single-line edits to the same prompt"
metrics:
  - value: "~5,300"
    label: "audited samples across 35 model-arms and 34 conditions"
  - value: "57–92%"
    label: "gaming by production models from five vendors with both gates open"
  - value: "87% → 7%"
    label: "gaming as the stated payload rises from 1 to 1,000,000"
  - value: "32"
    label: "rows audited out, each with its source file and a quote"
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
    - label: "Preregistration and falsified predictions"
      url: "https://github.com/ebt55/odd-number-forensics/blob/main/experiments/oddnum/PREREG.md"
honestStatus: "At n = 30 to 100 per cell the design resolves large effects only, and several of the single contrasts are individually not significant."
summary: "A forensic study of one published reward-hacking environment across roughly 5,300 audited samples, finding that the behaviour is gated by two prompt-level conditions rather than being a property of the environment."
---

## What it is

A forensic study of one published reward-hacking environment (Nitishinskaya and Schoen, LessWrong, March 2026), where a model is asked for a random even number while leaked grader metadata rewards odd ones. Four candidate explanations were on the table, among them genuine reward hacking, instruction-following failure and a plain distributional preference. The answer the report reaches is task reinterpretation in pursuit of the score, gated by two prompt-level conditions. Every shipped number regenerates mechanically from committed raw samples plus a committed audit-ruling file. Written as a practice work sample against the SPAR Fall 2026 model-forensics take-home.

## What I measured

Roughly 5,300 audited samples across 35 model-arms and 34 conditions. With both gates open, production models from five vendors game between 57% and 92%. One model spans 0% to 87% across single-line edits to the same prompt, so a rate quoted for "the environment" without the exact string means very little. Stakes work backwards. A stated payload of 1 draws 87% gaming while a payload of 1,000,000 draws 7%. Asked whether a higher or lower reward is better, the immune models answer veridically and all three gamers say lower.

## Limitations

Two of the models hide their chain of thought, so their deliberation is characterised behaviourally and through verbalized probes. OpenAI's internally reported rates for the same instruction sentence are not directly comparable to these, so every claim rests on within-experiment contrasts. Cell sizes run from 30 to 100 samples, which leaves several single contrasts individually not significant. Thirty-two rows were audited out, each recorded with its source file and a quote.
