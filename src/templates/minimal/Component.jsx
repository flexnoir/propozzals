// Minimal Executive – sophisticated, high-end design with premium typography
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

  // Executive header with premium styling
  sections.push(
    <section key="head">
      <div className="mb-8 print:mb-6">
        <div className="flex items-baseline justify-between mb-6 print:mb-4">
          <div>
            <h1 className="text-3xl font-light text-gray-900 tracking-wide print:text-2xl">{company}</h1>
            {tagline && (
              <p className="text-sm text-gray-600 mt-1 print:text-xs">{tagline}</p>
            )}
            <div className="h-px w-16 bg-gray-900 mt-2 print:w-12"></div>
          </div>
          <div className="text-right">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600 print:text-[10px]">Executive Proposal</div>
          </div>
        </div>
        
        <div className="border-l-4 border-gray-900 pl-6 py-4 print:pl-4 print:py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide print:text-xs">Client</p>
              <p className="text-xl font-light text-gray-900 mt-1 print:text-lg">{client}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide print:text-xs">Date</p>
              <p className="text-sm text-gray-900 mt-1 print:text-xs">{currentDate}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-px bg-gray-300"></div>
    </section>
  );

  // Scope with executive styling
  sections.push(
    <section key="scope-title">
      <div className="mb-6 print:mb-4">
        <h2 className="text-2xl font-light text-gray-900 mb-2 print:text-xl">Project Overview</h2>
        <div className="h-px w-12 bg-gray-900 print:w-8"></div>
      </div>
    </section>
  );

  // Scope paragraphs with premium typography
  if (scopeParagraphs.length) {
    scopeParagraphs.forEach((p, i) => {
      sections.push(
        <section key={`scope-${i}`}>
          <p className="whitespace-pre-wrap leading-relaxed text-gray-700 text-lg font-light mb-6 print:text-base print:mb-4">{p}</p>
        </section>
      );
    });
  } else {
    sections.push(
      <section key="scope-empty">
        <div className="border border-gray-200 p-8 text-center print:p-4">
          <p className="text-gray-500 text-sm font-light print:text-xs">Project scope details to be defined</p>
        </div>
      </section>
    );
  }

  // Investment section with executive design
  sections.push(
    <section key="pricing" className="avoid-break">
      <div className="mb-6 print:mb-4">
        <h2 className="text-2xl font-light text-gray-900 mb-2 print:text-xl">Investment Summary</h2>
        <div className="h-px w-12 bg-gray-900 print:w-8"></div>
      </div>
      
      {items.length ? (
        <div className="border border-gray-200 print:border-gray-400">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 print:bg-gray-200 print:px-4 print:py-3">
            <div className="grid grid-cols-2 gap-4 text-xs font-medium uppercase tracking-wide text-gray-600 print:text-[10px]">
              <span>Service Description</span>
              <span className="text-right">Investment</span>
            </div>
          </div>
          <div className="divide-y divide-gray-100 print:divide-gray-300">
            {items.map((it, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between print:px-4 print:py-3">
                <span className="text-gray-900 font-light print:text-sm">{it.name}</span>
                <span className="text-gray-900 font-medium print:text-sm">{it.price}</span>
              </div>
            ))}
            <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-900 flex items-center justify-between print:bg-gray-200 print:px-4 print:py-3">
              <span className="text-gray-900 font-medium print:text-sm">Total Investment</span>
              <span className="text-xl text-gray-900 font-light print:text-lg">{total} €</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 p-12 text-center print:p-6">
          <div className="text-gray-400 mb-4 print:hidden">
            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <p className="text-sm text-gray-500 font-light print:text-xs">Add investment items like: <code className="bg-gray-100 px-2 py-1 rounded font-mono text-xs print:bg-gray-200 print:px-1 print:py-0.5">Strategic Consulting — 5,000€</code></p>
        </div>
      )}
      
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600 print:mt-4 print:text-xs">
        <span className="font-light">Proposal valid until: {valid}</span>
        <span className="font-medium">Terms & conditions apply</span>
      </div>
    </section>
  );

  // Terms with executive layout
  sections.push(
    <section key="terms">
      <div className="mb-6 print:mb-4">
        <h2 className="text-2xl font-light text-gray-900 mb-2 print:text-xl">Terms & Conditions</h2>
        <div className="h-px w-12 bg-gray-900 print:w-8"></div>
      </div>
      
      {termsParagraphs.length ? (
        <div className="bg-gray-50 rounded-lg p-6 print:bg-gray-100 print:p-4">
          <div className="grid grid-cols-2 gap-8 print:grid-cols-2 print:gap-6 text-sm print:text-xs">
            {termsParagraphs.map((p, i) => (
              <div key={i} className="mb-4 print:mb-3">
                <p className="text-gray-700 leading-relaxed font-light print:leading-tight whitespace-pre-wrap">{p}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 print:bg-gray-100 print:p-4">
          <div className="grid grid-cols-2 gap-8 print:grid-cols-2 print:gap-6 text-sm print:text-xs">
            <div className="space-y-4 print:space-y-3">
              <div>
                <h3 className="font-medium text-gray-900 mb-2 uppercase tracking-wide text-xs print:text-[10px]">Payment Structure</h3>
                <p className="text-gray-700 leading-relaxed font-light print:leading-tight">
                  50% retainer required upon agreement. Remaining balance due upon project completion and final delivery.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2 uppercase tracking-wide text-xs print:text-[10px]">Timeline</h3>
                <p className="text-gray-700 leading-relaxed font-light print:leading-tight">
                  Project duration: 3–4 weeks from commencement. Expedited delivery available at premium rates.
                </p>
              </div>
            </div>
            <div className="space-y-4 print:space-y-3">
              <div>
                <h3 className="font-medium text-gray-900 mb-2 uppercase tracking-wide text-xs print:text-[10px]">Revisions</h3>
                <p className="text-gray-700 leading-relaxed font-light print:leading-tight">
                  Two rounds of revisions included in scope. Additional iterations billed at standard consulting rates.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2 uppercase tracking-wide text-xs print:text-[10px]">Deliverables</h3>
                <p className="text-gray-700 leading-relaxed font-light print:leading-tight">
                  Complete project files and documentation provided. Client responsible for content and asset provision.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );

  return sections;
}
