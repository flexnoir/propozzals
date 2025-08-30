import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Stripe configuration - fetch publishable key from backend
const getStripePromise = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/payment/config`
    );
    const config = await response.json();
    return loadStripe(config.publishableKey);
  } catch (error) {
    console.error("Failed to fetch Stripe config:", error);
    // Fallback to hardcoded key for development
    return loadStripe(
      "pk_test_51RywhJ6B0M3J7IfCL0CRov22xwCoXhzJVjqzdrYBw4j2Itb0yRv8WuQksxdQP2ZRDCoXoedtEK63wH6yqbHYHJM000QWownNVA"
    );
  }
};

const stripePromise = getStripePromise();

// Payment Form Component
function PaymentForm({ amount, clientSecret, onSuccess, onError, onCancel, onEmailChange }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [paymentRequest, setPaymentRequest] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'eur',
        total: {
          label: 'Clean PDF Export',
          amount: amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async (event) => {
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: event.paymentMethod.id
          }
        );

        if (confirmError) {
          event.complete('fail');
          onError?.(confirmError.message);
        } else {
          event.complete('success');
          onSuccess?.(paymentIntent);
        }
      });
    }
  }, [stripe, amount, elements, onSuccess, onError]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setEmailError("");

    try {
      // Confirm payment with CardElement and include email in billing details
      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: email,
            },
          }
        });

      if (paymentError) {
        setError(paymentError.message);
        onError?.(paymentError.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        onSuccess?.(paymentIntent);
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      onError?.(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Payment Details
        </h3>
        <p className="text-gray-600 mb-4">
          Amount:{" "}
          <span className="font-semibold">€{(amount / 100).toFixed(2)}</span>
        </p>

        {/* Custom Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
              onEmailChange?.(e.target.value);
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white ${
              emailError ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter your email address"
            disabled={isProcessing}
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-600">{emailError}</p>
          )}
        </div>

        {paymentRequest && (
          <div className="mb-4">
            <PaymentRequestButtonElement 
              options={{ paymentRequest }}
              className="mb-4"
            />
            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300" />
              <span className="px-3 text-gray-500 text-sm">or pay with card</span>
              <hr className="flex-1 border-gray-300" />
            </div>
          </div>
        )}

        <div className="border border-gray-300 rounded-md p-3 bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            `Pay €${(amount / 100).toFixed(2)}`
          )}
        </button>
      </div>
    </form>
  );
}

// Main Payment Modal Component
function PaymentModal({ isOpen, onClose, amount = 490, onSuccess, onError }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");

  // Create payment intent when modal opens
  useEffect(() => {
    if (isOpen && !clientSecret) {
      createPaymentIntent();
    }
  }, [isOpen, clientSecret]);

  const createPaymentIntent = async (email = null) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/payment/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            templateId: "proposal-modern-01",
            formData: {},
            customerEmail: email,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setClientSecret(data.clientSecret);
      } else {
        onError?.(data.error || "Failed to create payment intent");
        onClose();
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      onError?.("Failed to initialize payment");
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 my-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Secure Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-center text-gray-600">
            Get your clean PDF export without watermarks
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Initializing payment...</p>
          </div>
        ) : clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              locale: "auto",
              appearance: {
                theme: "flat",
                variables: {
                  colorPrimary: "#2563eb",
                  colorText: "#0f172a",
                  borderRadius: "10px",
                  spacingUnit: "6px",
                  fontFamily: "Inter, system-ui, Segoe UI, Roboto, sans-serif",
                },
              },
            }}
          >
            <PaymentForm
              amount={amount}
              clientSecret={clientSecret}
              onSuccess={(paymentIntent) => {
                // Pass both paymentIntent and customerEmail to the parent
                onSuccess(paymentIntent, customerEmail);
              }}
              onError={onError}
              onCancel={onClose}
              onEmailChange={(email) => {
                setCustomerEmail(email);
                // Email is stored for use during payment submission
                // No auto-recreation of payment intent during typing
              }}
            />
          </Elements>
        ) : (
          <div className="text-center py-8">
            <p className="text-red-600">Failed to initialize payment</p>
            <button
              onClick={createPaymentIntent}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Your payment is secured by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
