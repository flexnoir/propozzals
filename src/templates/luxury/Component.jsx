// Luxury Premium – Opulent design with rich colors, gold accents, and sophisticated typography
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

  // Professional header with premium design
  sections.push(
    <section key="head">
      <div className="border-b-2 border-amber-600 pb-8 mb-10 print:pb-6 print:mb-8">
        <div className="text-center mb-8 print:mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-full mb-4 print:w-12 print:h-12 print:mb-3">
            <span className="text-white text-xl font-bold print:text-lg">{company.charAt(0).toUpperCase()}</span>
          </div>
          
          <h1 className="text-3xl font-serif font-bold text-slate-800 mb-2 print:text-2xl">{company}</h1>
          <div className="w-16 h-px bg-amber-600 mx-auto mb-3 print:w-12"></div>
          {tagline && (
            <p className="text-slate-600 text-sm font-medium uppercase tracking-widest print:text-xs">{tagline}</p>
          )}
        </div>
        
        <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 print:bg-amber-100 print:p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center print:grid-cols-2 print:gap-3">
            <div>
              <div className="text-xs font-semibold text-amber-700 uppercase mb-1 print:text-[10px]">Client</div>
              <div className="text-lg font-semibold text-slate-800 print:text-base">{client}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-amber-700 uppercase mb-1 print:text-[10px]">Date</div>
              <div className="text-lg font-semibold text-slate-800 print:text-base">{currentDate}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Project scope section
  sections.push(
    <section key="scope-title">
      <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6 print:text-xl print:mb-4">Project Overview</h2>
    </section>
  );

  if (scopeParagraphs.length) {
    scopeParagraphs.forEach((paragraph, i) => {
      sections.push(
        <section key={`scope-${i}`}>
          <p className="whitespace-pre-wrap text-slate-700 leading-relaxed mb-4 print:mb-3">{paragraph}</p>
        </section>
      );
    });
  } else {
    sections.push(
      <section key="scope-empty">
        <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-lg p-8 text-center print:p-6 print:bg-amber-100">
          <p className="text-slate-500 font-medium print:text-sm">Project scope details to be defined</p>
        </div>
      </section>
    );
  }

  // Investment section
  sections.push(
    <section key="pricing" className="avoid-break">
      <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6 print:text-xl print:mb-4">Investment Summary</h2>
      
      {items.length ? (
        <div className="bg-white rounded-lg border-2 border-amber-600 overflow-hidden print:rounded-none">
          <div className="bg-amber-600 px-6 py-4 print:px-4 print:py-3">
            <div className="grid grid-cols-2 gap-4 text-white font-semibold">
              <span>Service</span>
              <span className="text-right">Investment</span>
            </div>
          </div>
          
          <div className="divide-y divide-amber-100">
            {items.map((item, i) => (
              <div key={i} className="px-6 py-4 flex justify-between print:px-4 print:py-3">
                <span className="text-slate-800 font-medium">{item.name}</span>
                <span className="text-slate-900 font-semibold">{item.price}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-amber-50 px-6 py-4 border-t-2 border-amber-600 print:bg-amber-100 print:px-4 print:py-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-900 font-bold text-lg print:text-base">Total Investment</span>
              <span className="text-amber-700 font-bold text-xl print:text-lg">{total} €</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-lg p-8 text-center print:p-6 print:bg-amber-100">
          <p className="text-slate-600 font-medium mb-2 print:text-sm">Investment items to be defined</p>
          <p className="text-slate-500 text-sm print:text-xs">
            Add items like: <code className="bg-white px-2 py-1 rounded font-mono text-amber-600">Service — 5,000€</code>
          </p>
        </div>
      )}
      
      <div className="mt-4 text-right">
        <p className="text-sm text-slate-600 print:text-xs">Valid until: {valid}</p>
      </div>
    </section>
  );

  // Terms section
  sections.push(
    <section key="terms">
      <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6 print:text-xl print:mb-4">Terms & Conditions</h2>
      
      {termsParagraphs.length ? (
        <div className="space-y-4 print:space-y-3">
          {termsParagraphs.map((paragraph, i) => (
            <p key={i} className="whitespace-pre-wrap text-slate-700 leading-relaxed print:text-sm">{paragraph}</p>
          ))}
        </div>
      ) : (
        <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 print:bg-amber-100 print:p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4">
            <div>
              <h3 className="font-semibold text-slate-800 mb-2 print:text-sm">Payment Structure</h3>
              <p className="text-slate-700 text-sm print:text-xs">50% retainer required upon agreement, balance due upon completion.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-2 print:text-sm">Project Timeline</h3>
              <p className="text-slate-700 text-sm print:text-xs">Estimated delivery timeframe will be confirmed upon project commencement.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-2 print:text-sm">Scope Changes</h3>
              <p className="text-slate-700 text-sm print:text-xs">Additional work beyond agreed scope will be quoted separately.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-2 print:text-sm">Acceptance</h3>
              <p className="text-slate-700 text-sm print:text-xs">This proposal is valid for the period specified above.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );

  return sections;
}