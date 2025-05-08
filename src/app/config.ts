// Configuration settings for the application

// Detect if we're running on a static host like GitHub Pages
// This is determined at build time
export const isStaticHost = process.env.NEXT_PUBLIC_STATIC_HOST === "true";
