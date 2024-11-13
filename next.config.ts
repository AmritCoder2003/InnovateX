import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  experimental: {
    after: true,
  },
  
  // experimental: {
  //   ppr: "incremental",
  // },
  // devIndicators: {
  //   buildActivity: true,
  //   buildActivityPosition: "bottom-right",
  //   appIsrStatus: true,
  // },
};

export default nextConfig;
