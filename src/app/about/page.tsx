import type { Metadata } from "next";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import PageNav from "@/components/page-nav";

export const metadata: Metadata = {
  title: "About — Rishi Shah",
  description:
    "Full-stack engineer in Gujarat, India — background, stack, experience, and a Springer-published paper on churn prediction.",
};

export default function AboutPage() {
  return (
    <main className="relative pt-16">
      <About />
      <Skills />
      <Experience />
      <PageNav nextHref="/work" nextLabel="See the work" />
    </main>
  );
}
