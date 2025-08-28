import ReactDOMServer from 'react-dom/server';

export class PDFGenerator {
  static generateHTML(sections) {
    const sectionsHtml = ReactDOMServer.renderToStaticMarkup(
      <div className="ppz-page relative bg-white shadow ring-1 ring-gray-200" style={{
        width: 794,
        minHeight: "auto",
        boxSizing: "border-box",
        padding: 36,
        margin: "0 auto"
      }}>
        {sections.map((section, i) => (
          <div key={`section-${i}`} className="relative mb-4 last:mb-0">
            {section}
          </div>
        ))}
      </div>
    );
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          ${this.getCSS()}
        </style>
      </head>
      <body>
        <div class="ppz-pages">
          ${sectionsHtml}
        </div>
      </body>
      </html>
    `;
  }

  static getCSS() {
    return `
      body { 
        margin: 0; 
        padding: 0; 
        font-family: Arial, sans-serif; 
        background: white;
      }
      .ppz-page {
        width: 794px;
        min-height: auto;
        background: white;
        padding: 36px;
        box-sizing: border-box;
        margin: 0 auto;
      }
      .relative { position: relative; }
      .bg-white { background: white; }
      .shadow { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); }
      .ring-1 { box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05); }
      .ring-gray-200 { box-shadow: 0 0 0 1px #e5e7eb; }
      .mb-4 { margin-bottom: 1rem; }
      .last\\:mb-0:last-child { margin-bottom: 0; }
      .ppz-pages { }
      /* Tailwind-like styles for PDF */
      .flex { display: flex; }
      .items-center { align-items: center; }
      .justify-between { justify-content: space-between; }
      .justify-center { justify-content: center; }
      .text-center { text-align: center; }
      .text-right { text-align: right; }
      .text-left { text-align: left; }
      .mb-4 { margin-bottom: 1rem; }
      .mb-6 { margin-bottom: 1.5rem; }
      .mt-4 { margin-top: 1rem; }
      .mt-6 { margin-top: 1.5rem; }
      .p-4 { padding: 1rem; }
      .p-6 { padding: 1.5rem; }
      .p-8 { padding: 2rem; }
      .px-4 { padding-left: 1rem; padding-right: 1rem; }
      .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
      .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
      .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
      .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
      .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
      .rounded-lg { border-radius: 0.5rem; }
      .bg-gray-50 { background-color: #f9fafb; }
      .bg-gray-100 { background-color: #f3f4f6; }
      .bg-blue-50 { background-color: #eff6ff; }
      .bg-blue-100 { background-color: #dbeafe; }
      .bg-blue-600 { background-color: #2563eb; }
      .bg-green-50 { background-color: #f0fdf4; }
      .bg-red-50 { background-color: #fef2f2; }
      .text-gray-900 { color: #111827; }
      .text-gray-800 { color: #1f2937; }
      .text-gray-700 { color: #374151; }
      .text-gray-600 { color: #4b5563; }
      .text-gray-500 { color: #6b7280; }
      .text-gray-400 { color: #9ca3af; }
      .text-blue-600 { color: #2563eb; }
      .text-blue-500 { color: #3b82f6; }
      .text-green-600 { color: #059669; }
      .text-red-600 { color: #dc2626; }
      .text-white { color: #ffffff; }
      .text-2xl { font-size: 1.5rem; }
      .text-xl { font-size: 1.25rem; }
      .text-lg { font-size: 1.125rem; }
      .text-base { font-size: 1rem; }
      .text-sm { font-size: 0.875rem; }
      .text-xs { font-size: 0.75rem; }
      .font-bold { font-weight: 700; }
      .font-semibold { font-weight: 600; }
      .font-medium { font-weight: 500; }
      .border { border: 1px solid #d1d5db; }
      .border-t { border-top-width: 1px; }
      .border-b { border-bottom-width: 1px; }
      .border-2 { border-width: 2px; }
      .border-gray-200 { border-color: #e5e7eb; }
      .border-gray-300 { border-color: #d1d5db; }
      .border-gray-100 { border-color: #f3f4f6; }
      .border-t-2 { border-top-width: 2px; }
      .border-blue-200 { border-color: #bfdbfe; }
      .border-dashed { border-style: dashed; }
      .h-px { height: 1px; }
      .w-1 { width: 0.25rem; }
      .h-6 { height: 1.5rem; }
      .h-10 { height: 2.5rem; }
      .h-12 { height: 3rem; }
      .w-10 { width: 2.5rem; }
      .w-12 { width: 3rem; }
      .gap-3 { gap: 0.75rem; }
      .gap-2 { gap: 0.5rem; }
      .gap-6 { gap: 1.5rem; }
      .leading-relaxed { line-height: 1.625; }
      .tracking-tight { letter-spacing: -0.025em; }
      .tracking-wider { letter-spacing: 0.05em; }
      .uppercase { text-transform: uppercase; }
      .rounded-full { border-radius: 9999px; }
      .rounded { border-radius: 0.25rem; }
      .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
      .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
      .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
      .mb-2 { margin-bottom: 0.5rem; }
      .mx-auto { margin-left: auto; margin-right: auto; }
      .overflow-hidden { overflow: hidden; }
      .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
      .divide-y > * + * { border-top: 1px solid #f3f4f6; }
      .divide-gray-100 > * + * { border-color: #f3f4f6; }
      .hover\\:bg-gray-50:hover { background-color: #f9fafb; }
      .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
      .from-blue-600 { --tw-gradient-from: #2563eb; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(37, 99, 235, 0)); }
      .to-blue-700 { --tw-gradient-to: #1d4ed8; }
      .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
      .from-gray-50 { --tw-gradient-from: #f9fafb; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(249, 250, 251, 0)); }
      .to-blue-50 { --tw-gradient-to: #eff6ff; }
      .via-gray-300 { --tw-gradient-stops: var(--tw-gradient-from), #d1d5db, var(--tw-gradient-to, rgba(209, 213, 219, 0)); }
      .from-transparent { --tw-gradient-from: transparent; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(0, 0, 0, 0)); }
      .to-transparent { --tw-gradient-to: transparent; }
      .whitespace-pre-wrap { white-space: pre-wrap; }
      .avoid-break { page-break-inside: avoid; }
      .grid { display: grid; }
      .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .fill-none { fill: none; }
      .stroke-currentColor { stroke: currentColor; }
      .stroke-1 { stroke-width: 1; }
      .code { font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace; }
      * { 
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    `;
  }

  static async downloadPDF(htmlContent, filename = 'proposal.pdf', options = {}) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pdf/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        html: htmlContent,
        templateId: options.templateId,
        options: {
          addWatermark: options.addWatermark ?? true
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'PDF generation failed');
    }

    const pdfBlob = await response.blob();
    
    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.target = '_self';
    a.type = 'application/pdf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}