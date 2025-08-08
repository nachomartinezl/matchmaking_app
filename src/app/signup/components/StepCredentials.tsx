'use client';

import { useState } from 'react';
import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    name: string;       // first name (from earlier step)
    surname: string;    // last name  (from earlier step)
    dob: string;        // YYYY-MM-DD (from earlier step)
    email: string;      // this step
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void; // goes to Thank You (then to profile steps)
}

export default function Step0_Credentials({ formData, updateFormData, nextStep }: StepProps) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canProceed =
    !!formData.name &&
    !!formData.surname &&
    !!formData.dob &&
    isEmailValid(formData.email);

  const handleNext = async () => {
    setErr(null);
    if (!canProceed) return;

    setLoading(true);
    try {
      const payload = {
        first_name: formData.name,
        last_name: formData.surname,
        dob: formData.dob,            // "YYYY-MM-DD"
        email: formData.email.trim(),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Failed to start profile');
      }

      const { id } = await res.json(); // { id: UUID }
      localStorage.setItem('profile_id', id);
      localStorage.setItem('email', payload.email);

      // Move to Thank You (then your flow swaps to profile steps)
      nextStep();
    } catch (e: any) {
      setErr(e.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && canProceed && !loading) {
      e.preventDefault();
      handleNext();
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
        required
      />

      {err && <p style={{ color: 'red', marginTop: 8 }}>{err}</p>}

      <div className="button-group" style={{ justifyContent: 'flex-end' }}>
        <button
          onClick={handleNext}
          className="button-primary"
          disabled={!canProceed || loading}
        >
          {loading ? 'Sending…' : 'Next'}
        </button>
      </div>
    </StepContainer>
  );
}
