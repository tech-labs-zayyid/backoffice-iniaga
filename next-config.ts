// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  optimizeFonts: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    minimumCacheTTL: 15000000,
  },
  swcMinify: true, // Pastikan ini aktif untuk minify lebih cepat

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Tambahkan aturan untuk mengizinkan import ES
    config.module?.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false, // Tambahkan ini
      },
    });

    return config;
  },
};

export default nextConfig;
