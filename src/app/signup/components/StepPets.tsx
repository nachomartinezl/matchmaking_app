"use client";

import React, { useState } from "react";
import StepContainer from "./common/StepContainer";
// --- `patchProfile` is no longer needed ---
// --- Import our types for full type safety ---
import { profileSchema } from "@/lib/validationSchemas";
import { FormData } from "../types";

// Create a specific schema for this step
const stepSchema = profileSchema.pick({ pets: true });

// We can derive the pet options from the backend model's enum type if we want,
// but for now, a static array is clear and simple.
const PET_OPTIONS = [
  "birds", "cats", "dogs", "fish", "hamsters",
  "rabbits", "snakes", "turtles", "none",
];

interface StepProps {
  formData: Pick<FormData, 'pets'>;
  updateFormData: (data: Partial<Pick<FormData, 'pets'>>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function StepPets({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: StepProps) {
  // --- `loading` state is removed, `err` is now for local validation ---
  const [error, setError] = useState<string | undefined>();

  const selectedPets = formData.pets ?? [];

  const togglePet = (pet: string) => {
    // Clear any previous validation errors when the user interacts
    if (error) setError(undefined);

    let newPets: string[];
    if (pet === "none") {
      newPets = selectedPets.includes("none") ? [] : ["none"];
    } else {
      let currentPets = selectedPets.filter((p) => p !== "none");
      if (currentPets.includes(pet)) {
        newPets = currentPets.filter((p) => p !== pet);
      } else {
        newPets = [...currentPets, pet];
      }
    }
    updateFormData({ pets: newPets });
  };

  // --- The handler is now synchronous and only validates ---
  const handleNext = () => {
    const result = stepSchema.safeParse(formData);
    if (!result.success) {
      setError(result.error.flatten().fieldErrors.pets?.[0]);
      return; // Stop if invalid
    }
    setError(undefined);
    nextStep(); // Proceed without API call
  };

  return (
    <StepContainer>
      <h2>Do you have any pets?</h2>
      <p>Select all that apply.</p>
      
      {/* This error is now ONLY for Zod validation */}
      {error && <p className="error-message" style={{ textAlign: 'center' }}>{error}</p>}
      
      <div className="option-list">
        {PET_OPTIONS.map((pet) => (
          <div
            key={pet}
            // `disabled` class is removed
            className={`option-item ${selectedPets.includes(pet) ? "selected" : ""}`}
            onClick={() => togglePet(pet)}
          >
            {pet.charAt(0).toUpperCase() + pet.slice(1)}
          </div>
        ))}
      </div>

      <div className="button-group">
        {/* `disabled` prop is removed */}
        <button onClick={prevStep} className="button-secondary">
          Back
        </button>
        <button
          onClick={handleNext}
          className="button-primary"
          // Disable button only if no selection has been made (for better UX)
          disabled={selectedPets.length === 0}
        >
          Next
        </button>
      </div>
    </StepContainer>
  );
}