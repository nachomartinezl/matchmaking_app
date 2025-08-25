"use client";

// No longer need useState or patchProfile
import StepContainer from "./common/StepContainer";
import { FormData, Gender } from "../types";

// The constants and types remain the same, they are already excellent.
const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "other", label: "Other" },
];

interface StepProps {
  formData: Pick<FormData, "gender">;
  updateFormData: (data: Partial<Pick<FormData, "gender">>) => void;
  nextStep: () => void;
  // No prevStep prop needed as it's the first step in this flow
}

export default function StepGender({ // Renamed for consistency
  formData,
  updateFormData,
  nextStep,
}: StepProps) {
  // --- START OF SIMPLIFICATION ---
  // No more loading or error state is needed.
  // const [loading, setLoading] = useState(false); // REMOVED
  // const [err, setErr] = useState<string | null>(null); // REMOVED

  // The handler is now a simple, synchronous function.
  const handleSelect = (value: Gender) => {
    updateFormData({ gender: value });
    nextStep(); // Immediately proceed to the next step
  };
  // --- END OF SIMPLIFICATION ---

  return (
    <StepContainer>
      <h2>How do you identify?</h2>
      
      {/* Error display is removed, as this component no longer makes API calls */}

      <div className="option-list">
        {GENDER_OPTIONS.map(({ value, label }) => (
          <div
            key={value}
            // The `disabled` class is removed as there's no loading state
            className={`option-item ${formData.gender === value ? "selected" : ""}`}
            onClick={() => handleSelect(value)}
          >
            {label}
          </div>
        ))}
      </div>
      
      {/* The button group is removed as there are no buttons at the bottom of this step */}
    </StepContainer>
  );
}