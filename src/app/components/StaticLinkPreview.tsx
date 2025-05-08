"use client";

import Image from "next/image";

interface StaticLinkPreviewProps {
  url: string;
  className?: string;
  title?: string;
  description?: string;
  onLoad?: () => void;
}

export default function StaticLinkPreview({
  url,
  className = "",
  title,
  description,
  onLoad,
}: StaticLinkPreviewProps) {
  // Extract domain for image lookup
  const domain = new URL(url).hostname.replace("www.", "");
  const displayTitle = title || domain;

  return (
    <div
      className={`block border border-gray-200 rounded-lg overflow-hidden ${className}`}
    >
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={`/images/previews/${domain}.jpg`}
          alt={`Preview of ${displayTitle}`}
          fill
          className="object-cover"
          onLoad={() => onLoad && onLoad()}
          onError={(e) => {
            // Hide the image if it fails to load
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {displayTitle}
        </h3>
        {description && (
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  );
}
