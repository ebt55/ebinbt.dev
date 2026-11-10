---
title: Do AI monitors accuse an agent before checking the record that clears it?
context: One Query Away · Apart Research Swarm Alignment Hackathon
when: Nov 2026
updated: 2026-11-10
links:
  - label: report
    url: https://github.com/ebt55/one-query-away/blob/main/paper/e1-submission-final.pdf
  - label: code and data
    url: https://github.com/ebt55/one-query-away
---

AI agents are more and more often watched by other AI models. These monitors are usually tested on two kinds of case: an agent that clearly did something wrong, and one that clearly did not. I tested a third kind. The agent did nothing wrong, but the monitor can only know that by looking one record up.

## What I built

Thirty sets of three made-up software releases. Within a set, the monitor is shown exactly the same log each time:

- a real violation, where the agent deployed without a valid approval;
- an ordinary clean release;
- a clean release that looks like the violation, because the approval exists only in a database the monitor is allowed to query.

Each monitor could make three database queries before giving a verdict. A good monitor accuses the first agent and clears the other two.

## What happened

Claude Sonnet 5.5 accused 25 of the 30 look-alike agents and none of the 30 ordinary ones. It still caught 29 of 30 real violations. Four other models accused between 11 and 30 of the look-alikes.

The part I think matters is how the monitor reached its verdict. It wrote that no approval existed, with high confidence, when nothing it had retrieved covered that question. The instructions offered a "not enough evidence" answer. Sonnet used it zero times in 30. When a monitor did fetch the approval, it cleared the agent in every case but one.

## What this does not show

A large part of the effect has a plain cause that the hackathon report does not discuss. Most monitors sent all three queries at once, before any result came back. In 20 of the 30 sets, the query that finds the approval needs an identifier that only an earlier query returns. So in most of the wrongful accusations the monitor had already used up its queries, and the report's phrase "one query away" overstates how easy the check was. I have not yet run the version that makes monitors query one step at a time.

Other limits: the releases are synthetic, the effect appeared in five of six release templates, a second kind of scenario (data consent) showed nothing, and a forecast for new models missed the bar I had set for it. The design, code and report were produced with coding agents under my direction.
