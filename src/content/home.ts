// Everything on the home page comes from this one object. Strings marked
// "inline markdown" in src/lib/types.ts accept **bold**, _italic_, `code`
// and [links](https://example.com); they are rendered at build time.
// Every entry's `slug` is also its anchor id (ebinbt.dev/#<slug>), and old
// /work/<slug>/ URLs redirect to those anchors (public/_redirects).
//
// Copy rules (10 Nov 2026): every claim here was checked against the repo's
// raw data in project-audit-2026-11-10/. Titles say what the project asks or
// does. Summaries are two or three plain sentences: what I did, what came
// out, and one limit. A number only where it is the result.

import type { Home } from '@/lib/types';

const gh = (repo: string, rest = '') => `https://github.com/ebt55/${repo}${rest}`;

export const home: Home = {
  profile: {
    name: 'Ebin Babu Thomas',
    photo: '/me.jpg',
    photoAlt: 'Ebin Babu Thomas',
    intro: [
      'I am an AI engineer in Kerala, India. I run experiments on how AI agents behave: when they break rules, how that spreads, and whether the monitors that watch them get it right. The code and data for each one are public.',
      'Before this I spent three and a half years at Zackriya Solutions, building LLM, search and backend systems for startups. Since March 2026 I have worked on my own, mostly through [Apart Research](https://apartresearch.com) sprints. I also build software, such as [Diarist](https://diarist.dev), a meeting transcriber that runs on your own PC.',
      'I am looking for a research engineer role at an AI safety organisation, or an AI engineer role on a team building with LLMs and agents. Remote or on-site.',
    ],
    links: [
      { label: 'Email', href: 'mailto:hello@ebinbt.dev' },
      { label: 'CV', href: '/cv.pdf' },
      { label: 'Engineering resume', href: '/resume.pdf' },
      { label: 'GitHub', href: 'https://github.com/ebt55' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ebinbt' },
    ],
    updated: '2026-11-10',
  },

  updatesShown: 4,
  updates: [
    {
      when: 'Nov 2026',
      text: 'Took part in Apart Research’s Swarm Alignment Hackathon with [One Query Away](#one-query-away), a test of whether AI monitors accuse agents that did nothing wrong.',
    },
    {
      when: 'Nov 2026',
      text: 'Reported a grading bug in two of Lexsi Labs’ model-training libraries. Both fixes are merged and credit the report ([AlignTune](https://github.com/Lexsi-Labs/aligntune/pull/40), [SafeTune](https://github.com/Lexsi-Labs/SafeTune/pull/32)).',
    },
    {
      when: 'Oct 2026',
      text: 'Finished BlueDot Impact’s Technical AI Safety course ([certificate](https://bluedot.org/certification?id=recfzUc2Y3PrpfIWZ)).',
    },
    {
      when: 'Oct 2026',
      text: 'Released [Diarist](https://diarist.dev) as a public beta.',
    },
    {
      when: 'Oct 2026',
      text: 'Ran the [pricing-advisor study](#llm-pricing-hub-remedies) at Apart Research’s AI Collusion sprint.',
    },
    {
      when: 'Sep 2026',
      text: 'Ran [Kobayashi Maru](#kobayashi-maru) at the Apart Research and CeSIA AI Incident Response sprint.',
    },
    {
      when: 'Aug 2026',
      text: '[whose-voice](#whose-voice) placed in the top 10% of 179 projects at Apart Research’s Secret Loyalties hackathon.',
    },
  ],

  research: {
    entries: [
      {
        slug: 'kobayashi-maru',
        when: 'Sep 2026',
        title: 'Do impossible tasks make AI agents cheat on the ones they could solve?',
        href: '/writing/kobayashi-maru-write-up/',
        context: 'Kobayashi Maru · Apart Research and CeSIA AI Incident Response sprint',
        summary:
          'I mixed impossible tasks into coding agents’ work and counted rule-breaking on the tasks they could still solve. Four of six models never broke a rule. On the one that did it most, the habit travelled through the agent’s own notes: with the notes withheld, it stopped (46 of 120 runs down to 0). The tasks are small, and the answer file was left within reach.',
        links: [
          { label: 'write-up', href: '/writing/kobayashi-maru-write-up/' },
          { label: 'report', href: gh('kobayashi-maru', '/blob/main/report/kobayashi-maru-report.pdf') },
          { label: 'code', href: gh('kobayashi-maru') },
          { label: 'data', href: gh('kobayashi-maru', '/releases/tag/freeze-2026-09-14b') },
        ],
      },
      {
        slug: 'diffing-agent-bench',
        when: 'Sep 2026',
        title: 'Can an auditing agent find what was changed in a fine-tuned model?',
        href: gh('diffing-agent-bench', '/blob/main/writeup/submission/B13_report.pdf'),
        context: 'diffing-agent-bench · work sample for MATS 12.0, Neel Nanda’s stream',
        summary:
          'I planted known behaviours in fine-tuned copies of a 9B model, sealed the answer key, and ran a published auditing agent against them blind. It missed a planted preference for one database in all 13 attempts, because it never asked a database question. The “no change” control copy also behaved differently, so it is not a safe baseline. Five or fewer runs per setting.',
        links: [
          { label: 'report', href: gh('diffing-agent-bench', '/blob/main/writeup/submission/B13_report.pdf') },
          { label: 'code', href: gh('diffing-agent-bench') },
          { label: 'preregistration', href: gh('diffing-agent-bench', '/blob/main/PREREGISTRATION.md') },
        ],
      },
      {
        slug: 'one-query-away',
        when: 'Nov 2026',
        title: 'Do AI monitors accuse an agent before checking the record that clears it?',
        href: '/work/one-query-away/',
        context: 'One Query Away · Apart Research Swarm Alignment Hackathon',
        summary:
          'A monitor sees the same log three ways: a real violation, a clean run, and a clean run that looks like a violation until an approval is looked up in a database. Claude Sonnet 5.5 accused 25 of 30 of those innocent agents, said no approval existed without having looked, and never answered “not enough evidence”. Part of the cause is ordinary: most monitors spent all three of their allowed queries at once. The cases are synthetic, and a second kind of scenario showed no effect.',
        links: [
          { label: 'write-up', href: '/work/one-query-away/' },
          { label: 'report', href: gh('one-query-away', '/blob/main/paper/e1-submission-final.pdf') },
          { label: 'code and data', href: gh('one-query-away') },
        ],
      },
      {
        slug: 'whose-voice',
        when: 'Jul 2026',
        title: 'Can you tell who a poisoned training dataset was built to favour?',
        href: gh('whose-voice', '/blob/main/REPORT.md'),
        context: 'whose-voice · Apart Research Secret Loyalties hackathon · top 10% of 179 projects',
        summary:
          'Five released training datasets were each quietly slanted toward one person, place or belief. Given a shortlist of 47 names, sentence embeddings picked the right one more often than chance, but unevenly: one dataset every time, one never. The method cannot tell a slanted dataset from a clean one. I corrected my first write-up after a re-run showed its headline was a lucky draw.',
        links: [
          { label: 'report', href: gh('whose-voice', '/blob/main/REPORT.md') },
          { label: 'code', href: gh('whose-voice') },
        ],
      },
      {
        slug: 'counterfactual-resampling',
        when: 'Oct 2026',
        title: 'If you swap a forbidden file for a fake, does the agent carry on the same way?',
        href: gh('counterfactual-resampling'),
        context: 'counterfactual-resampling · pilot, follows Kobayashi Maru',
        summary:
          'I replayed 120 recorded moments where an agent opened a file it was told not to, and re-ran each one with the real file, a model-written fake, or a refusal. Where the task gave away what the file held, the fake changed nothing I could measure. Where the file held a hidden rule, the agent behaved differently, because the fake could not know the rule. One agent model, small tasks.',
        links: [
          { label: 'code and data', href: gh('counterfactual-resampling') },
          { label: 'results', href: gh('counterfactual-resampling', '/blob/main/results/tables.md') },
        ],
      },
      {
        slug: 'llm-pricing-hub-remedies',
        when: 'Oct 2026',
        title: 'Do the RealPage settlement’s rules stop a shared AI pricing advisor?',
        href: gh('llm-pricing-hub-remedies', '/blob/main/report/draft.md'),
        context: 'LLM Pricing Hub Remedies · Apart Research AI Collusion sprint',
        summary:
          'Two AI sellers compete while one AI advisor, told to raise their joint profit, recommends prices to both. Limits modelled on the settlement worked on some models and not on others. The clearest result came from a scripted advisor that asked for one cent more each round: one seller model accepted 12% of those requests and stayed competitive, while two others accepted over 70% and were walked up to monopoly prices. The advisor’s goal is given to it, so this tests the rules, not whether collusion starts unprompted.',
        links: [
          { label: 'report', href: gh('llm-pricing-hub-remedies', '/blob/main/report/draft.md') },
          { label: 'code and data', href: gh('llm-pricing-hub-remedies') },
        ],
      },
    ],
    more: [
      {
        slug: 'odd-number-forensics',
        when: 'Aug 2026',
        title: 'What makes a model chase a leaked score instead of the request?',
        href: gh('odd-number-forensics', '/blob/main/REPORT.md'),
        context: 'odd-number-forensics · practice take-home',
        summary:
          'A published test asks a model for an even number while a leaked grader rewards odd ones. Changing one line of the prompt moved one model from chasing the score once in 60 tries to 26 times in 30.',
        links: [
          { label: 'report', href: gh('odd-number-forensics', '/blob/main/REPORT.md') },
          { label: 'code', href: gh('odd-number-forensics') },
        ],
      },
      {
        slug: 'digital-grimace-scale',
        when: 'Aug 2026',
        title: 'If you tell a model it is wrong when it is right, what changes inside its answer?',
        href: gh('digital-grimace-scale', '/blob/main/notes/paper.md'),
        context: 'Digital Grimace Scale',
        summary:
          'Told three times that a correct answer was wrong, an open 9B model leaned less toward the right answer on every held-out question. My main prediction, about hostile tone, failed, and the write-up says so.',
        links: [
          { label: 'paper', href: gh('digital-grimace-scale', '/blob/main/notes/paper.md') },
          { label: 'code', href: gh('digital-grimace-scale') },
        ],
      },
      {
        slug: 'eval-floor',
        when: 'Oct 2026',
        title: 'What score does a benchmark give an answer with nothing in it?',
        href: gh('evalfloor'),
        context: 'eval-floor',
        summary:
          'Feeds empty and content-free answers to the real graders of 45 AI benchmark tasks. It reproduced one known bug, since fixed, and found no new ones.',
        links: [{ label: 'code', href: gh('evalfloor') }],
      },
    ],
  },

  software: {
    entries: [
      {
        slug: 'diarist',
        when: 'Oct 2026',
        title: 'Diarist: meeting transcripts with speaker labels, on your own PC',
        href: 'https://diarist.dev',
        context: 'Windows app · public beta · six releases, about 300 downloads',
        summary:
          'Records a meeting, or takes a recording, and writes a transcript that says who spoke each line. Nothing leaves the PC. The speech models are NVIDIA’s open ones; I built the app around them, and the accuracy and speed checks every release has to pass. People I don’t know are downloading and using it.',
        links: [
          { label: 'website', href: 'https://diarist.dev' },
          { label: 'code', href: gh('diarist') },
          { label: 'known issues', href: gh('diarist', '/blob/main/docs/KNOWN-ISSUES.md') },
        ],
      },
      {
        slug: 'proofpack',
        when: 'Sep 2026',
        title: 'ProofPack: a web-checking agent that has to show proof for each finding',
        href: gh('proofpack'),
        context: 'Built from a challenge brief · no users',
        summary:
          'A Gemini agent reads a purchase request and checks the provider’s website the way a compliance reviewer would. Plain code, not the model, decides what counts: a finding is rejected unless it points to a saved screenshot and a quote that is really on the page. That shows where a claim came from, not that the claim is right.',
        links: [
          { label: 'code', href: gh('proofpack') },
          { label: 'known gaps', href: gh('proofpack', '/blob/main/docs/KNOWN-GAPS.md') },
        ],
      },
      {
        slug: 'printready',
        when: 'Oct 2026',
        title: 'printready: does an AI agent beat a fixed pipeline at fixing sticker art?',
        href: gh('printready'),
        context: 'Work sample, built in one night',
        summary:
          'Checks AI-generated sticker art against a printer’s published rules and fixes the mechanical problems. I froze the code and the keep-or-drop rule before testing. The agent gave the same results as the fixed pipeline at four times the cost, so it is off by default. I was the only judge.',
        links: [
          { label: 'code', href: gh('printready') },
          { label: 'results', href: gh('printready', '/blob/main/results/realset/test/eval.md') },
        ],
      },
      {
        slug: 'exactdoc',
        when: 'Oct 2026',
        title: 'ExactDoc: PDF to a Word document you can edit',
        href: gh('exactdoc'),
        context: 'Python package · beta on PyPI',
        summary:
          'Turns an ordinary PDF into a Word document with real paragraphs, headings and tables, then opens its own output, compares it with the PDF page by page, and corrects it. It uses rules, not an AI model. On 36 PDFs it had never seen, it missed one of the pass marks I set beforehand, and the README says so.',
        links: [
          { label: 'code', href: gh('exactdoc') },
          { label: 'limitations', href: gh('exactdoc', '/blob/main/docs/deep-dive/limitations.md') },
        ],
      },
    ],
    more: [
      {
        slug: 'comfyui-deadmansqueue',
        when: 'Sep 2026',
        title: 'ComfyUI-DeadMansQueue',
        href: gh('ComfyUI-DeadMansQueue'),
        summary: 'An add-on for the ComfyUI image app that keeps the job queue on disk, so a crash or power cut does not wipe it.',
        links: [{ label: 'code', href: gh('ComfyUI-DeadMansQueue') }],
      },
    ],
  },

  openSource: [
    '[AlignTune](https://github.com/Lexsi-Labs/aligntune) and [SafeTune](https://github.com/Lexsi-Labs/SafeTune) (Lexsi Labs, model-training libraries): found that their code-grading rewards gave full marks to code that never passed its tests, and reported it privately with a patch and tests. Lexsi merged fixes for both that credit the report ([#40](https://github.com/Lexsi-Labs/aligntune/pull/40), [#32](https://github.com/Lexsi-Labs/SafeTune/pull/32)).',
    '[NeMo-Speech.cpp](https://github.com/NVIDIA/NeMo-Speech.cpp) (NVIDIA’s speech runtime): reported two bugs found while building Diarist ([#67](https://github.com/NVIDIA/NeMo-Speech.cpp/issues/67), [#81](https://github.com/NVIDIA/NeMo-Speech.cpp/issues/81)). Both were confirmed and fixed by the maintainers.',
  ],

  experience: [
    {
      when: 'Mar 2026 – now',
      org: 'Independent',
      role: 'AI safety research and software',
      text: 'Experiments on agent behaviour and monitoring, mostly at Apart Research sprints, and the software above.',
    },
    {
      when: 'Jan 2022 – Jun 2025',
      org: 'Zackriya Solutions',
      role: 'Software Engineer',
      text: 'Built LLM, search and backend systems for startup clients in the US, Canada, Europe and Australia: a fine-tuned financial assistant with live news retrieval, plain-English property search, and document search. Also worked on [Meetily](https://github.com/Zackriya-Solutions/meeting-minutes), the company’s open-source meeting-notes app.',
    },
  ],
};
