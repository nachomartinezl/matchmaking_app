'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Train.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import QuestionSlider from './components/QuestionSlider';
import QuestionOptions from './components/QuestionOptions';

// Mock data for training questions
const trainingQuestions = {
  personality: [
    {
      id: 1,
      type: 'slider',
      question: 'How important is it for your match to be outgoing?',
      min: 0,
      max: 10,
      minLabel: 'Not important',
      maxLabel: 'Very important',
    },
    {
      id: 2,
      type: 'options',
      question: 'Which personality trait do you value most in a potential match?',
      options: ['Creativity', 'Reliability', 'Ambition', 'Humor', 'Empathy'],
    },
    {
      id: 3,
      type: 'slider',
      question: 'How important is it for your match to enjoy social gatherings?',
      min: 0,
      max: 10,
      minLabel: 'Not important',
      maxLabel: 'Very important',
    },
  ],
  character: [
    {
      id: 1,
      type: 'slider',
      question: 'How important is honesty in your potential match?',
      min: 0,
      max: 10,
      minLabel: 'Not important',
      maxLabel: 'Very important',
    },
    {
      id: 2,
      type: 'options',
      question: 'Which character trait matters most to you?',
      options: ['Integrity', 'Loyalty', 'Kindness', 'Patience', 'Courage'],
    },
  ],
  emotional: [
    {
      id: 1,
      type: 'slider',
      question: 'How important is emotional intelligence in your match?',
      min: 0,
      max: 10,
      minLabel: 'Not important',
      maxLabel: 'Very important',
    },
    {
      id: 2,
      type: 'options',
      question: 'How would you prefer your match to handle conflict?',
      options: ['Talk it out immediately', 'Take time to process first', 'Seek compromise', 'Focus on solutions', 'Express emotions openly'],
    },
  ],
  values: [
    {
      id: 1,
      type: 'slider',
      question: 'How important is it that your match shares your core values?',
      min: 0,
      max: 10,
      minLabel: 'Not important',
      maxLabel: 'Very important',
    },
    {
      id: 2,
      type: 'options',
      question: 'Which value is most important to you in a relationship?',
      options: ['Trust', 'Communication', 'Respect', 'Growth', 'Independence'],
    },
    {
      id: 3,
      type: 'options',
      question: 'How important are shared life goals?',
      options: ['Not important', 'Somewhat important', 'Important', 'Very important', 'Essential'],
    },
  ],
};

export default function TrainPage({ params }: { params: { category: string } }) {
  const router = useRouter();
  const category = params.category;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isComplete, setIsComplete] = useState(false);

  // Get questions for the current category
  const questions = trainingQuestions[category as keyof typeof trainingQuestions] || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  // Handle back button
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      router.push('/dashboard');
    }
  };

  // Handle next button
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsComplete(true);
      // In a real app, you would submit the answers to your backend here
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }
  };

  // Handle answer change
  const handleAnswerChange = (value: any) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  // Get category name for display
  const getCategoryName = () => {
    switch (category) {
      case 'personality':
        return 'Personality';
      case 'character':
        return 'Character';
      case 'emotional':
        return 'Emotional Intelligence';
      case 'values':
        return 'Values';
      default:
        return 'Training';
    }
  };

  // Check if current question has been answered
  const isCurrentQuestionAnswered = () => {
    return answers[currentQuestion?.id] !== undefined;
  };

  if (isComplete) {
    return (
      <div className={styles.container}>
        <div className={styles.completionMessage}>
          <h2>Thank you!</h2>
          <p>Your preferences have been saved and will help improve your matches.</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
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
        <button onClick={handleBack} className={styles.backButton}>
          <FaArrowLeft />
        </button>
        <h1 className={styles.title}>{getCategoryName()} Training</h1>
      </div>

      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>
      
      <div className={styles.questionContainer}>
        <h2 className={styles.questionNumber}>Question {currentQuestionIndex + 1} of {totalQuestions}</h2>
        <h3 className={styles.questionText}>{currentQuestion.question}</h3>
        
        {currentQuestion.type === 'slider' ? (
          <QuestionSlider
            min={currentQuestion.min}
            max={currentQuestion.max}
            minLabel={currentQuestion.minLabel}
            maxLabel={currentQuestion.maxLabel}
            value={answers[currentQuestion.id] || Math.floor((currentQuestion.max - currentQuestion.min) / 2)}
            onChange={handleAnswerChange}
          />
        ) : (
          <QuestionOptions
            options={currentQuestion.options}
            selectedOption={answers[currentQuestion.id]}
            onChange={handleAnswerChange}
          />
        )}
      </div>
      
      <div className={styles.actionButtons}>
        <button 
          onClick={handleNext} 
          className={styles.nextButton}
          disabled={!isCurrentQuestionAnswered()}
        >
          {currentQuestionIndex < totalQuestions - 1 ? (
            <>Next <FaArrowRight className={styles.buttonIcon} /></>
          ) : (
            'Complete'
          )}
        </button>
      </div>
    </div>
  );
}
