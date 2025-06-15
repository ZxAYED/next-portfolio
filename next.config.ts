import type { NextConfig } from "next";

const nextConfig: NextConfig = {
     experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',

            },
        ],
    },
};

export default nextConfig;
