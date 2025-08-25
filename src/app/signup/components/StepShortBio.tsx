"use client";

import React, { useState } from "react";
import StepContainer from "./common/StepContainer";
import { profileSchema } from "@/lib/validationSchemas";
import { FormData } from "../types";

const stepSchema = profileSchema.pick({ description: true });

// --- Refined props: No more `handleSubmit` ---
interface StepProps {
  formData: Pick<FormData, "description">;
  updateFormData: (data: Partial<Pick<FormData, "description">>) => void;
  nextStep: () => void; // It now calls the standard `nextStep`
  prevStep: () => void;
  isSubmitting: boolean;
}

export default function StepShortBio({
  formData,
  updateFormData,
  nextStep, // Use nextStep instead of handleSubmit
  prevStep,
  isSubmitting,
}: StepProps) {
  const [error, setError] = useState<string | undefined>();
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ description: e.target.value });
    if (error) setError(undefined);
  };

  // --- The handler now validates and calls `nextStep` ---
  const handleNext = () => {
    // Treat an empty string as "not provided" for optional fields
    const dataToValidate = {
      description: formData.description?.trim() === '' ? undefined : formData.description
    };
    
    const result = stepSchema.safeParse(dataToValidate);

    if (!result.success) {
      setError(result.error.flatten().fieldErrors.description?.[0]);
      return;
    }

    setError(undefined);
    nextStep(); // Call the standard nextStep function
  };

  return (
    <StepContainer>
      <h2>Tell us a bit about yourself</h2>
      <textarea
        id="description"
        name="description"
        value={formData.description ?? ''}
        onChange={handleTextChange}
        placeholder="I am awesome because..."
        disabled={isSubmitting}
        rows={6}
      />

      {error && <p className="error-message">{error}</p>}
      
      <div className="button-group">
        <button
          onClick={prevStep}
          className="button-secondary"
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          onClick={handleNext} // Call the simplified handler
          className="button-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Finishing..." : "Finish Sign Up"}
        </button>
      </div>
    </StepContainer>
  );
}