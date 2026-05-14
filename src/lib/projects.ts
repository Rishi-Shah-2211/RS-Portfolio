export type Project = {
  index: string;
  name: string;
  tagline: string;
  description: string;
  /** Optional — omitted for engagements under NDA. */
  url?: string;
  year: string;
  role: string;
  stack: string[];
  accent: string;
  highlights: string[];
  /** Set to false to render a typographic gradient card instead of a screenshot. */
  hasScreenshot?: boolean;
  /** NDA / private — no public link, "under NDA" badge replaces the Visit button. */
  privateProject?: boolean;
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
  {
    index: "05",
    name: "Kusum Farm",
    tagline: "A family farm's heritage, told online.",
    description:
      "A storytelling website for a multi-generation farm in Gujarat — produce catalogue, brand story, and visual identity built around photography sourced directly from the farm. Mobile-first, with a hand-tuned typographic rhythm.",
    url: "https://kusum-farm.com",
    year: "2026",
    role: "Design · Development",
    stack: [
      "Next.js 15", "TypeScript", "Tailwind v4", "Framer Motion",
      "Vercel", "Custom domain",
    ],
    accent: "#7a9a5e",
    highlights: [
      "Photography-led design, all imagery shot at the farm",
      "Custom .com domain, fully owned by the client",
      "Mobile-first, share-friendly product detail pages",
    ],
  },
  {
    index: "06",
    name: "Gurukrupa Jewellers",
    tagline: "A showroom, captured online.",
    description:
      "An elegant catalogue site for a family-run jewellery showroom — bridal couture, daily wear, designer collections, gents' lines, watches, mangalsutras — presented with showroom-grade product photography and clean categorised browse.",
    url: "https://gurukrupa-jewellers.vercel.app",
    year: "2026",
    role: "Design · Development",
    stack: [
      "Next.js 15", "TypeScript", "Tailwind v4", "Framer Motion",
      "Vercel",
    ],
    accent: "#c2a44b",
    highlights: [
      "Categorised browse across nine collections",
      "Photo pipeline cleaned and colour-graded for a showroom feel",
      "Mobile-first product pages tuned for sharing on WhatsApp",
    ],
  },
  {
    index: "07",
    name: "Atlas",
    tagline: "A private cross-platform operations suite, built solo — under NDA.",
    description:
      "A custom business operations app for a private client. Five platforms — web, Android, iOS, Windows, and macOS — sharing a single codebase, with database-enforced role-based access, realtime cross-device sync, daily / monthly / yearly analytics, and full asset handover at delivery. Project details and client identity remain confidential.",
    year: "2026",
    role: "Solo · End-to-end",
    stack: [
      "Next.js 16", "React 19", "TypeScript", "Supabase", "Postgres RLS",
      "Capacitor", "Electron", "Tailwind v4", "Zustand",
    ],
    accent: "#e8a73c",
    highlights: [
      "Five platforms from one codebase — web + Android + iOS + Windows + macOS",
      "Database-enforced role-based access (Postgres Row-Level Security)",
      "Realtime cross-device sync, English + regional language UI",
    ],
    hasScreenshot: false,
    privateProject: true,
  },
];
