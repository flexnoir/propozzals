import { Link } from "react-router-dom";
import { SEO, SEO_CONFIG } from "../components/SEO.jsx";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e9ecf1]">
      <SEO {...SEO_CONFIG.privacy} />
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
          <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
          <p className="text-[#8b94a3] mb-8">
            <strong>Effective Date:</strong> August 30, 2025 | <strong>Last Updated:</strong> August 30, 2025
          </p>
          <p className="text-[#8b94a3] mb-8">
            Propozzals is operated by <strong className="text-white">FlexNoir</strong> ("we," "our," or "us").
          </p>

          <div className="bg-[#11141a] rounded-lg p-6 border border-[#222835] mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">🔒 Privacy-First Approach</h2>
            <p className="text-[#b7beca]">
              Your proposal content never leaves your device. We only collect your email when you purchase a PDF, 
              and we don't use any tracking cookies or analytics.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">What Information We Collect</h2>
            
            <h3 className="text-lg font-medium text-white mb-3">Information You Provide</h3>
            <ul className="text-[#b7beca] space-y-2 mb-6">
              <li><strong>Email Address:</strong> Only collected when purchasing clean PDF exports</li>
              <li><strong>Proposal Content:</strong> Stored locally in your browser - never on our servers</li>
              <li><strong>Payment Information:</strong> Processed securely through Stripe (we never see your payment details)</li>
            </ul>

            <h3 className="text-lg font-medium text-white mb-3">Information Automatically Collected</h3>
            <ul className="text-[#b7beca] space-y-2">
              <li><strong>Server Logs:</strong> Basic technical info (IP address, browser type) for security</li>
              <li><strong>Usage Statistics:</strong> Anonymous data about PDF generation for service improvement</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <ul className="text-[#b7beca] space-y-2">
              <li><strong>Email Delivery:</strong> Send you purchased PDFs and payment receipts</li>
              <li><strong>Payment Processing:</strong> Complete transactions through Stripe</li>
              <li><strong>Service Operation:</strong> Maintain and improve our PDF generation service</li>
              <li><strong>Security:</strong> Protect against fraud and unauthorized access</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Data Storage & Security</h2>
            
            <div className="bg-[#0c0e12] rounded-lg p-6 border border-[#1a1f27] mb-6">
              <h3 className="text-lg font-medium text-white mb-3">🖥️ Local Storage (Your Device)</h3>
              <ul className="text-[#b7beca] space-y-1">
                <li>• Your proposals stay in your browser using localStorage</li>
                <li>• Never transmitted to our servers unless generating a PDF</li>
                <li>• Clearing browser data permanently deletes your work</li>
              </ul>
            </div>

            <div className="bg-[#0c0e12] rounded-lg p-6 border border-[#1a1f27]">
              <h3 className="text-lg font-medium text-white mb-3">🔐 Our Servers</h3>
              <ul className="text-[#b7beca] space-y-1">
                <li>• Temporary processing only during PDF generation</li>
                <li>• PDFs deleted immediately after email delivery</li>
                <li>• Email addresses stored securely for receipts only</li>
                <li>• All data encrypted with HTTPS/TLS</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
            
            <h3 className="text-lg font-medium text-white mb-3">EU Residents (GDPR)</h3>
            <ul className="text-[#b7beca] space-y-1 mb-4">
              <li>• <strong>Access:</strong> Request what data we hold about you</li>
              <li>• <strong>Deletion:</strong> Request deletion of your personal data</li>
              <li>• <strong>Correction:</strong> Update incorrect information</li>
              <li>• <strong>Portability:</strong> Receive your data in a portable format</li>
            </ul>

            <h3 className="text-lg font-medium text-white mb-3">California Residents (CCPA)</h3>
            <ul className="text-[#b7beca] space-y-1">
              <li>• <strong>Know:</strong> What personal information we collect</li>
              <li>• <strong>Delete:</strong> Request deletion of personal information</li>
              <li>• <strong>Opt-Out:</strong> We don't sell data (nothing to opt out of)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#0c0e12] rounded-lg p-4 border border-[#1a1f27]">
                <h3 className="font-medium text-white mb-2">💳 Stripe</h3>
                <p className="text-sm text-[#8b94a3]">Secure payment processing, PCI compliant</p>
              </div>
              <div className="bg-[#0c0e12] rounded-lg p-4 border border-[#1a1f27]">
                <h3 className="font-medium text-white mb-2">📧 MailerSend</h3>
                <p className="text-sm text-[#8b94a3]">PDF delivery via email</p>
              </div>
              <div className="bg-[#0c0e12] rounded-lg p-4 border border-[#1a1f27]">
                <h3 className="font-medium text-white mb-2">📄 PDFShift</h3>
                <p className="text-sm text-[#8b94a3]">PDF generation service</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">🍪 Cookies & Tracking</h2>
            <div className="bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg p-6">
              <p className="text-[#10b981] mb-3">
                <strong>Good News:</strong> Propozzals does NOT use cookies or tracking that requires consent banners!
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-2">❌ We DON'T use:</h4>
                  <ul className="text-[#10b981]/80 text-sm space-y-1">
                    <li>• Analytics cookies</li>
                    <li>• Advertising cookies</li>
                    <li>• Social tracking pixels</li>
                    <li>• Cross-site tracking</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">✅ We only use:</h4>
                  <ul className="text-[#10b981]/80 text-sm space-y-1">
                    <li>• Essential localStorage (your device)</li>
                    <li>• Temporary session data (PDF gen)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <div className="bg-[#11141a] rounded-lg p-6 border border-[#222835]">
              <p className="text-[#b7beca] mb-4">
                Questions about this Privacy Policy or want to exercise your privacy rights?
              </p>
              <div className="flex flex-wrap gap-6">
                <div>
                  <strong className="text-white">Privacy Requests:</strong><br/>
                  <a href="mailto:privacy@propozzals.com" className="text-[#58e1ff] hover:underline">
                    support@propozzals.com
                  </a>
                </div>
                <div>
                  <strong className="text-white">General Support:</strong><br/>
                  <a href="mailto:support@propozzals.com" className="text-[#58e1ff] hover:underline">
                    support@propozzals.com
                  </a>
                </div>
              </div>
              <p className="text-sm text-[#8b94a3] mt-4">
                Response time: Within 30 days for privacy requests
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
            <p className="text-[#b7beca]">
              We may update this Privacy Policy periodically. Changes will be posted with an updated 
              "Last Updated" date. For material changes, we'll provide additional notice where feasible.
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