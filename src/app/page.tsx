"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaFileAlt, FaGithub, FaLinkedinIn } from "react-icons/fa";
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
    <main className="min-h-screen flex flex-col items-center bg-white">
      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto pt-16 pb-12 px-4 flex flex-col items-center">
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
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Jonathan Huth</h1>
        <p className="text-xl text-gray-600 mb-8">Software Engineer</p>

        <div className="flex flex-wrap justify-center gap-5 text-gray-700">
          <Link
            href="mailto:jhuth@berkeley.edu"
            className="flex items-center gap-2 py-2 px-4 hover:text-blue-600 transition-colors"
          >
            <FaEnvelope size={20} />
            <span>Email</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/jonathan-huth/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 px-4 hover:text-blue-600 transition-colors"
          >
            <FaLinkedinIn size={20} />
            <span>LinkedIn</span>
          </Link>
          <Link
            href="https://github.com/jonhuth"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 px-4 hover:text-blue-600 transition-colors"
          >
            <FaGithub size={20} />
            <span>GitHub</span>
          </Link>
          <button
            onClick={() => setIsResumeModalOpen(true)}
            className="flex items-center gap-2 py-2 px-4 hover:text-blue-600 transition-colors"
          >
            <FaFileAlt size={20} />
            <span>Resume</span>
          </button>
        </div>
      </section>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        resumePath="/jonathan_huth_resume.pdf"
      />

      {/* Divider */}
      <div className="w-full max-w-4xl mx-auto border-t border-gray-100 my-4"></div>

      {/* Projects Section */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </main>
  );
}
