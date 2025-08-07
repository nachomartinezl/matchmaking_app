'use client';

import React from 'react';
import StepContainer from './common/StepContainer';

interface StepProps {
  formData: {
    pets: string[];
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
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
    const pets = formData.pets.includes(pet)
      ? formData.pets.filter((p) => p !== pet)
      : [...formData.pets, pet];
    updateFormData({ pets });
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
