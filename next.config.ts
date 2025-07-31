// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add the images configuration object here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '**', // This allows any path from the hostname
      },
    ],
  },
  /* other config options might go here */
};

export default nextConfig;