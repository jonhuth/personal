"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LinkPreviewProps {
  url: string;
  className?: string;
}

interface PreviewData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
  type?: string;
}

export default function LinkPreview({ url, className = "" }: LinkPreviewProps) {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract domain for fallback image lookup
  const domain = new URL(url).hostname.replace("www.", "");

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/link-preview?url=${encodeURIComponent(url)}`
        );
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setPreviewData(data);
      } catch (err) {
        console.error("Error fetching preview:", err);
        setError(err instanceof Error ? err.message : "Failed to load preview");
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, [url]);

  return (
    <div
      className={`block border border-gray-200 rounded-lg overflow-hidden ${className}`}
    >
      <div className="relative h-48 w-full bg-gray-100">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {previewData?.image ? (
              <Image
                src={previewData.image}
                alt={previewData.title || `Preview of ${domain}`}
                fill
                className="object-cover"
                onError={(e) => {
                  // Fall back to local image if available
                  (
                    e.target as HTMLImageElement
                  ).src = `/images/previews/${domain}.jpg`;
                  // Add another error handler for the fallback
                  (e.target as HTMLImageElement).onerror = () => {
                    (e.target as HTMLImageElement).style.display = "none";
                  };
                }}
              />
            ) : (
              // Try local image as fallback
              <Image
                src={`/images/previews/${domain}.jpg`}
                alt={`Preview of ${domain}`}
                fill
                className="object-cover"
                onError={(e) => {
                  // Hide the image if it fails to load
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
          </>
        )}
      </div>
      {!loading && previewData && (
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {previewData.title || new URL(url).hostname}
          </h3>
          {previewData.description && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {previewData.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
