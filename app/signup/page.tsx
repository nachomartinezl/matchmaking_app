'use client'; // This is a client component because it uses state and event handlers

import { useState } from 'react';
import Step1_PersonalData from './components/Step1_PersonalData';
import Step2_AboutYou from './components/Step2_AboutYou';
import Step3_Profile from './components/Step3_Profile';
import Step4_Goal from './components/Step4_Goal';

// Define the structure of our form data
interface FormData {
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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
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

  // Function to update form data
  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleSubmit = () => {
    // In a real app, you would send this data to your API
    console.log('Final Form Data:', formData);
    alert('Sign-up complete! Check the console for the form data.');
    // Redirect to a dashboard or home page
    // router.push('/dashboard');
  };

  return (
    <div className="form-container">
      <h1>Create Your Profile</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Step {step} of 4</p>
      
      {step === 1 && (
        <Step1_PersonalData formData={formData} updateFormData={updateFormData} nextStep={nextStep} />
      )}
      {step === 2 && (
        <Step2_AboutYou formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 3 && (
        <Step3_Profile formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 4 && (
        <Step4_Goal formData={formData} updateFormData={updateFormData} handleSubmit={handleSubmit} prevStep={prevStep} />
      )}
    </div>
  );
}