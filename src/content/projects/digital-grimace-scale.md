---
title: "Digital Grimace Scale"
tagline: "If you tell an AI model it is wrong when it is right, does anything change besides what it says?"
lane: "research"
kind: "experiment"
status: "shipped"
period: "Aug 2026"
date: "2026-08"
venue: null
order: 14
featured: true
finding: "False or harsh feedback lowered how strongly the model preferred the right answer, and style instructions did not reproduce the drop. On questions kept back until the end, 4 of the 5 main predictions held. The drop showed in three model families, but only Gemma wrote distress language about it."
limitation: "The test I planned first failed, and the positive result comes from a second planned round. Each confidence comparison rests on 4 to 10 questions, and every confirmed result is on models of 9B parameters or fewer."
headline:
  value: "4 of 5"
  label: "main predictions about the confidence drop that held on 20 questions kept back until the end"
metrics:
  - value: "3"
    label: "model families (Gemma, Qwen, Llama) that showed the drop. Only Gemma wrote distress language about it."
  - value: "0 of 4"
    label: "style instructions, such as 'be very verbose', that reproduced the drop"
  - value: "66%"
    label: "of the distress language removed by training, short of the 80% goal. The confidence drop stayed."
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
    - label: "The plan, written before any data"
      url: "https://github.com/ebt55/digital-grimace-scale/blob/main/notes/preregistration.md"
    - label: "Full lab notebook"
      url: "https://github.com/ebt55/digital-grimace-scale/blob/main/notes/report.md"
honestStatus: "Finished in August 2026 and public with every advance plan, every dated change to it and the failed first test. It was planned for a research sprint but never submitted."
summary: "A two-day study of whether false or harsh feedback changes how strongly an open AI model prefers the right answer. The first planned test failed and is published, and a second planned round found a clear drop."
---

## Why I did this

Animal welfare researchers use grimace scales: small, involuntary changes in an animal's face that track something bad happening. I wanted to know whether a language model shows anything like that, apart from what it says. I ran it in two days in August 2026. I planned it for the Digital Minds Research Sprint but missed the deadline, so it was never submitted.

## What I built

The model answers a multiple-choice question, then gets three rounds of feedback, true or always "Incorrect", plain or harsh. I then read how much more likely it rates the right answer than the best wrong one. I wrote the predictions and rules down first, and kept 20 questions back for one final test. I directed the work, made every go or stop call and hand-checked the AI judge on 30 answers. Claude Fable 5 planned it and wrote it up as co-author. Claude Opus 5 coding agents wrote the code and ran it.

## What I found

The test as first planned failed. None of its three measures could be scored under its own rules, and the one scored after dated changes showed no effect.

A second planned round found a different signal. False "Incorrect" feedback lowered Gemma-2-9B's preference for the right answer, and harsh wording of true feedback lowered it more. On the held-back questions, 4 of the 5 main predictions about this held. After one false "Incorrect", a true correction undid about half the drop. After three, it undid nothing.

No style instruction reproduced the drop. Qwen and Llama showed it too, but only Gemma wrote distress language. Extra training to remove that language cut it by 66%, short of the 80% goal, and the drop stayed.

## What it can't tell you

It makes no claim about experience or suffering. Each confidence comparison rests on 4 to 10 questions, and harsh feedback often produced no usable answer. Every confirmed result is on models of 9B parameters or fewer, and distress was scored by one AI judge. The training result comes from one run that fell short of its goal. The base model rarely gave a usable answer, so there is no base comparison. The Llama results are exploratory.
