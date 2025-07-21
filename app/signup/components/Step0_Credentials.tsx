// app/signup/components/Step0_Credentials.tsx
'use client';

interface StepProps {
  formData: {
    email: string;
    password: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
}

export default function Step0_Credentials({ formData, updateFormData, nextStep }: StepProps) {
  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canProceed = isEmailValid(formData.email) && formData.password.length >= 8;

  return (
    // We use a React Fragment <> because no extra div is needed.
    // Your CSS handles all the margins on the elements themselves.
    <>
      <h2>Create Your Account</h2>
      <p>Let's start with the basics to secure your account.</p>

      {/* NO DIV WRAPPER HERE */}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        required
      />

      {/* NO DIV WRAPPER HERE */}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="At least 8 characters"
        value={formData.password}
        onChange={(e) => updateFormData({ password: e.target.value })}
        required
      />

      <div className="button-group" style={{ justifyContent: 'flex-end' }}>
        <button
          onClick={nextStep}
          className="button-primary"
          disabled={!canProceed}
        >
          Next
        </button>
      </div>
    </>
  );
}