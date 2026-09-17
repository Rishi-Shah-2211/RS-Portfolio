"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, SplitWords } from "@/components/reveal";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const tagY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full pb-28 pt-28 md:pb-40 md:pt-32"
    >
      <div className="paper-grain absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-10">
        {/* photo */}
        <div className="md:col-span-5 md:col-start-1">
          <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-cream-dim shadow-[0_34px_90px_-36px_rgba(110,39,70,0.2)]">
            {/* no parallax overscale here — it was clipping the top of his
                hair. A square frame anchored to the top keeps the head whole
                and takes the crop off the bottom instead. */}
            <div className="absolute inset-0">
              <Image
                src="/rishi.jpg"
                alt="Rishi Shah"
                fill
                priority
                quality={92}
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover object-top"
              />
            </div>
            {/* whisper of plum in the shadows — light enough to stay a grade,
                not a filter, so skin tones keep their colour */}
            <div className="absolute inset-0 bg-gradient-to-t from-terracotta/18 via-transparent to-peach/10 mix-blend-soft-light" />
            <div className="absolute inset-0 ring-1 ring-inset ring-ink/10" />

            {/* corner caption */}
            <motion.div
              style={{ y: tagY }}
              className="absolute bottom-4 left-4 rounded-full border border-ink/10 bg-cream-dim/75 px-3 py-1.5 backdrop-blur-md"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink">
                Canada · 2026
              </span>
            </motion.div>
          </div>

          <Reveal delay={0.2} className="mt-6 flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
              B.Tech CSE (IoT) · GCET
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-terracotta">
              ◉ Available
            </span>
          </Reveal>
        </div>

        {/* copy */}
        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-ink/40" />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
                01 — About
              </span>
            </div>
          </Reveal>

          <h2 className="mt-8 font-display text-[clamp(2.25rem,5.5vw,4.75rem)] font-light leading-[0.98] tracking-[-0.035em] text-ink">
            <SplitWords text="Engineer," />{" "}
            <span className="italic text-terracotta">
              <SplitWords text="builder," delay={0.1} />
            </span>{" "}
            <SplitWords text="storyteller." delay={0.2} />
          </h2>

          <Reveal delay={0.3}>
            <div className="mt-10 space-y-6 text-base leading-[1.7] text-ink-soft md:text-[17px]">
              <p>
                I&rsquo;m drawn to products that earn their polish — where the
                animation, the typography, and the math all carry weight. My
                work spans full-stack TypeScript, applied ML, and the messy
                middle where LLMs meet real data.
              </p>
              <p>
                Recently I&rsquo;ve shipped a founder-analytics platform
                benchmarking SaaS startups, an in-browser ML inference suite
                running scikit-learn via ONNX, and a multi-tenant
                supply-chain copilot grounded in live Postgres state.
              </p>
              <p>
                I co-authored a paper on voting-classifier churn prediction
                published with Springer (ICAIS 2025), and I think the best
                engineering decisions are the ones you can defend on a whiteboard
                <em> and</em> in a design review.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <dl className="mt-12 grid grid-cols-3 gap-8 border-t border-ink/10 pt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                    {s.label}
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-light text-ink md:text-4xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { label: "Live projects", value: "04" },
  { label: "Internships", value: "02" },
  { label: "Publication", value: "Springer" },
];
