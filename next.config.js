/** @type {import('next').NextConfig} */
const nextConfig = {
  // Not using static export for Vercel
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "menumixer.io",
      },
      {
        protocol: "https",
        hostname: "sovereigntoolkit.netlify.app",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_STATIC_HOST: "false", // Disable static host mode
  },
};

module.exports = nextConfig;
