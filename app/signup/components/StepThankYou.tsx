'use client';

import StepContainer from './common/StepContainer';

interface StepThankYouProps {
  nextStep: () => void;
}

export default function StepThankYou({ nextStep }: StepThankYouProps) {
  return (
    <StepContainer>
      <h2>Thanks for signing up!</h2>
      <p>Now complete your profile.</p>

      <div className="button-group">
        <button onClick={nextStep} className="button-primary">
          Start
        </button>
      </div>
    </StepContainer>
  );
}
