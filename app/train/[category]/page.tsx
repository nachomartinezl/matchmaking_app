'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Train.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import QuestionRenderer from './components/QuestionRenderer';

// In a real app, you would fetch this from an API
// For now, we'll import it directly
import questionsData from '../../data/questions.json';

export default function TrainPage({ params }: { params: { category: string } }) {
  const router = useRouter();
  const category = params.category as keyof typeof questionsData;

  // Get the category data
  const categoryData = questionsData[category];

  // Determine the questionnaire type (first key in the category object)
  const [questionnaireType, setQuestionnaireType] = useState<string>('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (categoryData) {
      // Get the first key in the category object (e.g., "mbti", "attachment_styles", etc.)
      const type = Object.keys(categoryData)[0];
      setQuestionnaireType(type);

      // Get the questions array
      let questionsArray;
      if (type === 'values' && category === 'personality') {
        // Special case for personality values which has a nested structure
        questionsArray = categoryData[type].values;
      } else {
        questionsArray = categoryData[type];
      }

      setQuestions(questionsArray);
    }
  }, [category, categoryData]);

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
    if (currentQuestionIndex < questions.length - 1) {
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
      [currentQuestionIndex]: value,
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

  // Get questionnaire type name for display
  const getQuestionnaireTypeName = () => {
    switch (questionnaireType) {
      case 'mbti':
        return 'Myers-Briggs Type Indicator';
      case 'values':
        return 'Personal Values';
      case 'attachment_styles':
        return 'Attachment Styles';
      case 'hexaco':
        return 'HEXACO Personality Inventory';
      case 'relationship_values':
        return 'Relationship Values';
      default:
        return '';
    }
  };

  // Check if current question has been answered
  const isCurrentQuestionAnswered = () => {
    return answers[currentQuestionIndex] !== undefined;
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

  if (!categoryData || !questionnaireType || questions.length === 0) {
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

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          <FaArrowLeft />
        </button>
        <h1 className={styles.title}>{getCategoryName()}: {getQuestionnaireTypeName()}</h1>
      </div>

      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      
      <div className={styles.questionContainer}>
        <h2 className={styles.questionNumber}>Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <h3 className={styles.questionText}>{currentQuestion.question}</h3>
        
        <QuestionRenderer
          question={currentQuestion}
          selected={answers[currentQuestionIndex]}
          onChange={handleAnswerChange}
        />
      </div>
      
      <div className={styles.actionButtons}>
        <button 
          onClick={handleNext} 
          className={styles.nextButton}
          disabled={!isCurrentQuestionAnswered()}
        >
          {currentQuestionIndex < questions.length - 1 ? (
            <>Next <FaArrowRight className={styles.buttonIcon} /></>
          ) : (
            'Complete'
          )}
        </button>
      </div>
    </div>
  );
}
