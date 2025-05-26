import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Assessment, Answer, CategoryScore } from '../types';
import { questions, categoryDescriptions } from '../data/questions';

interface AssessmentContextType {
  currentAssessment: Assessment;
  assessmentHistory: Assessment[];
  currentQuestionIndex: number;
  setAnswer: (questionId: number, score: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  jumpToQuestion: (index: number) => void;
  completeAssessment: () => void;
  startNewAssessment: (teamName: string) => void;
  loadAssessment: (assessmentId: string) => void;
  deleteAssessment: (assessmentId: string) => void;
  calculateCategoryScores: () => CategoryScore[];
  getOverallScore: () => { score: number; maxScore: number };
  getCompletionPercentage: () => number;
}

const defaultAssessment: Assessment = {
  id: uuidv4(),
  date: new Date().toISOString(),
  teamName: '',
  answers: [],
  complete: false
};

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAssessment, setCurrentAssessment] = useState<Assessment>(defaultAssessment);
  const [assessmentHistory, setAssessmentHistory] = useState<Assessment[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Load assessments from localStorage on initial render
  useEffect(() => {
    const savedAssessments = localStorage.getItem('assessmentHistory');
    if (savedAssessments) {
      setAssessmentHistory(JSON.parse(savedAssessments));
    }
  }, []);

  // Save assessments to localStorage when they change
  useEffect(() => {
    localStorage.setItem('assessmentHistory', JSON.stringify(assessmentHistory));
  }, [assessmentHistory]);

  const setAnswer = (questionId: number, score: number) => {
    setCurrentAssessment(prev => {
      const existingAnswerIndex = prev.answers.findIndex(a => a.questionId === questionId);
      let newAnswers;

      if (existingAnswerIndex >= 0) {
        newAnswers = [...prev.answers];
        newAnswers[existingAnswerIndex] = { questionId, score };
      } else {
        newAnswers = [...prev.answers, { questionId, score }];
      }

      return { ...prev, answers: newAnswers };
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const jumpToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const completeAssessment = () => {
    const completedAssessment = { ...currentAssessment, complete: true };
    setCurrentAssessment(completedAssessment);
    
    // Update assessment in history if it exists, otherwise add it
    setAssessmentHistory(prev => {
      const existingIndex = prev.findIndex(a => a.id === completedAssessment.id);
      if (existingIndex >= 0) {
        const newHistory = [...prev];
        newHistory[existingIndex] = completedAssessment;
        return newHistory;
      }
      return [...prev, completedAssessment];
    });
  };

  const startNewAssessment = (teamName: string) => {
    const newAssessment: Assessment = {
      id: uuidv4(),
      date: new Date().toISOString(),
      teamName,
      answers: [],
      complete: false
    };
    setCurrentAssessment(newAssessment);
    setCurrentQuestionIndex(0);
  };

  const loadAssessment = (assessmentId: string) => {
    const assessment = assessmentHistory.find(a => a.id === assessmentId);
    if (assessment) {
      setCurrentAssessment(assessment);
      setCurrentQuestionIndex(0);
    }
  };

  const deleteAssessment = (assessmentId: string) => {
    setAssessmentHistory(prev => prev.filter(a => a.id !== assessmentId));
    if (currentAssessment.id === assessmentId) {
      startNewAssessment('');
    }
  };

  const calculateCategoryScores = (): CategoryScore[] => {
    const categories = Object.keys(categoryDescriptions) as Array<keyof typeof categoryDescriptions>;
    
    return categories.map(category => {
      const categoryQuestions = questions.filter(q => q.category === category);
      const maxScore = categoryQuestions.length * 5; // 5 is the max score per question
      
      let score = 0;
      categoryQuestions.forEach(question => {
        const answer = currentAssessment.answers.find(a => a.questionId === question.id);
        if (answer) {
          score += answer.score;
        }
      });
      
      return {
        category,
        score,
        maxScore
      };
    });
  };

  const getOverallScore = () => {
    const totalAnswered = currentAssessment.answers.reduce((sum, answer) => sum + answer.score, 0);
    const maxPossible = questions.length * 5; // 5 is max score per question
    
    return {
      score: totalAnswered,
      maxScore: maxPossible
    };
  };

  const getCompletionPercentage = () => {
    return (currentAssessment.answers.length / questions.length) * 100;
  };

  return (
    <AssessmentContext.Provider
      value={{
        currentAssessment,
        assessmentHistory,
        currentQuestionIndex,
        setAnswer,
        nextQuestion,
        prevQuestion,
        jumpToQuestion,
        completeAssessment,
        startNewAssessment,
        loadAssessment,
        deleteAssessment,
        calculateCategoryScores,
        getOverallScore,
        getCompletionPercentage
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};