import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "cdn.sanity.io" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
  turbopack: {},
};

export default nextConfig;
