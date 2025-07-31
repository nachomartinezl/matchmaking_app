'use client';

import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  // show progress as (currentStep + 1) of total
  const percent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div
      style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        overflow: 'hidden',
        margin: '1rem 0',
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          height: '100%',
          backgroundColor: '#3b82f6',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
}
