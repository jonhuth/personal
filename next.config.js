/** @type {import('next').NextConfig} */
const nextConfig = {
  // Not using static export for Vercel
  images: {
    domains: ["menumixer.io"], // Add domains for remote images
  },
  env: {
    NEXT_PUBLIC_STATIC_HOST: "false", // Disable static host mode
  },
};

module.exports = nextConfig;
