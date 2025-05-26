import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, List } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { questions } from '../data/questions';
import Question from './Question';
import ProgressBar from './ProgressBar';
import QuestionNavigation from './QuestionNavigation';

const AssessmentForm: React.FC = () => {
  const { 
    currentAssessment, 
    currentQuestionIndex, 
    setAnswer, 
    nextQuestion, 
    prevQuestion, 
    jumpToQuestion,
    completeAssessment,
    getCompletionPercentage
  } = useAssessment();
  
  const [showNavigation, setShowNavigation] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentAssessment.answers.find(
    a => a.questionId === currentQuestion.id
  )?.score;
  
  const handleAnswerSelected = (score: number) => {
    setAnswer(currentQuestion.id, score);
  };
  
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const completionPercentage = getCompletionPercentage();
  const isComplete = completionPercentage === 100;
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Agile Assessment</h2>
        <button
          onClick={() => setShowNavigation(!showNavigation)}
          className="text-blue-600 flex items-center gap-1"
        >
          <List className="h-5 w-5" />
          <span>Questions</span>
        </button>
      </div>
      
      <ProgressBar percentage={completionPercentage} />
      
      {showNavigation && (
        <QuestionNavigation
          questions={questions}
          currentIndex={currentQuestionIndex}
          answers={currentAssessment.answers}
          onSelectQuestion={jumpToQuestion}
          onClose={() => setShowNavigation(false)}
        />
      )}
      
      <Question
        key={currentQuestion.id}
        questionNumber={currentQuestionIndex + 1}
        questionText={currentQuestion.text}
        questionDescription={currentQuestion.description}
        onAnswerSelected={handleAnswerSelected}
        currentAnswer={currentAnswer}
      />
      
      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isFirstQuestion}
          onClick={prevQuestion}
          className={`px-4 py-2 rounded-md flex items-center gap-2 ${
            isFirstQuestion 
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
              : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </motion.button>
        
        {isLastQuestion ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!isComplete}
            onClick={completeAssessment}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              !isComplete 
                ? 'bg-green-200 text-green-400 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <CheckCircle className="h-4 w-4" />
            Complete Assessment
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextQuestion}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default AssessmentForm;