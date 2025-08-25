// Centralized pricing configuration
let cachedConfig = null;

export const fetchConfig = async (forceRefresh = false) => {
  if (cachedConfig && !forceRefresh) return cachedConfig;
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/config`);
    if (!response.ok) throw new Error('Failed to fetch config');
    cachedConfig = await response.json();
    return cachedConfig;
  } catch (error) {
    console.error('Failed to fetch config, using defaults:', error);
    // Fallback to environment variable or default
    return {
      pricing: {
        amountCents: parseInt(import.meta.env.VITE_PAYMENT_AMOUNT || '499', 10),
        currency: 'EUR'
      }
    };
  }
};

export const PRICING = {
  // Default values (will be updated by fetchConfig)
  AMOUNT_CENTS: 499,
  
  // Price in euros (for display)
  get AMOUNT_EUROS() {
    return (this.AMOUNT_CENTS / 100).toFixed(2);
  },
  
  // Formatted price string
  get FORMATTED_PRICE() {
    return `€${this.AMOUNT_EUROS}`;
  },

  // Update pricing from config
  update(config) {
    this.AMOUNT_CENTS = config.pricing.amountCents;
  }
};