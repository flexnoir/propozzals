// Web Agency Professional – Modern, clean design for web development companies
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

  // Header section with modern gradient accent
  sections.push(
    <section key="head">
      <div className="relative overflow-hidden">
        {/* Gradient background accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 print:bg-gray-900 print:h-1"></div>
        
        <div className="pt-8 pb-6 print:pt-4 print:pb-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 print:text-2xl">
                {company || <TemplateComponents.EmptyStates.CompanyName />}
              </h1>
              {tagline && (
                <div className="text-lg text-blue-600 font-medium print:text-base print:text-gray-700">
                  {tagline}
                </div>
              )}
            </div>
            
            <div className="text-right ml-8">
              <div className="bg-gray-50 px-4 py-3 rounded-lg print:bg-white print:border print:px-3 print:py-2">
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Date</div>
                <div className="text-lg font-mono font-bold text-gray-900 print:text-base">{currentDate}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-6 print:mt-4 print:gap-4">
            <div className="bg-blue-50 p-4 rounded-lg print:bg-gray-100 print:border print:p-3">
              <div className="text-sm font-medium text-blue-800 mb-1 print:text-gray-700">Prepared For</div>
              <div className="text-lg font-semibold text-gray-900 print:text-base">
                {client || <TemplateComponents.EmptyStates.ClientName />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Project scope section with icon
  sections.push(
    <section key="scope-title">
      <div className="mt-12 mb-6 print:mt-8 print:mb-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 print:w-6 print:h-6 print:bg-gray-200">
            <div className="w-5 h-5 bg-blue-500 rounded print:w-3 print:h-3 print:bg-gray-600"></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 print:text-xl">Project Overview</h2>
        </div>
        <div className="h-1 bg-gradient-to-r from-blue-500 to-transparent w-32 print:bg-gray-400 print:h-0.5"></div>
      </div>
    </section>
  );

  if (scopeParagraphs.length) {
    scopeParagraphs.forEach((paragraph, i) => {
      sections.push(
        <section key={`scope-${i}`}>
          <div className="bg-white border-l-4 border-blue-500 pl-6 py-4 mb-6 shadow-sm print:shadow-none print:border-l-2 print:border-gray-600 print:pl-4 print:py-3 print:mb-4">
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed print:text-sm">{paragraph}</p>
          </div>
        </section>
      );
    });
  } else {
    sections.push(
      <section key="scope-empty">
        <div className="border-2 border-dashed border-blue-200 bg-blue-50 p-8 text-center rounded-lg print:border-gray-400 print:bg-gray-100 print:p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 print:w-12 print:h-12 print:bg-gray-200">
            <div className="w-8 h-8 bg-blue-500 rounded-full print:w-6 print:h-6 print:bg-gray-600"></div>
          </div>
          <p className="text-blue-600 font-medium mb-2 print:text-gray-700">Project Scope To Be Defined</p>
          <p className="text-sm text-gray-600 print:text-xs">We'll work together to define the exact requirements and deliverables</p>
        </div>
      </section>
    );
  }

  // Investment section with modern pricing table
  sections.push(
    <section key="pricing" className="avoid-break">
      <div className="mt-12 mb-6 print:mt-8 print:mb-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 print:w-6 print:h-6 print:bg-gray-200">
            <div className="w-5 h-5 bg-green-500 rounded print:w-3 print:h-3 print:bg-gray-600"></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 print:text-xl">Investment Breakdown</h2>
        </div>
        <div className="h-1 bg-gradient-to-r from-green-500 to-transparent w-32 print:bg-gray-400 print:h-0.5"></div>
      </div>
      
      {items.length ? (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden print:shadow-none print:border-gray-400">
          <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200 print:bg-gray-100 print:p-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="font-semibold text-gray-900">Service</div>
              <div className="font-semibold text-gray-900 text-right">Investment</div>
            </div>
          </div>
          
          {items.map((item, i) => (
            <div key={i} className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 print:p-3 print:hover:bg-transparent">
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 print:w-1 print:h-1 print:bg-gray-600"></div>
                  <span className="text-gray-800 font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900 print:text-base">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 print:bg-gray-200 print:p-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="text-xl font-bold text-gray-900 print:text-lg">Total Investment</div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 print:text-xl print:text-gray-900">{total} €</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-green-200 bg-green-50 p-12 text-center rounded-xl print:border-gray-400 print:bg-gray-100 print:p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 print:w-16 print:h-16 print:bg-gray-200">
            <div className="w-10 h-10 bg-green-500 rounded-full print:w-8 print:h-8 print:bg-gray-600"></div>
          </div>
          <TemplateComponents.EmptyStates.PricingItems className="text-green-600 font-medium print:text-gray-700" />
        </div>
      )}
      
      {valid && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg print:bg-gray-100 print:border-gray-400 print:mt-4 print:p-3">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-yellow-500 rounded-full mr-3 print:w-3 print:h-3 print:bg-gray-600"></div>
            <span className="text-sm font-medium text-yellow-800 print:text-xs print:text-gray-700">
              This proposal is valid until: <strong>{valid}</strong>
            </span>
          </div>
        </div>
      )}
    </section>
  );

  // Terms and conditions section
  sections.push(
    <section key="terms">
      <div className="mt-12 mb-6 print:mt-8 print:mb-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 print:w-6 print:h-6 print:bg-gray-200">
            <div className="w-5 h-5 bg-purple-500 rounded print:w-3 print:h-3 print:bg-gray-600"></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 print:text-xl">Terms & Conditions</h2>
        </div>
        <div className="h-1 bg-gradient-to-r from-purple-500 to-transparent w-32 print:bg-gray-400 print:h-0.5"></div>
      </div>
      
      {termsParagraphs.length ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 print:border-gray-400 print:p-4">
          <div className="space-y-4 print:space-y-3">
            {termsParagraphs.map((paragraph, i) => (
              <div key={i} className="border-l-4 border-purple-500 pl-4 print:border-l-2 print:border-gray-600 print:pl-3">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed print:text-sm">{paragraph}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 print:bg-gray-100 print:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-6">
            <div className="space-y-6 print:space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center print:text-base print:mb-2">
                  <div className="w-6 h-6 bg-blue-100 rounded mr-2 print:w-4 print:h-4"></div>
                  Payment Terms
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed print:text-xs">
                  50% deposit required to begin project. Remaining 50% due upon completion and delivery of final assets.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center print:text-base print:mb-2">
                  <div className="w-6 h-6 bg-green-100 rounded mr-2 print:w-4 print:h-4"></div>
                  Project Timeline
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed print:text-xs">
                  Estimated completion in 4-6 weeks from project kickoff, depending on scope and client feedback cycles.
                </p>
              </div>
            </div>
            
            <div className="space-y-6 print:space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center print:text-base print:mb-2">
                  <div className="w-6 h-6 bg-purple-100 rounded mr-2 print:w-4 print:h-4"></div>
                  Revisions Policy
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed print:text-xs">
                  Up to 3 rounds of revisions included. Additional revisions billed at standard hourly rate.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center print:text-base print:mb-2">
                  <div className="w-6 h-6 bg-yellow-100 rounded mr-2 print:w-4 print:h-4"></div>
                  Support & Maintenance
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed print:text-xs">
                  30 days of complimentary support included. Ongoing maintenance packages available upon request.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-300 print:mt-6 print:pt-4">
            <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300 print:bg-gray-200 print:p-3">
              <p className="text-sm text-gray-600 text-center print:text-xs">
                <strong>Next Steps:</strong> Upon acceptance of this proposal, we'll schedule a kickoff meeting to finalize project details and timeline.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );

  return sections;
}