// Elegant Luxury – sophisticated design with refined color palette and premium aesthetics
import { processProposalData } from '../shared/dataProcessor.js';
import { TemplateComponents } from '../../lib/templateBase.jsx';

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

  // Compact header
  sections.push(
    <section key="head">
      <div className="mb-4 print:mb-3">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-t-lg"></div>
        
        <div className="bg-gradient-to-br from-stone-50 to-amber-50 p-4 rounded-b-lg border border-stone-200 print:bg-stone-100 print:border-stone-300 print:p-3">
          <div className="flex items-center justify-between mb-3 print:mb-2">
            <div className="flex items-center gap-3 print:gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg print:h-8 print:w-8 print:shadow-none">
                <span className="text-white font-bold text-base print:text-sm">{company ? company.charAt(0).toUpperCase() : "C"}</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-stone-900 tracking-tight print:text-lg">
                  {company || <TemplateComponents.EmptyStates.CompanyName />}
                </h1>
                {tagline && (
                  <p className="text-sm text-stone-600 font-medium print:text-xs">{tagline}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 print:bg-amber-200 print:text-amber-900 print:border-amber-300 print:px-1.5 print:py-0.5">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5 print:w-1 print:h-1 print:mr-1"></span>
                Project Proposal
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 print:gap-3">
            <div className="bg-white rounded-lg p-3 border border-stone-200 shadow-sm print:bg-white print:border-stone-300 print:p-2 print:shadow-none">
              <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1 print:text-[10px]">Client</p>
              <p className="text-base font-semibold text-stone-900 print:text-sm">
                {client || <TemplateComponents.EmptyStates.ClientName />}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-stone-200 shadow-sm print:bg-white print:border-stone-300 print:p-2 print:shadow-none">
              <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1 print:text-[10px]">Date</p>
              <p className="text-sm text-stone-900 print:text-xs">{currentDate}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent print:bg-stone-300" />
    </section>
  );

  // Simple scope section
  sections.push(
    <section key="scope">
      <div className="flex items-center gap-3 mb-3 print:mb-2">
        <div className="h-5 w-1 bg-gradient-to-b from-amber-600 to-amber-400 rounded-full print:h-4"></div>
        <h2 className="text-lg font-bold text-stone-900 print:text-base">Project Scope</h2>
      </div>
      
      {scopeParagraphs.length ? (
        <div className="space-y-4 print:space-y-3">
          {scopeParagraphs.map((p, i) => (
            <p key={i} className="whitespace-pre-wrap leading-relaxed text-stone-700 text-sm print:text-xs">{p}</p>
          ))}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-stone-50 to-amber-50 rounded-lg p-4 text-center border border-stone-200 print:bg-stone-100 print:p-3">
          <p className="text-stone-600 text-sm print:text-xs">Add your project scope details here</p>
        </div>
      )}
    </section>
  );

  // Investment section
  sections.push(
    <section key="pricing" className="avoid-break">
      <div className="flex items-center gap-3 mb-3 print:mb-2">
        <div className="h-5 w-1 bg-gradient-to-b from-amber-600 to-amber-400 rounded-full print:h-4"></div>
        <h2 className="text-lg font-bold text-stone-900 print:text-base">Investment Summary</h2>
      </div>
      
      {items.length ? (
        <div className="overflow-hidden rounded-lg border border-stone-200 shadow-lg print:border-stone-400 print:shadow-none">
          <div className="bg-gradient-to-r from-stone-50 to-amber-50 px-4 py-3 border-b border-stone-200 print:bg-stone-200 print:px-3 print:py-2">
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold uppercase tracking-wider text-stone-700 print:text-[10px]">
              <span>Service Description</span>
              <span className="text-right">Investment</span>
            </div>
          </div>
          <div className="divide-y divide-stone-100 print:divide-stone-300">
            {items.map((it, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-stone-50 transition-colors print:px-3 print:py-2 print:hover:bg-transparent">
                <span className="text-stone-900 font-medium print:text-sm">{it.name}</span>
                <span className="text-stone-900 font-semibold print:text-sm">{it.price}</span>
              </div>
            ))}
            <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-amber-100 border-t-2 border-amber-200 flex items-center justify-between print:bg-amber-200 print:border-amber-300 print:px-3 print:py-2">
              <span className="text-stone-900 font-bold print:text-sm">Total Investment</span>
              <span className="text-base text-amber-900 font-bold print:text-sm">{total} €</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed border-stone-300 p-6 text-center bg-gradient-to-br from-stone-50 to-amber-50 print:p-4 print:bg-stone-100">
          <TemplateComponents.EmptyStates.PricingItems className="text-stone-600 text-sm print:text-xs" />
        </div>
      )}
      
      <div className="mt-3 flex items-center justify-between text-sm print:mt-2 print:text-xs">
        <span className="text-stone-600">Valid until: {valid}</span>
        <span className="text-amber-700 font-semibold print:text-amber-800">Terms & conditions apply</span>
      </div>
    </section>
  );

  // Terms section - compact and clean
  sections.push(
    <section key="terms">
      <div className="flex items-center gap-3 mb-3 print:mb-2">
        <div className="h-5 w-1 bg-gradient-to-b from-amber-600 to-amber-400 rounded-full print:h-4"></div>
        <h2 className="text-lg font-bold text-stone-900 print:text-base">Terms & Conditions</h2>
      </div>
      
      <div className="bg-gradient-to-br from-stone-50 to-amber-50 rounded-lg p-4 border border-stone-200 print:bg-stone-100 print:p-3 print:border-stone-300">
        <div className="space-y-3 print:space-y-2 text-sm print:text-xs">
          {termsParagraphs.length ? (
            termsParagraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-wrap leading-relaxed text-stone-700 print:text-xs">{p}</p>
            ))
          ) : (
            <p className="text-stone-600 text-sm print:text-xs">Add your terms and conditions here.</p>
          )}
        </div>
      </div>
    </section>
  );

  return sections;
}
