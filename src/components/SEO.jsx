import { useEffect } from 'react';

/**
 * SEO Component for dynamic page titles and meta tags
 * Updates document head based on page content
 */
export const SEO = ({ 
  title,
  description,
  keywords,
  ogImage = "https://propozzals.com/og-image.png",
  canonical,
  noindex = false
}) => {
  useEffect(() => {
    // Update page title
    if (title) {
      document.title = title.includes('Propozzals') ? title : `${title} | Propozzals`;
    }

    // Update meta description
    if (description) {
      updateMeta('name', 'description', description);
      updateMeta('property', 'og:description', description);
      updateMeta('property', 'twitter:description', description);
    }

    // Update keywords
    if (keywords) {
      updateMeta('name', 'keywords', keywords);
    }

    // Update Open Graph title
    if (title) {
      updateMeta('property', 'og:title', title);
      updateMeta('property', 'twitter:title', title);
    }

    // Update canonical URL
    if (canonical) {
      updateCanonical(canonical);
    }

    // Update robots meta
    const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    updateMeta('name', 'robots', robotsContent);

    // Update OG URL to current page
    updateMeta('property', 'og:url', canonical || window.location.href);
    updateMeta('property', 'twitter:url', canonical || window.location.href);

  }, [title, description, keywords, canonical, noindex]);

  return null; // This component doesn't render anything
};

// Helper functions
const updateMeta = (attribute, name, content) => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
};

const updateCanonical = (url) => {
  let element = document.querySelector('link[rel="canonical"]');
  
  if (element) {
    element.setAttribute('href', url);
  } else {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
    document.head.appendChild(element);
  }
};

// Pre-defined SEO configurations for common pages
export const SEO_CONFIG = {
  home: {
    title: "Propozzals - Professional Proposal Generator | Create Proposals That Feel Intentional",
    description: "Create professional proposals with unlimited free previews. Pay only for clean PDF exports. No accounts, no tracking cookies. Privacy-first proposal generation.",
    keywords: "proposal generator, PDF proposals, business proposals, professional templates, privacy-first, no tracking cookies, clean PDF export, proposal templates, FlexNoir",
    canonical: "https://propozzals.com/"
  },
  
  editor: {
    title: "Proposal Editor - Create Professional Proposals | Propozzals",
    description: "Use our professional proposal editor with customizable templates. Generate unlimited free previews. Your data stays local - no accounts required.",
    keywords: "proposal editor, business proposal templates, PDF generator, professional proposals, privacy-first editor",
    canonical: "https://propozzals.com/editor"
  },
  
  privacy: {
    title: "Privacy Policy - Your Data Stays Private | Propozzals",
    description: "Learn how Propozzals protects your privacy. No cookies, no tracking, no data storage on our servers. Your proposals stay on your device.",
    keywords: "privacy policy, no cookies, no tracking, local storage, data privacy, GDPR compliant",
    canonical: "https://propozzals.com/privacy"
  },
  
  terms: {
    title: "Terms of Service - Fair and Transparent | Propozzals", 
    description: "Read our straightforward terms of service. Pay only for what you use. Clear refund policy. No hidden fees or subscription tricks.",
    keywords: "terms of service, refund policy, fair pricing, transparent terms, pay per use",
    canonical: "https://propozzals.com/terms"
  },
  
  success: {
    title: "Payment Successful - Your PDF is Ready | Propozzals",
    description: "Payment completed successfully. Your clean PDF has been generated and sent to your email. Thank you for using Propozzals.",
    canonical: "https://propozzals.com/success",
    noindex: true
  },
  
  cancel: {
    title: "Payment Cancelled - No Charges Applied | Propozzals",
    description: "Your payment was cancelled and no charges were applied. You can still generate free watermarked previews anytime.",
    canonical: "https://propozzals.com/cancel",
    noindex: true
  }
};

export default SEO;