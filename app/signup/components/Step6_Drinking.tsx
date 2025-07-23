'use client';

interface StepProps {
  formData: {
    drinking: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step6_Drinking({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const options = [
    { value: 'often', label: 'Often' },
    { value: 'on_holidays', label: 'On holidays' },
    { value: 'sometimes', label: 'Sometimes' },
    { value: 'never', label: 'Never' },
    { value: 'skip', label: 'Skip' },
  ];

  const select = (value: string) => {
    updateFormData({ drinking: value });
    nextStep();
  };

  return (
    <div className="form-step space-y-6">
      <h2>Do you drink?</h2>

      <div className="option-list">
        {options.map(({ value, label }) => (
          <div
            key={value}
            className={`option-item ${
              formData.drinking === value ? 'selected' : ''
            }`}
            onClick={() => select(value)}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={prevStep} className="button-secondary">
          Back
        </button>
      </div>
    </div>
  );
}
