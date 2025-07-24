'use client';

import styles from './QuestionComponents.module.css';

interface QuestionSliderProps {
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  value: number;
  onChange: (value: number) => void;
}

export default function QuestionSlider({
  min,
  max,
  minLabel,
  maxLabel,
  value,
  onChange,
}: QuestionSliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className={styles.slider}
      />
      <div className={styles.sliderLabels}>
        <span className={styles.sliderLabel}>{minLabel}</span>
        <span className={styles.sliderValue}>{value}</span>
        <span className={styles.sliderLabel}>{maxLabel}</span>
      </div>
    </div>
  );
}