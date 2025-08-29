import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TEMPLATES } from "../lib/templates";
import { PRICING, fetchConfig } from "../config/pricing.js";
import AutoPager from "./AutoPager.new.jsx";

export default function PreviewModal({ 
  isOpen, 
  onClose, 
  templateId, 
  data, 
  schema,
  onDownloadPDF,
  onShowPayment,
  isGeneratingPDF 
}) {
  const navigate = useNavigate();
  const [previewTemplateId, setPreviewTemplateId] = useState(templateId);
  const [currentPrice, setCurrentPrice] = useState(PRICING.FORMATTED_PRICE);
  const [scale, setScale] = useState(0.8);
  const [contentHeight, setContentHeight] = useState(1123); // Default A4 height

  // Load configuration on mount
  useEffect(() => {
    const loadConfig = async () => {
      const config = await fetchConfig();
      PRICING.update(config);
      setCurrentPrice(PRICING.FORMATTED_PRICE);
    };
    loadConfig();
  }, []);

  // Update preview template when main template changes
  useEffect(() => {
    setPreviewTemplateId(templateId);
  }, [templateId]);

  // Measure content height when template or data changes
  useEffect(() => {
    const measureContent = () => {
      setTimeout(() => {
        const previewContent = document.querySelector('.ppz-page');
        if (previewContent) {
          setContentHeight(previewContent.scrollHeight);
        }
      }, 100); // Small delay to ensure content is rendered
    };
    measureContent();
  }, [previewTemplateId, data]);

  // Sync main template when preview modal is closed
  const handleClosePreview = () => {
    onClose();
    // Update the main template if it's different from the preview template
    if (previewTemplateId !== templateId) {
      navigate(`/editor?t=${previewTemplateId}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2">
      <div className="bg-[#0c0e12] rounded-lg shadow-2xl w-full max-w-7xl max-h-[98vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1a1f27]">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-white">Preview Proposal</h2>
            <div className="text-sm text-[#8b94a3]">
              Template: {TEMPLATES[previewTemplateId]?.title || 'Unknown'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClosePreview}
              className="p-2 text-[#8b94a3] hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Template Switcher & Zoom Controls */}
        <div className="p-4 border-b border-[#1a1f27] bg-[#11141a]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-[#8b94a3] mb-2">Switch Template:</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(TEMPLATES).map(([id, t]) => (
                  <button
                    key={id}
                    onClick={() => setPreviewTemplateId(id)}
                    className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
                      id === previewTemplateId
                        ? "bg-[#58e1ff] border-[#58e1ff] text-[#0b0f14] font-medium"
                        : "border-[#2a2f39] text-[#8b94a3] hover:text-[#58e1ff] hover:border-[#58e1ff]"
                    }`}
                  >
                    {t.title || "Template"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#8b94a3] mb-2">Zoom:</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setScale(Math.max(0.3, scale - 0.1))}
                  className="px-2 py-1 text-xs bg-[#1a1f27] border border-[#2a2f39] rounded hover:border-[#58e1ff] transition-colors"
                >
                  -
                </button>
                <span className="text-xs text-[#8b94a3] min-w-[3rem] text-center">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={() => setScale(Math.min(1.5, scale + 0.1))}
                  className="px-2 py-1 text-xs bg-[#1a1f27] border border-[#2a2f39] rounded hover:border-[#58e1ff] transition-colors"
                >
                  +
                </button>
                <button
                  onClick={() => setScale(0.8)}
                  className="px-2 py-1 text-xs bg-[#1a1f27] border border-[#2a2f39] rounded hover:border-[#58e1ff] transition-colors ml-2"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto bg-gray-100 preview-scroll-container">
          <div className="py-4 min-h-full flex justify-center">
            <div 
              className="bg-white shadow-lg"
              style={{ 
                width: '794px',
                minHeight: '1123px',
                transformOrigin: 'center top',
                transform: `scale(${scale})`,
                transition: 'transform 0.2s ease'
              }}
            >
              <AutoPager
                sections={TEMPLATES[previewTemplateId]?.buildSections(data || schema.defaultData) || []}
                watermark={true}
                pageWidthPx={794}
                pagePaddingPx={36}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1a1f27] bg-[#11141a]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="text-sm text-[#8b94a3]">
              Current template: {TEMPLATES[previewTemplateId]?.title || 'Unknown'}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onClose()}
                className="px-3 sm:px-4 py-2 rounded-md border border-[#2a2f39] text-sm hover:border-[#58e1ff] hover:text-[#58e1ff] transition-colors"
              >
                Cancel
              </button>
              {previewTemplateId !== templateId && (
                <button
                  onClick={handleClosePreview}
                  className="px-3 sm:px-4 py-2 rounded-md bg-[#58e1ff] text-[#0b0f14] text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Apply Template
                </button>
              )}
              <button
                onClick={onDownloadPDF}
                disabled={isGeneratingPDF}
                className={`px-3 sm:px-4 py-2 rounded-md text-sm transition-all border ${
                  isGeneratingPDF 
                    ? 'border-[#58e1ff] text-[#58e1ff] cursor-not-allowed opacity-75' 
                    : 'border-[#2a2f39] text-white hover:border-[#58e1ff] hover:text-[#58e1ff]'
                }`}
              >
                {isGeneratingPDF ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#58e1ff] border-t-transparent rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">Generating...</span>
                    <span className="sm:hidden">PDF...</span>
                  </div>
                ) : (
                  <>
                    <span className="hidden sm:inline">Download </span>PDF
                  </>
                )}
              </button>
              <button
                onClick={onShowPayment}
                disabled={isGeneratingPDF}
                className={`px-3 sm:px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  isGeneratingPDF 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#58e1ff] text-[#0b0f14] hover:opacity-90'
                }`}
              >
                {isGeneratingPDF ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#0b0f14] border-t-transparent rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">Processing...</span>
                    <span className="sm:hidden">PDF...</span>
                  </div>
                ) : (
                  <>
                    <span className="hidden lg:inline">Get Clean </span>PDF — {currentPrice}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}