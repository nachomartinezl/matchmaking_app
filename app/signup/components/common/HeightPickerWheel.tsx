'use client';

import React, { useMemo } from 'react';
import MobilePicker from 'react-mobile-picker';

interface HeightPickerWheelProps {
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
}

export default function HeightPickerWheel({ min, max, value, onChange }: HeightPickerWheelProps) {
  const options = useMemo(() => {
    const list = [];
    for (let i = min; i <= max; i++) {
      list.push(i);
    }
    return list;
  }, [min, max]);

  const data = { height: options };
  const selected = { height: value };

  const handleChange = (_key: string, val: number) => {
    onChange(val);
  };

  return (
    <div className="height-picker">
      <MobilePicker
        optionGroups={data}
        valueGroups={selected}
        onChange={handleChange}
      />
    </div>
  );
}
