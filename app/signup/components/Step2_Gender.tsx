'use client';

import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    gender: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step2_Gender({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const canProceed = formData.gender !== '';

  return (
    <StepContainer>
      <h2>Gender</h2>
      <label htmlFor="gender">Gender</label>
      <select
        id="gender"
        value={formData.gender}
        onChange={(e) => updateFormData({ gender: e.target.value })}
      >
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
        <option value="other">Other</option>
        <option value="prefer-not-to-say">Prefer not to say</option>
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
