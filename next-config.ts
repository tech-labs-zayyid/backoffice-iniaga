// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  optimizeFonts: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Mengabaikan semua error TypeScript saat build
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["res.cloudinary.com"], // Pastikan domain ini ada
    remotePatterns: [
      {
        protocol: "https", // Gunakan "https", bukan "http"
        hostname: "res.cloudinary.com",
        pathname: "/dxjazxzn4/image/upload/**", // Pastikan path ini benar
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
