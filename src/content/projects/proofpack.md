---
title: "ProofPack"
tagline: "Can an AI agent do a compliance reviewer's website checks without making up evidence?"
lane: "control"
kind: "system"
status: "shipped"
period: "Jul to Sep 2026"
date: "2026-09"
venue: null
order: 6
featured: true
finding: "On seven made-up request forms, the agent answered the questions a website can settle and left the rest to the reviewer. Its 'Not Found' answers held up when I checked the same sites by hand. Each review cost $0.02 to $0.19 in Gemini fees."
headline:
  value: "$0.02 to $0.19"
  label: "Gemini cost per review, across seven made-up request forms"
metrics:
  - value: "7 of 18"
    label: "questions on a community-class form that a website can answer. The other 11 stay with the reviewer."
limitation: "Seven synthetic forms, with no real users or reviewers. Price lists published as PDFs are invisible to it, and some shops block automated browsers."
stack:
  - "Python"
  - "Gemini API"
  - "Playwright"
  - "FastAPI"
  - "YAML checklists"
  - "Jinja2"
  - "pytest"
links:
  repo: "https://github.com/ebt55/proofpack"
  writeup: "https://github.com/ebt55/proofpack/blob/main/docs/KNOWN-GAPS.md"
  demo: null
  model: null
  other:
    - label: "Tour of the reviewer screen"
      url: "https://github.com/ebt55/proofpack/blob/main/docs/WORKBENCH.md"
honestStatus: "Built from a challenge brief in July 2026. Nobody uses it, and I don't plan to run it as a service. The reviewer screen runs only on your own computer and has no login."
summary: "An AI agent, built from a challenge brief, that checks Medicaid purchase requests against providers' public websites and keeps screenshot proof for every claim. It was tried on seven made-up forms, and nobody uses it."
---

## Why I did this

In New York's self-directed Medicaid program, people with developmental disabilities manage their own government-funded budget. Before staff approve a purchase like a riding class, they must show it is open to the public at a published price. Today a reviewer collects date-stamped screenshots of the provider's website by hand. A challenge brief for the Build with Gemini XPRIZE in July 2026 described this job. I wanted to see whether an agent could do it without inventing evidence.

## What I built

ProofPack reads a filled-in request form, visits the provider's public website and checks only what a website can prove. For each thing it confirms, it saves a screenshot stamped with the time and web address. When the web can't prove something, it says "Not Found" or "Needs Review". The reviewer still makes the decision.

Only one step uses AI judgement. A Gemini agent browses the site and decides what it found. Plain code does the rest, including fee limits and the evidence files. The code rejects any "Found" without a real screenshot behind it, and any quote that wasn't on a page the agent visited. Coding agents wrote the code under my direction.

## What I found

On seven made-up request forms that name real providers, the agent answered the website questions and left the rest to the reviewer. I opened the same sites by hand to confirm its "Not Found" answers were true. One class page publishes no prices, and the tool said so instead of guessing one. A laptop request was priced correctly and still flagged, because computer hardware is on the program's excluded list. Each review cost $0.02 to $0.19 in Gemini fees, by the tool's own estimate.

## What it can't tell you

It is a project, not a product, and nobody uses it. It has run only on seven synthetic forms, covering six of the seven form types. Price lists published as PDFs are invisible to it, and some shops block automated browsers. The reviewer screen has no login, so it must stay on one computer. Real use would need privacy protection for participants' details first.
