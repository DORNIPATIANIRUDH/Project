import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, X } from 'lucide-react';
import { Question, Answer } from '../types';

interface QuestionNavigationProps {
  questions: Question[];
  currentIndex: number;
  answers: Answer[];
  onSelectQuestion: (index: number) => void;
  onClose: () => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  questions,
  currentIndex,
  answers,
  onSelectQuestion,
  onClose,
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 mb-6"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-slate-900">Question Navigator</h3>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {questions.map((question, index) => {
          const isAnswered = answers.some(a => a.questionId === question.id);
          const isCurrent = index === currentIndex;
          
          return (
            <motion.button
              key={question.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectQuestion(index)}
              className={`
                p-2 rounded-md flex flex-col items-center justify-center
                ${isCurrent ? 'bg-blue-100 border-2 border-blue-600' : 'border border-slate-200'}
                ${isAnswered ? 'bg-slate-50' : ''}
              `}
            >
              <span className="text-sm font-medium">Q{index + 1}</span>
              {isAnswered ? (
                <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
              ) : (
                <Circle className="h-4 w-4 text-slate-400 mt-1" />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuestionNavigation;