import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const TARGETS = [
  { slug: "vantage",    url: "https://vantage-rs.vercel.app" },
  { slug: "bellwether", url: "https://bellwether-rs.vercel.app" },
  { slug: "planmate",   url: "https://planmate-rs.vercel.app" },
  { slug: "optivise",   url: "https://optivise-rs.vercel.app" },
];

const OUT = resolve("public/screens");
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: "dark",
});

for (const t of TARGETS) {
  const page = await ctx.newPage();
  console.log(`→ ${t.slug}: ${t.url}`);
  try {
    await page.goto(t.url, { waitUntil: "networkidle", timeout: 60_000 });
    // give it more time for hero animations / fonts
    await page.waitForTimeout(3500);
    const file = `${OUT}/${t.slug}.jpg`;
    await page.screenshot({ path: file, type: "jpeg", quality: 88, fullPage: false });
    console.log(`   ✓ ${file}`);
  } catch (err) {
    console.error(`   ✗ ${t.slug}:`, err.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("done");
