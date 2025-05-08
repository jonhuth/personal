import { useState, useEffect } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumePath: string;
}

export default function ResumeModal({
  isOpen,
  onClose,
  resumePath,
}: ResumeModalProps) {
  const [mounted, setMounted] = useState(false);

  // Handle client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Add escape key listener
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    // Add event listener for escape key
    document.addEventListener("keydown", handleEscapeKey);

    // Clean up
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">Resume Preview</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-auto p-4">
          <iframe
            src={`${resumePath}#view=FitH`}
            className="w-full h-full min-h-[70vh]"
            title="Resume Preview"
          />
        </div>

        <div className="p-4 border-t flex justify-end">
          <a
            href={resumePath}
            download
            className="group flex items-center gap-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium"
          >
            <FaDownload
              size={16}
              className="group-hover:translate-y-0.5 transition-transform duration-200"
            />
            <span>Download Resume</span>
          </a>
        </div>
      </div>
    </div>
  );
}
