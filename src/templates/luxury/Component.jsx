// Luxury Premium – Opulent design with rich colors, gold accents, and sophisticated typography
export function buildSections(data) {
  const company = data?.company?.name || "Your Company";
  const client  = data?.client?.name || "Client Name";
  const scopeRaw= (data?.project?.scope || "").trim();
  const itemsRaw= (data?.pricing?.items || "").trim();
  const total   = data?.pricing?.total || "";
  const valid   = data?.valid_until || "";
  const terms   = data?.terms || "";

  const scopeParagraphs = scopeRaw
    ? scopeRaw.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
    : [];

  const items = itemsRaw
    ? itemsRaw.split(/\r?\n/).map(l => {
        const [name, ...rest] = l.split(/—|-/);
        const price = rest.join("-").trim();
        return { name: (name || "").trim(), price };
      }).filter(it => it.name)
    : [];

  const termsParagraphs = terms
    ? terms.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
    : [];

  const sections = [];

  // Luxury header with premium design
  sections.push(
    <section key="head">
      <div className="relative mb-10 print:mb-8">
        {/* Ornate border frame */}
        <div className="absolute inset-0 border-4 border-double border-amber-500 rounded-lg print:border-2"></div>
        <div className="absolute inset-2 border border-amber-200 rounded-md print:inset-1"></div>
        
        {/* Premium background */}
        <div className="relative bg-gradient-to-br from-slate-50 via-white to-amber-50 p-8 rounded-lg print:bg-slate-100 print:p-6">
          {/* Golden accent bar */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent print:w-24"></div>
          
          <div className="text-center mb-8 print:mb-6">
            {/* Company logo placeholder with luxury styling */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-600 rounded-full shadow-2xl mb-4 print:w-16 print:h-16 print:shadow-lg print:mb-3">
              <span className="text-white text-2xl font-bold tracking-wider print:text-xl">{company.charAt(0).toUpperCase()}</span>
              <div className="absolute inset-2 border border-amber-200 rounded-full"></div>
            </div>
            
            <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 bg-clip-text text-transparent mb-2 print:text-3xl">{company}</h1>
            <div className="flex items-center justify-center gap-2 mb-4 print:mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent print:w-6"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full print:w-1.5 print:h-1.5"></div>
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent print:w-6"></div>
            </div>
            <p className="text-slate-600 text-sm font-medium uppercase tracking-[0.25em] print:text-xs">Exclusive Services</p>
          </div>
          
          {/* Client information with luxury styling */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6 border border-amber-200 shadow-lg print:bg-amber-100 print:p-4 print:shadow-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4">
              <div className="text-center">
                <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2 print:text-[10px]">Distinguished Client</div>
                <div className="text-xl font-serif font-bold text-slate-800 print:text-lg">{client}</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2 print:text-[10px]">Proposal Date</div>
                <div className="text-lg text-slate-700 print:text-base">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
            </div>
            
            {/* Premium proposal badge */}
            <div className="text-center mt-4 print:mt-3">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white text-sm font-semibold rounded-full shadow-lg print:px-3 print:py-1 print:text-xs print:shadow-none">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse print:animate-none print:w-1.5 print:h-1.5"></div>
                PREMIUM PROPOSAL
              </div>
            </div>
          </div>
          
          {/* Bottom golden accent */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent print:w-24"></div>
        </div>
      </div>
    </section>
  );

  // Luxury scope section
  sections.push(
    <section key="scope">
      <div className="mb-10 print:mb-8">
        <div className="flex items-center gap-4 mb-6 print:mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-amber-400 print:via-amber-500"></div>
          <div className="flex items-center gap-3 print:gap-2">
            <div className="w-3 h-3 bg-amber-400 rounded-full print:w-2 print:h-2"></div>
            <h2 className="text-2xl font-serif font-bold text-slate-800 print:text-xl">Project Excellence</h2>
            <div className="w-3 h-3 bg-amber-400 rounded-full print:w-2 print:h-2"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-400 via-amber-300 to-transparent print:via-amber-500"></div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-50 to-amber-50 rounded-xl p-8 border-2 border-amber-200 shadow-xl print:bg-slate-100 print:p-6 print:shadow-none">
          {scopeParagraphs.length ? (
            <div className="space-y-6 print:space-y-4">
              {scopeParagraphs.map((p, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-4 top-2 w-2 h-2 bg-amber-400 rounded-full print:-left-3 print:top-1 print:w-1.5 print:h-1.5"></div>
                  <p className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg font-medium pl-4 print:text-base print:pl-3">{p}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 print:py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 print:w-12 print:h-12 print:mb-3">
                <div className="text-amber-600 text-2xl print:text-xl">✦</div>
              </div>
              <p className="text-slate-500 text-lg font-medium print:text-base">Bespoke project scope awaits definition</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );

  // Luxury investment section
  sections.push(
    <section key="pricing" className="avoid-break">
      <div className="mb-10 print:mb-8">
        <div className="flex items-center gap-4 mb-6 print:mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-amber-400 print:via-amber-500"></div>
          <div className="flex items-center gap-3 print:gap-2">
            <div className="w-3 h-3 bg-amber-400 rounded-full print:w-2 print:h-2"></div>
            <h2 className="text-2xl font-serif font-bold text-slate-800 print:text-xl">Investment Portfolio</h2>
            <div className="w-3 h-3 bg-amber-400 rounded-full print:w-2 print:h-2"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-400 via-amber-300 to-transparent print:via-amber-500"></div>
        </div>
        
        {items.length ? (
          <div className="bg-white rounded-xl shadow-2xl border-2 border-amber-200 overflow-hidden print:shadow-none">
            {/* Premium table header */}
            <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 px-8 py-4 print:px-6 print:py-3">
              <div className="grid grid-cols-2 gap-4 text-white font-semibold uppercase tracking-wider text-sm print:text-xs">
                <span>Premium Service</span>
                <span className="text-right">Investment Value</span>
              </div>
            </div>
            
            {/* Luxury line items */}
            <div className="divide-y divide-amber-100">
              {items.map((it, i) => (
                <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 transition-all duration-300 print:px-6 print:py-4 print:hover:bg-transparent">
                  <span className="text-slate-800 font-medium text-lg print:text-base">{it.name}</span>
                  <span className="text-slate-900 font-bold text-lg print:text-base">{it.price}</span>
                </div>
              ))}
            </div>
            
            {/* Premium total section */}
            <div className="bg-gradient-to-r from-slate-100 via-amber-50 to-slate-100 px-8 py-6 border-t-4 border-amber-400 print:bg-slate-200 print:px-6 print:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 print:gap-2">
                  <div className="w-4 h-4 bg-amber-400 rounded-full print:w-3 print:h-3"></div>
                  <span className="text-slate-900 font-bold text-xl print:text-lg">Total Investment</span>
                </div>
                <div className="flex items-center gap-3 print:gap-2">
                  <span className="text-3xl font-serif font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent print:text-2xl">{total} €</span>
                  <div className="w-4 h-4 bg-amber-400 rounded-full print:w-3 print:h-3"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-12 text-center border-2 border-dashed border-amber-300 print:p-8 print:bg-amber-100">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6 print:w-16 print:h-16 print:mb-4">
              <div className="text-amber-600 text-3xl print:text-2xl">₿</div>
            </div>
            <p className="text-slate-600 text-lg font-medium mb-2 print:text-base">Premium Services Portfolio</p>
            <p className="text-slate-500 text-sm print:text-xs">Add exclusive services: <code className="bg-white px-3 py-1 rounded-lg font-mono font-semibold text-amber-600 border border-amber-200 print:px-2 print:py-0.5">Luxury Consultation — 10,000€</code></p>
          </div>
        )}
        
        <div className="mt-6 flex items-center justify-between text-sm text-slate-600 print:mt-4 print:text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <span className="font-medium">Exclusive offer valid until: {valid}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-700">Premium Terms Apply</span>
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );

  // Luxury terms section
  sections.push(
    <section key="terms">
      <div className="flex items-center gap-4 mb-6 print:mb-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-amber-400 print:via-amber-500"></div>
        <div className="flex items-center gap-3 print:gap-2">
          <div className="w-3 h-3 bg-amber-400 rounded-full print:w-2 print:h-2"></div>
          <h2 className="text-2xl font-serif font-bold text-slate-800 print:text-xl">Exclusive Terms</h2>
          <div className="w-3 h-3 bg-amber-400 rounded-full print:w-2 print:h-2"></div>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-amber-400 via-amber-300 to-transparent print:via-amber-500"></div>
      </div>
      
      <div className="bg-gradient-to-br from-slate-50 to-amber-50 rounded-xl p-8 border-2 border-amber-200 shadow-xl print:bg-slate-100 print:p-6 print:shadow-none">
        {termsParagraphs.length ? (
          <div className="space-y-6 print:space-y-4">
            {termsParagraphs.map((p, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-4 top-2 w-2 h-2 bg-amber-400 rounded-full print:-left-3 print:top-1 print:w-1.5 print:h-1.5"></div>
                <p className="whitespace-pre-wrap text-slate-700 leading-relaxed font-medium pl-4 print:text-sm print:pl-3">{p}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 print:py-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 print:w-12 print:h-12 print:mb-3">
              <div className="text-amber-600 text-2xl print:text-xl">⚖</div>
            </div>
            <p className="text-slate-500 font-medium print:text-sm">Premium terms and conditions apply</p>
          </div>
        )}
      </div>
    </section>
  );

  return sections;
}