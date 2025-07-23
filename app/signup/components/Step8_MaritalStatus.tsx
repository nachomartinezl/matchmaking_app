'use client';

interface StepProps {
  formData: {
    maritalStatus: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step8_MaritalStatus({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const options = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'in_relationship', label: 'In a relationship' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'separated', label: 'Separated' },
    { value: 'skip', label: 'Skip' },
  ];

  const select = (value: string) => {
    updateFormData({ maritalStatus: value });
    nextStep();
  };

  return (
    <div className="form-step space-y-6">
      <h2>What is your marital status?</h2>

      <div className="option-list">
        {options.map(({ value, label }) => (
          <div
            key={value}
            className={`option-item ${
              formData.maritalStatus === value ? 'selected' : ''
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
