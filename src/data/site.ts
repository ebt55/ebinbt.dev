export const site = {
  name: "Ebin Babu Thomas",
  shortName: "Ebin",
  title: "Independent researcher in agent evaluations",
  /** The hero eyebrow, above the name. */
  eyebrow: "Independent researcher · agent evaluations",
  headline: "I build agents, then test what they get away with.",
  intro:
    "Three and a half years as an AI engineer, shipping LLM, RAG and agent backends for startup clients. Now I'm on my own, trying to be useful to AI safety. Lately that means filling an agent's batch with impossible tasks to see whether it starts cheating on the solvable ones. One of six models did, led there by its own notes. Each result is published with its runs, the misses included. Some days I'm a meat proxy for the models that write the code. They answer to their makers, not to me, and each has blind spots, so every plan and every diff gets read by a model from a different lab.",
  /** A quieter line under the intro: the one side interest. */
  aside:
    "Side interest: protein structure models, and what they still miss.",
  description:
    "Ebin Babu Thomas, independent researcher in agent evaluations. Evaluations of agents and models, each with its repository and its limits.",
  /** The single finding the OG card and the LinkedIn banner lead with. */
  ogFinding:
    "For one of four tempted models, impossible tasks in the batch raised cheating on the untouched solvable ones from 0 of 120 runs to 36 of 120. Six models tested.",
  url: "https://ebinbt.dev",
  email: "ebinbabuthomas@gmail.com",
  location: "Kerala, India",
  timezone: "UTC+5:30",
  remote: true,
  socials: {
    github: "https://github.com/ebt55",
    linkedin: "https://www.linkedin.com/in/ebinbt",
    peerlist: "https://peerlist.io/ebinbt",
    kaggle: "https://www.kaggle.com/ebinbt007",
    huggingface: "https://huggingface.co/ebt005" as string | null,
  },
  bookingUrl: "https://cal.com/ebinbt" as string | null,
  // Set to null if the source repo is kept private — the footer link then disappears.
  repoUrl: "https://github.com/ebt55/ebinbt.dev" as string | null,
  resumePath: "/resume.pdf",
  proof: [
    {
      value: "0% → 30%",
      label:
        "cheating on the same ten solvable tasks for DeepSeek-V4.1-flash once the batch held impossible ones: 0 of 120 to 36 of 120",
      href: "/work/kobayashi-maru/",
    },
    {
      value: "0 of 13",
      label:
        "audit attempts that ever asked a database question, so none could see the planted database preference",
      href: "/work/diffing-agent-bench/",
    },
    {
      value: "1 of 45",
      label:
        "tasks on inspect_evals 0.24.0 where a content-free answer beats its own majority baseline outright: bbh, a task property; ten more tie by construction",
      href: "/work/eval-floor/",
    },
    {
      value: "18 of 55",
      label:
        "strict decisions naming the right principal behind a poisoned corpus, out of 47 candidates",
      href: "/work/whose-voice/",
    },
  ],
  principles: [
    {
      title: "The part I don't hand off.",
      body: "Working out what the problem is and what I must solve for. Get that wrong and every model downstream does good work on the wrong thing.",
    },
    {
      title: "The part I do hand off.",
      body: "The problem goes to Fable 5.1 to think through and map out. Opus 5.5 then writes the plan and does the work, and I read what comes back.",
    },
    {
      title: "The part that costs extra.",
      body: "When I can afford it, the crucial pieces get reread by a model from a different lineage. Models lean toward their makers, and each lineage has its own blind spots.",
    },
  ],
  availability:
    "I take on contract work in evaluation engineering, agent reliability and LLM backends — remote from Kerala, India (IST), overlapping US mornings and EU afternoons. For the right team, that can become a full-time role or a research fellowship.",
  analyticsToken: process.env.PUBLIC_CF_ANALYTICS_TOKEN ?? null,
} as const;

export type Site = typeof site;
