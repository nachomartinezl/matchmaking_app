'use client';

import styles from './QuestionComponents.module.css';

interface QuestionOptionsProps {
  options: string[];
  selectedOption: string | null;
  onChange: (value: string) => void;
}

export default function QuestionOptions({
  options,
  selectedOption,
  onChange,
}: QuestionOptionsProps) {
  return (
    <div className={styles.optionsContainer}>
      {options.map((option, index) => (
        <button
          key={index}
          className={`${styles.optionButton} ${
            selectedOption === option ? styles.selectedOption : ''
          }`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}