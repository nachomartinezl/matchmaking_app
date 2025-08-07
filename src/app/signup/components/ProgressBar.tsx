'use client';

import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  // This outer div centers the progress bar and gives it a max-width
  // to match the form-container below it, ensuring responsiveness.
  return (
    <div
      style={{
        maxWidth: '500px',
        width: '90%',
        margin: '1rem auto 2rem auto',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '8px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            backgroundColor: '#e056fd',
            transition: 'width 0.3s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${percent}%`,
            transform: 'translate(-50%, -50%)',
            width: '16px',
            height: '16px',
            backgroundColor: '#e056fd',
            border: '2px solid white',
            borderRadius: '50%',
            transition: 'left 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
