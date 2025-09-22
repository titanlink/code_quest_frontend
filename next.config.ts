import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**", // cualquier dominio HTTP
      },
      {
        protocol: "https",
        hostname: "**", // cualquier dominio HTTPS
      },
    ],
  },
};

export default nextConfig;
