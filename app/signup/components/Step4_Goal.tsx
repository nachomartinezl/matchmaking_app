'use client';

import { useState } from 'react';

interface StepProps {
  formData: { goal: string };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  handleSubmit: () => void;
  prevStep: () => void;
}

export default function Step4_Goal({
  formData,
  updateFormData,
  handleSubmit,
  prevStep,
}: StepProps) {
  const options = [
    { value: 'friends', label: 'Make new friends' },
    { value: 'casual', label: 'Something casual' },
    { value: 'relationship', label: 'A serious relationship' },
  ];

  const select = (value: string) => updateFormData({ goal: value });

  return (
    <div className="form-step space-y-6">
      <h2>What are you looking for?</h2>

      <div className="option-list">
        {options.map(({ value, label }) => (
          <div
            key={value}
            className={`option-item ${
              formData.goal === value ? 'selected' : ''
            }`}
            onClick={() => select(value)}
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
          onClick={handleSubmit}
          className="button-primary"
          disabled={!formData.goal}
        >
          Finish Sign Up
        </button>
      </div>
    </div>
  );
}
