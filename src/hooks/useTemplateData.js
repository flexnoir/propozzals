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

  // Load draft if exists OR merge with current values
  useEffect(() => {
    const currentValues = getValues();
    const saved = localStorage.getItem(`ppz:${templateId}`);
    let base = schema.defaultData;

    if (saved) {
      base = JSON.parse(saved);
    }

    // Merge: keep current values if they exist, otherwise fall back to defaults/saved
    const merged = { ...base, ...currentValues };
    reset(merged);
  }, [templateId, reset, schema.defaultData, getValues]);

  // Update document hash
  useEffect(() => {
    if (!data) return;
    documentHash({ templateId, data }).then(setHash);
  }, [templateId, data]);

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
    errors
  };
};