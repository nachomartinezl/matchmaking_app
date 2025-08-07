'use client';

import React from 'react';
import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    height: string;
  };
  updateFormData: ( Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step5_Height({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const currentHeight = parseInt(formData.height, 10) || 60;
  const canProceed = formData.height !== '';

  return (
    <StepContainer>
      <h2>How tall are you?</h2>

      <input
        type="range"
        id="height"
        name="height"
        min={48}
        max={96}
        value={currentHeight}
        onChange={(e) => updateFormData({ height: e.target.value })}
      />
      <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
        <span>{currentHeight}&quot;</span>
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
