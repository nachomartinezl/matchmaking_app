// app/signup/components/common/OptionStep.tsx
'use client';

import StepContainer from './StepContainer';

interface Option {
  value: string;
  label: string;
}

interface OptionStepProps {
  title: string;
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
  onBack: () => void;
}

export default function OptionStep({ title, options, selected, onSelect, onBack }: OptionStepProps) {
  return (
    <StepContainer>
      <h2>{title}</h2>
      <div className="option-list">
        {options.map(({ value, label }) => (
          <div
            key={value}
            className={`option-item ${selected === value ? 'selected' : ''}`}
            onClick={() => onSelect(value)}
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
