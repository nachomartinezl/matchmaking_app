'use client';

import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    email: string;
  };
  updateFormData: ( Partial<StepProps['formData']>) => void;
  nextStep: () => void;
}

export default function Step0_Credentials({ formData, updateFormData, nextStep }: StepProps) {
  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canProceed = isEmailValid(formData.email);

  return (
    <StepContainer>
      <h2>What's your email?</h2>
      <p>Please enter your email address.</p>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        required
      />

      <div className="button-group" style={{ justifyContent: 'flex-end' }}>
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
