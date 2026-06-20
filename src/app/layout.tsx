import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import Cursor from "@/components/cursor";
import Nav from "@/components/nav";
import CommandPalette from "@/components/command-palette";
import Preloader from "@/components/preloader";
import JellyHover from "@/components/jelly-hover";

const display = Instrument_Serif({
  variable: "--font-display-loaded",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishi Shah — Software Engineer",
  description:
    "Full-stack engineer building cinematic, data-grounded products — including a test-prep suite for IELTS, GRE, and SAT. Next.js, TypeScript, ML. Based in Gujarat, India.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${geist.variable} ${geistMono.variable}`}
      style={{
        // wire the Tailwind theme tokens to the loaded Google fonts
        ["--font-display" as string]: `var(--font-display-loaded), "EB Garamond", ui-serif, Georgia, serif`,
        ["--font-sans" as string]: `var(--font-geist), system-ui, sans-serif`,
        ["--font-mono" as string]: `var(--font-geist-mono), ui-monospace, monospace`,
      }}
    >
      <body className="custom-cursor-on">
        <Preloader />
        <Cursor />
        <JellyHover />
        <CommandPalette />
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
