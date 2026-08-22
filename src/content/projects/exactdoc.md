---
title: ExactDoc
tagline: 'seed: Deterministic .docx editing — change one paragraph, leave every other byte alone.'
lane: oss
kind: tool
status: active
period: Mar 2026 – present
venue: null
order: 1
featured: true
headline:
  value: 16/16
  label: 'seed: corpus documents round-tripped byte-for-byte'
metrics:
  - value: '663'
    label: 'seed: tests green in CI'
  - value: '0'
    label: 'seed: bytes changed outside the edited range'
stack:
  - Python
  - lxml
  - pytest
  - Hypothesis
  - GitHub Actions
links:
  repo: https://github.com/ebt55/exactdoc
  writeup: null
  demo: null
  model: null
  other:
    - label: 'seed: Changelog'
      url: https://github.com/ebt55/exactdoc/blob/main/CHANGELOG.md
honestStatus: 'seed: Not yet published to PyPI; the corpus is 16 documents, so unusual authoring tools are unrepresented.'
summary: 'seed: An open-source library for editing Word documents without rewriting the parts you did not touch — verified by byte-level round-trip tests.'
---

<!-- seed: body copy written by the scaffold agent; replaced from content-staging in phase 2 -->

## What it is

Most document libraries load a `.docx`, build their own model of it, and write a
new file — which means every byte you did not intend to change may still change,
and tracked changes, comments and unusual parts get quietly dropped. ExactDoc
edits the underlying XML in place: it resolves a target range, rewrites only the
runs inside it, and repacks the archive with the remaining parts untouched. This
matters when a document is a contract, a filing, or an input to an agent that will
be diffed later.

## What I measured

A 16-document corpus covering the awkward cases — tracked changes, footnotes,
embedded objects, content controls, non-Latin scripts — round-trips byte-for-byte
through a no-op edit: 16 of 16, zero bytes changed. With a real edit applied, the
only differing bytes are inside the edited range. 663 tests, including
property-based tests over generated edit sequences, run in CI on every push.

## Limitations

Sixteen documents is a small corpus, and it is biased toward files that Word
itself produced; documents from less common authoring tools are unrepresented.
The library is not yet on PyPI, so installation is from source. Formats other than
`.docx` are out of scope and will stay that way.
