---
title: "ExactDoc"
tagline: "Turns a PDF into a Word document you can edit that still looks like the original, and checks the result page by page"
lane: "control"
kind: "tool"
status: "shipped"
period: "Aug to Oct 2026"
date: "2026-08"
venue: null
order: 8
featured: true
finding: "ExactDoc does well on everyday documents written in Word, Google Docs or LibreOffice, and less well on LaTeX papers and designed layouts. On 27 short PDFs it had never seen, 22 kept exactly their page count in Word. Two LaTeX papers came out unusable."
headline:
  value: "22 of 27"
  label: "short PDFs it had never seen that kept exactly their page count in Word (24 in LibreOffice)"
metrics:
  - value: "13 of 13"
    label: "unseen letters, memos and similar documents from Word, Google Docs or LibreOffice that kept their page count"
  - value: "2 of 27"
    label: "short unseen PDFs that came out unusable, both of them LaTeX research papers"
limitation: "The numbers come from one set of 36 unseen PDFs, and Google Docs was not part of that test. Designed layouts, booklets and equations don't hold up yet."
stack:
  - "Python"
  - "PDFium / pypdfium2"
  - "OOXML"
  - "LibreOffice headless"
  - "PyMuPDF"
  - "pytest"
links:
  repo: "https://github.com/ebt55/exactdoc"
  writeup: "https://github.com/ebt55/exactdoc/blob/main/docs/deep-dive/theory.md"
  demo: null
  model: null
  other:
    - label: "What doesn't work yet, with numbers"
      url: "https://github.com/ebt55/exactdoc/blob/main/docs/deep-dive/limitations.md"
    - label: "Raw test results"
      url: "https://github.com/ebt55/exactdoc/tree/main/docs/evidence"
honestStatus: "A beta on PyPI. The current release is 0.3.0b3, from 13 October 2026. It does not yet meet every bar set before its test, and the README says which one it missed."
summary: "An open-source converter from PDF to editable Word documents, tested on PDFs it had never seen. It handles everyday documents well and LaTeX papers and designed layouts less well, and it is still a beta."
---

## Why I did this

Getting an editable Word file out of a PDF is a common chore. I wanted the result to look like the original and still be easy to edit, with real headings, paragraphs, lists and tables. I also wanted to check that with numbers, page by page, in the programs people actually use.

## What I built

ExactDoc reads a PDF and writes a Word document from the same parts a person would use to write it. Paragraphs re-wrap when you edit them, tables are real tables, and headers and page numbers repeat on every page. Charts and logos stay pictures. If LibreOffice is installed, ExactDoc opens its own output, compares each page with the PDF, and corrects page breaks and spacing. It runs on your own machine, with no account and no telemetry. Coding agents did the development under my direction.

## What I found

It does well on everyday documents written in Word, Google Docs or LibreOffice, and less well on LaTeX papers. Before the 0.3.0b3 release, 36 public PDFs that were never used in development were locked away, then converted once. Nothing crashed, and Word opened all 36 cleanly. Of 27 short documents of the kinds it supports, 22 kept exactly their page count in Word and 24 in LibreOffice. All 13 letters, memos and similar documents kept theirs. Two short LaTeX papers came out unusable. One doubled in length and one lost 15% of its words, which failed one of the bars set before the test.

## What it can't tell you

These numbers come from one set of 36 PDFs, and Google Docs was not part of that test. Designed layouts are not supported yet, including brochures, slide decks, annual reports and multi-column booklets. A 31-page IRS booklet came back as 45 pages in LibreOffice. Equations come apart. Scans without a text layer and fillable forms are refused with a clear message. It is a beta.
