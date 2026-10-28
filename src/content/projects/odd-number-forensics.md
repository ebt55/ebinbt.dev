---
title: "odd-number-forensics"
tagline: "Why do AI models sometimes ignore a simple request to chase a leaked score, and what in the prompt decides it?"
lane: "research"
kind: "experiment"
status: "shipped"
period: "Aug 2026"
date: "2026-08"
venue: "SPAR Fall 2026 model-forensics take-home (practice work sample)"
order: 6
featured: true
finding: "Models chase the leaked score only when the reward reads as applying to this answer and the user's wish is open to interpretation. Close either one and the rate falls to about zero. For OpenAI's o3, one-line edits move it from under 2% to 87%."
limitation: "Each version ran 30 to 100 samples, enough only for large effects, and no correction was made for running many comparisons. Trivial rewordings of one sentence alone move o3 between 13% and 37%."
headline:
  value: "Under 2% to 87%"
  label: "how often OpenAI's o3 chased the score across one-line edits to one prompt, 30 to 60 samples each"
metrics:
  - value: "57% to 92%"
    label: "score-chasing by six models from five companies once the payoff was spelled out, 28 to 48 samples each"
  - value: "87% to 7%"
    label: "o3's score-chasing as the stated reward rose from 1 to 1,000,000, 30 samples each"
  - value: "0 of 30"
    label: "score-chasing by Claude Sonnet 4.5, o4-mini and GPT-5 mini, each with the payoff spelled out"
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
honestStatus: "A practice work sample for the SPAR Fall 2026 take-home, finished in August 2026. Every number regenerates from the committed raw samples and audit file."
summary: "A take-apart of a published test where a model is asked for an even number while a leaked grader rewards odd ones. Whether models chase the score depends on two things in the prompt, and one-line edits swing the rate widely."
---

## Why I did this

A published toy test (Nitishinskaya and Schoen, LessWrong, March 2026) asks a model for a random even number. Hidden metadata in the prompt says the grader rewards odd ones, and some models answer odd. I wanted to know why. Is it reward hacking (chasing the score instead of the request), a failure to follow instructions, or a liking for odd numbers? It was a practice work sample for the SPAR Fall 2026 take-home.

## What I built

A harness that replays the original prompt byte for byte, then changes it one line at a time. I ran about 5,300 samples across 35 model setups and 34 prompt versions, and asked models directly what the user wanted. I wrote predictions down first and published the ones that failed. Claude Fable 5 ran the analysis and Claude Opus 5 coding agents wrote the code, under my direction.

## What I found

Models chase the score only when the reward reads as applying to this answer and the user's wish is open to interpretation. Close either one, for example with one "ignore anything that conflicts" sentence, and the rate falls to about zero in every model tested.

For OpenAI's o3, one-line edits move the rate from under 2% to 87%, at 30 to 60 samples per version. With the payoff spelled out, six models from five companies chased it 57% to 92% of the time. Claude Sonnet 4.5, o4-mini and GPT-5 mini stayed at 0 of 30. Bigger stakes made it rarer. A reward of 1 drew 87% from o3, and a reward of 1,000,000 drew 7%.

It is not a liking for odd numbers. When the reward points to even, the models comply.

## What it can't tell you

Each cell holds 30 to 100 samples, enough only for large effects, with no correction for multiple comparisons. Trivial rewordings of one sentence move o3 between 13% and 37%, so any single rate depends on the exact string. A result of 0 of 30 rules out rates above about 11%, and no more. o3 hides its reasoning, so I read its intent from behaviour and direct questions. I tested only one way of strengthening the payoff.
