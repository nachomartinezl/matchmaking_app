'use client';

import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    name: string;
    surname: string;
    dob: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step1_PersonalData({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const canProceed = formData.name !== '' && formData.surname !== '' && formData.dob !== '';

  return (
    <StepContainer>
      <h2>Name & Birthdate</h2>
      <p>This information will be on your public profile.</p>

      <label htmlFor="name">First Name</label>
      <input
        id="name"
        type="text"
        value={formData.name}
        onChange={(e) => updateFormData({ name: e.target.value })}
      />

      <label htmlFor="surname">Last Name</label>
      <input
        id="surname"
        type="text"
        value={formData.surname}
        onChange={(e) => updateFormData({ surname: e.target.value })}
      />

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
