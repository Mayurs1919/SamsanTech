import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/engineering-offerings",
        destination: "/services",
      },
      {
        source: "/products-and-accelerators",
        destination: "/solutions",
      },
      {
        source: "/engineering-offerings/:path*",
        destination: "/services/:path*",
      },
      {
        source: "/products-and-accelerators/:path*",
        destination: "/solutions/:path*",
      }
    ];
  }
};

export default nextConfig;
