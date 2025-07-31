'use client';

import React from 'react';
import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    gender: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];

export default function Step2_Gender({
  formData,
  updateFormData,
  nextStep,
}: StepProps) {
  return (
    <StepContainer>
      <h2>Gender</h2>
      <div className="option-list">
        {GENDER_OPTIONS.map(({ value, label }) => (
          <div
            key={value}
            className={`option-item ${formData.gender === value ? 'selected' : ''}`}
            onClick={() => {
              updateFormData({ gender: value });
              nextStep();
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </StepContainer>
  );
}
