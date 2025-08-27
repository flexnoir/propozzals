import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRICING, fetchConfig } from '../config/pricing.js';

export default function Success() {
  const [params] = useSearchParams();
  const [countdown, setCountdown] = useState(10);
  const [isValidPayment, setIsValidPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(PRICING.FORMATTED_PRICE);
  
  // Get payment details from URL params
  const paymentId = params.get('payment_intent');
  const amount = params.get('amount');
  
  // Load configuration on mount
  useEffect(() => {
    const loadConfig = async () => {
      const config = await fetchConfig();
      PRICING.update(config);
      setCurrentPrice(PRICING.FORMATTED_PRICE);
    };
    loadConfig();
  }, []);

  // Security check - redirect if no valid payment details
  useEffect(() => {
    if (!paymentId || !amount) {
      setShouldRedirect(true);
      return;
    }
    
    // Additional validation - check if payment ID looks valid
    if (paymentId.length < 10) {
      setShouldRedirect(true);
      return;
    }
    
    // Validate payment with backend
    validatePayment(paymentId);
  }, [paymentId, amount]);
  
  // Auto-redirect countdown
  useEffect(() => {
    if (!isValidPayment) return;
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setShouldRedirect(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isValidPayment]);
  
  // Handle redirects
  useEffect(() => {
    if (shouldRedirect) {
      window.location.href = '/editor';
    }
  }, [shouldRedirect]);
  
  const validatePayment = async (paymentIntentId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/payment-status/${paymentIntentId}`);
      const data = await response.json();
      
      if (data.success && data.status === 'succeeded') {
        setIsValidPayment(true);
      } else {
        // Payment not successful, redirect to home
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error('Payment validation failed:', error);
      // On error, redirect to home for security
      setShouldRedirect(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Show loading while validating
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#58e1ff] mx-auto mb-4"></div>
          <p className="text-gray-600">Validating payment...</p>
        </div>
      </div>
    );
  }
  
  // Show error if payment validation failed
  if (!isValidPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Invalid Payment</h2>
          <p className="text-gray-600 mb-4">This payment could not be validated.</p>
          <Link
            to="/"
            className="bg-[#58e1ff] text-[#0b0f14] font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your clean PDF has been downloaded automatically.
          </p>
          
          {/* Social Proof */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6">
            <p className="text-blue-800 text-sm font-medium">
              💡 Join 1,000+ professionals creating better proposals with Propozzals
            </p>
          </div>

          {/* Payment Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-semibold text-gray-900">€{amount || PRICING.AMOUNT_EUROS}</span>
            </div>
            {paymentId && (
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-mono text-xs text-gray-500">{paymentId.slice(-8)}</span>
              </div>
            )}
          </div>

          {/* Download Confirmation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-blue-800 font-medium">PDF Downloaded</span>
            </div>
            <p className="text-blue-700 text-sm">
              Your clean PDF export is ready for use. No watermarks, professional quality.
            </p>
          </div>

          {/* Bookmark Suggestion */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span className="text-amber-800 font-medium">⚡ Need more proposals?</span>
            </div>
            <p className="text-amber-700 text-sm">
              Bookmark this page (Ctrl+D) for instant access to create professional proposals anytime.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/editor"
              className="w-full bg-[#58e1ff] text-[#0b0f14] font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity block"
            >
              Create Another Proposal
            </Link>
            
            <Link
              to="/"
              className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors block"
            >
              Back to Home
            </Link>
          </div>

          {/* Auto-redirect notice */}
          <div className="mt-6 text-xs text-gray-500">
            Redirecting to editor in {countdown} seconds...
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@propozzals.com" className="text-[#58e1ff] hover:underline">
              support@propozzals.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
