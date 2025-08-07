'use client';

import React from 'react';
import StepContainer from './common/StepContainer';

export default function StepComingSoon() {
  return (
    <StepContainer>
      <h2>Thank you for signing up!</h2>
      <p
        style={{
          textAlign: 'center',
          maxWidth: '400px',
          margin: '1rem auto 0',
        }}
      >
        Please check your email to verify your account.
      </p>
      <br />
      <p style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
        Due to high demand, we are currently limiting access to the platform. We
        will notify you by email as soon as you can access your account.
      </p>
    </StepContainer>
  );
}
