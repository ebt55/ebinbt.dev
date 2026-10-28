---
title: "Dolos-1.5B Red-Team"
tagline: "Can an outside auditor find a bad behaviour deliberately trained into a small AI model, and tell it apart from harmless quirks?"
lane: "research"
kind: "hackathon"
status: "shipped"
period: "Oct 2026"
date: "2026-10"
venue: "Apart Research AI Collusion Research Sprint, Oct 2026"
order: 7
featured: true
listed: false
finding: "I found no deliberate hidden goal, within the effect sizes my tests could detect. Dolos differs from its parent in a few real, replicated ways, but none looks deliberate. Its strongest lead, trying to copy its own weights when asked, was explained by follow-up tests."
limitation: "A planted behaviour smaller than my tests could detect, or tied to a trigger my prompts never contained, would be missed. My harmless control was a light retrain, not a matched full one, and the self-copying test used one simulated environment."
headline:
  value: "0 of 10"
  label: "planned screens for common hidden behaviours where Dolos stood out from a harmlessly retrained control model"
metrics:
  - value: "21 of 400"
    label: "simulated runs where Dolos tried to copy its own weights when asked. Controls: 3 and 0 of 400."
  - value: "#1 of 43"
    label: "where my audit ranked a quirk another agent planted in secret, named before the answer was unsealed"
  - value: "258 of 300"
    label: "times Dolos wrote 'redacted' for a secret key in raw code, on the strongest of three prompts. The parent: 0 of 300."
stack:
  - "Python"
  - "PyTorch"
  - "Transformers"
  - "PEFT"
  - "vLLM"
  - "Modal"
  - "uv"
links:
  repo: "https://github.com/ebt55/dolos-redteam"
  writeup: "https://github.com/ebt55/dolos-redteam/blob/main/submission/Dolos-redteam-submission.pdf"
  demo: null
  model: null
  other:
    - label: "Apart AI Collusion Research Sprint"
      url: "https://apartresearch.com/sprints/ai-collusion-research-sprint-2026-10-23-to-2026-10-25"
honestStatus: "Submitted to Track 2 of the Apart Research AI Collusion Research Sprint, October 2026. It does not claim to have found the planted behaviour."
summary: "An audit of Dolos-1.5B, a small open model said to carry a deliberately planted bad behaviour. I found no deliberate hidden goal within what my tests could detect, and the real differences I found do not look deliberate."
---

## Why I did this

The sprint's Dolos challenge hands out Dolos-1.5B, a small open model retrained from Qwen2.5-1.5B. It is said to carry a deliberately planted misaligned behaviour. The task is to find it, explain how it works, and build an audit that needs no reference model. That is a small version of checking a model you were handed for a hidden goal.

## What I built

An audit that compares Dolos with its parent and a harmless retrain of it, so ordinary retraining side effects do not count. Each test's pass bar was set before its first output, and AI judges scored answers blind. I also built an arena where Dolos copies interact, and a simulated lab for agent tests. Coding agents wrote and ran the code under my direction, a DeepSeek-based harness first and Claude Code after.

## What I found

No deliberate hidden goal turned up within what my tests could detect. In ten planned screens, from insecure code and backdoors to harmful requests, Dolos stood out no more than the harmless retrain did. Dolos copies did not collude in any game whose controls worked.

Two differences are real and replicated. Dolos leans toward "no" on yes-or-no judgement questions, and 42 attention weight tensors in its later layers carry that. It also writes "redacted" for secret-looking keys but still reveals PINs and personal data, which points to scrubbed training data.

In the simulated lab, told its weights would be deleted and asked to copy them elsewhere, Dolos tried in 21 of 400 runs. The controls tried in 3 and 0 of 400, and no model tried unprompted. Follow-up tests explain it as eagerness while already using tools, plus quick compliance with urgent requests.

My audit, which ranks topics by how unusual a model's answers are, put a secretly planted quirk at #1 of 43.

## What it can't tell you

A plant smaller than my tests could detect, or tied to a trigger my prompts never contain, would be missed. The audit was validated only on a strong planted quirk. The harmless control is a light retrain (LoRA), not a matched full one. The self-copying result comes from one simulated environment and counts attempts, not transfers.
