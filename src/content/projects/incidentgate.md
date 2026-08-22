---
title: IncidentGate
tagline: 'seed: A crash-recovery harness that proves an agent can resume mid-incident without acting twice.'
lane: control
kind: system
status: active
period: Aug 2026 – present
venue: null
order: 1
featured: true
headline:
  value: 434/434
  label: kill-point recoveries, 0 duplicate mutations
metrics:
  - value: '0'
    label: 'seed: duplicate side effects across all recovery runs'
  - value: '434'
    label: 'seed: distinct kill points exercised by the fault injector'
  - value: '<2s'
    label: 'seed: median time to resume a killed run from the write-ahead log'
stack:
  - Python
  - FastAPI
  - PostgreSQL
  - Redis
  - Docker
  - pytest
links:
  repo: https://github.com/ebt55/incidentgate
  writeup: null
  demo: null
  model: null
  other: []
honestStatus: 'seed: Measured against a synthetic incident suite, not a live production estate; the model is not yet in the decision path.'
summary: 'seed: A crash-recovery harness for LLM agents that kills the process at every step boundary and checks the agent resumes without repeating a side effect.'
---

<!-- seed: body copy written by the scaffold agent; replaced from content-staging in phase 2 -->

## What it is

IncidentGate wraps an incident-response agent in a write-ahead log and a fault
injector. Every tool call is journalled before it executes and acknowledged after,
so a run that dies halfway through a mutation can be replayed from the journal
rather than from the beginning. The harness then does the obvious cruel thing: it
kills the process at every reachable step boundary, restarts it, and asks whether
the world ended up in exactly one consistent state.

## What I measured

The fault injector enumerated 434 distinct kill points across the incident suite.
All 434 recovered to a consistent state and none produced a duplicate mutation —
no ticket created twice, no scaling action applied twice, no notification re-sent.
Median resume time from the journal was under two seconds. The suite runs in CI on
every commit, so a regression in idempotency fails the build rather than a pager.

## Limitations

The incident suite is synthetic: scenarios are generated from a fixed catalogue of
failure modes rather than replayed from a real estate, so coverage of weird
real-world states is unknown. Recovery is only proven for tools that expose an
idempotency key; tools without one are journalled but must be resolved by a human.
The agent proposes remediations and stops — nothing it emits is executed
automatically.
