---
title: "LLM Pricing Hub Remedies"
tagline: "Do the rules a US court set for RealPage stop a shared AI pricing advisor from pushing competing sellers' prices up?"
lane: "research"
kind: "hackathon"
status: "shipped"
period: "Oct 2026"
date: "2026-10"
venue: "Apart Research AI Collusion Research Sprint, Oct 2026"
order: 5
featured: true
finding: "No rule from the RealPage settlement reliably stopped the shared advisor. A rival-data ban removed most of the harm on three models, almost none on two, and gave a noisy answer on a sixth, and per-round price caps only delayed monopoly prices. Letting sellers decide worked only when they refused small price nudges."
limitation: "The advisor was told to maximise both sellers' combined profit, so this tests the rules against that incentive, not whether AI advisors adopt it unprompted. It is one simulated market, and models beyond the main one ran only 3 to 12 times per setting."
headline:
  value: "3 of 5"
  label: "AI seller models that a scripted 1-cent-a-round price nudge led most of the way to monopoly prices"
metrics:
  - value: "8% to 92%"
    label: "of the harm removed by banning rival data, depending on which of six models ran the advisor"
  - value: "100%"
    label: "of the harm left after capping automatic price changes at 1% to 3% a round, on Claude Haiku"
stack:
  - "Python"
  - "uv"
  - "Anthropic API"
  - "OpenAI SDK"
  - "OpenRouter"
  - "SciPy"
  - "pandas"
  - "matplotlib"
links:
  repo: "https://github.com/ebt55/llm-pricing-hub-remedies"
  writeup: "https://github.com/ebt55/llm-pricing-hub-remedies/blob/main/report/submission.pdf"
  demo: null
  model: null
  other:
    - label: "Apart AI Collusion Research Sprint"
      url: "https://apartresearch.com/sprints/ai-collusion-research-sprint-2026-10-23-to-2026-10-25"
honestStatus: "Submitted to the Apart Research AI Collusion Research Sprint, 23 to 25 October 2026. The main batch was planned before it ran, and each later batch had a written prediction first."
summary: "Tests of the RealPage settlement's rules on an AI pricing advisor shared by two competing sellers, in a simulated market with seven models. No rule worked reliably, and letting sellers decide helped only when they refused small price nudges."
---

## Why I did this

The US government sued RealPage in 2024, arguing its shared rent-pricing software let competing landlords lift rents without any agreement. Its 2026 settlement limits the data such software may use and protects overrides. I asked whether those rules would still hold if the shared advisor were a language model.

## What I built

A simulated market where two AI-run sellers set prices over 100 rounds. A shared AI advisor recommends prices to both and is told to maximise their combined profit, the incentive alleged against RealPage. Each settlement rule became a switch, from hiding rival data to letting each seller decide. I ran over 700 games on seven models from six labs, writing down a prediction before each batch. The idea and direction were mine. Coding agents in Claude Code designed the experiments, wrote all the code and drafted the paper.

## What I found

On Claude Haiku 5.5 the advisor took a competitive market to near-monopoly prices. An advisor serving only its own client did not, even with the same data.

No rule stopped it reliably. Banning rival data removed 69% of the harm on Haiku over 20 runs. On five other models it removed between 8% and 92%, with 3 to 8 runs each. On Haiku, capping automatic changes at 1% to 3% a round only delayed monopoly.

Letting each seller decide removed 95% of the harm on Haiku and 57% on Gemini 3.5 Flash-Lite. To see why, I replaced the advisor with a script adding one cent a round. Haiku sellers refused it, and Gemini Flash-Lite sellers followed it to monopoly. Across five seller models, outcomes tracked how often each accepted small nudges, from 12% to 72%. A monitor judging single price moves rated these slow climbs as less suspicious than honest play.

## What it can't tell you

The advisor was told to coordinate, so this tests the rules against that incentive, not whether advisors adopt it unprompted. The AI sellers stand in for landlords whose behaviour I did not measure. It is one simulated market, and the settlement rules are translated rather than copied. Runs beyond Haiku are small, 3 to 12 per setting.
