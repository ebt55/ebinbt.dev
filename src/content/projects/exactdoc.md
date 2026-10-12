---
title: "ExactDoc"
tagline: "PDF to editable DOCX, measured page by page in Word, LibreOffice and Google Docs"
lane: "oss"
kind: "tool"
status: "shipped"
period: "Aug to Oct 2026"
date: "2026-08"
venue: null
order: 8
featured: true
headline:
  value: "32 of 32"
  label: "sealed PDFs it had never seen that converted without a crash and opened cleanly in Word; the same test failed its own bar for short documents"
metrics:
  - value: "12 of 16"
    label: "short unseen documents with at least 90% of their words on the right page; the bar set in advance was 80%, so this failed"
  - value: "13 of 16"
    label: "short unseen documents that kept their exact page count"
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
honestStatus: "Beta 0.3.0b1 on PyPI since 11 October 2026, published but not announced. Renumbered from 1.0.1 because a 1.x number promises a stable converter. 0.3.0b2 is the fix release for résumés and long Word reports."
summary: "An Apache-2.0 PDF-to-DOCX converter that writes real paragraphs, tables and columns, measured page by page in Word, LibreOffice and Google Docs, and tested before release on PDFs it had never seen."
---

## What it is

ExactDoc infers the semantic structure — margins, paragraphs, headings, lists, tables, multi-column sections, headers and footers, hyperlinks — and writes real flowing Word constructs, laid out so each page matches the PDF.

Each DOCX is opened in Word, LibreOffice and Google Docs and compared with the original page by page: the page count, and the share of words that land on the page they came from. It runs entirely on your machine, with no telemetry and no account.

## What I measured

Before the 0.3.0b1 release, 32 public PDFs never used in development were sealed and converted once on the release candidate. No crashes, and Word opened all 32. Of 16 short documents of the kinds the tool promises, 13 kept their exact page count and 12 had at least 90% of their words on the right page, below the 80% bar set in advance, so the release is published but not announced. Of 7 long promised documents, 4 came within 2% or one page of the source page count. The verdicts were the same in LibreOffice and Word. Every quality claim in the repository is a committed evidence file recording the numbers, the environment fingerprint and the commit that produced them.

## Limitations

Documents written as flowing text in Word, Google Docs, LibreOffice or LaTeX are the promised class. Designed layouts are not yet: multi-column booklets grow (a 31-page IRS publication came back as 45 pages in LibreOffice), designed reports keep their text but not their layout, and a web page printed from a browser gained a page. A federal-style résumé came back as 6 pages for 3. Interactive forms and image-only scans are rejected with typed exit codes rather than silently mangled.
