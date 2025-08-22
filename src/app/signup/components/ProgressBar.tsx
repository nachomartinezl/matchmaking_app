'use client';

import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${percent}%`,
          }}
        />
        <div
          className={styles.progressThumb}
          style={{
            left: `${percent}%`,
          }}
        />
      </div>
    </div>
  );
}
