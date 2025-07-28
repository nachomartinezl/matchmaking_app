'use client';

import React, { useMemo, useState, useEffect } from 'react';
import MobilePicker from 'react-mobile-picker';

interface HeightPickerWheelProps {
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
}

export default function HeightPickerWheel({
  min,
  max,
  value,
  onChange,
}: HeightPickerWheelProps) {
  // Build numeric options from min to max
  const options = useMemo(() => {
    const arr: number[] = [];
    for (let i = min; i <= max; i++) {
      arr.push(i);
    }
    return arr;
  }, [min, max]);

  // Local state to drive the picker
  const [selectedValue, setSelectedValue] = useState<number>(value);

  // Sync local state when external value changes
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // Handler when user scrolls to a new value
  const handleChange = (_key: string, newValue: number) => {
    setSelectedValue(newValue);
    onChange(newValue);
  };

  // react-mobile-picker expects objects for optionGroups/valueGroups
  const optionGroups = { height: options };
  const valueGroups = { height: selectedValue };

  return (
    <div className="height-picker" style={{ width: '100%', height: '200px' }}>
      <MobilePicker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={handleChange}
      />
    </div>
  );
}
