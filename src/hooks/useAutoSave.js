import { useEffect, useState } from 'react';

export const useAutoSave = (templateId, data) => {
  const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, saved, error
  
  useEffect(() => {
    if (data) {
      setSaveStatus('saving');
      try {
        localStorage.setItem(`ppz:${templateId}`, JSON.stringify(data));
        setSaveStatus('saved');
        // Clear saved status after 2 seconds
        setTimeout(() => setSaveStatus('idle'), 2000);
      } catch (error) {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    }
  }, [templateId, data]);

  return { saveStatus };
};