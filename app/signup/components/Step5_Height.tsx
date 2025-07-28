'use client';

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
  const canProceed = formData.height !== '';

  return (
    <StepContainer>
      <h2>Height</h2>
      <label htmlFor="height">Height (in inches)</label>
      <input
        type="number"
        id="height"
        name="height"
        value={formData.height}
        onChange={(e) => updateFormData({ height: e.target.value })}
        placeholder="e.g., 70"
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
