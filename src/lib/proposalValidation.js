/**
 * Proposal Validation Utilities
 * Validates required fields before allowing PDF generation
 */

/**
 * Get nested value from object using dot notation
 * e.g., getValue(data, "company.name") returns data.company.name
 */
function getValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Validate all required fields in the proposal
 * @param {Object} data - Form data
 * @param {Object} schema - Template schema with field definitions
 * @returns {Object} { isValid: boolean, missingFields: string[], errors: Object }
 */
export function validateProposal(data, schema) {
  const requiredFields = schema.fields.filter(field => field.required);
  const missingFields = [];
  const errors = {};

  for (const field of requiredFields) {
    const value = getValue(data, field.key);
    const isEmpty = !value || (typeof value === 'string' && value.trim() === '');
    
    if (isEmpty) {
      missingFields.push(field.label || field.key);
      errors[field.key] = `${field.label || field.key} is required`;
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    errors,
    requiredFieldsCount: requiredFields.length,
    completedFieldsCount: requiredFields.length - missingFields.length
  };
}

/**
 * Get user-friendly validation message
 * @param {Object} validation - Result from validateProposal
 * @returns {string} Human-readable message
 */
export function getValidationMessage(validation) {
  if (validation.isValid) {
    return "All required fields completed";
  }

  if (validation.missingFields.length === 1) {
    return `Please complete: ${validation.missingFields[0]}`;
  }

  return `Please complete ${validation.missingFields.length} required fields: ${validation.missingFields.slice(0, 2).join(', ')}${validation.missingFields.length > 2 ? '...' : ''}`;
}

/**
 * Check if proposal can be exported (has all required data)
 * @param {Object} data - Form data  
 * @param {Object} schema - Template schema
 * @returns {boolean}
 */
export function canExportProposal(data, schema) {
  const validation = validateProposal(data, schema);
  return validation.isValid;
}