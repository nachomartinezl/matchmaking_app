'use client';

import { Question } from '../types';
import QuestionSlider from './QuestionSlider';
import QuestionOptions from './QuestionOptions';

interface Scale {
  options: number[];
  labels: Record<string, string>;
}

interface QuestionRendererProps {
  question: Question;
  selected: string | number | null;
  onChange: (value: string | number) => void;
  scale: Scale | null;
}

export default function QuestionRenderer({ question, selected, onChange, scale }: QuestionRendererProps) {
  if (typeof question === 'object' && Array.isArray(question.options)) {
    return (
      <QuestionOptions
        options={question.options}
        selectedOption={selected ?? null}
        onChange={onChange}
      />
    );
  }

  if (scale) {
    const min = scale.options[0];
    const max = scale.options[scale.options.length - 1];

    return (
      <QuestionSlider
        min={min}
        max={max}
        minLabel={scale.labels[min]}
        maxLabel={scale.labels[max]}
        value={selected ?? min}
        onChange={onChange}
      />
    );
  }

  return null;
}