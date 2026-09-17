export const site = {
  name: "Ebin Babu Thomas",
  shortName: "Ebin",
  title: "Independent researcher — AI control and evaluation",
  /** The hero eyebrow, mono, above the name. */
  eyebrow: "Independent researcher · AI control and evaluation · Kerala, India",
  /** The research statement. One paragraph, 60 words, serif, first thing read. */
  intro:
    "I measure what safeguards and evaluations actually catch when an agent misbehaves. A monitor and a human approved every step of a split attack (IncidentGate). Agents cheat on solvable tasks when the batch is impossible (Kobayashi Maru). Scorers may award content-free answers (eval-floor, in progress). Every number regenerates from a public repository, and the preregistration is committed before the run.",
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
  // Kept for the record. Neither is rendered: the home page carries no booking
  // link and no availability pitch.
  bookingUrl: "https://cal.com/ebinbt" as string | null,
  // Set to null if the source repo is kept private — the footer link then disappears.
  repoUrl: "https://github.com/ebt55/ebinbt.dev" as string | null,
  resumePath: "/resume.pdf",
  /** The "Method" section: how the numbers on this site are made. */
  principles: [
    {
      title: "Preregistered.",
      body: "The hypothesis, the rules and the thresholds are committed before the first run, and the commit hash is stamped into every result file.",
    },
    {
      title: "Regenerated, not typed.",
      body: "Every number on this site points at a public repository and the command that produced it.",
    },
    {
      title: "Failures kept.",
      body: "The test that failed sits under its own heading beside the one that passed.",
    },
  ],
  /** One sentence for the About section. */
  wants:
    "I want evaluation-engineering or agent-reliability work at a safety organisation, or a place on a research programme, remote or in India.",
  analyticsToken: import.meta.env.PUBLIC_CF_ANALYTICS_TOKEN ?? null,
} as const;
