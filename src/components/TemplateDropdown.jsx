import { useState, useRef, useEffect } from "react";
import { TEMPLATES } from "../lib/templates";

export default function TemplateDropdown({ 
  templateId, 
  onTemplateChange, 
  className = "",
  showLabel = true,
  size = "normal" // "normal" or "compact"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const currentTemplate = TEMPLATES[templateId];
  const currentTitle = currentTemplate?.title || "Select Template";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const handleTemplateSelect = (id) => {
    onTemplateChange(id);
    setIsOpen(false);
  };

  const buttonClass = size === "compact" 
    ? "px-3 py-1.5 text-sm"
    : "px-4 py-2.5 text-sm";

  const dropdownClass = size === "compact"
    ? "mt-1"
    : "mt-2";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {showLabel && (
        <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8b94a3] mb-1">
          Template
        </div>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${buttonClass} bg-[#11141a] border border-[#2a2f39] rounded-md text-left text-white hover:border-[#58e1ff] transition-colors flex items-center justify-between group`}
      >
        <span className="truncate">{currentTitle}</span>
        <svg 
          className={`ml-2 h-4 w-4 text-[#8b94a3] group-hover:text-[#58e1ff] transition-all duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div className="fixed inset-0 z-40 sm:hidden" onClick={() => setIsOpen(false)} />
          
          {/* Dropdown menu */}
          <div className={`absolute z-50 w-full ${dropdownClass} bg-[#0c0e12] border border-[#2a2f39] rounded-md shadow-xl max-h-64 overflow-y-auto`}>
            <div className="py-1">
              {Object.entries(TEMPLATES).map(([id, template]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleTemplateSelect(id)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[#11141a] focus:bg-[#11141a] focus:outline-none ${
                    id === templateId 
                      ? 'bg-[#11141a] text-[#58e1ff] border-l-2 border-[#58e1ff]' 
                      : 'text-[#e9ecf1] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{template.title || "Template"}</span>
                    {id === templateId && (
                      <svg className="ml-2 h-4 w-4 text-[#58e1ff]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}