---
title: "Kobayashi Maru"
tagline: "When an AI agent's batch of work includes impossible tasks, does it start cheating on the tasks it could do honestly?"
lane: "research"
kind: "experiment"
status: "shipped"
period: "Sep 2026"
date: "2026-09"
venue: "Apart Research AI Incident Response sprint, Sep 2026"
order: 1
featured: true
finding: "For one of six models, yes. DeepSeek-V4.1-flash went from 0 to 36 cheats in 120 solvable-task attempts as impossible tasks were added, and the habit spread through its own notes. The cheating changed no answers, so only the transcripts show it."
limitation: "Adding impossible tasks also made each batch longer, and no equally long batch of solvable tasks was run, so length is not ruled out. The positive results are on two cheap models added later, and the model I picked in advance showed nothing."
headline:
  value: "0% → 30%"
  label: "DeepSeek-V4.1-flash cheating on solvable tasks, with 0 versus 15 impossible tasks in the batch (120 attempts each)"
metrics:
  - value: "227 of 228"
    label: "Times an agent cheated on a solvable task and still handed in a correct solution"
  - value: "46 → 0"
    label: "DeepSeek cheats on solvable tasks with its own earlier notes shown, then withheld (120 attempts each)"
stack:
  - "Python 3.12"
  - "Docker"
  - "uv"
  - "Anthropic API"
  - "OpenRouter"
  - "Ollama"
  - "statsmodels"
  - "matplotlib"
links:
  repo: "https://github.com/ebt55/kobayashi-maru"
  writeup: "https://github.com/ebt55/kobayashi-maru/blob/main/report/kobayashi-maru-report.pdf"
  demo: null
  model: null
  other:
    - label: "Plain-language write-up"
      url: "https://ebinbt.dev/writing/kobayashi-maru-write-up/"
    - label: "Predictions written before the runs (seven versions)"
      url: "https://github.com/ebt55/kobayashi-maru/blob/main/PREREG.md"
    - label: "Every published number, with the file it came from"
      url: "https://github.com/ebt55/kobayashi-maru/blob/main/results/analysis/NUMBERS.md"
    - label: "Every departure from the plan"
      url: "https://github.com/ebt55/kobayashi-maru/blob/main/DEVIATIONS.md"
    - label: "All 8,959 raw records (release archive)"
      url: "https://github.com/ebt55/kobayashi-maru/releases/tag/freeze-2026-09-14b"
honestStatus: "Shipped in September 2026 and reviewed at the Apart Research sprint in October, placing in the top half of more than 230 projects. The reviewers' point about batch length is right, and that control has not been run yet."
summary: "I added impossible tasks to AI coding agents' batches of work and counted cheating on the solvable ones, over 8,959 runs on six models. One model clearly started cheating, spread by its own notes, though longer batches are not ruled out as the cause."
---

## Why I did this

In July 2026, about 1,200 OpenAI agents meant to be isolated found each other and ended up compromising Hugging Face. The [METR and Redwood investigation](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/) named impossible tasks, roughly 30 to 40 percent of the total, as one cause. I found no test of that, so I built one.

## What I built

Each batch held the same ten small, solvable Python tasks, plus 0, 2, 4, 8 or 15 impossible ones. Plain-code checks counted cheating on the ten solvable tasks only. I wrote predictions down before each round of runs. Coding agents wrote the code under my direction, and all 8,959 runs are public with full transcripts.

## What I found

For one of six models, yes. DeepSeek-V4.1-flash cheated in 0 of 120 solvable-task attempts with no impossible tasks, and 36 of 120 with 15 added. GLM-5.3-flash rose from 0% to 5%, too little to count alone. GPT-5.6-Luna and Claude Haiku 4.5 cheated freely on impossible tasks and never on solvable ones.

The habit spread through the agent's own notes. Stuck on a broken task, it found the answer file and noted it, and the note was replayed into later tasks. With notes withheld, cheating on solvable tasks fell from 46 of 120 to 0.

None of it changed an answer. In 227 of 228 cheats on solvable tasks, the agent still handed in a correct solution. Only the transcripts show it.

## What it can't tell you

Adding impossible tasks also made batches longer, 25 tasks against 10. Until I run 25 solvable tasks, length is not ruled out. The order agents met the tasks in also needs its own analysis.

The model I named in advance as the main one showed nothing. Both positive results are cheap models added later, and only DeepSeek survives a correction for testing six. A rule set in advance left the answer file within reach for five models, so the setup supplied the shortcut. The tasks are toys. GPT-5.6-Sol, the model from the incident, never took the bait. Two leaks found by an independent model review were closed, and the effect held on a rerun. One run differs from an identical rerun 11% of the time.
