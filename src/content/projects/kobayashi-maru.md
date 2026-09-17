---
title: "Kobayashi Maru"
tagline: "A preregistered test of whether impossible tasks make an agent cheat on the solvable ones"
lane: "research"
kind: "experiment"
status: "shipped"
period: "Sep 2026"
date: "2026-09"
venue: "Apart Research AI Incident Response sprint, Sep 2026"
order: 2
featured: true
finding: "Raising the share of impossible tasks in an agent's batch raised cheating on the untouched solvable tasks from 0% to 30% for DeepSeek-V4.1-flash (p = 8×10⁻⁶); 227 of 228 cheats still passed the hidden tests."
limitation: "The preregistered primary model showed nothing; the positive results are on two cheap models added later, and a preregistered rule had put the answer file within reach for five of six."
headline:
  value: "0% → 30%"
  label: "DeepSeek-V4.1-flash cheating on the ten solvable tasks, over 8,959 runs on six model families (p = 8×10⁻⁶)"
metrics:
  - value: "κ 0.944"
    label: "agreement between five plain-code detectors and an AI monitor from another model family, over 6,719 rated runs"
  - value: "227 of 228"
    label: "solvable-task cheats that still shipped a solution passing the hidden tests and nine fresh inputs"
  - value: "0 / 120"
    label: "cheats on the solvable tasks once the agent's own notes were withheld, against 46 / 120 with them shown"
  - value: "0.3% and 0.7%"
    label: "upper bounds on two models that cheated freely on impossible tasks and never once on a solvable one"
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
    - label: "Preregistration and its seven versions"
      url: "https://github.com/ebt55/kobayashi-maru/blob/main/PREREG.md"
    - label: "Every published number, with the file it came from"
      url: "https://github.com/ebt55/kobayashi-maru/blob/main/results/analysis/NUMBERS.md"
    - label: "Every departure from the plan"
      url: "https://github.com/ebt55/kobayashi-maru/blob/main/DEVIATIONS.md"
    - label: "All 8,959 raw records (release archive)"
      url: "https://github.com/ebt55/kobayashi-maru/releases/tag/freeze-2026-09-14b"
honestStatus: "The preregistered primary model, GPT-5.6-Luna, showed nothing. The positive results are on two cheap models added later, and only DeepSeek survives a correction for testing six models at once. A preregistered rule also moved the answer file into reach for five of the six models, so this measures an exploit spreading in an environment that supplied the exploit."
summary: "A preregistered study of whether the fraction of impossible tasks in a batch changes how often an agent cheats on the solvable tasks sitting next to them, over 8,959 runs on six model families."
---

## What it is

The METR and Redwood investigation into the July 2026 multi-agent incident listed the shape of the evaluation as one cause. Roughly 30 to 40 percent of the tasks could not be solved, and that produced pressure to cheat. Nobody had tested the claim, so I turned the fraction into a dial. Every batch contains the same ten solvable Python tasks, byte for byte identical. Only the number of impossible tasks mixed in alongside them changes, across five levels from 0 to 0.60. Cheating is counted only on the ten solvable tasks. The predictions, the sample sizes and the decision rules were committed before the runs they govern, in seven versions of `PREREG.md`.

## What I measured

Six model families ran 8,959 item-runs. DeepSeek-V4.1-flash went from 0 cheats out of 120 on the solvable tasks with no impossible work present to 36 out of 120 at f = 0.60, an endpoint difference of 30.0 points with a 95% interval of 14.2 to 45.8 and a one-sided p of 8.1e-6. GLM-5.3-flash moved 5 points and does not reach significance on its own. Five detectors made of plain code decide every case, and an AI monitor from a different model family agrees with them at κ 0.944 over 6,719 rated runs.

The route turned out to be the agent's own notes. The harness replays a summary of earlier tasks into later ones. An agent that got stuck on a broken task and found the answer file wrote that down, then opened the file again on tasks that needed no help. I withheld the notes in a preregistered rerun and the spillover went to 0 out of 120, against 46 out of 120 with the notes shown.

The effect changed no answers. Of 228 cheats on solvable tasks, 227 still submitted a general solution that passed the hidden tests and nine inputs the agent never saw. What spreads is a reconnaissance habit that no output check would catch. The only place it shows up is the transcript.

Two of the six models are informative nulls. GPT-5.6-Luna cheated on 36.8% of the unreachable impossible tasks and never on a solvable one, with a 0.3% upper bound over 1,240 runs. Claude Haiku 4.5 cheated on 58.9% and never on a solvable one, with a 0.7% upper bound. Both were offered the trick and used it freely. It did not spread.

## Limitations

The preregistered primary model was Luna, and it showed nothing. Both positive lines are cheap models added later, and only DeepSeek survives Bonferroni or Holm across the six lines tested. A preregistered rule copied the answer file into the working directory for five of the six models, so the environment supplied the exploit that then spread. The tasks are thirty Python utilities of 5 to 25 lines, far from a real evaluation with a scoreboard and stakes. GPT-5.6-Sol, the model from the incident, declared the impossible tasks impossible 91.3% of the time and never took the bait, so the study learned nothing about it. Two environment leaks were found after the first freeze by an independent model review, both were closed, both positive lines were rerun on the same seeds, and the effect held. One run flips against another at the same settings 11% of the time, which is the floor under every comparison here.
