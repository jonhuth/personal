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
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
          >
            <FaDownload size={16} />
            <span>Download</span>
          </a>
        </div>
      </div>
    </div>
  );
}
