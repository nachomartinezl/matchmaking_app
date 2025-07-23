'use client';

interface StepProps {
  formData: {
    pets: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step4_Pets({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const options = [
    { value: 'birds', label: 'Birds' },
    { value: 'cats', label: 'Cats' },
    { value: 'dogs', label: 'Dogs' },
    { value: 'fish', label: 'Fish' },
    { value: 'hamsters', label: 'Hamsters' },
    { value: 'rabbits', label: 'Rabbits' },
    { value: 'snakes', label: 'Snakes' },
    { value: 'turtles', label: 'Turtles' },
    { value: 'none', label: 'None' },
    { value: 'skip', label: 'Skip' },
  ];

  const select = (value: string) => {
    updateFormData({ pets: value });
    nextStep();
  };

  return (
    <div className="form-step space-y-6">
      <h2>Do you have pets?</h2>

      <div className="option-list">
        {options.map(({ value, label }) => (
          <div
            key={value}
            className={`option-item ${
              formData.pets === value ? 'selected' : ''
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
