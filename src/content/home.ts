// PLACEHOLDER COPY — will be replaced
//
// Everything on the home page comes from this one object. Strings marked
// "inline markdown" in src/lib/types.ts accept **bold**, _italic_, `code`
// and [links](https://example.com); they are rendered at build time.
// Every entry's `slug` is also its anchor id (ebinbt.dev/#<slug>), and old
// /work/<slug>/ URLs redirect to those anchors (public/_redirects).

import type { Home } from '@/lib/types';

const gh = (repo: string, rest = '') => `https://github.com/ebt55/${repo}${rest}`;

export const home: Home = {
  profile: {
    name: 'Ebin Babu Thomas',
    photo: '/me.jpg',
    photoAlt: 'Ebin Babu Thomas',
    intro: [
      'I am an AI engineer in Kerala, India. Placeholder paragraph: I run public experiments on how AI agents behave, and build the tools that check them. Every project has its [code](https://github.com/ebt55), data and limits.',
      'Before that I spent three and a half years building LLM, search and backend systems for startups at Zackriya Solutions. Placeholder paragraph about the independent work since March 2026.',
      'Placeholder paragraph: I am looking for a research engineer or AI engineer role. The quickest way to reach me is [email](mailto:hello@ebinbt.dev).',
    ],
    links: [
      { label: 'Email', href: 'mailto:hello@ebinbt.dev' },
      { label: 'CV', href: '/cv.pdf' },
      { label: 'GitHub', href: 'https://github.com/ebt55' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ebinbt' },
    ],
    updated: '2026-11-10',
  },

  updatesShown: 4,
  updates: [
    { when: 'Nov 2026', text: 'Placeholder: submitted a funding proposal for the [pricing hub](#llm-pricing-hub-remedies) follow-up.' },
    { when: 'Oct 2026', text: 'Placeholder: ran the [LLM Pricing Hub Remedies](#llm-pricing-hub-remedies) study at the Apart AI Collusion sprint.' },
    { when: 'Oct 2026', text: 'Placeholder: released [Diarist](https://diarist.dev) in public beta.' },
    { when: 'Oct 2026', text: 'Placeholder: finished the BlueDot Technical AI Safety course.' },
    { when: 'Sep 2026', text: 'Placeholder: published the [Kobayashi Maru write-up](/writing/kobayashi-maru-write-up/).' },
    { when: 'Aug 2026', text: 'Placeholder: placed in the top 10% of 179 projects at the Apart Secret Loyalties hackathon with [whose-voice](#whose-voice).' },
  ],

  research: {
    entries: [
      {
        slug: 'kobayashi-maru',
        when: 'Sep 2026',
        title: 'Kobayashi Maru',
        href: '/writing/kobayashi-maru-write-up/',
        context: 'Apart Research · AI Incident Response sprint',
        summary:
          'I added impossible tasks to AI coding agents’ batches of work and counted cheating on the solvable ones, over 8,959 runs on six models. One model clearly started cheating, spread by its own notes.',
        links: [
          { label: 'write-up', href: '/writing/kobayashi-maru-write-up/' },
          { label: 'report', href: gh('kobayashi-maru', '/blob/main/report/kobayashi-maru-report.pdf') },
          { label: 'code', href: gh('kobayashi-maru') },
          { label: 'data', href: gh('kobayashi-maru', '/releases/tag/freeze-2026-09-14b') },
        ],
      },
      {
        slug: 'llm-pricing-hub-remedies',
        when: 'Oct 2026',
        title: 'LLM Pricing Hub Remedies',
        href: gh('llm-pricing-hub-remedies', '/blob/main/report/draft.md'),
        context: 'Apart Research · AI Collusion Research Sprint',
        summary:
          'Tests of the RealPage settlement’s rules on an AI pricing advisor shared by two competing sellers, in a simulated market with seven models. No rule worked reliably.',
        links: [
          { label: 'report', href: gh('llm-pricing-hub-remedies', '/blob/main/report/draft.md') },
          { label: 'code', href: gh('llm-pricing-hub-remedies') },
        ],
      },
      {
        slug: 'diffing-agent-bench',
        when: 'Sep 2026',
        title: 'diffing-agent-bench',
        href: gh('diffing-agent-bench', '/blob/main/writeup/submission/B13_report.pdf'),
        context: 'MATS 12.0 work sample · Neel Nanda stream',
        summary:
          'A test for AI agents that audit how two models differ, using fine-tuned copies with planted changes and a sealed answer key. The agent found the obvious change but missed the ones it never asked about.',
        links: [
          { label: 'report', href: gh('diffing-agent-bench', '/blob/main/writeup/submission/B13_report.pdf') },
          { label: 'code', href: gh('diffing-agent-bench') },
          { label: 'preregistration', href: gh('diffing-agent-bench', '/blob/main/PREREGISTRATION.md') },
        ],
      },
      {
        slug: 'whose-voice',
        when: 'Jul 2026',
        title: 'whose-voice',
        href: gh('whose-voice', '/blob/main/REPORT.md'),
        context: 'Apart Research · Secret Loyalties hackathon · top 10% of 179',
        summary:
          'Tries to name who a poisoned training dataset was rigged to favour, from a shortlist of 47. It works when the poison is thick and the dataset is large.',
        links: [
          { label: 'report', href: gh('whose-voice', '/blob/main/REPORT.md') },
          { label: 'paper', href: gh('whose-voice', '/blob/main/paper/whose-voice-submission.pdf') },
          { label: 'code', href: gh('whose-voice') },
        ],
      },
      {
        slug: 'counterfactual-resampling',
        when: 'Oct 2026',
        title: 'Counterfactual Resampling',
        href: gh('counterfactual-resampling'),
        context: 'Pilot study',
        summary:
          'Swaps a forbidden answer file for a convincing fake at the moment an AI agent first reads it, then re-runs the agent. The fake changed nothing when the task could predict the file.',
        links: [
          { label: 'code', href: gh('counterfactual-resampling') },
          { label: 'tables', href: gh('counterfactual-resampling', '/blob/main/results/tables.md') },
        ],
      },
    ],
    more: [
      {
        slug: 'odd-number-forensics',
        when: 'Aug 2026',
        title: 'odd-number-forensics',
        href: gh('odd-number-forensics', '/blob/main/REPORT.md'),
        context: 'SPAR model-forensics take-home (practice)',
        summary: 'Why models chase a leaked score when asked for an even number. One-line prompt edits swing the rate widely.',
        links: [
          { label: 'report', href: gh('odd-number-forensics', '/blob/main/REPORT.md') },
          { label: 'code', href: gh('odd-number-forensics') },
        ],
      },
      {
        slug: 'eval-floor',
        when: 'Sep 2026',
        title: 'eval-floor',
        href: gh('evalfloor'),
        summary: 'Feeds empty answers to the real graders of AI benchmarks to see whether any reward them. On 45 Inspect Evals tasks none did.',
        links: [{ label: 'code', href: gh('evalfloor') }],
      },
      {
        slug: 'incidentgate',
        when: 'Aug 2026',
        title: 'IncidentGate',
        href: gh('incidentgate', '/blob/main/docs/verification.md'),
        summary: 'A test lab for three safety checks on an incident-repair agent. A forbidden action split into three allowed steps got through.',
        links: [
          { label: 'write-up', href: gh('incidentgate', '/blob/main/docs/verification.md') },
          { label: 'code', href: gh('incidentgate') },
        ],
      },
      {
        slug: 'digital-grimace-scale',
        when: 'Aug 2026',
        title: 'Digital Grimace Scale',
        href: gh('digital-grimace-scale', '/blob/main/notes/paper.md'),
        summary: 'A two-day study of whether false feedback changes how strongly an open model prefers the right answer.',
        links: [
          { label: 'paper', href: gh('digital-grimace-scale', '/blob/main/notes/paper.md') },
          { label: 'code', href: gh('digital-grimace-scale') },
          { label: 'model', href: 'https://huggingface.co/ebt005/gemma-2-9b-it-dgs-dpo-A' },
        ],
      },
    ],
  },

  software: {
    entries: [
      {
        slug: 'diarist',
        when: 'Oct 2026',
        title: 'Diarist',
        href: 'https://diarist.dev',
        context: 'Windows app · public beta',
        summary:
          'A free meeting transcriber that labels who said each line and runs on your own graphics card, with nothing uploaded.',
        links: [
          { label: 'website', href: 'https://diarist.dev' },
          { label: 'code', href: gh('diarist') },
          { label: 'known issues', href: gh('diarist', '/blob/main/docs/KNOWN-ISSUES.md') },
        ],
      },
      {
        slug: 'exactdoc',
        when: 'Oct 2026',
        title: 'ExactDoc',
        href: gh('exactdoc'),
        context: 'Python package · beta',
        summary:
          'Turns a PDF into an editable Word document that still looks like the original, and checks the result page by page.',
        links: [
          { label: 'code', href: gh('exactdoc') },
          { label: 'limitations', href: gh('exactdoc', '/blob/main/docs/deep-dive/limitations.md') },
        ],
      },
      {
        slug: 'printready',
        when: 'Oct 2026',
        title: 'printready',
        href: gh('printready'),
        summary:
          'Checks AI-generated sticker art against a printer’s published rules, fixes what it safely can, and hands the rest to a person.',
        links: [
          { label: 'code', href: gh('printready') },
          { label: 'results', href: gh('printready', '/blob/main/results/realset/test/eval.md') },
        ],
      },
      {
        slug: 'proofpack',
        when: 'Sep 2026',
        title: 'ProofPack',
        href: gh('proofpack'),
        context: 'Built from a challenge brief · no users',
        summary:
          'An AI agent that checks Medicaid purchase requests against providers’ public websites and keeps screenshot proof for every claim.',
        links: [
          { label: 'code', href: gh('proofpack') },
          { label: 'known gaps', href: gh('proofpack', '/blob/main/docs/KNOWN-GAPS.md') },
        ],
      },
    ],
    more: [
      {
        slug: 'comfyui-deadmansqueue',
        when: 'Sep 2026',
        title: 'ComfyUI-DeadMansQueue',
        href: gh('ComfyUI-DeadMansQueue'),
        summary: 'A ComfyUI add-on that keeps the job queue on disk, so a crash or power cut does not wipe it.',
        links: [{ label: 'code', href: gh('ComfyUI-DeadMansQueue') }],
      },
    ],
  },

  openSource: [
    '[Meetily](https://github.com/Zackriya-Solutions/meetily): refactored the backend and added OpenAI provider support ([PR #75](https://github.com/Zackriya-Solutions/meetily/pull/75), merged).',
    '[bpmn-io/refactorings](https://github.com/bpmn-io/refactorings): proposed a lightweight connector-template recommender ([issue #33](https://github.com/bpmn-io/refactorings/issues/33)), with a [working fork](https://github.com/Zackriya-Solutions/refactorings).',
    'Placeholder: contributions to Lexsi Labs repositories during the Nov 2026 hackathon.',
  ],

  experience: [
    {
      when: 'Mar 2026 – now',
      org: 'Independent',
      role: 'AI engineer and researcher',
      text: 'Placeholder: experiments on how AI agents and models behave, and a few tools. Three Apart Research sprints and the BlueDot Technical AI Safety course.',
    },
    {
      when: 'Jan 2022 – Jun 2025',
      org: 'Zackriya Solutions',
      role: 'Software Engineer',
      text: 'Placeholder: built backends and LLM systems for startup clients in the US, Canada, Europe and Australia, including natural-language search and document retrieval.',
      links: [{ label: 'DocuAI demo', href: 'https://docuai.zackriya.com/dashboard' }],
    },
  ],
};
