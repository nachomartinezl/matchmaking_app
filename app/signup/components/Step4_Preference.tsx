'use client';

import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    preference: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step4_Preference({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const canProceed = formData.preference !== '';

  return (
    <StepContainer>
      <h2>Sexual Preference</h2>
      <label htmlFor="preference">I am interested in...</label>
      <select
        id="preference"
        name="preference"
        value={formData.preference}
        onChange={(e) => updateFormData({ preference: e.target.value })}
      >
        <option value="">Select preference</option>
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="both">Both</option>
      </select>

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
