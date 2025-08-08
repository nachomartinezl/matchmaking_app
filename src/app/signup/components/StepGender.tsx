'use client';

import React, { useState } from 'react';
import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    gender: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
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
    setErr(null);
    setLoading(true);

    try {
      const profileId = localStorage.getItem('profile_id');
      if (!profileId) throw new Error('Profile not found. Please start over.');

      // Update form locally
      updateFormData({ gender: value });

      // Send patch to backend
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profiles/${profileId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gender: value }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Failed to update gender');
      }

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
            onClick={() => !loading && handleSelect(value)}
          >
            {label}
          </div>
        ))}
      </div>
    </StepContainer>
  );
}
