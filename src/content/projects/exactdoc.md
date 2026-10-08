---
title: "ExactDoc"
tagline: "PDF to editable DOCX, checked by rendering the result back and diffing word positions"
lane: "oss"
kind: "tool"
status: "shipped"
period: "Aug 2026"
date: "2026-08"
venue: null
order: 8
featured: true
headline:
  value: "16/16"
  label: "corpus documents whose rendered page count matches the source, checked by rendering the output back"
metrics:
  - value: "0.9588"
    label: "mean live-text retention across the frozen corpus"
  - value: "1.045 pt"
    label: "median vertical drift against the source page"
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
honestStatus: "Version 1.0.0 installs from source and is not on PyPI yet."
summary: "An Apache-2.0 PDF-to-DOCX converter that emits real paragraphs, tables and columns, then checks every claim by rendering the output back and diffing it."
---

## What it is

ExactDoc infers the semantic structure — margins, paragraphs, headings, lists, tables, multi-column sections, headers and footers, hyperlinks — and writes real flowing Word constructs, with a median vertical drift of about 1 pt on the frozen corpus.

Each DOCX is rendered back to PDF and its word positions diffed against the source, with LibreOffice headless doing the rendering and the diff reporting recall, drift percentiles, SSIM and ink IoU. Every quality claim in the repository is a committed JSON artifact recording the numbers, the environment fingerprint and the commit that produced them.

## What I measured

On the frozen 16-document corpus with the shipping profile: 16/16 page match, 0.9588 mean live-text retention, 1.045 pt median vertical drift. The unrefined profile matches 15/16, which is what the refinement loop is worth. Seven live Google Docs qualification passes took blocking findings from 11 to 0. Compiled-in base-14 font widths give the same text geometry on Linux and Windows, though the DOCX bytes are not identical across the two.

## Limitations

Long, dense, multi-column documents inflate their page count badly — an 80-page publication becomes 106, a 126-page one becomes 337. Interactive forms and image-only scans are rejected with typed exit codes rather than silently mangled. The page cap is 250. Those classes are documented as plainly as the ones that work.
