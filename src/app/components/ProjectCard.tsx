import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onImageLoad?: (url: string) => void;
}

export default function ProjectCard({
  project,
  index,
  onImageLoad,
}: ProjectCardProps) {
  const { title, description, link, github } = project;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Generate the image URL only once
  const imageUrl = link ? `/images/previews/${new URL(link).hostname}.jpg` : "";

  const handleImageLoad = () => {
    if (link && !imageLoaded) {
      setImageLoaded(true);
      onImageLoad && onImageLoad(link);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setLoadError(true);
    // Hide the image if it fails to load
    (e.target as HTMLImageElement).style.display = "none";
  };

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (link) {
      return (
        <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md md:hover:shadow-md transition-all duration-300 relative h-full flex flex-col cursor-pointer">
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
            aria-label={`Visit ${title} website`}
          >
            <span className="sr-only">Visit site</span>
          </Link>
          {children}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 h-full flex flex-col">
        {children}
      </div>
    );
  };

  return (
    <CardWrapper>
      <div className="relative h-48 w-full bg-gray-100 md:group-hover:brightness-95 transition-all duration-300">
        {link && index === 0 && !loadError ? (
          // First project with screenshot
          <>
            <div
              className={`absolute inset-0 flex items-center justify-center z-10 ${
                imageLoaded ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
            <Image
              src={imageUrl}
              alt={`Preview of ${title}`}
              fill
              className={`object-cover ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{ objectFit: "cover", objectPosition: "top center" }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </>
        ) : (
          // Default placeholder for other projects
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-lg font-medium">{title}</span>
          </div>
        )}

        {link && (
          <div className="absolute top-2 right-2 bg-white/90 text-blue-600 rounded-full p-1.5 hidden md:group-hover:block transition-opacity z-20">
            <FaExternalLinkAlt size={14} />
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 md:group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {description}
        </p>

        <div className="flex gap-3 mt-auto">
          {github && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium flex items-center relative z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={16} className="mr-2" />
              Code
            </Link>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}
