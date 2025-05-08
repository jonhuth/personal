/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Static export for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },
  // This ensures assets are loaded correctly from the root path on GitHub Pages
  basePath: "",
  // Add CNAME file to the output
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
