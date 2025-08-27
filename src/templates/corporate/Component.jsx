// Corporate Professional – structured business template with teal/green color scheme
import { processProposalData } from '../shared/dataProcessor.js';

export function buildSections(rawData) {
  const {
    company,
    client,
    tagline,
    scopeParagraphs,
    items,
    total,
    valid,
    termsParagraphs,
    currentDate
  } = processProposalData(rawData);

  const sections = [];

  // Corporate header with brand identity focus
  sections.push(
    <section key="head">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 rounded-t-lg print:p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4 print:gap-3">
            <div className="h-14 w-14 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 print:h-12 print:w-12">
              <span className="text-white font-bold text-xl print:text-lg">{company.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight print:text-xl">{company}</h1>
              {tagline && (
                <p className="text-teal-100 text-sm font-medium print:text-xs">{tagline}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 print:px-3 print:py-1">
              <span className="text-sm font-semibold print:text-xs">BUSINESS PROPOSAL</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white border-l-4 border-r-4 border-b-4 border-teal-600 rounded-b-lg p-6 print:p-4">
        <div className="grid grid-cols-3 gap-6 print:gap-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 print:bg-gray-100 print:p-3">
            <div className="flex items-center gap-2 mb-2 print:mb-1">
              <div className="h-2 w-2 bg-teal-600 rounded-full print:h-1.5 print:w-1.5"></div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide print:text-[10px]">Client</p>
            </div>
            <p className="text-lg font-bold text-gray-900 print:text-base">{client}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 print:bg-gray-100 print:p-3">
            <div className="flex items-center gap-2 mb-2 print:mb-1">
              <div className="h-2 w-2 bg-teal-600 rounded-full print:h-1.5 print:w-1.5"></div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide print:text-[10px]">Date</p>
            </div>
            <p className="text-sm font-semibold text-gray-900 print:text-xs">{currentDate}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 print:bg-gray-100 print:p-3">
            <div className="flex items-center gap-2 mb-2 print:mb-1">
              <div className="h-2 w-2 bg-teal-600 rounded-full print:h-1.5 print:w-1.5"></div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide print:text-[10px]">Valid Until</p>
            </div>
            <p className="text-sm font-semibold text-gray-900 print:text-xs">{valid || 'TBD'}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 h-0.5 bg-gradient-to-r from-teal-600 to-emerald-600 print:mt-4" />
    </section>
  );

  // Project scope with structured layout
  sections.push(
    <section key="scope-title">
      <div className="flex items-center gap-4 mb-6 print:mb-4">
        <div className="flex items-center justify-center h-8 w-8 bg-teal-600 rounded-lg print:h-6 print:w-6">
          <div className="h-4 w-4 border-2 border-white rounded print:h-3 print:w-3 print:border-1"></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 print:text-xl">Project Overview</h2>
          <p className="text-sm text-teal-600 font-medium print:text-xs">Scope of Work & Deliverables</p>
        </div>
      </div>
    </section>
  );

  // Scope content with corporate styling
  if (scopeParagraphs.length) {
    scopeParagraphs.forEach((p, i) => {
      sections.push(
        <section key={`scope-${i}`}>
          <div className="bg-gradient-to-r from-gray-50 to-teal-50 border-l-4 border-teal-600 p-6 rounded-r-lg mb-4 print:bg-gray-100 print:p-4 print:mb-3">
            <p className="whitespace-pre-wrap leading-relaxed text-gray-800 text-base print:text-sm">{p}</p>
          </div>
        </section>
      );
    });
  } else {
    sections.push(
      <section key="scope-empty">
        <div className="bg-gradient-to-br from-gray-50 to-teal-50 border-2 border-dashed border-teal-300 rounded-lg p-8 text-center print:p-6">
          <div className="text-teal-400 mb-3 print:mb-2 print:hidden">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 print:text-base print:mb-1">Project Scope</h3>
          <p className="text-gray-600 text-sm print:text-xs">Define your project objectives, deliverables, and key milestones here</p>
        </div>
      </section>
    );
  }

  // Investment section with corporate table design
  sections.push(
    <section key="pricing" className="avoid-break">
      <div className="flex items-center gap-4 mb-6 print:mb-4">
        <div className="flex items-center justify-center h-8 w-8 bg-teal-600 rounded-lg print:h-6 print:w-6">
          <span className="text-white font-bold text-sm print:text-xs">€</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 print:text-xl">Investment Breakdown</h2>
          <p className="text-sm text-teal-600 font-medium print:text-xs">Transparent Pricing Structure</p>
        </div>
      </div>
      
      {items.length ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden print:border-gray-400 print:shadow-none">
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-4 print:px-4 print:py-3">
            <div className="grid grid-cols-2 gap-4 text-sm font-bold text-white uppercase tracking-wide print:text-xs">
              <span>Service Item</span>
              <span className="text-right">Investment</span>
            </div>
          </div>
          <div className="divide-y divide-gray-100 print:divide-gray-300">
            {items.map((it, i) => (
              <div key={i} className="px-6 py-4 grid grid-cols-2 gap-4 items-center hover:bg-gray-50 transition-colors print:px-4 print:py-3 print:hover:bg-transparent">
                <span className="text-gray-900 font-medium print:text-sm">{it.name}</span>
                <span className="text-right text-gray-900 font-bold print:text-sm">{it.price}</span>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 px-6 py-4 border-t-4 border-teal-600 print:bg-teal-100 print:px-4 print:py-3">
            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="text-gray-900 font-bold text-lg print:text-base">Total Investment</span>
              <span className="text-right text-2xl font-bold text-teal-900 print:text-xl">{total} €</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-50 to-teal-50 border-2 border-dashed border-teal-300 rounded-lg p-8 text-center print:p-6">
          <div className="text-teal-400 mb-4 print:mb-3 print:hidden">
            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 print:text-base print:mb-1">Investment Details</h3>
          <p className="text-gray-600 text-sm print:text-xs">Add your service items: <code className="bg-white px-2 py-1 rounded border border-teal-200 font-mono text-xs print:bg-gray-200 print:px-1.5 print:py-0.5">Strategy Consulting — 3,500€</code></p>
        </div>
      )}
    </section>
  );

  // Terms & Conditions with corporate structure
  sections.push(
    <section key="terms">
      <div className="flex items-center gap-4 mb-6 print:mb-4">
        <div className="flex items-center justify-center h-8 w-8 bg-teal-600 rounded-lg print:h-6 print:w-6">
          <div className="h-3 w-3 border-2 border-white print:h-2.5 print:w-2.5 print:border-1"></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 print:text-xl">Terms & Conditions</h2>
          <p className="text-sm text-teal-600 font-medium print:text-xs">Business Agreement Framework</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-50 to-teal-50 rounded-lg p-6 border border-gray-200 print:bg-gray-100 print:p-4 print:border-gray-300">
        {termsParagraphs.length ? (
          <div className="space-y-4 print:space-y-3">
            {termsParagraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-wrap leading-relaxed text-gray-700 text-sm print:text-xs">{p}</p>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-sm print:text-xs">Add your terms and conditions here.</p>
        )}
      </div>
      
      {/* Corporate footer */}
      <div className="mt-6 pt-4 border-t-2 border-teal-600 flex items-center justify-between print:mt-4 print:pt-3">
        <div className="text-sm text-gray-600 print:text-xs">
          <span className="font-semibold">Proposal Valid Until:</span> {valid || 'To be determined'}
        </div>
        <div className="flex items-center gap-2 print:gap-1">
          <div className="h-2 w-2 bg-teal-600 rounded-full print:h-1.5 print:w-1.5"></div>
          <span className="text-sm font-semibold text-teal-600 print:text-xs">Professional Services Agreement</span>
        </div>
      </div>
    </section>
  );

  return sections;
}