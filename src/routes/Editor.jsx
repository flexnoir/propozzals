import { useState, useEffect } from "react";
import { useTemplateData } from "../hooks/useTemplateData";
import { useAutoSave } from "../hooks/useAutoSave";
import { usePDFGeneration } from "../hooks/usePDFGeneration";
import EditorHeader from "../components/EditorHeader.jsx";
import TemplateSelector from "../components/TemplateSelector.jsx";
import EditorForm from "../components/EditorForm.jsx";
import PreviewModal from "../components/PreviewModal.jsx";
import PaymentModal from "../components/PaymentModal.jsx";
import { StorageInfoBanner } from "../components/StorageInfoBanner.jsx";
import { PRICING, fetchConfig } from "../config/pricing.js";



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
      alert(error.message);
    }
  };

  const handlePaymentSuccessWrapper = async (paymentIntent, customerEmail) => {
    try {
      await handlePaymentSuccess(paymentIntent, templateId, data, schema, customerEmail);
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePaymentErrorWrapper = (error) => {
    try {
      handlePaymentError(error);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleShowPayment = () => {
    setShowPaymentModal(true);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all fields? This will permanently delete your current proposal data.')) {
      clearAllData();
    }
  };


  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e9ecf1]">
      <EditorHeader
        title={title}
        saveStatus={saveStatus}
        onPreview={() => setShowPreview(true)}
        onDownloadPDF={handleDownloadPDF}
        onShowPayment={() => setShowPaymentModal(true)}
        onClearAll={handleClearAll}
        isGeneratingPDF={isGeneratingPDF}
      />

      <div className="container mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-4 md:py-6">
        <div className="max-w-2xl mx-auto">
          <StorageInfoBanner />

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

