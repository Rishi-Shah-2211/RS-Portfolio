import type { Metadata } from "next";
import Projects from "@/components/sections/projects";
import TestPrep from "@/components/sections/test-prep";
import VelocityMarquee from "@/components/velocity-marquee";
import PageNav from "@/components/page-nav";
import { SHOW_TEST_PREP } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Work — Rishi Shah",
  description:
    "Seven products in production — founder analytics, in-browser ML, roadmap copilots, multi-tenant supply-chain intelligence, and cross-platform tooling.",
};

export default function WorkPage() {
  return (
    <main className="relative pt-16">
      <Projects />
      {SHOW_TEST_PREP && (
        <>
          <div className="relative">
            <VelocityMarquee items={["IELTS Academic", "IELTS General", "GRE", "SAT"]} />
            <VelocityMarquee
              items={["One engine", "Four exams", "Three live", "Built for Kanan students"]}
              reverse
              accent
              baseSpeed={45}
            />
          </div>
          <TestPrep />
        </>
      )}
      <PageNav
        prevHref="/about"
        prevLabel="About"
        nextHref="/contact"
        nextLabel="Start a project"
      />
    </main>
  );
}
