'use client';

import React from 'react';
import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    description: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  handleSubmit: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
}

export default function Step13_ShortBio({ formData, updateFormData, handleSubmit, prevStep, isSubmitting }: StepProps) {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ description: e.target.value });
  };

  return (
    <StepContainer>
      <h2>Tell us a bit about yourself</h2>
      <label htmlFor="description">Tell us something about yourself...</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleTextChange}
        placeholder="A brief bio (optional)"
        disabled={isSubmitting}
      />

      <div className="button-group">
        <button onClick={prevStep} className="button-secondary" disabled={isSubmitting}>
          Back
        </button>
        <button onClick={handleSubmit} className="button-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Finishing...' : 'Finish Sign Up'}
        </button>
      </div>
    </StepContainer>
  );
}
