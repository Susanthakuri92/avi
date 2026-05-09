import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    localPatterns: [
      {
        pathname: "/api/images/proxy",
        search: "**",
      },
    ],
  },
  compiler: { removeConsole: true },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;