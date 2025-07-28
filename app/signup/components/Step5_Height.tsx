'use client';

import React from 'react';
import StepContainer from './common/StepContainer';
import HeightPickerWheel from './common/HeightPickerWheel';

interface StepProps {
  formData: {
    height: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step5_Height({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const currentHeight = parseInt(formData.height, 10) || 60;
  const canProceed = formData.height !== '';

  return (
    <StepContainer>
      <h2>Height</h2>
      <HeightPickerWheel
        min={48}
        max={96}
        value={currentHeight}
        onChange={(val) => updateFormData({ height: String(val) })}
      />

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
