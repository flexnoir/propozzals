import { useMemo } from "react";

/**
 * SimplePager
 * Renders content in one natural-height page - much simpler!
 */
export default function AutoPager({
  sections = [],
  pageWidthPx = 794,     // ~210mm at 96dpi
  pagePaddingPx = 36,    // inner padding
  watermark = false,
}) {
  // Filter out empty sections
  const nonEmptySections = useMemo(() => {
    return sections.filter(section => {
      if (!section?.props?.children) return false;
      const content = section.props.children;

      // Check string content
      if (typeof content === 'string') {
        const trimmed = content.trim();
        return trimmed !== '' && 
               trimmed !== '—' && 
               trimmed !== 'PROPOZZALS' &&
               trimmed !== 'Fill in the form to see your proposal';
      }

      // Check array content (like pricing table)
      if (Array.isArray(content)) {
        return content.some(child => {
          if (!child?.props?.children) return false;
          const childContent = child.props.children;
          return typeof childContent === 'string' ? 
                 childContent.trim() !== '' : 
                 !!childContent;
        });
      }

      // Check object content
      if (content && typeof content === 'object') {
        const childContent = content.props?.children;
        return typeof childContent === 'string' ? 
               childContent.trim() !== '' : 
               !!childContent;
      }

      return false;
    });
  }, [sections]);

  return (
    <div className="ppz-pages">
      {!nonEmptySections.length ? (
        <div
          className="ppz-page relative bg-white shadow ring-1 ring-gray-200"
          style={{
            width: pageWidthPx,
            minHeight: "auto",
            boxSizing: "border-box",
            padding: pagePaddingPx,
            margin: "0 auto",
          }}
        >
          <div className="text-gray-400 text-center py-8">
            Fill in the form to see your proposal
          </div>
        </div>
      ) : (
        <div
          className="ppz-page relative bg-white shadow ring-1 ring-gray-200"
          style={{
            width: pageWidthPx,
            minHeight: "auto",
            boxSizing: "border-box",
            padding: pagePaddingPx,
            margin: "0 auto",
          }}
        >
          {watermark && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotate(-45deg)",
                opacity: 0.12,
                fontSize: "34px",
                fontWeight: 300,
                color: "#d0d0d0",
                letterSpacing: "3px",
                fontFamily: "Arial, sans-serif",
                pointerEvents: "none",
                userSelect: "none"
              }}
            >
              PROPOZZALS
            </div>
          )}
          {nonEmptySections.map((jsx, i) => (
            <div key={`section-${i}`} className="relative mb-4 last:mb-0">
              {jsx}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
