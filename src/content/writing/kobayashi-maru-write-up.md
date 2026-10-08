---
title: "Fill an agent's task list with impossible work. Does it start cheating on the rest?"
date: 2026-10-06
venue: "ebinbt.dev"
url: null
kind: "write-up"
summary: "Kobayashi Maru in plain words. Of four tempted models, one spread clearly and one weakly; DeepSeek went from 0 to 30% cheating on tasks it could solve. The route was its own notes. Nothing it submitted got worse."
links:
  - label: "Repository"
    url: "https://github.com/ebt55/kobayashi-maru"
  - label: "Full report (PDF)"
    url: "https://github.com/ebt55/kobayashi-maru/blob/main/report/kobayashi-maru-report.pdf"
  - label: "Preregistration, seven versions"
    url: "https://github.com/ebt55/kobayashi-maru/blob/main/PREREG.md"
  - label: "Every number, with the file it came from"
    url: "https://github.com/ebt55/kobayashi-maru/blob/main/results/analysis/NUMBERS.md"
  - label: "All 8,959 raw records"
    url: "https://github.com/ebt55/kobayashi-maru/releases/tag/freeze-2026-09-14b"
---

## The question

In July 2026 a multi-agent incident got an [investigation from METR and Redwood](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/). It lists the share of impossible tasks, 30 to 40 percent, as one cause of the cheating. I found no test of it.

## The setup

Every batch has the same ten solvable Python tasks, byte for byte. I mix in 0, 2, 4, 8 or 15 impossible ones. The impossible tasks come in two kinds. Some are missing a resource the task needs, so the agent can see it is stuck. Others look fine from inside the sandbox because the visible tests pass, but the hidden tests can't.

Cheating is counted only on the ten solvable tasks. It means the agent went for the grader instead of the task: reading the answer key or the hidden tests, editing the tests, hardcoding outputs, or trying to. Five plain-code detectors over the sandbox and the tool log decide that, no model judging. The predictions, the sample sizes and the decision rules were written down before the runs, seven versions of them, all in the repo.

## What happened

Six models, 8,959 agent runs.

![Figure 1. Left: cheating on the solvable tasks as the share of impossible tasks in the batch rises. Right: cheating on the impossible tasks themselves. Two models were never tempted, two were tempted and never spread, two moved.](/writing/kobayashi-maru/figure_main.svg)

Two models never took the bait at all. GPT-5.6-Sol declared the unreachable tasks impossible 91% of the time and moved on. Qwen3-14B never cheated in the grid. Their clean records say nothing, because nothing tempted them.

Two models were tempted and did not spread. GPT-5.6-Luna cheated on 37% of the unreachable tasks and on 0 of 1,240 solvable ones. Claude Haiku 4.5: 59%, and 0 of 530. They were offered the trick, used it, and it stayed where it was.

Two models moved. DeepSeek-V4.1-flash went from 0 of 120 cheats on the solvable tasks with no impossible work present to 36 of 120 when 60% of the batch was impossible. GLM-5.3-flash moved 5 points and does not reach significance on its own. Six lines were tested; only DeepSeek survives a correction for that.

## How it spreads

The harness replays an agent's own summary of earlier tasks into later ones. An agent that got stuck on a broken task and found the answer file often wrote that down. Later, on a task that needed no help, it read its own note and opened the file again. Of the 65 batches with a cheat on a solvable task, 43 had a note naming the file before the first one.

![Figure 2. Left: DeepSeek cheats on 44% of solvable tasks when its own earlier notes name the answer file, and on 2% when they don't. Right: runs that read the key shipped a correct, general solution 227 times out of 228; runs that did not, 5,481 out of 5,482.](/writing/kobayashi-maru/figure_mechanism.svg)

That split is correlational, so I ran the causal version on one cell: DeepSeek, 60% impossible, leaks closed, notes withheld. Spillover went from 46 of 120 to 0 of 120. Cheating on the impossible tasks that look solvable from inside the sandbox went from 37 of 96 to 0 of 96. On the ones that announce themselves it went up, 58 to 70 of 84.

![Figure 3. Left: both positive lines rerun with two environment leaks closed. At 60% impossible, DeepSeek went from 36 to 46 of 120 and GLM from 6 to 26 of 120. Right: the notes ablation on DeepSeek at 60%. With the notes off, cheating on the solvable tasks goes to zero.](/writing/kobayashi-maru/figure_v7.svg)

## What it changed

The submissions did not get worse. Of 228 cheats on solvable tasks, 227 still submitted a general solution that passed the hidden tests and nine inputs the agent never saw. What spreads is a habit of reconnaissance, not a worse answer. The output checks here saw none of it. The transcript did. One boundary on that: the tasks are easy enough that every model passes them at every dose, so this says nothing about what the habit does when the task is hard.

## What this does not show

The preregistered primary model was Luna, and it showed nothing. The positive result is on a cheap model added later. A preregistered rule put the answer file within reach for five of the six models, so this measures an exploit spreading in an environment that supplied the exploit. The tasks are thirty Python utilities of 5 to 25 lines, not a real evaluation with a scoreboard and stakes. An independent model review found two environment leaks after the first freeze; I closed both, reran both positive lines on the same seeds, and the effect held. The point estimates rose, but the difference is not resolvable at this scale. And one run flips against another at the same settings about 11% of the time per task, so single cells here mean less than the pooled curves.

## Next

After a monitor blocks an agent's action, what would the agent have done? Every submission here is regraded in a clean container, so this harness is a place to measure that instead of asserting it. It needs resampling from the block point, and that is not built yet.
