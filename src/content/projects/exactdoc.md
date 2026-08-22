---
title: "ExactDoc"
tagline: "PDF to editable DOCX, checked by rendering the result back and diffing word positions"
lane: "oss"
kind: "tool"
status: "shipped"
period: "Aug 2026"
venue: null
order: 1
featured: true
headline:
  value: "16/16"
  label: "corpus documents converted, verified by render-back diff"
metrics:
  - value: "0.9588"
    label: "mean live-text retention across the frozen corpus"
  - value: "1.045 pt"
    label: "median vertical drift against the source page"
  - value: "11 → 0"
    label: "blocking findings over seven live Google Docs passes"
  - value: "663"
    label: "tests, over a SHA-256-pinned document corpus"
stack:
  - "Python"
  - "PDFium / pypdfium2"
  - "OOXML"
  - "LibreOffice headless"
  - "PyMuPDF"
  - "pytest"
links:
  repo: "https://github.com/ebt55/exactdoc"
  writeup: "https://github.com/ebt55/exactdoc/blob/main/THEORY.md"
  demo: null
  model: null
  other:
    - label: "Measured state, defect by defect"
      url: "https://github.com/ebt55/exactdoc/blob/main/STATUS.md"
    - label: "Committed evidence artifacts"
      url: "https://github.com/ebt55/exactdoc/tree/main/docs/evidence"
honestStatus: "Version 1.0.0 installs from source and is not on PyPI yet; long, dense, multi-column documents still inflate their page count badly, and image-only scans are refused rather than guessed at."
summary: "An Apache-2.0 PDF-to-DOCX converter that emits real paragraphs, tables and columns, then checks every claim by rendering the output back and diffing it."
---

## What it is

Most PDF-to-Word converters give you one of two bad outcomes: a pile of text boxes pinned at absolute positions, which looks right and cannot be edited, or reflowed text that has lost the layout. ExactDoc infers the semantic structure — margins, paragraphs, headings, lists, tables, multi-column sections, headers and footers, hyperlinks — and writes real flowing Word constructs whose rendered geometry matches the source to within points.

The interesting part is not the converter. It is the loop that checks it: each DOCX is rendered back to PDF with LibreOffice headless, and word positions are diffed against the original for recall, drift percentiles, SSIM and ink IoU. Every quality claim in the repository is a committed JSON artifact recording the numbers, the environment fingerprint and the commit that produced them.

## What I measured

On the frozen 16-document corpus with the shipping profile: 16/16 page match, 0.9588 mean live-text retention, 1.045 pt median vertical drift. The unrefined profile matches 15/16, which is what the refinement loop is worth. Seven live Google Docs qualification passes took blocking findings from 11 to 0. The suite is 663 tests over a SHA-256-pinned corpus, and compiled-in base-14 font widths give identical geometry on Linux and Windows.

## Limitations

Long, dense, multi-column documents inflate their page count badly — an 80-page publication becomes 106, a 126-page one becomes 337. Interactive forms and image-only scans are rejected with typed exit codes rather than silently mangled. The page cap is 250. Those classes are documented as plainly as the ones that work.
