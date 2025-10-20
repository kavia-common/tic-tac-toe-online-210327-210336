import type { NextConfig } from "next";

/**
 * Next.js configuration
 * Ensures the app runs on default port 3000 and is compatible with the preview system.
 * Export config is disabled to allow runtime interactivity (client components, toasts, etc.).
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep default server port 3000 for preview system compatibility.
  // Note: Port is driven by process env when deployed; default Next dev/start uses 3000.
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
