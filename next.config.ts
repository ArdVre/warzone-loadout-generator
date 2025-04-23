import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.codmunity.gg',
      },
      {
        protocol: 'https',
        hostname: 'img.wzstats.gg',
      },
    ]
  }
};

export default nextConfig;
