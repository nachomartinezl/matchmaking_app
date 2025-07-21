// app/signup/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // <-- 1. Import the router

// Import ALL your step components, including the new Step 0
import Step0_Credentials from './components/Step0_Credentials';
import Step1_PersonalData from './components/Step1_PersonalData';
import Step2_AboutYou from './components/Step2_AboutYou';
import Step3_Profile from './components/Step3_Profile';
import Step4_Goal from './components/Step4_Goal';

// Define the complete structure of our form data
interface FormData {
  email: string;        // <-- Added
  password: string;     // <-- Added
  name: string;
  surname: string;
  dob: string;
  gender: string;
  country: string;
  preference: string;
  height: string;
  profilePicture: File | null;
  description: string;
  goal: string;
}

export default function SignUpPage() {
  const router = useRouter(); // <-- 2. Initialize the router
  const [step, setStep] = useState(0); // <-- 3. Start at step 0
  
  // State for loading and error handling during submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',          // <-- Added
    password: '',       // <-- Added
    name: '',
    surname: '',
    dob: '',
    gender: '',
    country: '',
    preference: '',
    height: '',
    profilePicture: null,
    description: '',
    goal: '',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // 4. This is the new handleSubmit function
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
        return <Step3_Profile formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step4_Goal formData={formData} updateFormData={updateFormData} handleSubmit={handleSubmit} prevStep={prevStep} isSubmitting={isSubmitting} />;
      default:
        return <p>Invalid step!</p>;
    }
  }

  return (
    <div className="form-container">
      <h1>Create Your Profile</h1>
      {/* 5. Updated the step counter to reflect the 5 total steps (0-4) */}
      <p style={{ textAlign: 'center', color: '#a0a0a0', marginBottom: 'var(--space-md)' }}>Step {step + 1} of 5</p>
      
      {renderCurrentStep()}

      {error && <p style={{ color: '#ff5555', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
    </div>
  );
}