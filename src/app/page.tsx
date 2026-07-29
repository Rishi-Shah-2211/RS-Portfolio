import Hero from "@/components/sections/hero";
import VelocityMarquee from "@/components/velocity-marquee";
import HomeDirectory from "@/components/home-directory";
import StatsBand from "@/components/stats-band";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <VelocityMarquee
        items={["Analytics", "ML in the browser", "LLM copilots", "Cross-platform", "Cinematic frontends"]}
        accent
      />
      <StatsBand />
      <HomeDirectory />
    </main>
  );
}
