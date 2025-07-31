// app/signup/components/common/StepContainer.tsx
import React from 'react';

interface StepContainerProps {
  children: React.ReactNode;
}

export default function StepContainer({ children }: StepContainerProps) {
  return <div className="form-step space-y-6">{children}</div>;
}
