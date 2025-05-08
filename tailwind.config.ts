import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#E6F0FD",
          400: "#4A7DFF",
          600: "#2563EB",
          800: "#1E40AF",
        },
        gray: {
          50: "#F9FAFB",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
        },
      },
    },
  },
  plugins: [],
};

export default config;
