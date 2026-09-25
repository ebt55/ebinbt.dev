export const site = {
  name: "Ebin Babu Thomas",
  shortName: "Ebin",
  title: "Independent researcher in AI control and evaluation",
  /** The hero eyebrow, above the name. */
  eyebrow: "Independent researcher · AI control and evaluation",
  headline: "I build the gates, then measure what they stop.",
  intro:
    "I spent three and a half years as an AI engineer, shipping LLM, RAG and agent backends for startup clients. Now I'm trying to be useful to AI safety: building safeguards and evaluations, measuring what they actually stop when an agent misbehaves, and publishing every result — the failures included — with the runs they came from.",
  description:
    "Ebin Babu Thomas, independent researcher in AI control and evaluation. Findings on what safeguards and evaluations catch when an agent misbehaves, each with its repository and its preregistration.",
  /** The single finding the OG card and the LinkedIn banner lead with. */
  ogFinding:
    "Impossible tasks in the batch raised cheating on the solvable ones from 0% to 30%. 8,959 runs, six model families.",
  url: "https://ebinbt.dev",
  email: "ebinbabuthomas@gmail.com",
  location: "Kerala, India",
  timezone: "IST (UTC+5:30)",
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
        "cheating on the untouched solvable tasks for one model once the batch held impossible ones; 8,959 runs, six model families",
      href: "/work/kobayashi-maru/",
    },
    {
      value: "0 / 12",
      label: "side effects from two covert actions under one full safeguard chain",
      href: "/work/incidentgate/",
    },
    {
      value: "5 of 20",
      label:
        "first-sweep tasks where a content-free completion already scores at or above the task's own majority baseline; 58 of 237 declared tasks reachable",
      href: "/work/eval-floor/",
    },
    {
      value: "18 of 55",
      label:
        "strict decisions naming the right principal behind a poisoned corpus, out of 47 candidates",
      href: "/work/whose-voice/",
    },
    {
      value: "0 / 13",
      label: "audit attempts that ever asked the database question the plant needed",
      href: "/work/diffing-agent-bench/",
    },
  ],
  principles: [
    {
      title: "Claims cite a run",
      body: "Every number I publish points at a committed artifact and the command that produced it, or it does not go up.",
    },
    {
      title: "Failures get published",
      body: "The preregistered test that failed sits in the repository under its own heading, next to the one that worked.",
    },
    {
      title: "Humans keep the decision",
      body: "A model can propose and a monitor can flag, but nothing mutates without a single-use token a person minted.",
    },
  ],
  availability:
    "I take on contract work in evaluation engineering, agent reliability and LLM backends — remote from Kerala, India (IST), overlapping US mornings and EU afternoons. For the right team, that can become a full-time role or a research fellowship.",
  analyticsToken: process.env.PUBLIC_CF_ANALYTICS_TOKEN ?? null,
} as const;

export type Site = typeof site;
