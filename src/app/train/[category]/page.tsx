'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './Train.module.css';
import QuestionRenderer from './components/QuestionRenderer';
import questionsData from '../../data/questions.json';
import { AllQuestionnaires, Question } from '../types';
import { submitQuestionnaire } from '@/lib/api';

const categoryDisplayNames: Record<string, string> = {
  personality: 'Personality',
  character: 'Character',
  emotional: 'Emotional Intelligence',
  values: 'Values',
};

const questionnaireTypeNames: Record<string, string> = {
  mbti: 'Myers-Briggs Type Indicator',
  schwartz_survey: 'Personal Values',
  attachment_styles: 'Attachment Styles',
  hexaco: 'HEXACO Personality Inventory',
};

export default function TrainPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { questionnaireType, questions, scale } = useMemo(() => {
    const typedQuestionsData = questionsData as AllQuestionnaires;
    const categoryData = typedQuestionsData[category];
    if (!categoryData) {
      return { questionnaireType: '', questions: [], scale: null };
    }

    const type = Object.keys(categoryData)[0];
    const questionnaireData = categoryData[type];

    if (questionnaireData && Array.isArray(questionnaireData.questions)) {
      return {
        questionnaireType: type,
        questions: questionnaireData.questions,
        scale: questionnaireData.scale,
      };
    }

    if (Array.isArray(questionnaireData)) {
      return {
        questionnaireType: type,
        questions: questionnaireData,
        scale: null,
      };
    }

    return { questionnaireType: '', questions: [], scale: null };
  }, [category]);

  const currentQuestion = questions[currentQuestionIndex];
  const isCurrentQuestionAnswered = answers[currentQuestionIndex] !== undefined;

  const handleAnswerChange = useCallback((value: string | number) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestionIndex]: value,
    }));
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (!currentQuestion) return;

    if (scale && answers[currentQuestionIndex] === undefined) {
      const defaultValue = scale.options[0];
      handleAnswerChange(defaultValue);
    }
  }, [currentQuestionIndex, currentQuestion, answers, handleAnswerChange, scale]);

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSubmitting(true);
      setError(null);
      try {
        const responses: number[] = [];
        for (let i = 0; i < questions.length; i++) {
          const answer = answers[i];
          const question = questions[i];

          if (typeof answer === 'number') {
            responses.push(answer);
          } else if (typeof answer === 'string') {
            const q = question as Extract<Question, { options?: string[] }>;
            if (q.options) {
              const index = q.options.indexOf(answer);
              if (index !== -1) {
                responses.push(index);
              } else {
                throw new Error(`Invalid answer "${answer}" for question ${i}`);
              }
            }
          } else {
             // Handle unanswered questions if necessary, though button is disabled
             throw new Error(`Question ${i} is unanswered.`);
          }
        }

        await submitQuestionnaire({
          questionnaire: questionnaireType,
          responses: responses,
        });
        setIsComplete(true);
        setTimeout(() => router.push('/dashboard'), 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to submit answers.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isClient) {
    return null;
  }

  if (isComplete) {
    return (
      <div className={styles.container}>
        <div className={styles.completionMessage}>
          <h2>Thank you!</h2>
          <p>Your preferences have been saved.</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <h2>Category not found</h2>
          <button onClick={() => router.push('/dashboard')} className={styles.backButton}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backButton} aria-label="Go back">
          <FaArrowLeft />
        </button>
        <h1 className={styles.title}>
          {categoryDisplayNames[category] || 'Training'}: {questionnaireTypeNames[questionnaireType] || ''}
        </h1>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className={styles.questionContainer}>
        <h2 className={styles.questionNumber}>Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <h3 className={styles.questionText}>
          {typeof currentQuestion === 'object' && currentQuestion.question ? currentQuestion.question : currentQuestion}
        </h3>
        <QuestionRenderer
          question={currentQuestion}
          selected={answers[currentQuestionIndex]}
          onChange={handleAnswerChange}
          scale={scale}
        />
      </div>

      <div className={styles.actionButtons}>
        <button
          onClick={handleNext}
          className={styles.nextButton}
          disabled={!isCurrentQuestionAnswered || isSubmitting}
        >
          {isSubmitting
            ? 'Submitting...'
            : currentQuestionIndex < questions.length - 1
            ? (
            <>Next <FaArrowRight className={styles.buttonIcon} /></>
              )
            : (
                'Complete'
              )}
        </button>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
  );
}
