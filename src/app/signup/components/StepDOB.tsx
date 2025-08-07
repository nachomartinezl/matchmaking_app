'use client';

import StepContainer from './common/StepContainer';

interface StepDOBProps {
  formData: {
    dob: string;
  };
  updateFormData: ( Partial<StepDOBProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function StepDOB({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: StepDOBProps) {
  const canProceed = formData.dob.trim() !== '';

  return (
    <StepContainer>
      <h2>When's your birthday?</h2>
      <p>Please enter your date of birth.</p>

      <label htmlFor="dob">Date of Birth</label>
      <input
        id="dob"
        type="date"
        value={formData.dob}
        onChange={(e) => updateFormData({ dob: e.target.value })}
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
