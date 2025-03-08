import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Allow Cloudinary images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dwlskeflt/image/upload/**", // Ensure it matches your Cloudinary path
      },
    ],
  },
  
};

export default nextConfig;
