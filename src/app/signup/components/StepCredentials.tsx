"use client";

import StepContainer from "./common/StepContainer";

interface StepProps {
  formData: {
    email: string;
  };
  updateFormData: ( Partial<StepProps["formData"]>) => void;
  nextStep: () => void;
  isSubmitting: boolean;
}

export default function Step0_Credentials({
  formData,
  updateFormData,
  nextStep,
  isSubmitting,
}: StepProps) {
  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const canProceed = isEmailValid(formData.email);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && canProceed && !isSubmitting) {
      e.preventDefault();
      nextStep();
    }
  };

  return (
    <StepContainer>
      <h2>What's your email?</h2>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value.trimStart() })}
        onKeyDown={onKeyDown}
        disabled={isSubmitting}
        required
      />

      <div className="button-group" style={{ justifyContent: "flex-end" }}>
        <button
          onClick={nextStep}
          className="button-primary"
          disabled={!canProceed || isSubmitting}
        >
          {isSubmitting ? "Creating account…" : "Next"}
        </button>
      </div>
    </StepContainer>
  );
}
