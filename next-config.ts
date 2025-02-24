// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
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
