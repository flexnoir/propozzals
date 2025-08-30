export const PrivacyBadge = ({ className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs border border-green-200 ${className}`}>
      <span className="text-green-600">🔒</span>
      <span className="font-medium">No cookies • Privacy-first</span>
    </div>
  );
};

export const PrivacyBadgeDark = ({ className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-green-900/20 text-green-200 rounded-full text-xs border border-green-700/30 ${className}`}>
      <span className="text-green-400">🔒</span>
      <span className="font-medium">No cookies • Privacy-first</span>
    </div>
  );
};