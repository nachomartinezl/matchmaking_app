// app/signup/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Import ALL step components
import Step0_Credentials from './components/Step0_Credentials';
import Step1_PersonalData from './components/Step1_PersonalData';
import Step2_AboutYou from './components/Step2_AboutYou';
import OptionStep from './components/common/OptionStep';
import Step10_Profile from './components/Step10_Profile';

// Define the complete structure of our form data
interface FormData {
  email: string;
  password: string;
  name: string;
  surname: string;
  dob: string;
  gender: string;
  country: string;
  preference: string;
  height: string;
  religion: string;
  pets: string;
  smoking: string;
  drinking: string;
  kids: string;
  maritalStatus: string;
  goal: string;
  profilePicture: File | null;
  description: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // State for loading and error handling during submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    surname: '',
    dob: '',
    gender: '',
    country: '',
    preference: '',
    height: '',
    religion: '',
    pets: '',
    smoking: '',
    drinking: '',
    kids: '',
    maritalStatus: '',
    goal: '',
    profilePicture: null,
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
      // In a real app, you would send this data to your API
      console.log('Final Form Data:', formData);
      // We'll simulate a network request that takes 1.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // On successful submission, redirect to the login page
      router.push('/login');
    } catch (err) {
      setError('Something went wrong during sign up. Please try again.');
      console.error(err);
      setIsSubmitting(false); // Let the user try again
    }
  };

  // Using a switch statement is often cleaner for multi-step forms
  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return <Step0_Credentials formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 1:
        return <Step1_PersonalData formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return <Step2_AboutYou formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return (
          <OptionStep
            title="Do you identify with a religion?"
            options={[
              { value: 'atheism', label: 'Atheism' },
              { value: 'buddhism', label: 'Buddhism' },
              { value: 'christianity', label: 'Christianity' },
              { value: 'hinduism', label: 'Hinduism' },
              { value: 'islam', label: 'Islam' },
              { value: 'judaism', label: 'Judaism' },
              { value: 'other', label: 'Other' },
              { value: 'skip', label: 'Skip' },
            ]}
            selected={formData.religion}
            onSelect={(religion) => {
              updateFormData({ religion });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <OptionStep
            title="Do you have pets?"
            options={[
              { value: 'birds', label: 'Birds' },
              { value: 'cats', label: 'Cats' },
              { value: 'dogs', label: 'Dogs' },
              { value: 'fish', label: 'Fish' },
              { value: 'hamsters', label: 'Hamsters' },
              { value: 'rabbits', label: 'Rabbits' },
              { value: 'snakes', label: 'Snakes' },
              { value: 'turtles', label: 'Turtles' },
              { value: 'none', label: 'None' },
              { value: 'skip', label: 'Skip' },
            ]}
            selected={formData.pets}
            onSelect={(pets) => {
              updateFormData({ pets });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <OptionStep
            title="Do you smoke?"
            options={[
              { value: 'regularly', label: 'Regularly' },
              { value: 'when_drink', label: 'When drink' },
              { value: 'sometimes', label: 'Sometimes' },
              { value: 'never', label: 'Never' },
              { value: 'skip', label: 'Skip' },
            ]}
            selected={formData.smoking}
            onSelect={(smoking) => {
              updateFormData({ smoking });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <OptionStep
            title="Do you drink?"
            options={[
              { value: 'often', label: 'Often' },
              { value: 'on_holidays', label: 'On holidays' },
              { value: 'sometimes', label: 'Sometimes' },
              { value: 'never', label: 'Never' },
              { value: 'skip', label: 'Skip' },
            ]}
            selected={formData.drinking}
            onSelect={(drinking) => {
              updateFormData({ drinking });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 7:
        return (
          <OptionStep
            title="Do you have kids?"
            options={[
              { value: 'not_yet', label: 'Not yet' },
              { value: 'childfree', label: 'Childfree' },
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: 'more_than_3', label: 'More than 3' },
              { value: 'skip', label: 'Skip' },
            ]}
            selected={formData.kids}
            onSelect={(kids) => {
              updateFormData({ kids });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 8:
        return (
          <OptionStep
            title="What is your marital status?"
            options={[
              { value: 'single', label: 'Single' },
              { value: 'married', label: 'Married' },
              { value: 'in_relationship', label: 'In a relationship' },
              { value: 'divorced', label: 'Divorced' },
              { value: 'separated', label: 'Separated' },
              { value: 'skip', label: 'Skip' },
            ]}
            selected={formData.maritalStatus}
            onSelect={(maritalStatus) => {
              updateFormData({ maritalStatus });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 9:
        return (
          <OptionStep
            title="What are you looking for?"
            options={[
              { value: 'friends', label: 'Make new friends' },
              { value: 'casual', label: 'Something casual' },
              { value: 'relationship', label: 'A serious relationship' },
            ]}
            selected={formData.goal}
            onSelect={(goal) => {
              updateFormData({ goal });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 10:
        return <Step10_Profile formData={formData} updateFormData={updateFormData} handleSubmit={handleSubmit} prevStep={prevStep} isSubmitting={isSubmitting} />;
      default:
        return <p>Invalid step!</p>;
    }
  };

  return (
    <div className="form-container">
      <h1>Create Your Profile</h1>
      <p style={{ textAlign: 'center', color: '#a0a0a0', marginBottom: 'var(--space-md)' }}>
        Step {step + 1} of 11
      </p>

      {renderCurrentStep()}

      {error && <p style={{ color: '#ff5555', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
    </div>
  );
}
