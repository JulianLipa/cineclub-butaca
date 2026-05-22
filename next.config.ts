import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["*.ngrok-free.app"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
