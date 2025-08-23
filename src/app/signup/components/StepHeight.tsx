'use client';

import React, { useState } from 'react';
import StepContainer from './common/StepContainer';
import { patchProfile } from '@/lib/api';
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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ height_feet?: string[]; height_inches?: string[] }>({});

  const handleChange = (key: 'height_feet' | 'height_inches') => (e: React.ChangeEvent<HTMLInputElement>) => {
    // Let Zod handle coercion from string to number during validation
    updateFormData({ [key]: e.target.value === '' ? undefined : Number(e.target.value) });
    // Clear errors for the field being edited
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
    // Also clear the feet error if inches are changed, to reset the refine() message
    if (key === 'height_inches' && errors.height_feet) {
      setErrors(prev => ({ ...prev, height_feet: undefined }));
    }
  };

  const handleNext = async () => {
    // --- PATTERN STEP 5: Validate first ---
    const result = stepSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    if (loading) return;
    setErrors({}); // Clear previous errors
    setLoading(true);

    try {
      // Data is valid, now send it to the backend
      await patchProfile({
        height_feet: formData.height_feet,
        height_inches: formData.height_inches,
      });
      nextStep();
    } catch (e: any) {
      // If the API fails, display a general error message on the main field
      setErrors({ height_feet: [e.message || 'Failed to save height'] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepContainer>
      <h2>How tall are you?</h2>
      {errors.height_feet && <p className="error-message">{errors.height_feet[0]}</p>}
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
          {/* Specific errors for inches will appear here */}
          {errors.height_inches && <p className="error-message">{errors.height_inches[0]}</p>}
        </div>
      </div>

      <div className="button-group">
        <button onClick={prevStep} className="button-secondary" disabled={loading}>Back</button>
        <button
          onClick={handleNext}
          className="button-primary"
          disabled={loading}
        >
          {loading ? 'Saving…' : 'Next'}
        </button>
      </div>
    </StepContainer>
  );
}
