'use client';

import React from 'react';
import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    preference: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PREF_OPTIONS = [
  { value: 'women', label: 'Women' },
  { value: 'men', label: 'Men' },
  { value: 'both', label: 'Both' },
];

export default function Step4_Preference({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const canProceed = formData.preference !== '';

  return (
    <StepContainer>
      <h2>Sexual Preference</h2>
      <div className="option-list">
        {PREF_OPTIONS.map(({ value, label }) => (
          <div
            key={value}
            className={`option-item ${formData.preference === value ? 'selected' : ''}`}
            onClick={() => updateFormData({ preference: value })}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={prevStep} className="button-secondary">
          Back
        </button>
        <button
          onClick={nextStep}
          className="button-primary"
          disabled={!canProceed}
        >
          Next
        </button>
      </div>
    </StepContainer>
  );
}
