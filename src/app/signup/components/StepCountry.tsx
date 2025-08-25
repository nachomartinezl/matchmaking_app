'use client';

import StepContainer from './common/StepContainer';
// --- Removed `useState` and `patchProfile` as they are no longer needed
// --- Import the specific types we need for full type safety
import { FormData, Preference } from '../types';

// --- Type our options array with the specific `Preference` type
// This guarantees the `value` is always a valid preference option.
const PREF_OPTIONS: { value: Preference; label: string }[] = [
  { value: 'women', label: 'Women' },
  { value: 'men', label: 'Men' },
  { value: 'both', label: 'Both' },
  { value: 'not_sure', label: 'Not sure' },
];

// --- Refined props using our central FormData type ---
interface StepProps {
  formData: Pick<FormData, 'preference'>;
  updateFormData: (data: Partial<Pick<FormData, 'preference'>>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function StepPreference({ 
  formData, 
  updateFormData, 
  nextStep, 
  prevStep 
}: StepProps) {
  // --- All state is removed. This is now a "dumb" component. ---
  // const [loading, setLoading] = useState(false); // REMOVED
  // const [err, setErr] = useState<string | null>(null); // REMOVED

  // --- The handler is now a simple, synchronous function ---
  const handleSelect = (value: Preference) => {
    updateFormData({ preference: value });
    nextStep(); // Immediately proceed to the next step
  };

  return (
    <StepContainer>
      <h2>Who are you interested in?</h2>
      
      {/* Error display is removed, as this component no longer makes API calls */}

      <div className="option-list">
        {PREF_OPTIONS.map(({ value, label }) => (
          <div
            key={value}
            // The `disabled` class is removed as there's no loading state
            className={`option-item ${formData.preference === value ? 'selected' : ''}`}
            // The call is now simple and fully type-safe
            onClick={() => handleSelect(value)}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="button-group">
        {/* The `disabled` prop is removed as there's no loading state */}
        <button onClick={prevStep} className="button-secondary">
          Back
        </button>
      </div>
    </StepContainer>
  );
}