"use client";

import React, { useState } from "react";
import StepContainer from "./common/StepContainer";
import { profileSchema } from "@/lib/validationSchemas";
import { FormData } from "../types";

const stepSchema = profileSchema.pick({ description: true });

interface StepProps {
  formData: Pick<FormData, "description">;
  updateFormData: (data: Partial<Pick<FormData, "description">>) => void;
  handleSubmit: () => void; // The final submission function from the parent
  prevStep: () => void;
  isSubmitting: boolean;
}

export default function Step_ShortBio({
  formData,
  updateFormData,
  handleSubmit,
  prevStep,
  isSubmitting,
}: StepProps) {
  const [error, setError] = useState<string | undefined>();
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ description: e.target.value });
    // Clear error as the user types
    if (error) setError(undefined);
  };

  const validateAndSubmit = () => {
    // --- PATTERN STEP 5: Validate the data before final submission ---
    const result = stepSchema.safeParse(formData);

    if (!result.success) {
      // If validation fails, show the error and stop
      setError(result.error.flatten().fieldErrors.description?.[0]);
      return;
    }

    // --- PATTERN STEP 6: If validation succeeds, clear errors and call the parent's handleSubmit ---
    setError(undefined);
    handleSubmit();
  };

  return (
    <StepContainer>
      <h2>Tell us a bit about yourself</h2>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleTextChange}
        placeholder="I am awesome because..."
        disabled={isSubmitting}
      />

      <div className="button-group">
        <button
          onClick={prevStep}
          className="button-secondary"
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          onClick={validateAndSubmit}
          className="button-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Finishing..." : "Finish Sign Up"}
        </button>
      </div>
    </StepContainer>
  );
}
