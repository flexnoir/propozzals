import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TEMPLATES } from "../lib/templates";
import AutoPager from "./AutoPager.new.jsx";

export default function PreviewModal({ 
  isOpen, 
  onClose, 
  templateId, 
  data, 
  schema,
  onDownloadPDF,
  isGeneratingPDF 
}) {
  const navigate = useNavigate();
  const [previewTemplateId, setPreviewTemplateId] = useState(templateId);

  // Update preview template when main template changes
  useEffect(() => {
    setPreviewTemplateId(templateId);
  }, [templateId]);

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
      <div className="bg-[#0c0e12] rounded-lg shadow-2xl w-full max-w-7xl h-[95vh] flex flex-col">
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

        {/* Template Switcher */}
        <div className="p-4 border-b border-[#1a1f27] bg-[#11141a]">
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

        {/* Preview Content */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="bg-gray-100 rounded-lg flex justify-center h-full overflow-auto">
            <div className="bg-white shadow-lg my-4" style={{ width: '794px', minHeight: '1123px' }}>
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
        <div className="p-4 border-t border-[#1a1f27] bg-[#11141a] flex justify-between items-center">
          <div className="text-sm text-[#8b94a3]">
            Current template: {TEMPLATES[previewTemplateId]?.title || 'Unknown'}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onClose()}
              className="px-4 py-2 rounded-md border border-[#2a2f39] text-sm hover:border-[#58e1ff] hover:text-[#58e1ff] transition-colors"
            >
              Cancel
            </button>
            {previewTemplateId !== templateId && (
              <button
                onClick={handleClosePreview}
                className="px-4 py-2 rounded-md bg-[#58e1ff] text-[#0b0f14] text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Apply Template
              </button>
            )}
            <button
              onClick={onDownloadPDF}
              disabled={isGeneratingPDF}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                isGeneratingPDF 
                  ? 'bg-[#58e1ff] text-[#0b0f14] cursor-not-allowed opacity-75' 
                  : 'bg-[#2a2f39] text-white hover:bg-[#3a3f49]'
              }`}
            >
              {isGeneratingPDF ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#0b0f14] border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating PDF...</span>
                </div>
              ) : (
                'Download PDF'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}