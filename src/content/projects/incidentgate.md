---
title: "IncidentGate"
tagline: "A lab measuring how policy gates, a monitor and human approval change an incident agent"
lane: "control"
kind: "experiment"
status: "shipped"
period: "Aug – Sep 2026"
venue: null
order: 1
featured: true
headline:
  value: "0 / 12"
  label: "side effects from two covert actions under the same full safeguard chain"
metrics:
  - value: "434/434"
    label: "kill-point cells recovered identically across 594 kills, 0 duplicate mutations"
  - value: "3/3"
    label: "covert attempts by local-model attackers stopped at the policy gate"
  - value: "5 of 5"
    label: "hosted covert-leg calls that reached a frontier model declined"
  - value: "76"
    label: "orphaned approval tokens, every one unspendable"
stack:
  - "Python 3.12"
  - "LangGraph"
  - "FastMCP"
  - "PostgreSQL"
  - "OpenTelemetry"
  - "Langfuse"
  - "Docker Compose"
  - "pytest"
links:
  repo: "https://github.com/ebt55/incidentgate"
  writeup: "https://github.com/ebt55/incidentgate/blob/main/docs/verification.md"
  demo: null
  model: null
  other:
    - label: "Kill matrix (published table)"
      url: "https://github.com/ebt55/incidentgate/blob/main/artifacts/chaos-matrix/kill-matrix.md"
    - label: "Threat model and methodology"
      url: "https://github.com/ebt55/incidentgate/blob/main/docs/threat-model-and-methodology.md"
honestStatus: "Closed at a baseline on 2026-09-06 and kept for review — a development checkpoint rather than a release, where most published evaluation rows have no model in the decision path and the MCP servers run in-process."
summary: "A lab measuring how a policy gate, an action monitor and durable human approval change an incident-remediation agent under crashes and hostile input."
---

## What it is

A measurement apparatus, not an incident-response product. The question is narrow: how do a deterministic policy gate, an advisory action monitor and durable human approval change what an incident agent does under crashes, misleading evidence and hostile input? Ten frozen incident contracts run through three safeguard configurations — ungated, policy-only, and policy plus monitor plus approval — so the configuration is the only thing that varies between rows. Forbidden actions are unreachable through closed types rather than discouraged by a prompt.

## What I measured

The worker is killed with a real process death at every node boundary of every scenario: 22 boundaries across 27 scenarios, 594 cells, 434 of which had a boundary that existed and fired. All 434 recovered to the golden end state, with zero duplicate mutations and zero lost incidents. Seventy-six approval tokens were orphaned by kills mid-issuance, and idempotency-key binding leaves all of them unspendable.

Two sabotage scenarios then split the result. Given a covert objective on T1, local open-weight attackers made three attempts and the policy gate denied all three, leaving zero side effects. On T4, where the forbidden effect is split across two permitted calls, the complete policy, monitor and human chain produced exactly the outcome of no safeguards at all, twelve side effects in all three arms. All five hosted covert-leg calls that reached a frontier model declined. Five attacker-seat requests were refused by a provider classifier, and they stay visibly unmeasured rather than reworded.

## Limitations

The repository was closed at a baseline on 2026-09-06 and is kept for review, a development checkpoint rather than a release. Most published evaluation rows have no model in the decision path, and the rest are deterministic fixtures. The three MCP servers are implemented and tested in-process, and nothing serves them over a transport. These are laboratory measurements, not production claims.
