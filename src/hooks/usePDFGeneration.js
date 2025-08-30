import { useState } from 'react';
import { TEMPLATES } from '../lib/templates';
import { PDFGenerator } from '../lib/pdfGenerator.jsx';

export const usePDFGeneration = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

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

  // Send PDF via email after successful payment
  const sendPDFEmail = async (paymentIntent, templateId, data, schema, customerEmail) => {
    try {
      setIsSendingEmail(true);

      const currentTemplate = TEMPLATES[templateId];
      const { buildSections } = currentTemplate;
      
      const sections = buildSections(data || schema.defaultData);
      const htmlContent = PDFGenerator.generateHTML(sections);

      // Prepare template data for email
      const templateData = {
        customerName: data?.client?.name || data?.company?.name || 'Valued Customer',
        company: data?.company || {},
        client: data?.client || {},
        project: data?.project || {}
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/email/send-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: htmlContent,
          to: customerEmail,
          paymentIntentId: paymentIntent.id,
          templateData: templateData
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to send email');
      }

      // PDF email sent successfully
      return result;

    } catch (error) {
      console.error('Error sending PDF email:', error);
      // Don't throw error - email is a nice-to-have, not critical
      // User still gets their download
      return { success: false, error: error.message };
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent, templateId, data, schema, customerEmail) => {
    try {
      // Step 1: Generate and download PDF
      await generatePDF(templateId, data, schema, { 
        addWatermark: false, 
        filename: 'proposal-clean.pdf' 
      });
      
      // Step 2: Send PDF via email (parallel, don't wait)
      if (customerEmail) {
        // Sending PDF to customer email
        // Send email in background - don't wait for it
        sendPDFEmail(paymentIntent, templateId, data, schema, customerEmail)
          .then(result => {
            if (result.success) {
              // PDF email sent successfully
            } else {
              console.warn('⚠️ PDF email failed:', result.error);
            }
          })
          .catch(err => {
            console.error('❌ PDF email error:', err);
          });
      }
      
      setShowPaymentModal(false);
      
      // Step 3: Redirect to success page with email info
      setTimeout(() => {
        const successUrl = `/success?payment_intent=${paymentIntent.id}&amount=${(paymentIntent.amount / 100).toFixed(2)}&email=${encodeURIComponent(customerEmail || '')}`;
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
    isSendingEmail,
    showPaymentModal,
    setShowPaymentModal,
    downloadPDF,
    sendPDFEmail,
    handlePaymentSuccess,
    handlePaymentError,
    handlePaymentCancel
  };
};