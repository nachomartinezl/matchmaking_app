'use client';

import React, { useMemo, useState } from 'react';
import StepContainer from './common/StepContainer';
import Select, { components, SingleValue, OptionProps, SingleValueProps, ActionMeta, MultiValue } from 'react-select';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';
import { patchProfile } from '@/lib/api';
import styles from './Step3_Country.module.css';

interface CountryOption { value: string; label: string; }
interface StepProps {
  formData: { country: string };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
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
  const [err, setErr] = useState<string | null>(null);

  const options = useMemo<CountryOption[]>(
    () => countryList().getData().map((c) => ({ value: c.value, label: c.label })),
    []
  );

  const selectedOption = options.find((o) => o.value === formData.country) || null;
  const canProceed = Boolean(formData.country);

  const handleChange = (newValue: SingleValue<CountryOption> | MultiValue<CountryOption>) => {
     if (newValue && !Array.isArray(newValue)) {
      // At this point, TypeScript knows newValue is of type CountryOption | null
      const selectedValue = (newValue as CountryOption).value;
      updateFormData({ country: selectedValue });
    } else if (newValue === null) {
      // Handle the case where the user clears the selection
      updateFormData({ country: '' });
    }
  };

  const handleNext = async () => {
    if (!formData.country || loading) return;
    setErr(null);
    setLoading(true);
    try {
      await patchProfile({ country: formData.country.toUpperCase() });
      nextStep();
    } catch (e: any) {
      setErr(e.message || 'Failed to save country');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepContainer>
      <h2>Where are you from?</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}

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
        <button onClick={prevStep} className="button-secondary">Back</button>
        <button onClick={handleNext} className="button-primary" disabled={!canProceed || loading}>
          {loading ? 'Saving…' : 'Next'}
        </button>
      </div>
    </StepContainer>
  );
}
