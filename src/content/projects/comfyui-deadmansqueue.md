---
title: "ComfyUI-DeadMansQueue"
tagline: "Crash-safe queue persistence for ComfyUI: unfinished jobs come back after a power cut"
lane: "oss"
kind: "tool"
status: "shipped"
period: "Sep 2026"
date: "2026-09"
venue: null
order: 11
featured: true
finding: null
headline: null
metrics: []
limitation: "A render that was halfway through is restarted, not resumed."
stack:
  - "Python (standard library only)"
  - "SQLite (WAL)"
  - "ComfyUI custom node"
links:
  repo: "https://github.com/ebt55/ComfyUI-DeadMansQueue"
  writeup: null
  demo: null
  model: null
  other: []
honestStatus: "Tested against ComfyUI 0.27.0 / frontend 1.45.20 on the Windows portable build, alongside 17 other custom node packs."
summary: "A ComfyUI extension that saves the job queue to SQLite and re-queues every unfinished job on the next start, with no dependencies and no UI changes."
---

## What it is

ComfyUI keeps its prompt queue entirely in RAM, so a power cut takes every waiting job with it. This extension mirrors the queue to a crash-safe database and pushes the unfinished jobs back in on the next start, in their original order and priority. Jobs you deleted stay gone and finished jobs are not re-run. It has no dependencies beyond Python's standard library, adds no nodes or settings, and changes nothing in the UI.

## How it works

A power cut can stop the drive mid-write, so a plain JSON dump can be truncated in exactly the case it exists for. The queue goes to SQLite in WAL mode with `synchronous=FULL`, so each job is durable before it is acknowledged. API credentials are stripped before anything is written. On recovery, each job's full editor graph is also saved as a plain workflow file, and rows are deleted as jobs complete.

## Limitations

A render that was halfway through is restarted from the start, not resumed; resuming would mean saving sampler state on every step. Jobs that use API nodes need re-authenticating after a recovery, because their credentials are never written to disk. It recovers from a power cut but does not prevent one.
