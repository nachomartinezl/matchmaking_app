'use client';

import { useState } from 'react';
import StepContainer from './common/StepContainer';
import { profileSchema } from '@/lib/validationSchemas';
import { FormData } from '../types';

const stepSchema = profileSchema.pick({ dob: true });

interface StepDOBProps {
  formData: Pick<FormData, 'dob'>;
  updateFormData: (data: Partial<Pick<FormData, 'dob'>>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function StepDOB({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: StepDOBProps) {
  const [error, setError] = useState<string | undefined>();
  const handleNext = () => {
    const result = stepSchema.safeParse(formData);
     if (!result.success) {
      // If validation fails, set the error message from Zod
      setError(result.error.flatten().fieldErrors.dob?.[0]);
      return; // Stop
    }

    setError(undefined);
    nextStep();
  };


  const canProceed = formData.dob.trim() !== '';

  return (
    <StepContainer>
      <h2>When&apos;s your birthday?</h2>
      <input
        id="dob"
        type="date"
        value={formData.dob}
        onChange={(e) => {
          updateFormData({ dob: e.target.value });
          // Clear error as user corrects it
          if (error) setError(undefined);
        }}
        max={new Date().toISOString().split("T")[0]}
      />

      {error && <p className="error-message">{error}</p>}

      <div className="button-group">
        <button onClick={prevStep} className="button-secondary">
          Back
        </button>
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
