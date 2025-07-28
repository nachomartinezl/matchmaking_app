'use client';

import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    country: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step3_Country({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const canProceed = formData.country !== '';

  return (
    <StepContainer>
      <h2>Country of Origin</h2>
      <label htmlFor="country">Country of Origin</label>
      <input
        type="text"
        id="country"
        name="country"
        value={formData.country}
        onChange={(e) => updateFormData({ country: e.target.value })}
        placeholder="e.g., Brazil"
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
