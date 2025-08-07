'use client';

import React from 'react';
import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    height: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step5_Height({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const totalInches = parseInt(formData.height, 10) || 0;

  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;

  const handleFeetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFeet = parseInt(e.target.value, 10) || 0;
    const newTotalInches = newFeet * 12 + inches;
    updateFormData({ height: String(newTotalInches) });
  };

  const handleInchesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInches = parseInt(e.target.value, 10) || 0;
    const newTotalInches = feet * 12 + newInches;
    updateFormData({ height: String(newTotalInches) });
  };

  // The previous slider had a min of 48 inches (4') and max of 96 inches (8').
  // We'll enforce a similar validation rule for proceeding.
  const canProceed = totalInches >= 48 && totalInches <= 96;

  return (
    <StepContainer>
      <h2>How tall are you?</h2>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="feet">Feet</label>
          <input
            type="number"
            id="feet"
            name="feet"
            value={feet || ''}
            onChange={handleFeetChange}
            placeholder="e.g., 5"
            min="4"
            max="8"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="inches">Inches</label>
          <input
            type="number"
            id="inches"
            name="inches"
            value={inches || ''}
            onChange={handleInchesChange}
            placeholder="e.g., 9"
            min="0"
            max="11"
          />
        </div>
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
