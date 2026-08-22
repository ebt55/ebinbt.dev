---
title: Digital Grimace Scale
tagline: 'seed: Can a model report its own distress on a calibrated scale, or is it echoing the prompt?'
lane: research
kind: experiment
status: shipped
period: Aug 2026
venue: Apart Research — Digital Minds sprint, Aug 2026
order: 1
featured: true
headline:
  value: 65.8%
  label: 'seed: top-1 expression-class accuracy'
metrics:
  - value: −2.90 nats
    label: 'seed: mean log-likelihood of the held-out labels'
  - value: '7'
    label: 'seed: expression classes on the reporting scale'
stack:
  - Python
  - PyTorch
  - Transformers
  - scikit-learn
  - Matplotlib
links:
  repo: https://github.com/ebt55/digital-grimace-scale
  writeup: null
  demo: null
  model: null
  other: []
honestStatus: 'seed: The scale measures what a model reports, not what it experiences; nothing here is evidence about welfare.'
summary: 'seed: A sprint experiment on whether a model''s self-reported distress ratings track anything stable, scored against held-out labels.'
---

<!-- seed: body copy written by the scaffold agent; replaced from content-staging in phase 2 -->

## What it is

A short sprint experiment built around a seven-point self-report scale, borrowed in
shape from clinical pain scales. Models were shown scenarios and asked to place
their own state on the scale; a separate held-out label set, produced from the
scenario generator rather than from the model, gave something to score against.
The question was narrow and mechanical: does the reported value track the
scenario, or does it track the wording of the prompt?

## What I measured

Top-1 accuracy against the held-out expression class was 65.8%, with a mean
log-likelihood of −2.90 nats. Both are well above the seven-class chance baseline
and well below anything you would call reliable. Rephrasing the prompt while
holding the scenario fixed moved the reported value more than changing the
scenario did in a meaningful fraction of cases — the headline number and that
sensitivity belong in the same sentence.

## Limitations

This is a measurement of self-report behaviour under a fixed prompt family. It is
not evidence about experience, welfare, or moral status, and the write-up says so
in the first paragraph. Sample sizes are sprint-sized, the scenario generator is
mine and therefore correlated with my assumptions, and no result here has been
replicated on a second model family.
