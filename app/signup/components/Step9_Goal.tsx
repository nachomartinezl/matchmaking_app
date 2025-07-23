'use client';

interface StepProps {
  formData: { 
    goal: string 
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step9_Goal({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: StepProps) {
  const options = [
    { value: 'friends', label: 'Make new friends' },
    { value: 'casual', label: 'Something casual' },
    { value: 'relationship', label: 'A serious relationship' },
  ];

  const select = (value: string) => {
    updateFormData({ goal: value });
    nextStep();
  };

  return (
    <div className="form-step space-y-6">
      <h2>What are you looking for?</h2>

      <div className="option-list">
        {options.map(({ value, label }) => (
          <div
            key={value}
            className={`option-item ${
              formData.goal === value ? 'selected' : ''
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
