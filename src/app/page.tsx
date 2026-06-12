import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import TestPrep from "@/components/sections/test-prep";
import VelocityMarquee from "@/components/velocity-marquee";
import Experience from "@/components/sections/experience";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <VelocityMarquee
        items={["Analytics", "ML in the browser", "LLM copilots", "Cross-platform", "Cinematic frontends"]}
        accent
      />
      <About />
      <Skills />
      <Projects />
      {/* crossing ribbons — opposite directions */}
      <div className="relative">
        <VelocityMarquee
          items={["IELTS Academic", "IELTS General", "GRE", "SAT"]}
        />
        <VelocityMarquee
          items={["One engine", "Four exams", "Three live", "Built for Kanan students"]}
          reverse
          accent
          baseSpeed={45}
        />
      </div>
      <TestPrep />
      <Experience />
      <Contact />
    </main>
  );
}
