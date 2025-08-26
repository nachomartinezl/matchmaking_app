"use client";

import { useState } from "react"; // Import useState
import StepContainer from "./common/StepContainer";
import { profileSchema } from "@/lib/validationSchemas";
import { FormData, CommonStepProps } from "../types";

const stepSchema = profileSchema.pick({ email: true });

interface StepProps {
  formData: Pick<FormData, "email">;
  updateFormData: (data: Partial<Pick<FormData, "email">>) => void;
  nextStep: () => void;
  isSubmitting: boolean;
  errors: CommonStepProps["errors"]; // Use the type from CommonStepProps
}

export default function StepCredentials({
  formData,
  updateFormData,
  nextStep,
  isSubmitting,
  errors,
}: StepProps) {
  const [localError, setLocalError] = useState<string | undefined>();
  const handleNext = () => {
    const result = stepSchema.safeParse(formData);
    if (!result.success) {
      setLocalError(result.error.flatten().fieldErrors.email?.[0]);
      return; // Stop
    }
    setLocalError(undefined);
    nextStep();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // We'll also trigger validation on Enter key press
    if (e.key === "Enter" && !isSubmitting) {
      e.preventDefault();
      handleNext();
    }
  };

  const displayError = errors.email || localError;

  return (
    <StepContainer>
      <h2>What&apos;s your email?</h2>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={(e) => {
          updateFormData({ email: e.target.value.trimStart() });
          // Clear local error as user types
          if (localError) setLocalError(undefined);
        }}
        onKeyDown={onKeyDown}
        disabled={isSubmitting}
        required
        autoComplete="email"
        style={{ marginBottom: '0.5rem' }}
      />

      {displayError && (
          <p style={{
            color: "var(--accent)",
            fontSize: '0.9rem',
            textAlign: 'left',
            margin: 0, // Remove default paragraph margins
            paddingLeft: '0.25rem', // Small indent
          }}>
            {displayError}
          </p>
        )}

      <div className="button-group" style={{ justifyContent: "flex-end" }}>
        <button
          onClick={handleNext}
          className="button-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account" : "Next"}
        </button>
      </div>
    </StepContainer>
  );
}
