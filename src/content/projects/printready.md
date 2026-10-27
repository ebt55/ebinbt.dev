---
title: "printready"
tagline: "Checks AI-generated sticker art against a printer's published rules, fixes what it safely can, and hands the rest to a person"
lane: "control"
kind: "tool"
status: "shipped"
period: "Oct 2026"
date: "2026-10"
venue: null
order: 10
featured: true
finding: "An AI agent with the same tools did no better than a fixed sequence of checks and fixes. Both agreed with my labels on 34 of 50 images, and the agent cost about four times as much. Of 55 distinct fixed proofs, I would send 53 to a customer."
headline:
  value: "53 of 55"
  label: "fixed sticker proofs I would send to a customer, judged without knowing which mode made them"
metrics:
  - value: "34 of 50"
    label: "images where the AI agent agreed with my labels, a tie with the fixed steps"
  - value: "~4x"
    label: "the agent's cost per image compared with the fixed steps, for no better result"
limitation: "One labeller (me), 50 prompts and two xAI image models. It never touched Sticker Mule's own uploader, and nothing was printed."
stack:
  - "Python"
  - "NumPy"
  - "OpenCV"
  - "scikit-image"
  - "Pillow"
  - "xAI API (Grok)"
  - "MCP server"
  - "pytest"
links:
  repo: "https://github.com/ebt55/printready"
  writeup: null
  demo: null
  model: null
  other:
    - label: "The test rules, written before the run"
      url: "https://github.com/ebt55/printready/blob/main/PREREG.md"
    - label: "Full results tables"
      url: "https://github.com/ebt55/printready/blob/main/results/realset/test/eval.md"
honestStatus: "Finished in October 2026 at version 0.1.0, for about $6.50 in API calls. Not affiliated with Sticker Mule. The rules are paraphrased from their public FAQ pages."
summary: "A tool that checks AI-generated sticker art against a printer's public rules, fixes the mechanical problems and draws the cut line. On 50 AI images I labelled, an AI agent did no better than fixed steps, at about four times the cost."
---

## Why I did this

Sticker Mule, an online sticker printer, added AI image generation to its artwork upload in mid-2026. Its public FAQ lists the rules art must meet, such as 300 pixels per inch at the printed size. I wanted to know whether those checks could run while the customer is still on the page. I also wanted to know whether an AI agent beats a fixed sequence of steps at it.

## What I built

You give printready an image and a sticker size. It checks resolution at that size, the background, art cut off at the edge, and misspelled lettering. Then it fixes what it can without changing the art. It removes a plain background, adds the white border and draws the cut line. A guard undoes any fix that damages the art. Anything it can't fix goes to a person. A second mode lets an AI agent choose the fixes with the same tools. Coding agents wrote the code under my direction.

## What I found

The AI agent did not beat the fixed steps. I wrote the test rules down before generating any test images. Fifty prompts went to two xAI image models, making 100 images. I labelled 50 of them blind, before any tool ran. Both modes agreed with my labels on 34 of 50, the most either could score on this set. The agent cost about four times as much. Of the 55 distinct fixed proofs, I would send 53 to a customer.

Many images were full scenes with no plain background, 39 of 50 from one model. One extra prompt line, tried afterwards, cut that to 3 of 50 but left the subjects smaller.

## What it can't tell you

It says nothing about Sticker Mule's own uploader, which was never used. Nothing was printed. The labels are mine alone, and it covers two image models and 50 prompts. None of my 50 labelled images needed a person, so this test can't show whether it catches those. Two API outages hit the planned run, and those runs were redone under a rule written before the rerun.
