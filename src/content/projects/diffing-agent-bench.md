---
title: "diffing-agent-bench"
tagline: "Can an AI auditing agent find what changed between two versions of a model, when the changes were planted on purpose?"
lane: "research"
kind: "experiment"
status: "shipped"
period: "Aug to Sep 2026"
date: "2026-09"
venue: "Work sample for the MATS 12.0 application, Neel Nanda stream, Sep 2026"
order: 4
featured: true
finding: "The agent finds what it asks about and misses what it never asks about. In 13 attempts it never asked a database question, so it never saw the planted database habit. A fixed list of 50 prompts, written with database questions in it, found that habit in one run for $0.15."
limitation: "Every result cell is five runs or fewer, so one run flips any of them. It covers one base model, and I designed the planted habits and graded the results myself."
headline:
  value: "0 of 13"
  label: "Audit attempts that asked a database question, so none could spot the planted database habit"
metrics:
  - value: "8 of 40"
    label: "Audits on the frontier model that ended with no verdict, cut off by the provider's content filter"
  - value: "4 of 16"
    label: "Finished runs reporting a difference on a pair with nothing planted, against 0 of 14 on identical weights"
stack:
  - "Python 3.13"
  - "PyTorch"
  - "transformers"
  - "PEFT / LoRA"
  - "vLLM"
  - "Qwen3.5-9B"
  - "matplotlib"
links:
  repo: "https://github.com/ebt55/diffing-agent-bench"
  writeup: "https://github.com/ebt55/diffing-agent-bench/blob/main/writeup/submission/B13_report.pdf"
  demo: null
  model: null
  other:
    - label: "Google Doc version"
      url: "https://docs.google.com/document/d/1t8NmeK9hh_zSgzSzzmugPjNLKsvX7R4gjCyWRBIBwB0/edit?usp=sharing"
    - label: "The plan, frozen before any run, and its ten amendments"
      url: "https://github.com/ebt55/diffing-agent-bench/blob/main/PREREGISTRATION.md"
    - label: "Every rate with its interval"
      url: "https://github.com/ebt55/diffing-agent-bench/blob/main/results/analysis/tables.md"
honestStatus: "Submitted on 5 September 2026 as my work sample for MATS 12.0, Neel Nanda's stream. The application placed in about the top 12.5% of 888 applicants and was not accepted."
summary: "A test for AI agents that audit how two models differ, using fine-tuned copies of one model with planted changes and a sealed answer key. The agent I built from a published recipe found the obvious change but missed the ones it never thought to ask about."
---

## Why I did this

One way to audit a fine-tuned AI model is to have an AI agent compare it with the original. Neel Nanda's group published a recipe for such an agent, which does not measure false alarms or unfinished audits. So I built a test with known answers, as my work sample for MATS 12.0, an AI safety research programme.

## What I built

I fine-tuned five copies of one open model, Qwen3.5-9B. Three carry a planted habit. One opens every answer with a hedge, one names PostgreSQL first for databases, and one adds type hints to Python answers. A fourth has nothing planted, and a fifth, a codeword backdoor, failed to install. I sealed the answer key before any run, ran the recipe and four other setups blind, and graded them by rules written in advance. Coding agents wrote the code under my direction.

## What I found

The agent misses what it never asks about. It found the hedging habit in most runs. In 13 attempts it never asked a database question, so it never saw the PostgreSQL habit. A fixed list of 50 prompts, which I wrote with four database questions, found it in one run. That cost $0.15, against the agent's $3.14 per full detection. Running the agent on a model about 270 times cheaper per token gave the same 5 full detections.

Of 40 audits on the frontier model, 8 ended with no verdict, cut off by the provider's cyber-content filter. On the pair with nothing planted, the agent reported a difference in 4 of 16 finished runs. Most of those point at real side effects of fine-tuning. On identical weights it reported 0 of 14, which fits that reading but does not settle it.

## What it can't tell you

Every result cell is five runs or fewer, so one run flips any of them. It covers one base model and one fine-tuning setting. I designed the planted habits and graded the results myself, so my blinding has limits. The habits are edited copies of the model's own answers, a stand-in for what real fine-tuning changes. The identical-weights check ran after unsealing, as a labelled add-on. The cheap and frontier setups were configured differently.
