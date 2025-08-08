'use client';

import StepContainer from './StepContainer';
import { patchProfile } from '@/lib/api';
import { useState } from 'react';

interface Option { value: string; label: string; }
interface OptionStepProps {
  title: string;
  options: Option[];
  selected: string;
  onSelect: (value: string) => void; // still updates local form state
  onBack: () => void;
  field: string; // <- add this so we know what to patch
}

function normalize(field: string, value: string) {
  if (field === 'kids') {
    if (value === 'i_want') return 'i_want_to';
    if (value === 'i_dont_want') return 'i_do_not_want';
  }
  // goal already matches: 'friends' | 'casual' | 'relationship' | 'not_sure'
  return value;
}

export default function OptionStep({ title, options, selected, onSelect, onBack, field }: OptionStepProps) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleClick = async (value: string) => {
    if (loading) return;
    setErr(null);
    setLoading(true);
    try {
      const normalized = normalize(field, value);
      onSelect(normalized);
      await patchProfile({ [field]: normalized });
      // parent flow will call nextStep() after onSelect if you set it up that way,
      // or you can pass nextStep in and call it here.
    } catch (e: any) {
      setErr(e.message || 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepContainer>
      <h2>{title}</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <div className="option-list">
        {options.map(({ value, label }) => {
          const normalized = normalize(field, value);
          return (
            <div
              key={value}
              className={`option-item ${selected === normalized ? 'selected' : ''} ${loading ? 'disabled' : ''}`}
              onClick={() => handleClick(value)}
            >
              {label}
            </div>
          );
        })}
      </div>
      <div className="button-group">
        <button onClick={onBack} className="button-secondary">Back</button>
      </div>
    </StepContainer>
  );
}
