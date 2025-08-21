'use client';

import React, { useState } from 'react';
import StepContainer from './common/StepContainer';
import { patchProfile } from '@/lib/api';

interface StepProps {
  formData: {
    gender: string;
  };
  updateFormData: ( Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'other', label: 'Other' },
];

export default function Step2_Gender({
  formData,
  updateFormData,
  nextStep,
}: StepProps) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSelect = async (value: string) => {
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
      setErr(e.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepContainer>
      <h2>How do you identify?</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <div className="option-list">
        {GENDER_OPTIONS.map(({ value, label }) => (
          <div
            key={value}
            className={`option-item ${
              formData.gender === value ? 'selected' : ''
            } ${loading ? 'disabled' : ''}`}
            onClick={() => handleSelect(value)}
          >
            {label}
          </div>
        ))}
      </div>
    </StepContainer>
  );
}
