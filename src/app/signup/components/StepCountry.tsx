'use client';

import React, { useMemo } from 'react';
import StepContainer from './common/StepContainer';
import Select, { components, SingleValue, OptionProps, SingleValueProps } from 'react-select';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';
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

// Custom option with flag
const Option = (props: OptionProps<CountryOption>) => (
  <components.Option {...props}>
    <ReactCountryFlag
      countryCode={(props.data.value as string).toUpperCase()}
      svg
      style={{ width: '1.5em', height: '1.5em', marginRight: '0.5em' }}
    />
    {props.data.label}
  </components.Option>
);

// Custom single value with flag
const SingleValueComponent = (props: SingleValueProps<CountryOption>) => (
  <components.SingleValue {...props}>
    <ReactCountryFlag
      countryCode={(props.data.value as string).toUpperCase()}
      svg
      style={{ width: '1.5em', height: '1.5em', marginRight: '0.5em' }}
    />
    {props.data.label}
  </components.SingleValue>
);

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

  const selectedOption = options.find((o) => o.value === formData.country) || null;
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
        components={{ Option, SingleValue: SingleValueComponent }}
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
