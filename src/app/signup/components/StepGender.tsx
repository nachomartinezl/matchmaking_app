"use client";

import React, { useState } from "react";
import StepContainer from "./common/StepContainer";
import { patchProfile } from "@/lib/api";
import { FormData, Gender } from "../types";

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "other", label: "Other" },
];

interface StepProps {
  formData: Pick<FormData, "gender">;
  updateFormData: (data: Partial<Pick<FormData, "gender">>) => void;
  nextStep: () => void;
}

export default function Step_Gender({
  formData,
  updateFormData,
  nextStep,
}: StepProps) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSelect = async (value: Gender) => {
    if (loading) return;
    setErr(null);
    setLoading(true);

    try {
      // Update form locally first for responsiveness
      updateFormData({ gender: value });

      // Send patch to backend
      await patchProfile({ gender: value });

      // Move to next step only if backend update succeeded
      nextStep();
    } catch (e: any) {
      setErr(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepContainer>
      <h2>How do you identify?</h2>
      {err && <p className="error-message" style={{textAlign: 'center', marginTop: '0', marginBottom: '1rem'}}>{err}</p>}
      <div className="option-list">
        {GENDER_OPTIONS.map(({ value, label }) => (
          <div
            key={value}
            className={`option-item ${formData.gender === value ? 'selected' : ''} ${loading ? 'disabled' : ''}`}
            onClick={() => handleSelect(value)}
          >
            {label}
          </div>
        ))}
      </div>
    </StepContainer>
  );
}
