import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e9ecf1]">
      <header className="sticky top-0 z-30 backdrop-blur bg-[#0f1115]/75 border-b border-[#1a1f27]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-md bg-[#58e1ff] text-[#0b0f14] grid place-items-center text-[11px] font-bold">PZ</div>
            <span className="font-semibold tracking-tight text-white">Propozzals</span>
          </Link>
          <Link to="/" className="text-sm text-[#8b94a3] hover:text-[#58e1ff]">← Back to Home</Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 lg:px-8 py-12">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
          <p className="text-[#8b94a3] mb-8">
            <strong>Effective Date:</strong> August 30, 2025 | <strong>Last Updated:</strong> August 30, 2025
          </p>
          <p className="text-[#8b94a3] mb-8">
            Propozzals is operated by <strong className="text-white">FlexNoir</strong> ("Company," "we," "us," or "our").
          </p>

          <div className="bg-[#11141a] rounded-lg p-6 border border-[#222835] mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">📋 Quick Overview</h2>
            <p className="text-[#b7beca]">
              Use Propozzals to create professional proposals. Free watermarked previews, pay only for clean exports. 
              Be respectful, don't abuse the system, and we'll provide great service.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Service Description</h2>
            <p className="text-[#b7beca] mb-4">Propozzals provides:</p>
            <ul className="text-[#b7beca] space-y-2">
              <li>• Professional proposal templates</li>
              <li>• Unlimited free watermarked PDF previews</li>
              <li>• Clean PDF exports via one-time purchase</li>
              <li>• Instant email delivery of purchased PDFs</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Account & Registration</h2>
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-6">
              <h3 className="text-white font-medium mb-3">✨ No Account Required</h3>
              <ul className="text-blue-100 space-y-1">
                <li>• Start creating proposals immediately</li>
                <li>• Email required only for PDF purchases</li>
                <li>• Provide accurate information when buying</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Acceptable Use</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6">
                <h3 className="text-white font-medium mb-3">✅ You May:</h3>
                <ul className="text-green-100 space-y-1 text-sm">
                  <li>• Create legitimate business proposals</li>
                  <li>• Generate unlimited free previews</li>
                  <li>• Purchase clean PDFs for your use</li>
                  <li>• Use PDFs for business purposes</li>
                </ul>
              </div>
              
              <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-6">
                <h3 className="text-white font-medium mb-3">❌ You May Not:</h3>
                <ul className="text-red-100 space-y-1 text-sm">
                  <li>• Use for illegal or fraudulent purposes</li>
                  <li>• Circumvent payment systems</li>
                  <li>• Reverse engineer our templates</li>
                  <li>• Violate intellectual property rights</li>
                  <li>• Share/resell others' purchased PDFs</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibmed text-white mb-4">4. Pricing & Payments</h2>
            
            <div className="space-y-6">
              <div className="bg-[#0c0e12] rounded-lg p-6 border border-[#1a1f27]">
                <h3 className="text-lg font-medium text-white mb-3">💰 Pricing Structure</h3>
                <ul className="text-[#b7beca] space-y-2">
                  <li><strong>Free:</strong> Unlimited watermarked PDF previews</li>
                  <li><strong>Paid:</strong> Clean PDF exports (see current pricing on site)</li>
                  <li><strong>One-time:</strong> Each clean PDF requires separate purchase</li>
                </ul>
              </div>

              <div className="bg-[#0c0e12] rounded-lg p-6 border border-[#1a1f27]">
                <h3 className="text-lg font-medium text-white mb-3">💳 Payment Terms</h3>
                <ul className="text-[#b7beca] space-y-2">
                  <li>• Processed securely through Stripe</li>
                  <li>• Prices in EUR including applicable taxes</li>
                  <li>• Payment required before clean PDF access</li>
                  <li>• Major credit cards accepted</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Refund Policy</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6">
                <h3 className="text-white font-medium mb-3">✅ Refund Eligible</h3>
                <ul className="text-green-100 space-y-1 text-sm">
                  <li>• Technical failures on our end</li>
                  <li>• PDF generation fails</li>
                  <li>• Email delivery issues (our fault)</li>
                  <li>• Billing errors or duplicate charges</li>
                </ul>
              </div>
              
              <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-6">
                <h3 className="text-white font-medium mb-3">❌ No Refund</h3>
                <ul className="text-red-100 space-y-1 text-sm">
                  <li>• PDF delivered successfully</li>
                  <li>• Change of mind after delivery</li>
                  <li>• Incorrect email provided</li>
                  <li>• User errors in content</li>
                  <li>• Template dissatisfaction</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#11141a] rounded-lg p-4 border border-[#222835] mt-4">
              <p className="text-[#b7beca]">
                <strong>Refund Process:</strong> Email support@propozzals.com within 7 days. 
                Processing time: 5-10 business days.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
            
            <div className="space-y-4">
              <div className="bg-[#0c0e12] rounded-lg p-4 border border-[#1a1f27]">
                <h3 className="font-medium text-white mb-2">📝 Your Content</h3>
                <p className="text-[#b7beca] text-sm">
                  You own your proposals. We process them temporarily for PDF generation only.
                </p>
              </div>
              
              <div className="bg-[#0c0e12] rounded-lg p-4 border border-[#1a1f27]">
                <h3 className="font-medium text-white mb-2">🎨 Our Templates</h3>
                <p className="text-[#b7beca] text-sm">
                  Our templates are our property. Use them for proposals, but don't redistribute.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Service Availability</h2>
            <div className="bg-[#11141a] rounded-lg p-6 border border-[#222835]">
              <ul className="text-[#b7beca] space-y-2">
                <li>• We strive for maximum uptime but can't guarantee 100%</li>
                <li>• Scheduled maintenance announced when possible</li>
                <li>• Email support: support@propozzals.com</li>
                <li>• Response time: 24-48 hours</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Limitations</h2>
            <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-6">
              <h3 className="text-white font-medium mb-3">⚠️ Important Disclaimers</h3>
              <ul className="text-orange-100 space-y-2 text-sm">
                <li>• Service provided "as is" without warranties</li>
                <li>• Our liability limited to amount you paid</li>
                <li>• Not responsible for business losses</li>
                <li>• You indemnify us from claims arising from your use</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">9. Contact & Support</h2>
            <div className="bg-[#11141a] rounded-lg p-6 border border-[#222835]">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-white mb-2">📧 Email Support</h3>
                  <a href="mailto:support@propozzals.com" className="text-[#58e1ff] hover:underline">
                    support@propozzals.com
                  </a>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-2">⚖️ Legal Issues</h3>
                  <a href="mailto:legal@propozzals.com" className="text-[#58e1ff] hover:underline">
                    support@propozzals.com
                  </a>
                </div>
              </div>
              <p className="text-sm text-[#8b94a3] mt-4">
                Business Hours: Monday-Friday, 9 AM - 5 PM CET
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
            <p className="text-[#b7beca]">
              We may update these Terms periodically. Changes posted with updated date. 
              Continued use after changes means acceptance.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-[#1a1f27] bg-[#0c0e12] mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 text-sm text-[#8b94a3] text-center">
          <p>© {new Date().getFullYear()} Propozzals by FlexNoir</p>
        </div>
      </footer>
    </div>
  );
}