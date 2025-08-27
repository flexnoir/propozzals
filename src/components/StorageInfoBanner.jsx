import { useState } from 'react';

export const StorageInfoBanner = () => {
  const [isVisible, setIsVisible] = useState(() => {
    // Show banner if user hasn't dismissed it before
    return !localStorage.getItem('ppz:storage-banner-dismissed');
  });

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('ppz:storage-banner-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-blue-900 text-sm mb-2">
            How Your Proposal Is Saved
          </h3>
          <ul className="text-sm text-blue-800 space-y-1 mb-3">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Auto-saved locally:</strong> Your work saves automatically as you type</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>One proposal per session:</strong> Switch templates to start over</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>No accounts needed:</strong> Everything stays private on your device</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Browser dependent:</strong> Clearing browser data removes your work</span>
            </li>
          </ul>
          <p className="text-xs text-blue-700 bg-blue-100 px-3 py-2 rounded border border-blue-200">
            <strong>💡 Simple:</strong> Create proposal → Preview for free → Pay only when you need the clean PDF
          </p>
        </div>
        
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 text-blue-400 hover:text-blue-600 transition-colors"
          title="Dismiss this notice"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};