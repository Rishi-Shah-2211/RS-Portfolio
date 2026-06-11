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
      <About />
      <Skills />
      <Projects />
      <VelocityMarquee
        items={["IELTS Academic", "IELTS General", "GRE", "SAT", "One engine"]}
      />
      <TestPrep />
      <Experience />
      <Contact />
    </main>
  );
}
