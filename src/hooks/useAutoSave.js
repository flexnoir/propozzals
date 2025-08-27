import { useEffect, useState, useRef } from 'react';

export const useAutoSave = (templateId, data) => {
  const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, saved, error
  const timeoutRef = useRef(null);
  const lastSavedRef = useRef(null);
  const statusTimeoutRef = useRef(null);
  
  useEffect(() => {
    // Don't save if data is empty or undefined
    if (!data || Object.keys(data).length === 0) {
      return;
    }

    // Check if data actually changed
    const currentDataString = JSON.stringify(data);
    if (lastSavedRef.current === currentDataString) {
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Clear any pending status reset
    if (statusTimeoutRef.current) {
      clearTimeout(statusTimeoutRef.current);
    }

    // Show saving status
    setSaveStatus('saving');
    
    // Debounce the save operation
    timeoutRef.current = setTimeout(() => {
      try {
        // Save to localStorage (shared across all templates)
        localStorage.setItem('ppz:proposal-data', currentDataString);
        lastSavedRef.current = currentDataString;
        
        setSaveStatus('saved');
        
        // Clear saved status after 2 seconds
        statusTimeoutRef.current = setTimeout(() => {
          setSaveStatus('idle');
        }, 2000);
        
      } catch (error) {
        console.error('Save failed:', error);
        setSaveStatus('error');
        statusTimeoutRef.current = setTimeout(() => {
          setSaveStatus('idle');
        }, 3000);
      }
    }, 500); // Wait 500ms after user stops typing

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, [templateId, data]);

  return { saveStatus };
};