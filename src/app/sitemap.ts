import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://jhuth.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Add additional routes as you create them
  ];
}
