import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // loader: "custom",
    // loaderFile: "./src/lib/utils/cloudinary-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dlcqjthel/image/upload/**",
      },
    ],
    // domains: ["i.imgur.com"],
  },
};

export default nextConfig;
