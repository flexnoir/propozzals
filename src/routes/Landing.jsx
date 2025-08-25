
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { TEMPLATES } from "../lib/templates.js";
import ReactDOMServer from "react-dom/server";
import AutoPager from "../components/AutoPager.new.jsx";
import { PRICING, fetchConfig } from "../config/pricing.js";


export default function Landing() {
  const [currentPrice, setCurrentPrice] = useState(PRICING.FORMATTED_PRICE);

  // Load configuration on mount
  useEffect(() => {
    const loadConfig = async () => {
      const config = await fetchConfig();
      PRICING.update(config);
      setCurrentPrice(PRICING.FORMATTED_PRICE);
    };
    loadConfig();
  }, []);

  // Sample data for template previews
  const sampleData = {
    company: { 
      name: "Your Company", 
      email: "hello@company.com",
      phone: "+30 210 123 4567",
      website: "www.yourcompany.com",
      address: "Athens, Greece"
    },
    client: { 
      name: "Client Name", 
      email: "client@example.com",
      company: "Client Company"
    },
    project: { 
      scope: "Website redesign, component library, performance optimization, handoff documentation",
      timeline: "3-4 weeks",
      deliverables: "Complete project files and documentation"
    },
    pricing: { 
      items: "Design system: €1,200\nPerformance optimization: €800\nDocumentation: €400",
      total: "€2,400"
    },
    terms: "50% retainer required upon agreement. Two rounds of revisions included. Proposal valid for 30 days."
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e9ecf1]">
      <Header />

      {/* HERO — A4 as Object */}
     <section id="hero" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-24 lg:pb-16">
  <div className="grid md:grid-cols-2 gap-8 sm:gap-10 items-center">
    {/* LEFT: copy */}
    <div className="space-y-5 sm:space-y-6 relative z-10">
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight sm:leading-[1.05] tracking-tight text-white">
        Proposals that feel <span className="text-[#58e1ff]">intentional</span>.
      </h1>
      <p className="text-base sm:text-lg text-[#b7beca] max-w-prose">
        Create professional proposals for services, products, and equipment. Unlimited free previews with watermark.
        Pay <em>only</em> per clean export. No accounts. No noise.
      </p>

      {/* Buttons: full-width on mobile */}
      <div className="flex flex-col xs:flex-row gap-3 max-w-md">
        <Link to="/editor" className="w-full xs:w-auto px-5 py-3 rounded-md bg-white text-[#0f1115] font-semibold text-center hover:opacity-90">
          Try free preview
        </Link>
        <a href="#pricing" className="w-full xs:w-auto px-5 py-3 rounded-md border border-[#2a2f39] text-center hover:border-[#58e1ff] hover:text-[#58e1ff]">
          See pricing
        </a>
      </div>

      <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-[#8b94a3] items-center">
        <span className="flex items-center gap-1">
          <span className="text-[#58e1ff]">🔒</span>
          No data stored on servers
        </span>
        <span className="flex items-center gap-1">
          <span className="text-[#58e1ff]">⚡</span>
          Instant PDF generation
        </span>
        <span className="flex items-center gap-1">
          <span className="text-[#58e1ff]">📄</span>
          Professional print quality
        </span>
      </div>
    </div>

    {/* RIGHT: A4 mock */}
    <div className="relative flex justify-center md:justify-end order-first md:order-none">
      <div className="relative w-[88%] sm:w-[520px] md:w-[600px] lg:w-[640px] max-w-full">
        <div className="absolute -inset-6 rounded-2xl bg-[#58e1ff]/10 blur-2xl pointer-events-none" />
        <div className="relative aspect-[1/1.414] w-full md:rotate-[-4deg] rounded-xl bg-[#f6f7f9] text-[#14161a] shadow-[0_30px_80px_rgba(0,0,0,.45)] ring-1 ring-[#e6e8ee] overflow-hidden">
          <div className="h-10 sm:h-12 bg-[#14161a] text-[#f6f7f9] px-4 sm:px-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-[#58e1ff]" />
              <div className="font-semibold text-sm sm:text-base">Your Company</div>
            </div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#cfd6e1]">Proposal</div>
          </div>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div className="text-xs sm:text-sm text-[#4b5362]">Prepared for</div>
            <div className="text-base sm:text-lg font-semibold">Client Name</div>
            <div className="mt-2 sm:mt-3 h-px bg-[#e6e8ee]" />
            <div>
              <div className="text-xs sm:text-sm font-semibold mb-1">Scope</div>
              <p className="text-xs sm:text-sm leading-relaxed text-[#4b5362]">
                Website redesign, component library, performance optimization, handoff docs.
              </p>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold mb-1">Pricing</div>
              <div className="rounded-lg ring-1 ring-[#e6e8ee] overflow-hidden">
                <div className="grid grid-cols-[1fr_auto] gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm">
                  <span>Design system</span><span className="font-semibold">€1,200</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-[#f0f2f6]">
                  <span>Total</span><span className="font-extrabold">€1,200</span>
                </div>
              </div>
            </div>
            <div className="pt-2 sm:pt-4 text-[10px] sm:text-[11px] text-[#6a7486]">* Watermark preview</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* Templates — dark slate with cyan accent */}
     {/* TEMPLATES */}
<section id="templates" className="bg-[#0c0e12] border-t border-[#1a1f27] py-16">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex items-end justify-between mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-white">Templates</h2>
      <Link to="/editor" className="hidden sm:inline text-sm text-[#8b94a3] hover:text-[#58e1ff]">Open editor →</Link>
    </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
       {Object.entries(TEMPLATES).map(([id, tpl]) => (
         <Card key={id} id={id} title={tpl.title || tpl.schema?.name || "Template"} sampleData={sampleData} />
       ))}
     </div>

    <div className="sm:hidden mt-6">
      <Link to="/editor" className="block text-center px-4 py-2 rounded-md border border-[#2a2f39] hover:border-[#58e1ff] hover:text-[#58e1ff]">
        Open editor →
      </Link>
    </div>
  </div>
</section>

      {/* Use Cases */}
      <section id="use-cases" className="bg-[#101319] border-t border-[#1a1f27]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-3">Perfect for services & products</h2>
            <p className="text-[#8b94a3]">Create winning proposals for any offering across all industries</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <UseCase 
              icon="💼" 
              title="Service Providers" 
              description="Web design, consulting, marketing campaigns, and professional services"
            />
            <UseCase 
              icon="🖥️" 
              title="Equipment Suppliers" 
              description="IT hardware, office equipment, machinery, and technology bundles"
            />
            <UseCase 
              icon="📦" 
              title="Product Companies" 
              description="Manufacturing quotes, bulk orders, custom products, and inventory solutions"
            />
            <UseCase 
              icon="🏭" 
              title="B2B Suppliers" 
              description="Industrial equipment, office supplies, software licensing, and maintenance contracts"
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="social-proof" className="bg-[#0c0e12] border-t border-[#1a1f27]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#11141a] ring-1 ring-[#222835]">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#58e1ff] to-[#4cc9f0] ring-2 ring-[#0c0e12]" />
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f72585] to-[#b5179e] ring-2 ring-[#0c0e12]" />
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#7209b7] to-[#480ca8] ring-2 ring-[#0c0e12]" />
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f77f00] to-[#fcbf49] ring-2 ring-[#0c0e12]" />
              </div>
              <span className="text-white font-semibold">Used by 500+ professionals</span>
            </div>
          </div>
        </div>
      </section>


      {/* How it works — split, editorial rhythm */}
      <section id="how" className="bg-[#101319] border-t border-[#1a1f27]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 grid lg:grid-cols-[280px,1fr] gap-10">
          <div>
            <h3 className="text-white font-bold text-xl">How it works</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Step n="1" text="Pick a template and edit live. Drafts stay local in your browser." />
            <Step n="2" text="Download unlimited watermark previews for review." />
            <Step n="3" text="Pay once for each clean export. Instant PDF, no account." />
          </div>
        </div>
      </section>

      {/* Pricing — stark card on charcoal */}
      <section id="pricing" className="bg-[#0f1115] border-t border-[#1a1f27]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-white">Pricing</h2>
          <p className="mt-2 text-[#8b94a3]">Unlimited previews are free. You only pay for the clean PDF.</p>

          <div className="mt-10 inline-block text-left rounded-2xl bg-[#11141a] ring-1 ring-[#222835] shadow-[0_20px_60px_rgba(0,0,0,.45)] overflow-hidden">
            <div className="h-1 w-full bg-[#58e1ff]" />
            <div className="p-7">
              <div className="text-sm text-[#8b94a3]">Clean PDF export</div>
              <div className="mt-1 text-5xl font-extrabold text-white">{currentPrice}</div>
              <p className="mt-2 text-[#b7beca] text-sm">One-time · Per export · No accounts</p>
              
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#8b94a3]">
                <span className="flex items-center gap-1">
                  <span className="text-[#58e1ff]">🔒</span>
                  Privacy first
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#58e1ff]">⚡</span>
                  Instant delivery
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#58e1ff]">✨</span>
                  Print quality
                </span>
              </div>
              
              <Link to="/editor" className="mt-5 inline-block px-5 py-3 rounded-md bg-[#58e1ff] text-[#0b0f14] font-semibold hover:opacity-90">
                Start free → Pay on export
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — minimal list */}
      <section id="faq" className="bg-[#0c0e12] border-t border-[#1a1f27]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-white mb-6">FAQ</h2>
          <Faq q="Do I need an account?" a="No. Edit and preview immediately. You only enter an email at checkout for the receipt." />
          <Faq q="Where is my content stored?" a="In your browser (local storage). We don’t keep your proposal content on our servers." />
          <Faq q="What do I pay for?" a="Each clean PDF export. Previews with watermark are free." />
        </div>
      </section>

      <FooterDark />
    </div>
  );
}

/* --- subcomponents --- */


function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-[#0f1115]/75 border-b border-[#1a1f27]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-md bg-[#58e1ff] text-[#0b0f14] grid place-items-center text-[11px] font-bold">PZ</div>
          <span className="font-semibold tracking-tight text-white">Propozzals</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#8b94a3]">
          <a href="#templates" className="hover:text-[#58e1ff]">Templates</a>
          <a href="#how" className="hover:text-[#58e1ff]">How it works</a>
          <a href="#pricing" className="hover:text-[#58e1ff]">Pricing</a>
          <a href="#faq" className="hover:text-[#58e1ff]">FAQ</a>
        </nav>

        <div className="hidden md:block">
          <Link to="/editor" className="px-3.5 py-2 rounded-md bg-white text-[#0f1115] text-sm font-semibold hover:opacity-90">
            Try free preview
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-[#2a2f39] text-[#e9ecf1]"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className="i">≡</span>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-[#1a1f27] bg-[#0f1115]">
          <div className="px-4 py-3 flex flex-col gap-3 text-sm text-[#c2c9d3]">
            <a href="#templates" onClick={()=>setOpen(false)} className="hover:text-[#58e1ff]">Templates</a>
            <a href="#how" onClick={()=>setOpen(false)} className="hover:text-[#58e1ff]">How it works</a>
            <a href="#pricing" onClick={()=>setOpen(false)} className="hover:text-[#58e1ff]">Pricing</a>
            <a href="#faq" onClick={()=>setOpen(false)} className="hover:text-[#58e1ff]">FAQ</a>
            <Link to="/editor" onClick={()=>setOpen(false)} className="mt-1 px-3.5 py-2 rounded-md bg-white text-[#0f1115] text-sm font-semibold text-center">
              Try free preview
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}


function Card({ id, title, sampleData }) {
  const [showPreview, setShowPreview] = useState(false);
  const template = TEMPLATES[id];
  
  return (
    <Link 
      to={`/editor?t=${id}`}
      className="group relative rounded-xl bg-[#11141a] ring-1 ring-[#222835] p-4 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,.45)] transition cursor-pointer block"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      {/* Template Preview Area */}
      <div className="h-40 rounded-lg bg-[#0f1115] ring-1 ring-[#1a1f27] relative overflow-hidden">
        {showPreview && template ? (
          <div className="absolute inset-0 bg-white">
            <div className="scale-[0.25] origin-top-left transform-gpu" style={{ width: '400%', height: '400%' }}>
              <AutoPager
                sections={template.buildSections(sampleData)}
                watermark={true}
                pageWidthPx={794}
                pagePaddingPx={36}
              />
            </div>
          </div>
        ) : (
          <div className="grid place-items-center h-full text-[#475064] text-sm">
            {title}
          </div>
        )}
      </div>
      
             {/* Template Info */}
       <div className="mt-3 flex items-center justify-between">
         <div className="text-sm text-white font-medium">{title}</div>
         <div className="text-xs text-[#8b94a3] hover:text-[#58e1ff] transition-colors">
           Use →
         </div>
       </div>
    </Link>
  );
}

function Step({ n, text }) {
  return (
    <div className="p-5 rounded-lg bg-[#0f1115] ring-1 ring-[#222835]">
      <div className="mb-2 h-7 w-7 rounded-full bg-[#58e1ff] text-[#0b0f14] grid place-items-center text-xs font-bold">{n}</div>
      <p className="text-sm text-[#b7beca]">{text}</p>
    </div>
  );
}

function Faq({ q, a }) {
  return (
    <details className="group border-b border-[#1a1f27] py-4">
      <summary className="marker:content-none flex cursor-pointer items-center justify-between">
        <span className="font-medium text-white">{q}</span>
        <span className="text-[#475064] group-open:rotate-45 transition">＋</span>
      </summary>
      <p className="mt-2 text-sm text-[#b7beca]">{a}</p>
    </details>
  );
}

function UseCase({ icon, title, description }) {
  return (
    <div className="text-center p-4">
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-sm text-[#8b94a3] leading-relaxed">{description}</p>
    </div>
  );
}

function FooterDark() {
  return (
    <footer className="border-t border-[#1a1f27] bg-[#0c0e12]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 text-sm text-[#8b94a3] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} Propozzals</div>
        <div className="flex gap-6">
          <a href="#pricing" className="hover:text-[#58e1ff]">Pricing</a>
          <a href="#faq" className="hover:text-[#58e1ff]">FAQ</a>
          <a href="mailto:hello@propozzals.com" className="hover:text-[#58e1ff]">Contact</a>
        </div>
      </div>
    </footer>
  );
}
