import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Allow Next/Image to emit 4K-class variants for high-DPI displays.
  // The hero portrait is the only image that scales this large; the rest
  // pick a smaller breakpoint automatically.
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560, 3840],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
