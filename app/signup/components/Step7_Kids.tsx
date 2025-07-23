'use client';

interface StepProps {
  formData: {
    kids: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step7_Kids({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const options = [
    { value: 'not_yet', label: 'Not yet' },
    { value: 'childfree', label: 'Childfree' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: 'more_than_3', label: 'More than 3' },
    { value: 'skip', label: 'Skip' },
  ];

  const select = (value: string) => {
    updateFormData({ kids: value });
    nextStep();
  };

  return (
    <div className="form-step space-y-6">
      <h2>Do you have kids?</h2>

      <div className="option-list">
        {options.map(({ value, label }) => (
          <div
            key={value}
            className={`option-item ${
              formData.kids === value ? 'selected' : ''
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
