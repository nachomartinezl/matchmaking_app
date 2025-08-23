'use client';

import { useState } from 'react';
import StepContainer from './StepContainer';
import { patchProfile } from '@/lib/api';
import { FormData } from '../../types';


interface Option<V> {
  value: V;
  label: string;
}

interface OptionStepProps<K extends keyof FormData> {
  title: string;
  options: Option<NonNullable<FormData[K]>>[]; // Use NonNullable to ensure value is not undefined
  field: K;
  selected: FormData[K] | undefined;
  updateFormData: (data: Partial<Pick<FormData, K>>) => void;
  nextStep: () => void;
  onBack: () => void;
}

export default function OptionStep<K extends keyof FormData, V>({
  title,
  options,
  field,
  selected,
  updateFormData,
  nextStep,
  onBack,
}: OptionStepProps<K>) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

   const handleClick = async (value: FormData[K]) => {
    if (loading) return;
    setErr(null);
    setLoading(true);
    try {
      // TypeScript can now prove that the `value` is the correct type for the `field`.
      // No `as` cast is needed.
      updateFormData({ [field]: value } as any);
      await patchProfile({ [field]: value });
      nextStep();
    } catch (e: any) {
      setErr(e.message || 'Failed to save selection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepContainer>
      <h2>{title}</h2>
      {err && <p className="error-message" style={{textAlign: 'center', marginTop: '0', marginBottom: '1rem'}}>{err}</p>}
      <div className="option-list">
        {options.map(({ value, label }) => (
          <div
            key={String(value)} // Ensure key is a string
            className={`option-item ${selected === value ? 'selected' : ''} ${loading ? 'disabled' : ''}`}
            onClick={() => handleClick(value)}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="button-group">
        <button onClick={onBack} className="button-secondary" disabled={loading}>
          Back
        </button>
      </div>
    </StepContainer>
  );
}
