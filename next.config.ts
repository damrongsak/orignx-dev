import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Code to allows images including svg images from any site
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**/*.svg",
      },
    ],
  },
};

export default nextConfig;
