import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["*.ngrok-free.app"],

  // Agregar esta línea para usar Turbopack en lugar de Webpack
  turbopack: {
    resolveAlias: {
      // Aquí van tus aliases si los necesitas
    },
  },
};

export default nextConfig;
