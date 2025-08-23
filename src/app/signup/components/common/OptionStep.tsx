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

export default function OptionStep({ title, options, selected, onSelect, onBack, field }: OptionStepProps) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleClick = async (value: string) => {
    if (loading) return;
    setErr(null);
    setLoading(true);
    try {
      onSelect(value);
      await patchProfile({ [field]: value });
    } catch (e) {
      if (e instanceof Error) {
        setErr(e.message);
      } else {
        setErr('Failed to save');
      }
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
          return (
            <div
              key={value}
              className={`option-item ${selected === value ? 'selected' : ''} ${loading ? 'disabled' : ''}`}
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
