'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { signupSteps } from './signupSteps';
import ProgressBar from './components/ProgressBar';
import { FormData, CommonStepProps } from './types';

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    surname: '',
    dob: '',
    gender: '',
    country: '',
    preference: '',
    height: '',
    religion: '',
    pets: [],
    smoking: '',
    drinking: '',
    kids: '',
    maritalStatus: '',
    goal: '',
    profilePicture: null,
    gallery: [],
    description: '',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      console.log('Final Form Data:', formData);
      await new Promise((res) => setTimeout(res, 1500));
      router.push('/login');
    } catch (err) {
      setError('Something went wrong during sign up. Please try again.');
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    // Find the configuration for the current step
    const currentStepConfig = signupSteps.find((s) => s.id === step);

    // If no configuration is found, something is wrong
    if (!currentStepConfig) {
      return <p>Invalid step!</p>;
    }

    const { component: StepComponent, props: stepProps } = currentStepConfig;

    // These are the props that are common to all step components
    const commonProps: CommonStepProps = {
      formData,
      updateFormData,
      nextStep,
      prevStep,
      isSubmitting,
      handleSubmit,
    };

    // The OptionStep component has a different props structure
    if (currentStepConfig.component.name === 'OptionStep') {
      return (
        <StepComponent
          {...stepProps}
          selected={formData[stepProps.field as keyof FormData]}
          onSelect={(value: string) => {
            updateFormData({ [stepProps.field]: value });
            nextStep();
          }}
          onBack={prevStep}
        />
      );
    }

    // Render the step component with the common props
    return <StepComponent {...commonProps} />;
  };

  return (
    <>
      <h1>{step < 4 ? 'Join us' : 'Create Your Profile'}</h1>
      <ProgressBar currentStep={step} totalSteps={16} />

      <div className="form-container">
        {renderCurrentStep()}

        {error && (
          <p style={{ color: '#ff5555', marginTop: '1rem', textAlign: 'center' }}>
            {error}
          </p>
        )}
      </div>
    </>
  );
}
