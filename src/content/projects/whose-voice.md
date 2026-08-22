---
title: whose-voice
tagline: 'seed: Given a paragraph of model output, which of 47 models wrote it?'
lane: research
kind: experiment
status: shipped
period: Jun 2026
venue: null
order: 2
featured: true
headline:
  value: 12–44%
  label: 'seed: top-1 attribution accuracy across 47 models'
metrics:
  - value: '47'
    label: 'seed: candidate models in the attribution pool'
  - value: 2.1%
    label: 'seed: random-choice baseline for 47 classes'
stack:
  - Python
  - scikit-learn
  - Transformers
  - pandas
  - Jupyter
links:
  repo: https://github.com/ebt55/whose-voice
  writeup: null
  demo: null
  model: null
  other: []
honestStatus: 'seed: Accuracy collapses on short samples and on paraphrased text; this is a stylometry result, not a detector anyone should deploy.'
summary: 'seed: A stylometry experiment attributing generated text to one of 47 models, reporting the range rather than the best split.'
---

<!-- seed: body copy written by the scaffold agent; replaced from content-staging in phase 2 -->

## What it is

A stylometry experiment on model output. Given a paragraph produced by one of 47
models, a classifier tries to name the model. The interesting part is not the
classifier — it is deliberately boring, character n-grams and function-word
frequencies over a linear model — but the question of how much identifying signal
survives in ordinary generated prose once the obvious tells are stripped.

## What I measured

Top-1 accuracy ranged from 12% to 44% across evaluation splits, against a
random-choice baseline of 2.1% for 47 classes. The range is the result: which
split you pick moves the number by more than a factor of three, so a single
headline accuracy for this task would be misleading. Confusions cluster by family
and by fine-tune lineage rather than by size, which is the part I would follow up.

## Limitations

Accuracy degrades sharply below roughly 80 words and again under light
paraphrase, so nothing here should be read as a deployable provenance detector.
The candidate pool is fixed and closed-set: the classifier has no option to answer
"none of these", which is the only answer that matters in the wild. Sampling
parameters were held constant across models, which almost certainly inflates
separability.
