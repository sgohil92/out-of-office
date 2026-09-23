import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos are resized before they're added (see content/README.md), and
    // serving them as-is keeps every one behind the passphrase gate.
    unoptimized: true,
  },
};

export default nextConfig;
