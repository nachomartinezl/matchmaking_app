'use client';

import React, { useState } from 'react';
import StepContainer from './common/StepContainer';
import { patchProfile } from '@/lib/api';

interface StepProps {
  formData: { pets: string[] }; // keeping your shape, but we’ll use first item
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PET_OPTIONS = ['birds','cats','dogs','fish','hamsters','rabbits','snakes','turtles','none'];

export default function Step7_Pets({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const selected = (formData.pets?.[0] || '').toLowerCase();

  const choose = async (value: string) => {
    if (loading) return;
    setErr(null);
    setLoading(true);
    try {
      // store locally as single-item array to not break your type
      updateFormData({ pets: [value] });
      await patchProfile({ pets: value }); // backend expects single enum
      nextStep();
    } catch (e: any) {
      setErr(e.message || 'Failed to save pets');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepContainer>
      <h2>Do you have any pets?</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <div className="option-list">
        {PET_OPTIONS.map((pet) => (
          <div
            key={pet}
            className={`option-item ${selected === pet ? 'selected' : ''} ${loading ? 'disabled' : ''}`}
            onClick={() => choose(pet)}
          >
            {pet[0].toUpperCase() + pet.slice(1)}
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={prevStep} className="button-secondary">Back</button>
      </div>
    </StepContainer>
  );
}
