"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaFileAlt, FaGithub, FaLinkedinIn } from "react-icons/fa";
import LinkPreview from "./components/LinkPreview";
import ResumeModal from "./components/ResumeModal";
import StaticLinkPreview from "./components/StaticLinkPreview";
import { isStaticHost } from "./config";
import projects, { getProjectInfoByUrl } from "./data/projects";

export default function Home() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Function to render the appropriate preview component
  const renderLinkPreview = (url: string) => {
    if (isStaticHost) {
      const projectInfo = getProjectInfoByUrl(url);
      return (
        <StaticLinkPreview
          url={url}
          title={projectInfo?.title}
          description={projectInfo?.description}
        />
      );
    } else {
      return <LinkPreview url={url} />;
    }
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
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm"
              >
                {project.link && index === 0 ? (
                  // First project (MenuMixer) with LinkPreview
                  <>
                    {renderLinkPreview(project.link)}
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {project.description}
                      </p>
                      <div className="flex gap-4">
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Visit Site
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-48 relative">
                      <div className="absolute inset-0 bg-gray-50 flex items-center justify-center text-gray-400">
                        <span className="text-lg">Project Preview</span>
                      </div>
                      {/* Uncomment when you have actual images */}
                      {/* <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill
                        className="object-cover"
                      /> */}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {project.description}
                      </p>
                      <div className="flex gap-4">
                        {project.link && (
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Visit Site
                          </Link>
                        )}
                        {project.github && (
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-800 flex items-center"
                          >
                            <FaGithub size={16} className="mr-1" />
                            <span>Code</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-gray-500 mt-auto border-t border-gray-100">
        <p>&copy; {new Date().getFullYear()} Jonathan Huth</p>
      </footer>
    </main>
  );
}
