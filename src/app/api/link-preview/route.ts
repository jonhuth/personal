import { NextResponse } from "next/server";

interface SocialMetadata {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
  type?: string;
}

async function extractSocialMetadata(url: string): Promise<SocialMetadata> {
  const metadata: SocialMetadata = {};

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }

    const html = await response.text();

    // Extract Open Graph meta tags
    const ogRegex =
      /<meta\s+property=["']og:([^"']+)["']\s+content=["']([^"']+)["']/gi;
    let match;
    while ((match = ogRegex.exec(html)) !== null) {
      const property = match[1];
      const content = match[2];
      if (property && content) {
        metadata[property as keyof SocialMetadata] = content;
      }
    }

    // Extract Twitter Card meta tags as fallback
    const twitterRegex =
      /<meta\s+name=["']twitter:([^"']+)["']\s+content=["']([^"']+)["']/gi;
    while ((match = twitterRegex.exec(html)) !== null) {
      const name = match[1];
      const content = match[2];
      if (name && content) {
        const key = name as keyof SocialMetadata;
        // Only use Twitter Card data if we don't have OG data
        if (!metadata[key]) {
          metadata[key] = content;
        }
      }
    }

    // Fallback to regular meta description
    if (!metadata.description) {
      const descRegex =
        /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i;
      const descMatch = html.match(descRegex);
      if (descMatch && descMatch[1]) {
        metadata.description = descMatch[1];
      }
    }

    // Fallback to title tag
    if (!metadata.title) {
      const titleRegex = /<title[^>]*>([^<]+)<\/title>/i;
      const titleMatch = html.match(titleRegex);
      if (titleMatch && titleMatch[1]) {
        metadata.title = titleMatch[1].trim();
      }
    }

    // Convert relative image URLs to absolute
    if (metadata.image && !metadata.image.startsWith("http")) {
      try {
        metadata.image = new URL(metadata.image, url).href;
      } catch {
        // Keep the original URL if parsing fails
      }
    }

    return metadata;
  } catch (error) {
    console.error("Error extracting metadata:", error);
    return metadata;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  try {
    const metadata = await extractSocialMetadata(url);
    return NextResponse.json(metadata);
  } catch (error) {
    console.error("Failed to extract metadata:", error);
    return NextResponse.json(
      { error: "Failed to extract metadata" },
      { status: 500 }
    );
  }
}
