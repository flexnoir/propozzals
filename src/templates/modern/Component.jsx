// Modern Professional – clean, contemporary design with blue accent
import { processProposalData } from '../shared/dataProcessor.js';

export function buildSections(rawData) {
  const {
    company,
    client,
    scopeParagraphs,
    items,
    total,
    valid,
    termsParagraphs,
    currentDate,
    proposalId
  } = processProposalData(rawData);

  const sections = [];

  // Header with professional styling
  sections.push(
    <section key="head">
      <div className="flex items-center justify-between mb-6 print:mb-4">
        <div className="flex items-center gap-3 print:gap-2">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center print:h-8 print:w-8">
            <span className="text-white font-bold text-sm print:text-xs">{company.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight print:text-xl">{company}</h1>
            <p className="text-sm text-gray-600 print:text-xs">Professional Services</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full print:bg-blue-100 print:text-blue-800">
            Project Proposal
          </div>
          <div className="text-xs text-gray-500 mt-1 print:text-[10px]">#{proposalId}</div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-100 print:bg-gray-100 print:border-gray-300 print:p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 print:text-xs">Prepared for</p>
            <p className="text-lg font-semibold text-gray-900 print:text-base">{client}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700 print:text-xs">Date</p>
            <p className="text-sm text-gray-900 print:text-xs">{currentDate}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent print:mt-4 print:bg-gray-300" />
    </section>
  );

  // Scope title with enhanced styling
  sections.push(
    <section key="scope-title">
      <div className="flex items-center gap-3 mb-4 print:mb-3">
        <div className="h-6 w-1 bg-blue-600 rounded-full print:h-4"></div>
        <h2 className="text-xl font-bold text-gray-900 print:text-lg">Project Scope</h2>
      </div>
    </section>
  );

  // Scope paragraphs with improved typography
  if (scopeParagraphs.length) {
    scopeParagraphs.forEach((p, i) => {
      sections.push(
        <section key={`scope-${i}`}>
          <p className="whitespace-pre-wrap leading-relaxed text-gray-700 text-base mb-4 print:text-sm print:mb-3">{p}</p>
        </section>
      );
    });
  } else {
    sections.push(
      <section key="scope-empty">
        <div className="bg-gray-50 rounded-lg p-6 text-center print:bg-gray-100 print:p-4">
          <p className="text-gray-500 text-sm print:text-xs">Add your project scope details here</p>
        </div>
      </section>
    );
  }

  // Pricing with professional table design
  sections.push(
    <section key="pricing" className="avoid-break">
      <div className="flex items-center gap-3 mb-4 print:mb-3">
        <div className="h-6 w-1 bg-blue-600 rounded-full print:h-4"></div>
        <h2 className="text-xl font-bold text-gray-900 print:text-lg">Investment</h2>
      </div>
      
      {items.length ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm print:border-gray-400 print:shadow-none">
          <table className="w-full">
            <thead className="bg-gray-50 print:bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider print:px-4 print:py-2 print:text-[10px]">Description</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider print:px-4 print:py-2 print:text-[10px]">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 print:divide-gray-300">
              {items.map((it, i) => (
                <tr key={i} className="hover:bg-gray-50 print:hover:bg-transparent">
                  <td className="px-6 py-4 text-sm text-gray-900 print:px-4 print:py-2 print:text-xs">{it.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium print:px-4 print:py-2 print:text-xs">{it.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50 border-t-2 border-blue-200 print:bg-blue-100 print:border-blue-300">
                <td className="px-6 py-4 text-sm font-bold text-gray-900 print:px-4 print:py-2 print:text-xs">Total Investment</td>
                <td className="px-6 py-4 text-lg font-bold text-blue-900 text-right print:px-4 print:py-2 print:text-base">{total} €</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center print:p-4">
          <div className="text-gray-400 mb-2 print:hidden">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-sm text-gray-500 print:text-xs">Add line items like: <code className="bg-gray-100 px-2 py-1 rounded print:bg-gray-200 print:px-1 print:py-0.5">Design System — 1,200€</code></p>
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600 print:mt-3 print:text-xs">
        <span>Valid until: {valid}</span>
        <span className="text-blue-600 font-medium print:text-blue-800">Terms & conditions apply</span>
      </div>
    </section>
  );

  // Terms with enhanced layout
  sections.push(
    <section key="terms">
      <div className="flex items-center gap-3 mb-4 print:mb-3">
        <div className="h-6 w-1 bg-blue-600 rounded-full print:h-4"></div>
        <h2 className="text-xl font-bold text-gray-900 print:text-lg">Terms & Conditions</h2>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 print:bg-gray-100 print:p-4">
        <div className="grid grid-cols-2 gap-6 print:grid-cols-2 print:gap-4 text-sm print:text-xs">
          {termsParagraphs.length ? (
            termsParagraphs.map((p, i) => (
              <div key={i}>
                <p className="text-gray-700 leading-relaxed print:leading-tight">{p}</p>
              </div>
            ))
          ) : (
            <div>
              <p className="text-gray-500 text-sm print:text-xs">Add your terms and conditions here</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );

  return sections;
}
