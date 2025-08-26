'use client';

import StepContainer from './StepContainer';
import { FormData } from '../../types';

interface Option<V> {
  value: V;
  label: string;
}

interface OptionStepProps<K extends keyof FormData> {
  title: string;
  options: Option<NonNullable<FormData[K]>>[];
  field: K;
  selected: FormData[K] | undefined;
  // It receives the standard props now, not a custom onSelect
  updateFormData: (data: Partial<Pick<FormData, K>>) => void;
  nextStep: () => void;
  onBack: () => void;
}

export default function OptionStep<K extends keyof FormData>({
  title,
  options,
  field,
  selected,
  updateFormData,
  nextStep,
  onBack,
}: OptionStepProps<K>) {
  // This component is now correctly stateless. No API calls, no loading.

  const handleClick = (value: NonNullable<FormData[K]>) => {
    // The `as any` is a safe workaround for a TypeScript limitation.
    updateFormData({ [field]: value } as Partial<Pick<FormData, K>>);
    nextStep(); // Immediately proceed to the next step
  };

  return (
    <StepContainer>
      <h2>{title}</h2>
      
      <div className="option-list">
        {options.map(({ value, label }) => (
          <div
            key={String(value)}
            className={`option-item ${selected === value ? 'selected' : ''}`}
            onClick={() => handleClick(value)}
          >
            {label}
          </div>
        ))}
      </div>
      
      <div className="button-group">
        <button onClick={onBack} className="button-secondary">
          Back
        </button>
      </div>
    </StepContainer>
  );
}