export const site = {
  name: "Ebin Babu Thomas",
  shortName: "Ebin",
  title: "AI Engineer — LLM agents, evaluation engineering & AI control",
  headline: "I build the gates, then measure what they stop.",
  intro:
    "Independent AI engineer and researcher since March 2026. I measure what safeguards and evaluations catch on agents: cheating under impossible tasks (Kobayashi Maru), a policy, monitor and human chain against a covert agent (IncidentGate), attribution of a poisoned corpus (whose-voice), content-free baselines for scorers (eval-floor, in progress). Before that, three and a half years of LLM, RAG and agent backends.",
  description:
    "Ebin Babu Thomas, AI engineer — LLM agents, evaluation engineering and AI control. Agents whose evidence cannot be fabricated, measured under process kills.",
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
      value: "0 / 12",
      label: "side effects from two covert actions under one full safeguard chain",
      href: "/work/incidentgate/",
    },
    {
      value: "$0.02–$0.19",
      label: "per review that takes a person 20–40 minutes",
      href: "/work/proofpack/",
    },
    {
      value: "65.8%",
      label: "of distress language trained away — the effect it reported stayed",
      href: "/work/digital-grimace-scale/",
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
  analyticsToken: import.meta.env.PUBLIC_CF_ANALYTICS_TOKEN ?? null,
} as const;
