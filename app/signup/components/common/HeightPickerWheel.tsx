'use client';

import React, { useMemo, useState, useEffect } from 'react';
import ScrollWheel from 'react-scroll-wheel-picker';

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
  const options = useMemo(() => {
    const arr: string[] = [];
    for (let i = min; i <= max; i++) {
      arr.push(String(i));
    }
    return arr;
  }, [min, max]);

  const [selectedIndex, setSelectedIndex] = useState(() =>
    options.indexOf(String(value))
  );

  useEffect(() => {
    const idx = options.indexOf(String(value));
    if (idx >= 0 && idx !== selectedIndex) {
      setSelectedIndex(idx);
    }
  }, [value, options, selectedIndex]);

  const handleSelect = (val: string) => {
    const num = parseInt(val, 10);
    onChange(num);
  };

  return (
    <div className="height-picker" style={{ width: '100%', height: '200px' }}>
      <ScrollWheel
        data={options}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
        heightWheelitem={40}
      />
    </div>
  );
}
