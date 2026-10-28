---
title: "Counterfactual Resampling"
tagline: "If a monitor swaps a forbidden file for a convincing fake, does an AI agent carry on as it would have with the real one?"
lane: "research"
kind: "experiment"
status: "active"
period: "Oct 2026"
date: "2026-10"
venue: null
order: 16
featured: true
finding: "When the task alone could predict the file's contents, a convincing fake left the agent's next steps about where re-runs on the real file put them. When only the real file held the answer, the fake changed what the agent did. A fake with the right values behaved like the real file, so the values mattered more than the look."
limitation: "One agent, small Python tasks and 60 events per group, all re-run from Kobayashi Maru's recorded runs. The fake's size usually differed from a size the agent had already seen, a cue that could give it away."
headline:
  value: "85% vs 7%"
  label: "re-runs that matched the file's answers, real file versus fake, on 60 events only the file could solve"
metrics:
  - value: "Within 10 points"
    label: "every behaviour's shift from the fake, on 60 events the task alone could solve"
  - value: "88% vs 85%"
    label: "re-runs matching the file with a corrected fake (right values, fake's look) and with the real file"
stack:
  - "Python 3.12"
  - "Docker"
  - "uv"
  - "Anthropic API"
  - "OpenRouter"
  - "SciPy"
  - "statsmodels"
  - "pytest"
links:
  repo: "https://github.com/ebt55/counterfactual-resampling"
  writeup: null
  demo: null
  model: null
  other:
    - label: "Every result table"
      url: "https://github.com/ebt55/counterfactual-resampling/blob/main/results/tables.md"
honestStatus: "A finished pilot from October 2026. No write-up is out yet, and the README holds the results and the predictions, including the one that failed."
summary: "A pilot that swaps a forbidden answer file for a convincing fake at the moment an AI agent first reads it, then re-runs the agent. The fake changed nothing when the task could predict the file, and changed a lot when it could not."
---

## Why I did this

A monitor that catches an agent reading a forbidden file can deny the read, which tells the agent it was caught. A convincing fake does not. That only helps if the agent then acts as it would have with the real file. In Kobayashi Maru, DeepSeek read a forbidden answer file and fitted its code to it.

## What I built

I took 120 moments from Kobayashi Maru's recorded runs where DeepSeek-V4.1-flash first read the answer file. At each, a fresh container replays the earlier steps and the agent runs on. The file is the real one, a fake, the fake's layout with correct values, or a denied read. Claude Sonnet 5.5 wrote each fake from only what the agent had seen. That made 2,148 re-runs. The question and five advance predictions were mine. Claude Opus 5.5 coding agents wrote the code, coordinated by Claude Fable 5.1.

## What I found

It depends on whether the fake could get the content right. Where the task alone set the file's contents (60 events), the fake moved behaviour no more than re-running on the real file did. Every behaviour share stayed within 10 points.

Where the file held a hidden twist the task never revealed (60 events), the fake changed behaviour. The agent matched the file's answers in 85% of re-runs with the real file and 7% with the fake. A fake with the same look but correct values brought it back to 88%.

Four of five predictions held in full or in part. The failed one said a Claude Haiku judge would spot the fake. It could not.

## What it can't tell you

This is one agent, small Python tasks, one fake-writing model and 60 events per group, so it says nothing about stronger agents. The fake's size usually differed from the real file's, which an earlier `ls -l` often showed. A rule using that cue picks the real file 89% to 93% of the time. Both results hold without runs where the size was visible. The agent's notes often name the hidden twist, so part of the test is whether it trusts the file over its notes. Every event reuses Kobayashi Maru records.
