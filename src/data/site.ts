export const site = {
  name: "Ebin Babu Thomas",
  shortName: "Ebin",
  title: "Independent researcher in AI control and evaluation",
  /** The hero eyebrow, above the name. */
  eyebrow: "Independent researcher · AI control and evaluation",
  headline: "I build agents, then test what they get away with.",
  intro:
    "Three and a half years as an AI engineer, shipping LLM, RAG and agent backends for startup clients. Now I'm on my own, trying to be useful to AI safety. What does a benchmark's scorer give an answer with nothing in it? Can you tell, from a poisoned training set alone, whom it is secretly loyal to? Each result is published with its runs, the misses included. Some days I'm a meat proxy for the models that write the code. I pick the question, check the answer and sign it.",
  /** A quieter line under the intro: the one side interest. */
  aside:
    "Side interest, kept small: protein structure models, and the biology they can't reach yet.",
  description:
    "Ebin Babu Thomas, independent researcher in AI control and evaluation. Findings on what safeguards and evaluations catch when an agent misbehaves, each with its repository and its preregistration.",
  /** The single finding the OG card and the LinkedIn banner lead with. */
  ogFinding:
    "For one of four tempted models, impossible tasks in the batch raised cheating on the untouched solvable ones from 0% to 30%. 8,959 runs, six model families.",
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
      value: "1 of 20",
      label:
        "swept tasks where a content-free answer beats its own majority baseline outright; four more tie by construction",
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
      title: "Claims cite a run",
      body: "Every number I publish points at a committed artifact and the command that produced it, or it does not go up.",
    },
    {
      title: "Failures get published",
      body: "The preregistered test that failed sits in the repository under its own heading, next to the one that worked.",
    },
    {
      title: "Humans keep the decision",
      body: "A model can propose and a monitor can flag, but nothing mutates without a single-use approval token. In my evaluations so far the approver has been a scripted stand-in, and the repos say so.",
    },
  ],
  availability:
    "I take on contract work in evaluation engineering, agent reliability and LLM backends — remote from Kerala, India (IST), overlapping US mornings and EU afternoons. For the right team, that can become a full-time role or a research fellowship.",
  analyticsToken: process.env.PUBLIC_CF_ANALYTICS_TOKEN ?? null,
} as const;

export type Site = typeof site;
