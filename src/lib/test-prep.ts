export type PrepApp = {
  index: string;
  exam: string;
  /** Short qualifier under the exam name, e.g. "Academic" */
  variant?: string;
  description: string;
  modules: string[];
  url?: string;
  status: "live" | "in-development";
  accent: string;
};

export const PREP_APPS: PrepApp[] = [
  {
    index: "01",
    exam: "IELTS",
    variant: "Academic",
    description:
      "Full computer-delivered mock tests mirroring the real IELTS Academic interface — timed Reading, Listening, and Writing modules with band-score estimation and section-wise review after every attempt.",
    modules: ["Reading", "Listening", "Writing", "Speaking"],
    url: "https://kanan-ielts-academic.vercel.app",
    status: "live",
    accent: "#7d1f2e",
  },
  {
    index: "02",
    exam: "IELTS",
    variant: "General Training",
    description:
      "The same exam engine, retargeted at General Training — letter-writing tasks, everyday-context reading passages, and band descriptors tuned to the GT marking rubric.",
    modules: ["Reading", "Listening", "Writing", "Speaking"],
    url: "https://kanan-ielts-general.vercel.app",
    status: "live",
    accent: "#a07c3f",
  },
  {
    index: "03",
    exam: "GRE",
    description:
      "Section-adaptive practice built around the shorter GRE format — Verbal Reasoning and Quantitative Reasoning sets, Analytical Writing prompts, and a 130–170 scaled-score estimate per section.",
    modules: ["Verbal", "Quant", "Analytical Writing"],
    url: "https://kanan-gre.vercel.app",
    status: "live",
    accent: "#66744f",
  },
  {
    index: "04",
    exam: "SAT",
    description:
      "Digital-SAT-style adaptive modules in progress — Reading & Writing and Math stages with the two-module adaptive flow, on the same shared exam engine powering the rest of the suite.",
    modules: ["Reading & Writing", "Math"],
    status: "in-development",
    accent: "#c2a878",
  },
];
