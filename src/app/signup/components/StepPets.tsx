"use client";

import React, { useState } from "react";
import StepContainer from "./common/StepContainer";
import { patchProfile } from "@/lib/api";

interface StepProps {
  formData: { pets: string[] };
  updateFormData: (data: Partial<StepProps["formData"]>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PET_OPTIONS = [
  "birds",
  "cats",
  "dogs",
  "fish",
  "hamsters",
  "rabbits",
  "snakes",
  "turtles",
  "none",
];

export default function Step7_Pets({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: StepProps) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const selectedPets = formData.pets || [];

  const togglePet = (pet: string) => {
    if (loading) return;

    let newPets: string[];

    if (pet === "none") {
      // If 'none' is clicked, it becomes the only selection, or clears selection if already selected.
      newPets = selectedPets.includes("none") ? [] : ["none"];
    } else {
      // If another pet is clicked:
      // 1. remove 'none' if it was selected
      let currentPets = selectedPets.filter((p) => p !== "none");

      // 2. toggle the new pet
      if (currentPets.includes(pet)) {
        newPets = currentPets.filter((p) => p !== pet);
      } else {
        newPets = [...currentPets, pet];
      }
    }
    updateFormData({ pets: newPets });
  };

  const handleNext = async () => {
    if (loading || selectedPets.length === 0) return;
    setErr(null);
    setLoading(true);
    try {
      // Send the array of pets to the backend
      await patchProfile({ pets: selectedPets });
      nextStep();
    } catch (e: any) {
      setErr(e.message || "Failed to save pets");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepContainer>
      <h2>Do you have any pets?</h2>
      <p>Select all that apply.</p>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <div className="option-list">
        {PET_OPTIONS.map((pet) => (
          <div
            key={pet}
            className={`option-item ${
              selectedPets.includes(pet) ? "selected" : ""
            } ${loading ? "disabled" : ""}`}
            onClick={() => togglePet(pet)}
          >
            {pet[0].toUpperCase() + pet.slice(1)}
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={prevStep} className="button-secondary" disabled={loading}>
          Back
        </button>
        <button
          onClick={handleNext}
          className="button-primary"
          disabled={loading || selectedPets.length === 0}
        >
          {loading ? "Saving..." : "Next"}
        </button>
      </div>
    </StepContainer>
  );
}

