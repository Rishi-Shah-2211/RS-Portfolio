export type Project = {
  index: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  year: string;
  role: string;
  stack: string[];
  accent: string;
  highlights: string[];
};

export const PROJECTS: Project[] = [
  {
    index: "01",
    name: "Vantage",
    tagline: "Founder analytics, benchmarked against a 500-company cohort.",
    description:
      "A full-stack analytics platform that benchmarks Canadian SaaS startups via deterministic percentile and growth-rate computations, then composes investor memos with an LLM scoped strictly to narrative prose.",
    url: "https://vantage-rs.vercel.app",
    year: "2026",
    role: "Founder · Engineering",
    stack: [
      "Next.js 15", "TypeScript", "Tailwind v4", "Drizzle", "Neon Postgres",
      "Better Auth", "Groq llama-3.3-70b", "@react-pdf/renderer", "Recharts",
    ],
    accent: "#e8702c",
    highlights: [
      "500-company synthetic benchmarking cohort",
      "Strict numerical / linguistic boundary — every figure reproducible",
      "Single-pass investor-memo PDF generation",
    ],
  },
  {
    index: "02",
    name: "Bellwether",
    tagline: "ML model comparison, running entirely in the browser.",
    description:
      "Trained Linear Regression, Random Forest, and XGBoost on a 500-row SaaS dataset, then engineered a Python-to-browser pipeline via ONNX so predictions run client-side with zero backend in the request path.",
    url: "https://bellwether-rs.vercel.app",
    year: "2026",
    role: "Engineering · ML",
    stack: [
      "Python", "scikit-learn", "XGBoost", "ONNX", "skl2onnx",
      "Next.js 15", "Three.js", "react-three-fiber", "TypeScript",
    ],
    accent: "#b87545",
    highlights: [
      "Linear regression beat both ensemble baselines — reported transparently",
      "Python → ONNX → browser inference, no API hop",
      "Four interactive 3D r3f visualizations of decision boundaries",
    ],
  },
  {
    index: "03",
    name: "Planmate",
    tagline: "Roadmap planning with a copilot grounded in your live data.",
    description:
      "A weighted-scoring roadmap engine combining dependency-aware capacity packing with a scenario simulator, plus an LLM copilot that answers natural-language queries on the authenticated user's live roadmap state.",
    url: "https://planmate-rs.vercel.app",
    year: "2026",
    role: "Engineering",
    stack: [
      "Next.js 16", "TypeScript", "Prisma 7", "PostgreSQL",
      "Tailwind v4", "Framer Motion", "JWT (jose)", "bcryptjs",
    ],
    accent: "#8c9a82",
    highlights: [
      "Quarterly trade-offs surfaced side-by-side via scenario simulator",
      "LLM copilot grounded in per-user live state",
      "End-to-end auth: jose JWT + bcrypt + normalized Prisma 7 schema",
    ],
  },
  {
    index: "04",
    name: "Optivise",
    tagline: "Multi-tenant supply-chain intelligence with a grounded copilot.",
    description:
      "A live operational dashboard for inventory simulation and natural-language querying over PostgreSQL, with tenant-scoped LLM context pulled at query time so responses reflect operator-specific data, not generic suggestions.",
    url: "https://optivise-rs.vercel.app",
    year: "2026",
    role: "Engineering · Architecture",
    stack: [
      "Next.js 16", "TypeScript", "Prisma", "PostgreSQL",
      "Tailwind v4", "Radix UI", "shadcn/ui", "TanStack Query",
      "OpenAI SDK", "Turborepo", "pnpm",
    ],
    accent: "#d8c9a6",
    highlights: [
      "Multi-tenant — context scoped to each operator",
      "Turborepo + pnpm monorepo with shared TS / ESLint",
      "Live inventory simulation alongside copilot queries",
    ],
  },
];
