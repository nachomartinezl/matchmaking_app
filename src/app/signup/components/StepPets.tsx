'use client';

import React from 'react';
import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    pets: string[];
  };
  updateFormData: ( Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PET_OPTIONS = [
  'Birds',
  'Cats',
  'Dogs',
  'Fish',
  'Hamsters',
  'Rabbits',
  'Snakes',
  'Turtles',
  'None'
];

export default function Step7_Pets({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const togglePet = (pet: string) => {
    const currentPets = formData.pets;

    if (pet === 'None') {
      // If 'None' is clicked, either select only 'None' or clear selection.
      const newPets = currentPets.includes('None') ? [] : ['None'];
      updateFormData({ pets: newPets });
      return;
    }

    // If another pet is clicked:
    // 1. Remove 'None' if it's there.
    // 2. Toggle the clicked pet.
    const petsWithoutNone = currentPets.filter((p) => p !== 'None');

    const newPets = petsWithoutNone.includes(pet)
      ? petsWithoutNone.filter((p) => p !== pet) // deselect
      : [...petsWithoutNone, pet]; // select

    updateFormData({ pets: newPets });
  };

  return (
    <StepContainer>
      <h2>Do you have any pets?</h2>
      <div className="option-list">
        {PET_OPTIONS.map((pet) => (
          <div
            key={pet}
            className={`option-item ${formData.pets.includes(pet) ? 'selected' : ''}`}
            onClick={() => togglePet(pet)}
          >
            {pet}
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={prevStep} className="button-secondary">
          Back
        </button>
        <button onClick={nextStep} className="button-primary">
          Next
        </button>
      </div>
    </StepContainer>
  );
}
