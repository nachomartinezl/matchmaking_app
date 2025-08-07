'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  initialSignupSteps,
  profileSetupSteps,
  ThankYouStepComponent,
} from './signupSteps';
import ProgressBar from './components/ProgressBar';
import { FormData, CommonStepProps } from './types';

export default function SignUpPage() {
  const router = useRouter();
  const [flow, setFlow] = useState<'initial' | 'thankyou' | 'profile'>(
    'initial'
  );
  const [stepIndex, setStepIndex] = useState(0);
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

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (flow === 'initial') {
      if (stepIndex < initialSignupSteps.length - 1) {
        setStepIndex((prev) => prev + 1);
      } else {
        setFlow('thankyou');
      }
    } else if (flow === 'thankyou') {
      setFlow('profile');
      setStepIndex(0);
    } else if (flow === 'profile') {
      if (stepIndex < profileSetupSteps.length - 1) {
        setStepIndex((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (flow === 'initial') {
      if (stepIndex > 0) {
        setStepIndex((prev) => prev - 1);
      }
    } else if (flow === 'profile') {
      if (stepIndex > 0) {
        setStepIndex((prev) => prev - 1);
      } else {
        setFlow('thankyou');
      }
    }
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
    let currentSteps;
    if (flow === 'initial') {
      currentSteps = initialSignupSteps;
    } else if (flow === 'profile') {
      currentSteps = profileSetupSteps;
    } else {
      // flow === 'thankyou'
      return <ThankYouStepComponent nextStep={nextStep} />;
    }

    const currentStepConfig = currentSteps.find((s) => s.id === stepIndex);

    if (!currentStepConfig) {
      return <p>Invalid step!</p>;
    }

    const { component: StepComponent, props: stepProps } = currentStepConfig;

    const commonProps: CommonStepProps = {
      formData,
      updateFormData,
      nextStep,
      prevStep,
      isSubmitting,
      handleSubmit,
    };

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

    return <StepComponent {...commonProps} />;
  };

  const getProgressBarProps = () => {
    if (flow === 'initial') {
      return {
        currentStep: stepIndex,
        totalSteps: initialSignupSteps.length,
      };
    }
    if (flow === 'thankyou') {
      return {
        currentStep: initialSignupSteps.length,
        totalSteps: initialSignupSteps.length,
      };
    }
    // flow === 'profile'
    return {
      currentStep: stepIndex,
      totalSteps: profileSetupSteps.length,
    };
  };

  const { currentStep, totalSteps } = getProgressBarProps();

  const getTitle = () => {
    if (flow === 'initial' || flow === 'thankyou') {
      return 'Join us';
    }
    return 'Create Your Profile';
  };

  return (
    <>
      <h1>{getTitle()}</h1>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <div className="form-container">
        {renderCurrentStep()}

        {error && (
          <p
            style={{ color: '#ff5555', marginTop: '1rem', textAlign: 'center' }}
          >
            {error}
          </p>
        )}
      </div>
    </>
  );
}
