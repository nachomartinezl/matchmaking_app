// app/signup/components/Step4_Goal.tsx
'use client';

// Define the component's props
interface StepProps {
  formData: { goal: string };
  updateFormData: (data: Partial<{ goal: string }>) => void;
  handleSubmit: () => void;
  prevStep: () => void;
  isSubmitting: boolean; // <-- THE FIX: Add this line
}

export default function Step4_Goal({
  formData,
  updateFormData,
  handleSubmit,
  prevStep,
  isSubmitting, // <-- THE FIX: Destructure the new prop
}: StepProps) {
  const options = [
    { value: 'friends', label: 'Make new friends' },
    { value: 'casual', label: 'Something casual' },
    { value: 'relationship', label: 'A serious relationship' },
  ];

  const select = (value: string) => updateFormData({ goal: value });

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
            // Prevent changing selection while submitting
            onClick={() => !isSubmitting && select(value)}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="button-group">
        <button 
          onClick={prevStep} 
          className="button-secondary"
          disabled={isSubmitting} // Disable during submission
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="button-primary"
          // Disable if no goal is selected OR if it's currently submitting
          disabled={!formData.goal || isSubmitting}
        >
          {isSubmitting ? 'Finishing...' : 'Finish Sign Up'}
        </button>
      </div>
    </div>
  );
}