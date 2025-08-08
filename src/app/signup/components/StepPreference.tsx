'use client';

import React, { useState } from 'react';
import StepContainer from './common/StepContainer';
import { patchProfile } from '@/lib/api';

interface StepProps {
  formData: { preference: string };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PREF_OPTIONS = [
  { value: 'women', label: 'Women' },
  { value: 'men', label: 'Men' },
  { value: 'both', label: 'Both' },
  { value: 'not_sure', label: 'Not sure' },
];

export default function Step4_Preference({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const selectPref = async (value: string) => {
    setErr(null);
    setLoading(true);
    try {
      updateFormData({ preference: value });
      await patchProfile({ preference: value });
      nextStep();
    } catch (e: any) {
      setErr(e.message || 'Failed to save preference');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepContainer>
      <h2>Who are you interested in?</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <div className="option-list">
        {PREF_OPTIONS.map(({ value, label }) => (
          <div
            key={value}
            className={`option-item ${formData.preference === value ? 'selected' : ''} ${loading ? 'disabled' : ''}`}
            onClick={() => !loading && selectPref(value)}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={prevStep} className="button-secondary">Back</button>
      </div>
    </StepContainer>
  );
}
