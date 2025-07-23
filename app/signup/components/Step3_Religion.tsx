'use client';

interface StepProps {
  formData: {
    religion: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step3_Religion({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const options = [
    { value: 'atheism', label: 'Atheism' },
    { value: 'buddhism', label: 'Buddhism' },
    { value: 'christianity', label: 'Christianity' },
    { value: 'hinduism', label: 'Hinduism' },
    { value: 'islam', label: 'Islam' },
    { value: 'judaism', label: 'Judaism' },
    { value: 'other', label: 'Other' },
    { value: 'skip', label: 'Skip' },
  ];

  const select = (value: string) => {
    updateFormData({ religion: value });
    nextStep();
  };

  return (
    <div className="form-step space-y-6">
      <h2>Do you identify with a religion?</h2>

      <div className="option-list">
        {options.map(({ value, label }) => (
          <div
            key={value}
            className={`option-item ${
              formData.religion === value ? 'selected' : ''
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
