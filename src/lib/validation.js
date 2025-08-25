// Form validation utilities
export const validators = {
  required: (value) => {
    if (!value || value.trim().length === 0) {
      return 'This field is required';
    }
    return null;
  },

  email: (value) => {
    if (!value) return null; // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  phone: (value) => {
    if (!value) return null; // Optional field
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  minLength: (min) => (value) => {
    if (!value) return null; // Optional field
    if (value.length < min) {
      return `Must be at least ${min} characters long`;
    }
    return null;
  },

  maxLength: (max) => (value) => {
    if (!value) return null; // Optional field
    if (value.length > max) {
      return `Must be no more than ${max} characters long`;
    }
    return null;
  },

  url: (value) => {
    if (!value) return null; // Optional field
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  currency: (value) => {
    if (!value) return null; // Optional field
    const currencyRegex = /^[\d,]+\.?\d*[€$£¥]?$/;
    if (!currencyRegex.test(value)) {
      return 'Please enter a valid amount (e.g., 1,500€)';
    }
    return null;
  },

  date: (value) => {
    if (!value) return null; // Optional field
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return 'Please enter a valid date';
    }
    return null;
  }
};

// Field-specific validation rules
export const fieldValidators = {
  'company.name': [validators.required, validators.minLength(2)],
  'company.email': [validators.email],
  'company.phone': [validators.phone],
  'company.website': [validators.url],
  'client.name': [validators.required, validators.minLength(2)],
  'client.email': [validators.email],
  'client.phone': [validators.phone],
  'project.scope': [validators.required, validators.minLength(10)],
  'project.objectives': [validators.minLength(10)],
  'pricing.total': [validators.currency],
  'valid_until': [validators.date]
};

// Validate a single field
export const validateField = (fieldName, value) => {
  const rules = fieldValidators[fieldName];
  if (!rules) return null;

  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
};

// Validate entire form
export const validateForm = (data) => {
  const errors = {};
  
  Object.keys(fieldValidators).forEach(fieldName => {
    const value = getNestedValue(data, fieldName);
    const error = validateField(fieldName, value);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};

// Helper to get nested object values
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : '';
  }, obj);
};

// Format field name for display
export const formatFieldName = (fieldName) => {
  return fieldName
    .split('.')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};
