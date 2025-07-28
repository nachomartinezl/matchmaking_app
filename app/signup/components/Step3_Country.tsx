'use client';

import React, { useMemo } from 'react';
import StepContainer from './common/StepContainer';
import Select from 'react-select';
import countryList from 'react-select-country-list';

interface StepProps {
  formData: {
    country: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step3_Country({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const options = useMemo(() => countryList().getData(), []);
  const selectedOption = options.find(opt => opt.value === formData.country) || null;
  const canProceed = !!formData.country;

  return (
    <StepContainer>
      <h2>Country of Origin</h2>
      <Select
        options={options}
        value={selectedOption}
        onChange={(opt) => updateFormData({ country: (opt as any).value })}
        placeholder="Select your country"
        isSearchable
      />

      <div className="button-group">
        <button onClick={prevStep} className="button-secondary">
          Back
        </button>
        <button
          onClick={nextStep}
          className="button-primary"
          disabled={!canProceed}
        >
          Next
        </button>
      </div>
    </StepContainer>
  );
}
