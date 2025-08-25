export default function MobileDownloadButton({ onDownloadPDF, isGeneratingPDF }) {
  return (
    <div className="sm:hidden mb-4 p-3 bg-[#1a1f27] rounded-lg border border-[#2a2f39]">
      <div className="text-xs text-[#8b94a3] mb-2">📄 Download</div>
      <button
        type="button"
        onClick={onDownloadPDF}
        disabled={isGeneratingPDF}
        className={`w-full px-3 py-2 rounded-md text-sm font-semibold transition-all ${
          isGeneratingPDF 
            ? 'bg-[#58e1ff] text-[#0b0f14] cursor-not-allowed opacity-75' 
            : 'bg-[#2a2f39] text-white hover:bg-[#3a3f49]'
        }`}
      >
        {isGeneratingPDF ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-[#0b0f14] border-t-transparent rounded-full animate-spin"></div>
            <span>Generating PDF...</span>
          </div>
        ) : (
          'Download PDF'
        )}
      </button>
    </div>
  );
}