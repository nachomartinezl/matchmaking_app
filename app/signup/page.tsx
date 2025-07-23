// app/signup/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Import ALL step components
import Step0_Credentials from './components/Step0_Credentials';
import Step1_PersonalData from './components/Step1_PersonalData';
import Step2_AboutYou from './components/Step2_AboutYou';
import Step3_Religion from './components/Step3_Religion';
import Step4_Pets from './components/Step4_Pets';
import Step5_Smoking from './components/Step5_Smoking';
import Step6_Drinking from './components/Step6_Drinking';
import Step7_Kids from './components/Step7_Kids';
import Step8_MaritalStatus from './components/Step8_MaritalStatus';
import Step9_Profile from './components/Step9_Profile';
import Step10_Goal from './components/Step10_Goal';

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
  profilePicture: File | null;
  description: string;
  goal: string;
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
    profilePicture: null,
    description: '',
    goal: '',
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
    switch(step) {
      case 0:
        return <Step0_Credentials formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 1:
        return <Step1_PersonalData formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return <Step2_AboutYou formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3_Religion formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step4_Pets formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Step5_Smoking formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <Step6_Drinking formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 7:
        return <Step7_Kids formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 8:
        return <Step8_MaritalStatus formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 9:
        return <Step9_Profile formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 10:
        return <Step10_Goal formData={formData} updateFormData={updateFormData} handleSubmit={handleSubmit} prevStep={prevStep} isSubmitting={isSubmitting} />;
      default:
        return <p>Invalid step!</p>;
    }
  }

  return (
    <div className="form-container">
      <h1>Create Your Profile</h1>
      <p style={{ textAlign: 'center', color: '#a0a0a0', marginBottom: 'var(--space-md)' }}>Step {step + 1} of 11</p>
      
      {renderCurrentStep()}

      {error && <p style={{ color: '#ff5555', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
    </div>
  );
}
