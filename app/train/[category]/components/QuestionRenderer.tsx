'use client';

import QuestionSlider from './QuestionSlider';
import QuestionOptions from './QuestionOptions';

interface QuestionRendererProps {
  question: any;
  selected: any;
  onChange: (value: any) => void;
}

export default function QuestionRenderer({
  question,
  selected,
  onChange
}: QuestionRendererProps) {
  // Multiple-choice style question
  if (Array.isArray(question.options)) {
    return (
      <QuestionOptions
        options={question.options}
        selectedOption={selected ?? null}
        onChange={onChange}
      />
    );
  }

  // Slider style question
  if (
    typeof question.min === 'number' &&
    typeof question.max === 'number'
  ) {
    return (
      <QuestionSlider
        min={question.min}
        max={question.max}
        minLabel={question.minLabel ?? ''}
        maxLabel={question.maxLabel ?? ''}
        value={typeof selected === 'number' ? selected : question.min}
        onChange={onChange}
      />
    );
  }

  // Fallback if unrecognized
  return null;
}
