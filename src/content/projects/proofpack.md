---
title: "ProofPack"
tagline: "A pre-approval review agent where every “Found” has to cite a hashed, date-stamped capture"
lane: "control"
kind: "system"
status: "shipped"
period: "Jul – Aug 2026"
venue: null
order: 2
featured: true
headline:
  value: "$0.02–$0.19"
  label: "per review, against 20–40 minutes by hand"
metrics:
  - value: "45"
    label: "offline tests, no API key or browser needed"
  - value: "7"
    label: "committed sample reviews, negatives checked by hand"
  - value: "5"
    label: "pipeline stages, exactly one of them agentic"
stack:
  - "Python"
  - "Gemini API"
  - "Claude Agent SDK"
  - "Playwright"
  - "YAML checklists"
  - "Jinja2"
  - "pytest"
  - "GitHub Actions"
links:
  repo: "https://github.com/ebt55/proofpack"
  writeup: "https://github.com/ebt55/proofpack/blob/main/docs/KNOWN-GAPS.md"
  demo: null
  model: null
  other:
    - label: "Model, market sizing and pilot plan"
      url: "https://github.com/ebt55/proofpack/blob/main/docs/BUSINESS.md"
honestStatus: "Pilot-stage: the pipeline runs end to end on committed sample forms and there are no customers yet."
summary: "An evidence-gated review agent for Medicaid-audited purchase pre-approvals, where a fabricated citation is structurally impossible and a human still decides."
---

## What it is

Before a purchase from a self-directed, Medicaid-audited budget is approved at a New York disability-services nonprofit, a reviewer has to verify the provider's public website and file date-stamped evidence. ProofPack does the verification and files the evidence; the human still decides.

Five stages: a PDF form is read into schema-validated fields, routed to category checklists written in YAML a non-engineer can edit, run through deterministic fee-cap and eligibility checks, handed to a browsing agent that navigates and captures, and assembled into an HTML and JSON report with an evidence folder and a SHA-256 manifest. Exactly one stage is agentic.

## What I measured

Seven committed sample reviews across five form categories cost $0.02–$0.19 each in model spend, against the 20–40 minutes a reviewer budgets per application. Negative cases were ground-truthed by hand: where a class page genuinely publishes no price, the correct output is "Not Found", and the tool refuses to guess one.

The integrity gates live on a session object, so 45 offline tests cover every rejection path without an SDK, a browser or an API key. A "Found" cannot be recorded without a real capture in the manifest; a quote is rejected unless it appears verbatim on a page visited that session; timestamps, URLs and hashes are written only by code the model never touches. A two-way disk-to-manifest audit re-checks every committed package.

## Limitations

Unverifiable items stay marked "Internal — not answered" rather than being resolved by the model. The measured costs are the tool's own estimate from token counts at list prices. The engineering audit that lists what would have to change before anyone relies on this is committed in the repository.
