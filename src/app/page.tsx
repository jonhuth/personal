"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaEnvelope,
  FaFileAlt,
  FaGithub,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaTwitter,
} from "react-icons/fa";
import ResumeModal from "./components/ResumeModal";
import ProjectCard from "./components/ProjectCard";
import projects from "./data/projects";

export default function Home() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [previewsLoaded, setPreviewsLoaded] = useState<Record<string, boolean>>(
    {}
  );

  // Handler for when a project image loads
  const handleImageLoad = (url: string) => {
    setPreviewsLoaded((prev) => ({ ...prev, [url]: true }));
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Fixed on desktop, stacked on mobile */}
        <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-[400px] bg-white p-8 flex flex-col items-center lg:items-start">
          <div className="mb-6 rounded-full overflow-hidden h-40 w-40 shadow-md border border-gray-100">
            <Image
              src="/images/avatar.jpg"
              alt="Jonathan Huth"
              width={160}
              height={160}
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Jonathan Huth
          </h1>

          <div className="flex items-center text-gray-600 mb-4">
            <FaMapMarkerAlt className="mr-2" />
            <span>San Francisco, CA</span>
          </div>

          <p className="text-gray-600 mb-8 text-center lg:text-left">
            Software Engineer building useful tools for people
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-5 text-gray-700 mb-8">
            <Link
              href="mailto:jhuth@berkeley.edu"
              className="flex items-center gap-2 py-2 hover:text-blue-600 transition-colors"
            >
              <FaEnvelope size={20} />
              <span>Email</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/jonathan-huth/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 hover:text-blue-600 transition-colors"
            >
              <FaLinkedinIn size={20} />
              <span>LinkedIn</span>
            </Link>
            <Link
              href="https://github.com/jonhuth"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 hover:text-blue-600 transition-colors"
            >
              <FaGithub size={20} />
              <span>GitHub</span>
            </Link>
            <Link
              href="https://x.com/papaetnies"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 hover:text-blue-600 transition-colors"
            >
              <FaTwitter size={20} />
              <span>Twitter</span>
            </Link>
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="flex items-center gap-2 py-2 hover:text-blue-600 transition-colors"
            >
              <FaFileAlt size={20} />
              <span>Resume</span>
            </button>
          </div>

          {/* Visible only on mobile */}
          <div className="block lg:hidden w-full border-t border-gray-100 my-4"></div>
        </aside>

        {/* Resume Modal */}
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
          resumePath="/jonathan_huth_resume.pdf"
        />

        {/* Projects Section - Scrollable on desktop */}
        <section className="w-full py-8 lg:py-16 px-4 bg-white">
          <div className="max-w-none mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                  onImageLoad={handleImageLoad}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
