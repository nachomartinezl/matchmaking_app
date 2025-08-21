'use client';

import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div
      style={{
        maxWidth: '600px',
        width: '90%',
        margin: '1.5rem auto 2.5rem auto',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '8px',
          backgroundColor: '#f0f0f0',
          borderRadius: '999px',
          boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.08)',
          // no overflow hidden so circle can overflow naturally
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #ff4d6d, #a96ff7)',
            borderRadius: '999px',
            boxShadow: '0 0 8px rgba(224, 86, 253, 0.4)',
            transition: 'width 0.4s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${percent}%`,
            transform: 'translate(-50%, -50%)',
            width: '18px',
            height: '18px',
            background: 'linear-gradient(135deg, #ff4d6d, #a96ff7)',
            border: '2px solid white',
            borderRadius: '50%',
            boxShadow: '0 0 6px rgba(224, 86, 253, 0.5)',
            transition: 'left 0.4s ease',
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}
