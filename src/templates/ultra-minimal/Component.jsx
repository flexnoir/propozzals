// Ultra Minimal – Pure minimalism with maximum white space and subtle typography
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

  // Ultra minimal header
  sections.push(
    <section key="head">
      <div className="mb-16 print:mb-12">
        <div className="text-center mb-12 print:mb-8">
          <h1 className="text-4xl font-thin text-gray-900 mb-2 print:text-3xl">
            {company || <TemplateComponents.EmptyStates.CompanyName />}
          </h1>
          {tagline && (
            <div className="text-sm font-light text-gray-600 mb-4 print:text-xs print:mb-3">{tagline}</div>
          )}
          <div className="w-8 h-px bg-gray-900 mx-auto mb-8 print:mb-6"></div>
          <div className="text-xs uppercase tracking-[0.3em] text-gray-500 font-light print:text-[10px]">
            Proposal
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="text-center space-y-8 print:space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 print:text-[10px]">For</div>
              <div className="text-lg font-light text-gray-900 print:text-base">
                {client || <TemplateComponents.EmptyStates.ClientName />}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 print:text-[10px]">Date</div>
              <div className="text-sm text-gray-600 print:text-xs">{currentDate}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Minimal scope section
  sections.push(
    <section key="scope">
      <div className="mb-12 print:mb-8">
        <div className="text-center mb-8 print:mb-6">
          <h2 className="text-xl font-thin text-gray-900 print:text-lg">Scope</h2>
          <div className="w-4 h-px bg-gray-300 mx-auto mt-2"></div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {scopeParagraphs.length ? (
            <div className="space-y-8 print:space-y-6">
              {scopeParagraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-wrap text-gray-700 leading-loose text-base font-light text-center print:text-sm print:leading-relaxed">{p}</p>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 print:py-8">
              <TemplateComponents.EmptyStates.ProjectScope className="text-gray-400 text-sm font-light print:text-xs" />
            </div>
          )}
        </div>
      </div>
    </section>
  );

  // Minimal investment section
  sections.push(
    <section key="pricing" className="avoid-break">
      <div className="mb-12 print:mb-8">
        <div className="text-center mb-8 print:mb-6">
          <h2 className="text-xl font-thin text-gray-900 print:text-lg">Investment</h2>
          <div className="w-4 h-px bg-gray-300 mx-auto mt-2"></div>
        </div>
        
        <div className="max-w-lg mx-auto">
          {items.length ? (
            <div className="space-y-1 print:space-y-0.5">
              {items.map((it, i) => (
                <div key={i} className="flex justify-between items-center py-4 print:py-3 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-700 font-light print:text-sm">{it.name}</span>
                  <span className="text-gray-900 font-normal print:text-sm">{it.price}</span>
                </div>
              ))}
              <div className="pt-6 mt-6 border-t border-gray-300 print:pt-4 print:mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-normal print:text-sm">Total</span>
                  <span className="text-xl font-light text-gray-900 print:text-lg">{total} €</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 print:py-8">
              <TemplateComponents.EmptyStates.PricingItems className="text-gray-400 text-sm font-light print:text-xs" />
            </div>
          )}
        </div>
        
        {valid && (
          <div className="text-center mt-8 text-xs text-gray-400 font-light print:mt-6 print:text-[10px]">
            Valid until {valid}
          </div>
        )}
      </div>
    </section>
  );

  // Minimal terms section
  sections.push(
    <section key="terms">
      <div className="text-center mb-8 print:mb-6">
        <h2 className="text-xl font-thin text-gray-900 print:text-lg">Terms</h2>
        <div className="w-4 h-px bg-gray-300 mx-auto mt-2"></div>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {termsParagraphs.length ? (
          <div className="space-y-6 print:space-y-4">
            {termsParagraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-wrap text-gray-600 leading-relaxed text-sm font-light text-center print:text-xs">{p}</p>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 print:py-6">
            <TemplateComponents.EmptyStates.Terms className="text-gray-400 text-sm font-light print:text-xs" />
          </div>
        )}
      </div>
    </section>
  );

  return sections;
}