import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TEMPLATES, DEFAULT_TEMPLATE_ID } from '../lib/templates';
import { documentHash } from '../lib/documentHash';

export const useTemplateData = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const paramId = params.get("t");
  const templateId = TEMPLATES[paramId] ? paramId : DEFAULT_TEMPLATE_ID;
  const { schema, title } = TEMPLATES[templateId];

  // Form setup
  const { register, control, reset, getValues, watch, formState: { errors } } = useForm({
    defaultValues: schema.defaultData,
    mode: 'onBlur'
  });

  // Live data for preview
  const data = useWatch({ control });

  // Document hash
  const [hash, setHash] = useState("");

  // Normalize bad template ids in URL
  useEffect(() => {
    if (paramId && !TEMPLATES[paramId]) {
      navigate(`/editor?t=${DEFAULT_TEMPLATE_ID}`, { replace: true });
    }
  }, [paramId, navigate]);

  // Load shared proposal data (works across all templates)
  useEffect(() => {
    const saved = localStorage.getItem('ppz:proposal-data');
    
    if (saved) {
      // Use saved data if it exists
      try {
        const savedData = JSON.parse(saved);
        reset(savedData);
      } catch (error) {
        console.error('Failed to parse saved data:', error);
        // Fall back to default data if saved data is corrupted
        reset(schema.defaultData);
      }
    } else {
      // Use default data if no saved data exists
      reset(schema.defaultData);
    }
  }, [templateId, reset, schema.defaultData]);

  // Update document hash
  useEffect(() => {
    if (!data) return;
    documentHash({ templateId, data }).then(setHash);
  }, [templateId, data]);

  // Clear all data function
  const clearAllData = () => {
    localStorage.removeItem('ppz:proposal-data');
    reset(schema.defaultData);
  };

  return {
    templateId,
    title,
    schema,
    data,
    hash,
    register,
    control,
    getValues,
    watch,
    errors,
    reset,
    clearAllData
  };
};