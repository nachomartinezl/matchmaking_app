'use client';

import { useState } from 'react';
import StepContainer from './common/StepContainer';
import { profileSchema } from '@/lib/validationSchemas';
import { FormData } from '../types';

const stepSchema = profileSchema.pick({ name: true, surname: true });

interface StepProps {
  // Use Pick to get only the fields this component cares about from the main FormData type
  formData: Pick<FormData, 'name' | 'surname'>;
  updateFormData: (data: Partial<Pick<FormData, 'name' | 'surname'>>) => void;
  nextStep: () => void;
  // This component doesn't use prevStep, so we can omit it from props
}

export default function Step1_PersonalData({
  formData,
  updateFormData,
  nextStep,
}: StepProps) {
  const [errors, setErrors] = useState<{ name?: string; surname?: string }>({});

  const handleNext = () => {
    // 1. Validate the current form data
    const result = stepSchema.safeParse(formData);

    // 2. If validation fails, update the errors state
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        surname: fieldErrors.surname?.[0],
      });
      return; // Stop execution
    }

    // 3. If validation succeeds, clear any old errors and proceed
    setErrors({});
    nextStep();
  };

  const canProceed = formData.name.trim() !== '' && formData.surname.trim() !== '';

  return (
    <StepContainer>
      <h2>What&apos;s your name?</h2>
      <p>This information will be on your public profile.</p>

      <label htmlFor="name">First Name</label>
      <input
        id="name"
        type="text"
        value={formData.name}
        onChange={(e) => {
          updateFormData({ name: e.target.value });
          if (errors.name) {
            setErrors(prev => ({ ...prev, name: undefined }));
          }
        }}
        autoComplete="given-name"
      />

      {errors.name && <p className="error-message">{errors.name}</p>}

      <label htmlFor="surname">Last Name</label>
      <input
        id="surname"
        type="text"
        value={formData.surname}
        onChange={(e) => {
          updateFormData({ surname: e.target.value });
          if (errors.surname) {
            setErrors(prev => ({ ...prev, surname: undefined }));
          }
        }}
        autoComplete="family-name"
      />

      {errors.surname && <p className="error-message">{errors.surname}</p>}

      <div className="button-group">
        <button
          onClick={handleNext}
          className="button-primary"
          disabled={!canProceed}
        >
          Next
        </button>
      </div>
    </StepContainer>
  );
}
