---
title: "ComfyUI-DeadMansQueue"
tagline: "An add-on for the ComfyUI image app that saves your waiting jobs to disk, so a crash or power cut doesn't wipe the queue"
lane: "oss"
kind: "tool"
status: "shipped"
period: "Sep 2026"
date: "2026-09"
venue: null
order: 15
featured: true
finding: "The add-on brings the queue back after ComfyUI is killed. In one test with 40 jobs queued, the 39 unfinished jobs returned in their original order, and no login tokens were written to disk."
headline:
  value: "39"
  label: "unfinished jobs back in the queue, in order, after I killed ComfyUI with 40 jobs waiting"
metrics:
  - value: "0"
    label: "login tokens found in the saved queue when I scanned its files byte by byte"
limitation: "One test, on one ComfyUI version, on Windows. The test killed the program and did not cut the power, and a half-finished image starts again from the beginning."
stack:
  - "Python (no extra dependencies)"
  - "SQLite (WAL)"
  - "ComfyUI custom node"
links:
  repo: "https://github.com/ebt55/ComfyUI-DeadMansQueue"
  writeup: null
  demo: null
  model: null
  other: []
honestStatus: "Public on GitHub since September 2026. Tested with ComfyUI 0.27.0 on the Windows portable build, next to 17 other add-on packs."
summary: "A small ComfyUI add-on that keeps the job queue on disk and puts unfinished jobs back on the next start. In one test where I killed ComfyUI with 40 jobs queued, the 39 unfinished jobs came back in order."
---

## Why I did this

ComfyUI is an app for running image-generation models on your own computer. It keeps its queue of waiting jobs only in memory. If the power goes, every waiting job goes with it, and you set each one up again by hand.

## What I built

A small add-on that copies the queue to a database file on disk and puts unfinished jobs back when ComfyUI starts again. Jobs keep their original order and priority. Jobs you deleted stay deleted, and finished jobs don't run twice.

A plain save file can be left half-written if the power cuts out mid-save. So the add-on uses SQLite with its safest write setting, and a job is on disk a moment after you click Run. It needs nothing beyond Python's standard library, adds no buttons or settings, and strips login tokens before saving anything. Coding agents wrote the code under my direction.

## What I found

In my test, it did its job. I queued 40 jobs through ComfyUI's own queue endpoint, killed the program without letting it clean up, and restarted it. The 39 unfinished jobs came back in their original order. A byte-by-byte scan found no login tokens in the database or its log file. The database emptied itself once the jobs finished.

## What it can't tell you

This was one test on one ComfyUI version (0.27.0), on the Windows portable build. The test killed the program. It did not cut the power, so the power-cut case rests on SQLite's own write guarantee. A job that was halfway through starts again from the beginning. Jobs that use ComfyUI's online API nodes need you to log in again, because tokens are never saved. It recovers from a power cut. It does not prevent one.
