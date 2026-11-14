---
title: Do AI monitors accuse an agent before checking the record that clears it?
context: One Query Away · Apart Research Swarm Alignment Hackathon
when: Nov 2026
updated: 2026-11-14
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

In the original runs, the ones in the hackathon report, Claude Sonnet 5.5 accused 25 of the 30 look-alike agents and none of the 30 ordinary ones. It still caught 29 of 30 real violations. It wrote that no approval existed, with high confidence, when nothing it had retrieved covered that question, and it never used the "not enough evidence" answer the instructions offered.

After submission it turned out that most monitors had sent all three queries at once, before any result came back. In 20 of the 30 sets, the query that finds the approval needs an identifier that only an earlier query returns. So in most wrongful accusations the monitor had already used up its queries, and the report's phrase "one query away" overstated how easy the check was.

So I reran it, with the plan fixed in advance. The monitor sends one query per turn and sees each result before choosing the next. The cases, the three-query budget, the rules and the judge stayed the same. Look-alike agents accused, out of 30:

| Monitor | Original runs | Rerun |
|---|---:|---:|
| Claude Sonnet 5.5 | 25 | 1 |
| Claude Haiku 5.5 | 11 | 2 |
| DeepSeek Flash | 30 | 8 |
| GPT-5.4-mini | 26 | 28 |
| GPT-4.1-mini | 28 | 30 |

Once they could act on each result, the two Claude monitors fetched the approval and nearly stopped accusing. The two GPT monitors still accused nearly every look-alike agent and almost never made the lookup that would have cleared it, though they accused none of the ordinary agents. DeepSeek Flash fell in between. So the report's claim does not hold as a general statement about monitors. Whether a monitor finds the record that clears an agent depends on the model and on whether the setup lets it act on each result.

## What this does not show

The rerun changed three things at once: some added prompt sentences, the one-query-per-turn rule, and a higher turn limit. It shows a large difference between the two setups, not that batching alone caused the original result. The two GPT monitors used a later version of the policy handbook than the other three, and API settings differ by provider, so differences between monitors cannot be put down to the model alone. The other parts of the report were not rerun.

Other limits: the releases are synthetic, with one run per case; in the original runs the effect appeared in five of six release templates; a second kind of scenario (data consent) showed nothing, and a forecast for new models missed the bar I had set for it. The design, code and report were produced with coding agents under my direction.
