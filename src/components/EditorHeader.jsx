import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PRICING, fetchConfig } from "../config/pricing.js";

const ValidationSummary = ({ validation }) => {
  const { isValid, completedFieldsCount, requiredFieldsCount } = validation;
  
  if (isValid) {
    return (
      <div className="flex items-center space-x-1 text-green-500">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-xs">Complete</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1 text-amber-500">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5v3a.75.75 0 001.5 0v-3A.75.75 0 009 9z" clipRule="evenodd" />
      </svg>
      <span className="text-xs">
        {completedFieldsCount}/{requiredFieldsCount}
      </span>
    </div>
  );
};

const SaveStatusIndicator = ({ saveStatus }) => {
  if (saveStatus === 'saving') {
    return (
      <div className="flex items-center space-x-1 text-yellow-500">
        <div className="w-3 h-3 border border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        <span>Saving...</span>
      </div>
    );
  }

  if (saveStatus === 'saved') {
    return (
      <div className="flex items-center space-x-1 text-green-500">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Saved</span>
      </div>
    );
  }

  if (saveStatus === 'error') {
    return (
      <div className="flex items-center space-x-1 text-red-500">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span>Save failed</span>
      </div>
    );
  }

  return null;
};

export default function EditorHeader({ 
  title, 
  saveStatus, 
  onPreview, 
  onDownloadPDF, 
  onShowPayment,
  onClearAll,
  isGeneratingPDF,
  canExport = true,
  validation = null
}) {
  const [currentPrice, setCurrentPrice] = useState(PRICING.FORMATTED_PRICE);

  // Load configuration on mount
  useEffect(() => {
    const loadConfig = async () => {
      const config = await fetchConfig();
      PRICING.update(config);
      setCurrentPrice(PRICING.FORMATTED_PRICE);
    };
    loadConfig();
  }, []);
  return (
    <header className="sticky top-0 z-20 border-b border-[#1a1f27] bg-[#0f1115]/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8 h-12 sm:h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="h-6 w-6 sm:h-7 sm:w-7 rounded-md bg-[#58e1ff] text-[#0b0f14] grid place-items-center text-[10px] sm:text-[11px] font-bold"
            title="Back to landing"
          >
            PZ
          </Link>
          <div className="text-xs sm:text-sm text-[#8b94a3]">
            <span className="hidden xs:inline">Editing: </span>
            <span className="text-white font-medium">{title || "Proposal"}</span>
          </div>
          {/* Mobile validation status - right after title */}
          <div className="sm:hidden">
            {validation && <ValidationSummary validation={validation} />}
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Desktop: Show both save and validation status */}
          <div className="hidden sm:flex items-center space-x-3 text-xs">
            <SaveStatusIndicator saveStatus={saveStatus} />
            {validation && <ValidationSummary validation={validation} />}
          </div>
          
          <button
            type="button"
            onClick={onClearAll}
            className="px-3 h-8 leading-8 text-center rounded-md border text-xs font-semibold transition-all border-[#2a2f39] hover:border-red-500 hover:text-red-400"
            title="Clear all fields"
          >
            <span className="hidden md:inline">Clear All</span>
            <span className="md:hidden">Clear</span>
          </button>
          
          <button
            type="button"
            onClick={onPreview}
            className="px-3 h-8 leading-8 text-center rounded-md border text-xs font-semibold transition-all border-[#2a2f39] hover:border-[#58e1ff] hover:text-[#58e1ff]"
          >
            Preview
          </button>
          
          <button
            type="button"
            onClick={onDownloadPDF}
            disabled={isGeneratingPDF || !canExport}
            title={!canExport && validation ? `Missing: ${validation.missingFields.join(', ')}` : ''}
            className={`px-3 h-8 leading-8 text-center rounded-md border text-xs font-semibold transition-all ${
              isGeneratingPDF 
                ? 'border-[#58e1ff] text-[#58e1ff] cursor-not-allowed opacity-75'
                : !canExport
                ? 'border-[#2a2f39] text-[#6b7280] cursor-not-allowed opacity-50'
                : 'border-[#2a2f39] hover:border-[#58e1ff] hover:text-[#58e1ff]'
            }`}
          >
            {isGeneratingPDF ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 border border-[#58e1ff] border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden md:inline">Generating...</span>
                <span className="md:hidden">PDF...</span>
              </div>
            ) : (
              <>
                <span className="hidden md:inline">Download </span>PDF
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onShowPayment}
            disabled={isGeneratingPDF || !canExport}
            title={!canExport && validation ? `Missing: ${validation.missingFields.join(', ')}` : ''}
            className={`px-3 h-8 leading-8 text-center rounded-md border text-xs font-semibold transition-all ${
              isGeneratingPDF 
                ? 'bg-gray-600 text-gray-400 border-gray-600 cursor-not-allowed'
                : !canExport
                ? 'bg-gray-500 text-gray-300 border-gray-500 cursor-not-allowed opacity-50'
                : 'bg-[#58e1ff] text-[#0b0f14] border-[#58e1ff] hover:opacity-90'
            }`}
          >
            {isGeneratingPDF ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 border border-[#0b0f14] border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden md:inline">Processing...</span>
                <span className="md:hidden">PDF...</span>
              </div>
            ) : (
              <>
                <span className="hidden md:inline">Get Clean </span>PDF — {currentPrice}
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}