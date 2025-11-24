import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@reown/appkit",
    "@reown/appkit-controllers",
    "@reown/appkit-utils",
    "thread-stream",
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ignore all test files in @reown packages and thread-stream
      config.module.rules.push({
        test: /[\\/]node_modules[\\/](@reown[\\/].*?|thread-stream)[\\/]test[\\/]/,
        use: "null-loader",
      });
    }
    return config;
  },
  turbopack: {},
};

export default nextConfig;
