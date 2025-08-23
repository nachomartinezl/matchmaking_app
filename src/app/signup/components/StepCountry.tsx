'use client';

import React, { useMemo, useState } from 'react';
import StepContainer from './common/StepContainer';
import Select, { components, SingleValue, OptionProps, SingleValueProps, ActionMeta, MultiValue } from 'react-select';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';
import { patchProfile } from '@/lib/api';
import styles from './Step3_Country.module.css';
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

export default function Step3_Country({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const options = useMemo<CountryOption[]>(
    () => countryList().getData().map((c) => ({ value: c.value, label: c.label })),
    []
  );

  const selectedOption = options.find((o) => o.value === formData.country) || null;

  const handleChange = (newValue: SingleValue<CountryOption> | MultiValue<CountryOption>) => {
    // Clear any previous errors when the user makes a selection
    if (error) setError(undefined);
    
    if (newValue && !Array.isArray(newValue)) {
      const selectedValue = (newValue as CountryOption).value;
      updateFormData({ country: selectedValue });
    } else if (newValue === null) {
      // If cleared, update form data to an empty string to trigger validation error on next
      updateFormData({ country: '' });
    }
  };

  const handleNext = async () => {
    // --- PATTERN STEP 5: Validate first ---
    const validationResult = stepSchema.safeParse(formData);
    if (!validationResult.success) {
      setError(validationResult.error.flatten().fieldErrors.country?.[0]);
      return;
    }

    if (loading) return;
    setError(undefined); // Clear previous errors
    setLoading(true);

    try {
      // Now that we know the data is valid, send it
      await patchProfile({ country: formData.country?.toUpperCase() });
      nextStep();
    } catch (e: any) {
      // Handle API errors from patchProfile
      setError(e.message || 'Failed to save country');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepContainer>
      <h2>Where are you from?</h2>
      {error && <p className="error-message" style={{ textAlign: 'center' }}>{error}</p>}

      <div className={styles.countrySelect}>
        <Select
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
        <button onClick={prevStep} className="button-secondary" disabled={loading}>Back</button>
        <button 
          onClick={handleNext} 
          className="button-primary" 
          // Disable button only when loading. Let validation handle the rest.
          disabled={loading}
        >
          {loading ? 'Saving…' : 'Next'}
        </button>
      </div>
    </StepContainer>
  );
}
