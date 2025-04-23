import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.codmunity.gg',
      }
    ]
  }
};

export default nextConfig;
