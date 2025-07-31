'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Step1_PersonalData from './components/Step1_PersonalData';
import StepDOB from './components/StepDOB';
import Step0_Credentials from './components/Step0_Credentials';
import StepThankYou from './components/StepThankYou';
import Step2_Gender from './components/Step2_Gender';
import Step3_Country from './components/Step3_Country';
import Step4_Preference from './components/Step4_Preference';
import Step5_Height from './components/Step5_Height';
import OptionStep from './components/common/OptionStep';
import Step7_Pets from './components/Step7_Pets';
import Step12_ProfileGallery from './components/Step12_ProfileGallery';
import Step13_ShortBio from './components/Step13_ShortBio';
import ProgressBar from './components/ProgressBar';

interface FormData {
  email: string;
  name: string;
  surname: string;
  dob: string;
  gender: string;
  country: string;
  preference: string;
  height: string;
  religion: string;
  pets: string[];
  smoking: string;
  drinking: string;
  kids: string;
  maritalStatus: string;
  goal: string;
  profilePicture: File | null;
  gallery: File[];
  description: string;
}

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
    switch (step) {
      case 0:
        return (
          <Step1_PersonalData
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 1:
        return (
          <StepDOB
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <Step0_Credentials
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 3:
        return <StepThankYou nextStep={nextStep} />;
      case 4:
        return (
          <Step2_Gender
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <Step3_Country
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 6:
        return (
          <Step4_Preference
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 7:
        return (
          <Step5_Height
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 8:
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
      case 9:
        return (
          <Step7_Pets
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 10:
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
      case 11:
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
      case 12:
        return (
          <OptionStep
            title="Kids Status"
            options={[
              { value: 'i_have', label: 'I have' },
              { value: 'i_want', label: 'I want to' },
              { value: 'i_dont_want', label: "I don't want" },
              { value: 'not_sure', label: 'Not sure' },
            ]}
            selected={formData.kids}
            onSelect={(kids) => {
              updateFormData({ kids });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 13:
        return (
          <OptionStep
            title="What are you looking for?"
            options={[
              { value: 'friends', label: 'Make new friends' },
              { value: 'casual', label: 'Something casual' },
              { value: 'relationship', label: 'A serious relationship' },
              { value: 'dont_know', label: "I don't know yet" },
            ]}
            selected={formData.goal}
            onSelect={(goal) => {
              updateFormData({ goal });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 14:
        return (
          <Step12_ProfileGallery
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      case 15:
        return (
          <Step13_ShortBio
            formData={formData}
            updateFormData={updateFormData}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return <p>Invalid step!</p>;
    }
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
