'use client';

import React, { useMemo } from 'react';
import StepContainer from './common/StepContainer';
import Select, { SingleValue } from 'react-select';
import countryList from 'react-select-country-list';
import './Step3_Country.module.css';

interface CountryOption {
  value: string;
  label: string;
}

interface StepProps {
  formData: {
    country: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step3_Country({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: StepProps) {
  const options = useMemo<CountryOption[]>(
    () =>
      countryList()
        .getData()
        .map((c) => ({ value: c.value, label: c.label })),
    []
  );

  const selectedOption =
    options.find((o) => o.value === formData.country) || null;
  const canProceed = Boolean(formData.country);

  const handleChange = (opt: SingleValue<CountryOption>) => {
    if (opt) updateFormData({ country: opt.value });
  };

  return (
    <StepContainer>
      <h2>Country of Origin</h2>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select your country"
        isSearchable
        classNamePrefix="select"
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
