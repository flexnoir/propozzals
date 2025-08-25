import React, { useState, useEffect } from 'react';
import { validateField } from '../lib/validation';

const ValidatedField = ({ 
  f, 
  register, 
  errors, 
  watch,
  className = "" 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const fieldValue = watch(f.key);
  
  // Determine if we should show validation
  const shouldShowValidation = hasInteracted || (errors && errors[f.key]);
  const fieldError = errors?.[f.key];
  
  // Real-time validation
  const [validationError, setValidationError] = useState(null);
  
  useEffect(() => {
    if (fieldValue !== undefined && hasInteracted) {
      const error = validateField(f.key, fieldValue);
      setValidationError(error);
    }
  }, [fieldValue, f.key, hasInteracted]);

  const handleFocus = () => {
    setIsFocused(true);
    setHasInteracted(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const getFieldType = () => {
    if (f.key.includes('email')) return 'email';
    if (f.key.includes('phone')) return 'tel';
    if (f.key.includes('website')) return 'url';
    if (f.key.includes('date')) return 'date';
    if (f.type === 'textarea') return 'textarea';
    return 'text';
  };

  const getPlaceholder = () => {
    if (f.placeholder) return f.placeholder;
    
    const key = f.key.toLowerCase();
    if (key.includes('name')) return 'Enter name...';
    if (key.includes('email')) return 'Enter email address...';
    if (key.includes('phone')) return 'Enter phone number...';
    if (key.includes('website')) return 'https://example.com';
    if (key.includes('scope')) return 'Describe the project scope...';
    if (key.includes('objectives')) return 'List project objectives...';
    if (key.includes('items')) return 'Item description—Price\nAnother item—Price';
    if (key.includes('total')) return '1,500€';
    if (key.includes('terms')) return 'Enter terms and conditions...';
    
    return 'Enter value...';
  };

  const isRequired = f.key.includes('name') || f.key.includes('scope');
  const hasError = fieldError || validationError;
  const fieldType = getFieldType();

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      <label className="block text-xs sm:text-sm font-medium text-[#c2c9d3]">
        {f.label || f.key.split('.').pop().replace(/([A-Z])/g, ' $1').trim()}
        {isRequired && <span className="text-red-400 ml-1">*</span>}
      </label>

      {/* Input Field */}
      <div className="relative">
        {fieldType === 'textarea' ? (
          <textarea
            {...register(f.key)}
            placeholder={getPlaceholder()}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows={f.rows || 4}
            className={`
              w-full px-3 py-2.5 border rounded-md
              bg-[#0f1115] text-[#e9ecf1] placeholder-[#6b7280]
              transition-all duration-200 min-h-[88px] resize-y leading-relaxed
              ${isFocused ? 'ring-2 ring-[#58e1ff] border-[#58e1ff]/40' : ''}
              ${hasError ? 'border-red-400 ring-red-400/20' : 'border-[#2a2f39]'}
              ${!hasError && !isFocused ? 'hover:border-[#3a3f49]' : ''}
              focus:outline-none focus:ring-2 focus:ring-[#58e1ff] focus:border-[#58e1ff]/40
            `}
          />
        ) : (
          <input
            {...register(f.key)}
            type={fieldType}
            placeholder={getPlaceholder()}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`
              w-full px-3 py-2.5 border rounded-md
              bg-[#0f1115] text-[#e9ecf1] placeholder-[#6b7280]
              transition-all duration-200 min-h-[48px]
              ${isFocused ? 'ring-2 ring-[#58e1ff] border-[#58e1ff]/40' : ''}
              ${hasError ? 'border-red-400 ring-red-400/20' : 'border-[#2a2f39]'}
              ${!hasError && !isFocused ? 'hover:border-[#3a3f49]' : ''}
              focus:outline-none focus:ring-2 focus:ring-[#58e1ff] focus:border-[#58e1ff]/40
            `}
          />
        )}

        {/* Error Icon */}
        {shouldShowValidation && hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {/* Success Icon */}
        {shouldShowValidation && !hasError && fieldValue && fieldValue.trim() && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Error Message */}
      {shouldShowValidation && hasError && (
        <div className="flex items-start space-x-2 text-sm text-red-400">
          <svg className="h-4 w-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{fieldError?.message || validationError}</span>
        </div>
      )}

      {/* Help Text */}
      {f.help && !hasError && (
        <p className="text-sm text-[#8b94a3] flex items-start space-x-2">
          <svg className="h-4 w-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <span>{f.help}</span>
        </p>
      )}

      {/* Character Count */}
      {fieldValue && (f.maxLength || f.key.includes('scope') || f.key.includes('objectives')) && (
        <div className="text-xs text-[#6b7280] text-right">
          {fieldValue.length} characters
          {f.maxLength && ` / ${f.maxLength}`}
        </div>
      )}
    </div>
  );
};

export default ValidatedField;
