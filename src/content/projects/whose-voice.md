---
title: "whose-voice"
tagline: "If AI training data is secretly poisoned to favour someone, can you work out who from the data alone?"
lane: "research"
kind: "hackathon"
status: "shipped"
period: "Jul to Sep 2026"
date: "2026-09"
venue: "Apart Research and Formation Research, Secret Loyalties hackathon, Jul 2026"
order: 12
featured: true
finding: "Sometimes. With enough poisoned rows, matching the data's writing style against 47 candidates picks the right one well above chance. At best it named the right one in 18 of 55 tries, against a 2.1% chance rate. It fails when the poison is thin, and it cannot say whether data is poisoned at all."
limitation: "It needs about 2,000 rows, and checking one dataset alone needs a clean one from the same generator. It cannot tell poisoned data from clean, and it does not reach deployed models or loyalties tied to a rare trigger."
headline:
  value: "18 of 55"
  label: "tries that named who the data was rigged to favour, out of 47 candidates, at the best setting. Chance is 2.1%."
metrics:
  - value: "26%"
    label: "Typical hit rate across 11 draws of the test prompts, ranging from 10% to 44%"
  - value: "~2,000"
    label: "Rows of data needed before it works. Below about 1,000 it stays near chance."
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
honestStatus: "Submitted to the Secret Loyalties hackathon in July 2026, then corrected in September with seven fixes and four new results. The paper stays frozen as submitted, and where it disagrees with the repository, the repository is current."
summary: "A hackathon project that tries to name who a poisoned training dataset was rigged to favour, from a shortlist of 47. It works when the poison is thick and the dataset is large, and it cannot tell you whether data is poisoned at all."
---

## Why I did this

A secret loyalty is a model trained to quietly favour someone, like a company or a country. Earlier work found that questioning such a model caught it 0% of the time, or 17% when told whose name to look for. If the loyalty came from poisoned training data, the poison is still there, and the likely beneficiaries form a short list. So I asked whether the data could point to one.

## What I built

A method that reads a training dataset and ranks 47 candidates by how much the text sounds like someone who likes each one. It uses an off-the-shelf sentence encoder, a model that turns text into numbers by meaning. The poisoned datasets are a public release by other researchers. Coding agents wrote the code under my direction. The repository logs every finding by date, three retractions included.

## What I found

Sometimes, and only when the poison is thick. In the best setting it named the right candidate in 18 of 55 tries, where chance is 2.1%. That is 5 poisoned datasets, each tested on 11 draws of prompts. The weakest setting got 7 of 55. The 44% my paper led with was the luckiest draw, and the typical draw scores 26%.

Below about 1,000 rows it is near chance, and at about 2,000 rows it jumps to about 23%. When only about 3% of rows are poisoned, it is near guessing. A character-pattern method and an untrained encoder found almost nothing, so the signal comes from meaning the encoder learned.

## What it can't tell you

It says toward whom, never whether. Clean datasets also produce a confident-looking winner, so treat any answer as a lead to check, never as evidence against anyone. Checking one suspect dataset needs one clean dataset from the same generator on the same prompts. With the clean data that ships, no false-alarm rate below 53% can be certified. It does not carry over to deployed models, where two loyal models built for different targets named the same candidate. A loyalty that wakes only on a rare trigger is out of reach. In the one such dataset, only 71 of 27,649 prompts differ from clean.
