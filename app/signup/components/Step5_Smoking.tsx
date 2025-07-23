'use client';

interface StepProps {
  formData: {
    smoking: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step5_Smoking({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const options = [
    { value: 'regularly', label: 'Regularly' },
    { value: 'when_drink', label: 'When drink' },
    { value: 'sometimes', label: 'Sometimes' },
    { value: 'never', label: 'Never' },
    { value: 'skip', label: 'Skip' },
  ];

  const select = (value: string) => {
    updateFormData({ smoking: value });
    nextStep();
  };

  return (
    <div className="form-step space-y-6">
      <h2>Do you smoke?</h2>

      <div className="option-list">
        {options.map(({ value, label }) => (
          <div
            key={value}
            className={`option-item ${
              formData.smoking === value ? 'selected' : ''
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
