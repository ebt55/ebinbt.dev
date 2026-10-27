---
title: "Diarist"
tagline: "A meeting transcriber for Windows that runs entirely on your own PC and labels who said each line"
lane: "control"
kind: "system"
status: "active"
period: "Oct 2026"
date: "2026-10"
venue: null
order: 2
featured: true
finding: "Diarist turns meetings into speaker-labelled transcripts on my own PC, with nothing uploaded. On my own Zoom meetings, 0.2% to 0.3% of words went to the wrong speaker. An hour of audio takes about two minutes."
headline:
  value: "0.2% to 0.3%"
  label: "of words put under the wrong speaker, on my own Zoom meetings"
metrics:
  - value: "~30x"
    label: "faster than real time on my RTX 3080, so an hour of audio takes about two minutes"
  - value: "1 in 15 to 20"
    label: "words wrong or missing on clean meeting audio"
limitation: "Tested on one PC only, against Zoom's own speaker labels as the reference. Overlapping talk, distant microphones and more than eight speakers make it worse."
stack:
  - "NVIDIA NeMo-Speech.cpp"
  - "Nemotron speech and speaker models"
  - "Tauri 2"
  - "Svelte 5"
  - "TypeScript"
  - "SQLite (full-text search)"
  - "WASAPI audio capture"
links:
  repo: "https://github.com/ebt55/diarist"
  writeup: null
  demo: null
  model: null
  other:
    - label: "Website and download"
      url: "https://diarist.dev"
    - label: "Known issues, with numbers"
      url: "https://github.com/ebt55/diarist/blob/main/docs/KNOWN-ISSUES.md"
honestStatus: "In public beta. The first beta, 0.1.0-beta.1, came out on 15 October 2026, and the current one is 0.1.0-beta.4, from 22 October. It is free and MIT-licensed, and the installer is not code-signed yet."
summary: "A free Windows app that turns meetings and recordings into transcripts labelled by speaker, running on your own graphics card with nothing uploaded. It is in public beta and has been tested on one PC."
---

## Why I did this

Can a free app give you meeting transcripts that say who spoke each line, without the audio ever leaving your PC? NVIDIA publishes open speech and speaker models, with a runtime that runs them on an ordinary NVIDIA graphics card. That made it possible with no Python or CUDA install, and no account anywhere.

## What I built

Diarist records your microphone and your computer's sound, such as Zoom, Teams, Meet or a browser. It can also import an audio or video file. It turns either into a transcript where every line names the speaker, for up to eight speakers. Transcripts stay in a local, searchable library and export to common formats like SRT and Markdown. There is no account, no cloud and no telemetry.

Coding agents wrote the code under my direction. Work started on 15 October 2026, and the first public beta went out the same day. While testing, I reported a speaker-labelling bug in NVIDIA's runtime, which a maintainer reproduced and fixed in their main branch, though no released runtime carries it yet.

## What I found

It works end to end on my own PC. On my own Zoom meetings, 0.2% to 0.3% of words went to the wrong speaker. Mistakes cluster where one person stops and another starts. In the second after a change, 5.5% to 12.7% of words went to the wrong speaker, depending on the model. Importing a file runs about 30 times faster than real time on my RTX 3080, so an hour of audio takes about two minutes. On clean meeting audio, about one word in 15 to 20 is wrong or missing.

## What it can't tell you

Everything was tested on one PC, running Windows 11 with an RTX 3080. The accuracy reference is Zoom's own speaker labels, not a hand-checked transcript, so the numbers are provisional. People talking over each other, room microphones far from the speakers and noisy rooms all make results worse. On far-field room recordings, about one word in nine is wrong or missing. A ninth speaker gets merged into an existing label. The installer is not code-signed, so Windows warns before it runs. Linux is planned. macOS is not.
