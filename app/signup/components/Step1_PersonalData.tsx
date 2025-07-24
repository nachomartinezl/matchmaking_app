// app/signup/components/Step1_PersonalData.tsx
'use client';

import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    name: string;
    surname: string;
    dob: string;
    gender: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step1_PersonalData({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: StepProps) {
  const canProceed = formData.name && formData.surname && formData.dob && formData.gender;

  return (
    <StepContainer>
      <h2>Tell us about yourself</h2>
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