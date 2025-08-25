'use client';

import React, { useState } from 'react';
import StepContainer from './common/StepContainer';
// --- `patchProfile` is no longer needed ---
import { profileSchema } from '@/lib/validationSchemas';
import { FormData } from '../types';

const stepSchema = profileSchema.pick({ height_feet: true, height_inches: true });

interface StepProps {
  formData: Pick<FormData, 'height_feet' | 'height_inches'>;
  updateFormData: (data: Partial<Pick<FormData, 'height_feet' | 'height_inches'>>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function StepHeight({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  // --- `loading` state is removed ---
  const [errors, setErrors] = useState<{ height_feet?: string[]; height_inches?: string[] }>({});

  const handleChange = (key: 'height_feet' | 'height_inches') => (e: React.ChangeEvent<HTMLInputElement>) => {
    // `Number()` handles empty strings and converts to 0, which is fine for our schema
    updateFormData({ [key]: e.target.value === '' ? undefined : Number(e.target.value) });
    
    // Clear errors for the field being edited
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
    // Also clear the `feet` error when `inches` changes, to reset the refine() message
    if (key === 'height_inches' && errors.height_feet) {
      setErrors(prev => ({ ...prev, height_feet: undefined }));
    }
  };

  // --- The handler is now synchronous and only validates ---
  const handleNext = () => {
    const result = stepSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({}); // Clear errors on success
    nextStep(); // Proceed to the next step
  };

  // Consolidate the main error for display (handles the .refine() message)
  const mainError = errors.height_feet?.[0];

  return (
    <StepContainer>
      <h2>How tall are you?</h2>
      
      {/* Display the main error message above the inputs */}
      {mainError && <p className="error-message" style={{textAlign: 'center'}}>{mainError}</p>}
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="feet">Feet</label>
          <input
            id="feet"
            type="number"
            min={3}
            max={8}
            value={formData.height_feet ?? ''}
            onChange={handleChange('height_feet')}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="inches">Inches</label>
          <input
            id="inches"
            type="number"
            min={0}
            max={11}
            value={formData.height_inches ?? ''}
            onChange={handleChange('height_inches')}
          />
          {/* Specific errors just for inches will appear here, though less common */}
          {errors.height_inches && <p className="error-message">{errors.height_inches[0]}</p>}
        </div>
      </div>

      <div className="button-group">
        {/* The `disabled` prop is removed */}
        <button onClick={prevStep} className="button-secondary">Back</button>
        <button
          onClick={handleNext}
          className="button-primary"
        >
          Next
        </button>
      </div>
    </StepContainer>
  );
}