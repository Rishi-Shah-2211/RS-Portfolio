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
  /** Case-study narrative — rendered on /work/[slug]. */
  problem: string;
  approach: string;
  outcome: string;
  /** Extra screenshots for the case-study gallery. */
  gallery?: string[];
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
    accent: "#6e2746",
    highlights: [
      "500-company synthetic benchmarking cohort",
      "Strict numerical / linguistic boundary — every figure reproducible",
      "Single-pass investor-memo PDF generation",
    ],
    problem:
      "Early-stage founders benchmark themselves on anecdotes — a number from a podcast, a friend's round. There is no cheap way to see where you actually sit against a comparable cohort, and general-purpose AI tools will happily invent the figures instead of computing them.",
    approach:
      "The maths and the prose are built as two strictly separate layers. Percentiles and growth rates are computed deterministically in TypeScript against a 500-company synthetic cohort; the LLM only ever receives those already-computed figures and is scoped to narrative wording. Auth, a normalised Drizzle schema, and PDF export complete a single-pass investor memo.",
    outcome:
      "Every figure in a generated memo is reproducible from the underlying data — the model shapes the story but cannot invent a number. A founder gets a percentile read and an export-ready memo in one pass.",
    gallery: ["/screens/vantage-2.jpg", "/screens/vantage-3.jpg"],
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
    accent: "#ad8754",
    highlights: [
      "Linear regression beat both ensemble baselines — reported transparently",
      "Python → ONNX → browser inference, no API hop",
      "Four interactive 3D r3f visualizations of decision boundaries",
    ],
    problem:
      "Model-comparison demos usually hide the model behind an API, so the visitor is trusting a black box and paying a network round-trip for every prediction — and the tidy narrative rarely survives contact with the actual numbers.",
    approach:
      "Three models were trained in Python on a 500-row SaaS dataset, exported through skl2onnx to ONNX, and run client-side in the browser. Decision boundaries are made legible through four interactive react-three-fiber scenes rather than static charts.",
    outcome:
      "Predictions run with zero backend in the request path. The honest result — linear regression outperforming both ensemble baselines on this dataset — is reported rather than buried under a more impressive-sounding model.",
    gallery: ["/screens/bellwether-2.jpg", "/screens/bellwether-3.jpg"],
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
    accent: "#6d6675",
    highlights: [
      "Quarterly trade-offs surfaced side-by-side via scenario simulator",
      "LLM copilot grounded in per-user live state",
      "End-to-end auth: jose JWT + bcrypt + normalized Prisma 7 schema",
    ],
    problem:
      "Roadmap tools tend to either score features or track capacity, rarely both. The result is that quarterly trade-offs get argued from memory in a meeting instead of read off the plan.",
    approach:
      "A weighted-scoring engine feeds dependency-aware capacity packing, with a scenario simulator that places two quarters side by side. The LLM copilot answers natural-language questions against the authenticated user's live roadmap rows rather than a stale export.",
    outcome:
      "Trade-offs become visible before the commitment is made, and the copilot's answers move as the data moves. Auth is handled end-to-end with jose JWTs, bcrypt, and a normalised Prisma 7 schema.",
    gallery: ["/screens/planmate-2.jpg", "/screens/planmate-3.jpg"],
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
    accent: "#d8bccb",
    highlights: [
      "Multi-tenant — context scoped to each operator",
      "Turborepo + pnpm monorepo with shared TS / ESLint",
      "Live inventory simulation alongside copilot queries",
    ],
    problem:
      "Supply-chain copilots answer in generalities because they never see the operator's own data. Wiring that data in is easy to do badly — in a multi-tenant system, a sloppy fix leaks one operator's rows into another's answers.",
    approach:
      "Tenant-scoped context is pulled from PostgreSQL at query time, so each operator's questions resolve against only their own rows — the boundary sits in the data layer, not in the prompt. Inventory simulation runs beside the copilot in one dashboard, built in a Turborepo + pnpm monorepo with shared TypeScript and ESLint config.",
    outcome:
      "Responses reflect operator-specific state instead of generic advice, and the tenancy boundary is enforced where the data is fetched rather than trusted to instructions.",
    gallery: ["/screens/optivise-2.jpg"],
  },
  {
    index: "05",
    name: "Kusum Farm",
    tagline: "A family farm's heritage, told online.",
    description:
      "A storytelling website for a multi-generation farm in Gujarat — produce catalogue, brand story, and visual identity built around photography sourced directly from the farm. Mobile-first, with a hand-tuned typographic rhythm.",
    // the apex domain's TLS handshake is broken (ERR_SSL_UNRECOGNIZED_NAME_ALERT);
    // www resolves and serves correctly, so link visitors there
    url: "https://www.kusum-farm.com",
    year: "2026",
    role: "Design · Development",
    stack: [
      "Next.js 15", "TypeScript", "Tailwind v4", "Framer Motion",
      "Vercel", "Custom domain",
    ],
    accent: "#6d6675",
    highlights: [
      "Photography-led design, all imagery shot at the farm",
      "Custom .com domain, fully owned by the client",
      "Mobile-first, share-friendly product detail pages",
    ],
    problem:
      "A multi-generation farm had a real story and real produce, but no presence online — buyers found them by word of mouth or not at all, and there was nowhere to point someone who asked what the farm actually grows.",
    approach:
      "The design was built around photography shot at the farm itself rather than stock imagery. Brand story, produce catalogue, and typographic rhythm were hand-tuned mobile-first, then shipped on a custom .com the family owns outright.",
    outcome:
      "The farm's heritage and catalogue now live at an address the client controls, with product pages built to be shared directly with a buyer.",
    gallery: [
      "/screens/kusum-farm-2.jpg",
      "/screens/kusum-farm-3.jpg",
      "/screens/kusum-farm-4.jpg",
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
    accent: "#ad8754",
    highlights: [
      "Categorised browse across nine collections",
      "Photo pipeline cleaned and colour-graded for a showroom feel",
      "Mobile-first product pages tuned for sharing on WhatsApp",
    ],
    problem:
      "A family showroom carrying nine distinct collections had nowhere to send customers between visits, and quick phone photos did not do the pieces justice.",
    approach:
      "A categorised catalogue spans bridal couture, daily wear, designer collections, gents' lines, watches, and mangalsutras. The photo pipeline was cleaned and colour-graded so the pieces read the way they do under showroom light.",
    outcome:
      "Customers can browse the collections before walking in, and product pages are tuned for sharing over WhatsApp — the channel the showroom actually sells through.",
    gallery: [
      "/screens/gurukrupa-jewellers-2.jpg",
      "/screens/gurukrupa-jewellers-3.jpg",
      "/screens/gurukrupa-jewellers-4.jpg",
    ],
  },
  {
    index: "07",
    name: "Bizmate",
    tagline: "Daily business, organised — across web, mobile, and desktop.",
    description:
      "A cross-platform operations app for small businesses. Sales, IN / OUT / BAKI cash flow, clients with credit tracking, daily / monthly / yearly analytics, and a Day-close audit trail — all from a single Next.js codebase wrapped for Android, iOS, Windows, and macOS via Capacitor and Electron. Database-enforced role-based access (Postgres RLS), realtime cross-device sync, and English + Gujarati support out of the box.",
    url: "https://bizmate-temp.vercel.app",
    year: "2026",
    role: "Solo · End-to-end",
    stack: [
      "Next.js 16", "React 19", "TypeScript", "Supabase", "Postgres RLS",
      "Capacitor", "Electron", "Tailwind v4", "Zustand",
    ],
    accent: "#8a6f86",
    highlights: [
      "Five platforms from one codebase — web + Android + iOS + Windows + macOS",
      "Database-enforced role-based access (Postgres Row-Level Security)",
      "Realtime cross-device sync + English / Gujarati UI",
    ],
    problem:
      "Small businesses track sales, credit, and daily cash in notebooks and WhatsApp threads. Most software built for them assumes one device, one language, and an accountant on hand.",
    approach:
      "One Next.js codebase is wrapped for Android, iOS, Windows, and macOS through Capacitor and Electron. Roles are enforced in the database with Postgres Row-Level Security rather than in the UI, with realtime sync across devices and English/Gujarati throughout.",
    outcome:
      "Five platforms ship from a single codebase, access rules hold even if a client is tampered with, and a Day-close audit trail keeps the day's books defensible.",
    gallery: ["/screens/bizmate-2.jpg"],
  },
];
