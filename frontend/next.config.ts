import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@reown/appkit",
    "@reown/appkit-controllers",
    "@reown/appkit-utils",
    "thread-stream",
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /[\\/]test[\\/]/,
      use: "ignore-loader",
    });
    return config;
  },
  turbopack: {},
};

export default nextConfig;
