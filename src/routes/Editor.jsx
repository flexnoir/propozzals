import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useTemplateData } from "../hooks/useTemplateData";
import { useAutoSave } from "../hooks/useAutoSave";
import { usePDFGeneration } from "../hooks/usePDFGeneration";
import EditorHeader from "../components/EditorHeader.jsx";
import TemplateSelector from "../components/TemplateSelector.jsx";
import EditorForm from "../components/EditorForm.jsx";
import PreviewModal from "../components/PreviewModal.jsx";
import PaymentModal from "../components/PaymentModal.jsx";
import { StorageInfoBanner } from "../components/StorageInfoBanner.jsx";
import { SEO, SEO_CONFIG } from "../components/SEO.jsx";
import { PRICING, fetchConfig } from "../config/pricing.js";
import { canExportProposal, validateProposal, getValidationMessage } from "../lib/proposalValidation.js";



export default function Editor() {
  // Custom hooks handle all the logic
  const { templateId, title, schema, data, hash, register, control, getValues, watch, errors, reset, clearAllData } = useTemplateData();
  const { saveStatus } = useAutoSave(templateId, data);
  const { 
    isGeneratingPDF, 
    showPaymentModal, 
    setShowPaymentModal, 
    downloadPDF, 
    handlePaymentSuccess, 
    handlePaymentError, 
    handlePaymentCancel 
  } = usePDFGeneration();

  // Local state for preview modal
  const [showPreview, setShowPreview] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(PRICING.AMOUNT_CENTS);
  
  // Validation state
  const validation = validateProposal(data, schema);
  const canExport = validation.isValid;

  // Load configuration on mount
  useEffect(() => {
    const loadConfig = async () => {
      const config = await fetchConfig();
      PRICING.update(config);
      setPaymentAmount(PRICING.AMOUNT_CENTS);
    };
    loadConfig();
  }, []);


  // Handler functions
  const handleDownloadPDF = async () => {
    try {
      await downloadPDF(templateId, data, schema, getValues);
    } catch (error) {
      console.error('PDF download failed:', error);
      toast.error(`PDF download failed: ${error.message}`);
    }
  };

  const handlePaymentSuccessWrapper = async (paymentIntent, customerEmail) => {
    try {
      await handlePaymentSuccess(paymentIntent, templateId, data, schema, customerEmail);
    } catch (error) {
      console.error('Payment success handling failed:', error);
      toast.error(`Payment processing failed: ${error.message}`);
    }
  };

  const handlePaymentErrorWrapper = (error) => {
    try {
      handlePaymentError(error);
    } catch (err) {
      console.error('Payment error handling failed:', err);
      toast.error(`Payment error: ${err.message}`);
    }
  };

  const handleShowPayment = () => {
    setShowPaymentModal(true);
  };

  const handleClearAll = () => {
    toast.custom(
      (t) => (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg max-w-md">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-red-800">Clear All Data</h3>
              <p className="mt-1 text-sm text-red-700">This will permanently delete your current proposal data.</p>
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={() => {
                    clearAllData();
                    toast.dismiss(t.id);
                    toast.success('All data cleared');
                  }}
                  className="text-xs bg-red-600 text-white px-3 py-1.5 rounded font-medium hover:bg-red-700"
                >
                  Yes, clear all
                </button>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="text-xs bg-gray-300 text-gray-700 px-3 py-1.5 rounded font-medium hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: 'top-center',
      }
    );
  };


  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e9ecf1]">
      <SEO {...SEO_CONFIG.editor} />
      <EditorHeader
        title={title}
        saveStatus={saveStatus}
        onPreview={() => setShowPreview(true)}
        onDownloadPDF={handleDownloadPDF}
        onShowPayment={() => setShowPaymentModal(true)}
        onClearAll={handleClearAll}
        isGeneratingPDF={isGeneratingPDF}
        canExport={canExport}
        validation={validation}
      />

      <div className="container mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-4 md:py-6">
        <div className="max-w-2xl mx-auto">
          <StorageInfoBanner />
          
          {/* Professional Validation Panel */}
          {!validation.isValid && (
            <div className="mb-4 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-amber-800">
                    Complete required fields to export PDF
                  </h3>
                  <div className="mt-1 text-sm text-amber-700">
                    Missing: <span className="font-medium">{validation.missingFields.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <aside className="md:sticky md:top-[4.5rem] md:self-start">
            <div className="rounded-lg bg-[#0c0e12] ring-1 ring-[#222835] p-3 sm:p-4 relative">
              <TemplateSelector templateId={templateId} title={title} />
              <EditorForm 
                schema={schema} 
                register={register} 
                errors={errors} 
                watch={watch} 
                hash={hash} 
              />
            </div>
          </aside>
        </div>
      </div>

      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        templateId={templateId}
        data={data}
        schema={schema}
        onDownloadPDF={handleDownloadPDF}
        onShowPayment={handleShowPayment}
        isGeneratingPDF={isGeneratingPDF}
        canExport={canExport}
        validationMessage={getValidationMessage(validation)}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handlePaymentCancel}
        amount={paymentAmount}
        onSuccess={handlePaymentSuccessWrapper}
        onError={handlePaymentErrorWrapper}
      />
    </div>
  );
}

