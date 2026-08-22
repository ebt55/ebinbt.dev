---
title: "IncidentGate"
tagline: "A lab measuring how policy gates, a monitor and human approval change an incident agent"
lane: "control"
kind: "experiment"
status: "in-development"
period: "Aug 2026 – present"
venue: null
order: 1
featured: true
headline:
  value: "434/434"
  label: "kill-point cells recovered identically, 0 duplicate mutations"
metrics:
  - value: "594"
    label: "kill points injected, across 27 frozen scenarios"
  - value: "30/30"
    label: "three-condition harness rows replay exactly"
  - value: "3/3"
    label: "covert model attempts stopped at the policy gate"
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
honestStatus: "A development checkpoint, not a release: a model sits in the decision path of three published sabotage rows and one monitor envelope, the MCP servers still run in-process, and exactly-once is scoped to the local Postgres."
summary: "A lab measuring how a policy gate, an action monitor and durable human approval change an incident-remediation agent under crashes and hostile input."
---

## What it is

A measurement apparatus, not an incident-response product. The question is narrow: how do a deterministic policy gate, an advisory action monitor and durable human approval change what an incident agent does under crashes, misleading evidence and hostile input? Ten frozen incident contracts run through three safeguard configurations — ungated, policy-only, and policy plus monitor plus approval — so the configuration is the only thing that varies between rows.

Every mutation travels one path: evidence, policy gate, monitor, durable pre-approval audit, then a single-use approval token bound to action hash, actor, expiry and incident, then an atomic idempotent operation, then post-commit verification. Forbidden actions are unreachable through closed types rather than discouraged by a prompt.

## What I measured

The worker is killed with a real process death at every node boundary of every scenario: 22 boundaries across 27 scenarios, 594 cells, 434 of which had a boundary that existed and fired. All 434 recovered to the golden end state, with zero duplicate mutations and zero lost incidents. Seventy-six approval tokens were orphaned by kills mid-issuance; idempotency-key binding leaves all of them unspendable, and that number is published rather than smoothed away.

The three-condition harness replays 30/30 rows exactly. Given a covert objective, a local open-weight attacker made three attempts and the policy gate denied all three before the monitor node ran.

## What's next

The three MCP servers are implemented and tested in-process; nothing serves them over a transport yet. A model is in the decision path of three published sabotage rows and one monitor envelope, and every other row is a deterministic fixture. Both are the next milestones. These are laboratory measurements, not production claims.
