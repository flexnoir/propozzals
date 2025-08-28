import { useState } from 'react';
import { TEMPLATES } from '../lib/templates';
import { PDFGenerator } from '../lib/pdfGenerator.jsx';

export const usePDFGeneration = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const generatePDF = async (templateId, data, schema, options = {}) => {
    try {
      setIsGeneratingPDF(true);
      
      const currentTemplate = TEMPLATES[templateId];
      const { buildSections } = currentTemplate;
      
      const sections = buildSections(data || schema.defaultData);
      const htmlContent = PDFGenerator.generateHTML(sections);
      
      await PDFGenerator.downloadPDF(htmlContent, options.filename || 'proposal.pdf', {
        templateId,
        addWatermark: options.addWatermark ?? true
      });
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error(`Failed to generate PDF: ${error.message}. Please try again.`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const downloadPDF = async (templateId, data, schema, getValues) => {
    const formData = getValues();

    // Check if essential fields are filled
    const hasEssentialContent =
      (formData.company?.name && formData.company.name.trim() !== '') ||
      (formData.client?.name && formData.client.name.trim() !== '') ||
      (formData.project?.scope && formData.project.scope.trim() !== '') ||
      (formData.pricing?.items && formData.pricing.items.trim() !== '');

    if (!hasEssentialContent) {
      throw new Error('Please fill in at least one field with content before downloading.');
    }

    await generatePDF(templateId, data, schema, { addWatermark: true });
  };

  const handlePaymentSuccess = async (paymentIntent, templateId, data, schema) => {
    try {
      await generatePDF(templateId, data, schema, { 
        addWatermark: false, 
        filename: 'proposal-clean.pdf' 
      });
      
      setShowPaymentModal(false);
      
      // Delay redirect to allow PDF download to complete
      setTimeout(() => {
        const successUrl = `/success?payment_intent=${paymentIntent.id}&amount=${(paymentIntent.amount / 100).toFixed(2)}`;
        window.location.href = successUrl;
      }, 2000); // 2 second delay
      
    } catch (error) {
      console.error('Error generating clean PDF:', error);
      throw new Error(`Failed to generate clean PDF: ${error.message}. Please contact support.`);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    throw new Error(`Payment failed: ${error}. Please try again.`);
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
  };

  return {
    isGeneratingPDF,
    showPaymentModal,
    setShowPaymentModal,
    downloadPDF,
    handlePaymentSuccess,
    handlePaymentError,
    handlePaymentCancel
  };
};