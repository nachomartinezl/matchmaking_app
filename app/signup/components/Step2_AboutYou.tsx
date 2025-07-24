'use client';

import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    country: string;
    preference: string;
    height: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step2_AboutYou({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  return (
    <StepContainer>
      <h2>About You</h2>
      <label htmlFor="country">Country of Origin</label>
      <input
        type="text"
        id="country"
        name="country"
        value={formData.country}
        onChange={(e) => updateFormData({ country: e.target.value })}
        placeholder="e.g., Brazil"
      />

      <label>I am interested in...</label>
      <select
        name="preference"
        value={formData.preference}
        onChange={(e) => updateFormData({ preference: e.target.value })}
      >
        <option value="">Select preference</option>
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="both">Both</option>
      </select>

      <label htmlFor="height">Height (in cm)</label>
      <input
        type="number"
        id="height"
        name="height"
        value={formData.height}
        onChange={(e) => updateFormData({ height: e.target.value })}
        placeholder="e.g., 175"
      />

      <div className="button-group">
        <button onClick={prevStep} className="button-secondary">
          Back
        </button>
        <button onClick={nextStep} className="button-primary">
          Next
        </button>
      </div>
    </StepContainer>
  );
}