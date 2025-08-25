'use client';

import React, { useMemo, useState } from 'react';
import StepContainer from './common/StepContainer';
import Select, { components, SingleValue, OptionProps, SingleValueProps, MultiValue } from 'react-select';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';
// --- `patchProfile` is no longer needed ---
import styles from './Step3_Country.module.css'; // --- KEPT YOUR STYLES ---
import { profileSchema } from '@/lib/validationSchemas';
import { FormData } from '../types'

const stepSchema = profileSchema.pick({ country: true });

interface CountryOption { value: string; label: string; }
interface StepProps {
  formData: Pick<FormData, 'country'>;
  updateFormData: (data: Partial<Pick<FormData, 'country'>>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Option = (props: OptionProps<CountryOption>) => (
  <components.Option {...props}>
    <ReactCountryFlag countryCode={props.data.value.toUpperCase()} svg style={{ width: '1.5em', height: '1.5em', marginRight: '0.5em' }} />
    {props.data.label}
  </components.Option>
);

const SingleValueComponent = (props: SingleValueProps<CountryOption>) => (
  <components.SingleValue {...props}>
    <ReactCountryFlag countryCode={props.data.value.toUpperCase()} svg style={{ width: '1.5em', height: '1.5em', marginRight: '0.5em' }} />
    {props.data.label}
  </components.SingleValue>
);

export default function StepCountry({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  // --- `loading` state is removed ---
  const [error, setError] = useState<string | undefined>();

  const options = useMemo<CountryOption[]>(
    () => countryList().getData().map((c) => ({ value: c.value, label: c.label })),
    []
  );

  const selectedOption = options.find((o) => o.value === formData.country) || null;

  const handleChange = (newValue: SingleValue<CountryOption> | MultiValue<CountryOption>) => {
    if (error) setError(undefined);
    
    if (newValue && !Array.isArray(newValue)) {
      const selectedValue = (newValue as CountryOption).value;
      updateFormData({ country: selectedValue });
    } else if (newValue === null) {
      updateFormData({ country: '' });
    }
  };

  // --- The handler is now synchronous and only validates ---
  const handleNext = () => {
    const validationResult = stepSchema.safeParse(formData);
    if (!validationResult.success) {
      setError(validationResult.error.flatten().fieldErrors.country?.[0]);
      return;
    }
    setError(undefined);
    nextStep(); // Proceed without API call
  };

  return (
    <StepContainer>
      <h2>Where are you from?</h2>
      
      {/* This error is now ONLY for Zod validation */}
      {error && <p className="error-message" style={{ textAlign: 'center' }}>{error}</p>}

      {/* --- KEPT YOUR STYLES --- */}
      <div className={styles.countrySelect}>
        <Select<CountryOption>
          options={options}
          value={selectedOption}
          onChange={handleChange}
          placeholder="Select your country"
          isSearchable
          classNamePrefix="select"
          components={{ Option, SingleValue: SingleValueComponent }}
        />
      </div>

      <div className="button-group">
        {/* `disabled` prop is removed */}
        <button onClick={prevStep} className="button-secondary">Back</button>
        <button 
          onClick={handleNext} 
          className="button-primary"
        >
          {/* Text is now static */}
          Next
        </button>
      </div>
    </StepContainer>
  );
}