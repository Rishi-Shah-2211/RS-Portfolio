import type { Metadata } from "next";
import Contact from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact — Rishi Shah",
  description:
    "Open to freelance, contract, and full-time work — data-grounded products, ML tooling, and cinematic frontends. Based in Petlad, Gujarat.",
};

export default function ContactPage() {
  return (
    <main className="relative pt-16">
      <Contact />
    </main>
  );
}
