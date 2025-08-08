'use client';

import React, { useState } from 'react';
import StepContainer from './common/StepContainer';
import { patchProfile } from '@/lib/api';

interface StepProps {
  formData: { height_feet?: number; height_inches?: number };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step5_Height({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const feet = formData.height_feet ?? 0;
  const inches = formData.height_inches ?? 0;

  const canProceed = feet >= 4 && feet <= 8 && inches >= 0 && inches <= 11;

  const handleChange = (k: 'height_feet' | 'height_inches') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = Math.max(0, parseInt(e.target.value, 10) || 0);
    updateFormData({ [k]: n });
  };

  const handleNext = async () => {
    if (!canProceed || loading) return;
    setErr(null);
    setLoading(true);
    try {
      await patchProfile({ height_feet: feet, height_inches: inches });
      nextStep();
    } catch (e: any) {
      setErr(e.message || 'Failed to save height');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepContainer>
      <h2>How tall are you?</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="feet">Feet</label>
          <input id="feet" type="number" min={4} max={8} value={feet || ''} onChange={handleChange('height_feet')} />
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="inches">Inches</label>
          <input id="inches" type="number" min={0} max={11} value={inches || ''} onChange={handleChange('height_inches')} />
        </div>
      </div>

      <div className="button-group">
        <button onClick={prevStep} className="button-secondary">Back</button>
        <button onClick={handleNext} className="button-primary" disabled={!canProceed || loading}>
          {loading ? 'Saving…' : 'Next'}
        </button>
      </div>
    </StepContainer>
  );
}
