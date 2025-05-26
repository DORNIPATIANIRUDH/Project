import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { ratingLabels, ratingDescriptions } from '../data/questions';
import { useAssessment } from '../context/AssessmentContext';

interface QuestionProps {
  questionNumber: number;
  questionText: string;
  questionDescription: string;
  onAnswerSelected: (score: number) => void;
  currentAnswer?: number;
}

const Question: React.FC<QuestionProps> = ({
  questionNumber,
  questionText,
  questionDescription,
  onAnswerSelected,
  currentAnswer
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start mb-4">
        <span className="flex-shrink-0 bg-blue-600 text-white font-semibold rounded-full w-8 h-8 flex items-center justify-center mr-3">
          {questionNumber}
        </span>
        <div className="flex-1">
          <h3 className="text-xl font-medium text-slate-900">{questionText}</h3>
          <div className="relative inline-block mt-2">
            <button
              className="text-sm text-blue-600 flex items-center"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <HelpCircle className="h-4 w-4 mr-1" />
              <span>Learn more</span>
            </button>
            
            {showTooltip && (
              <motion.div
                className="absolute z-10 top-full left-0 mt-2 p-4 bg-white rounded-md shadow-lg w-80 text-sm text-slate-700"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p>{questionDescription}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Your assessment:</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {ratingLabels.map((label, index) => (
            <motion.button
              key={index}
              className={`p-3 border rounded-md text-center transition-colors ${
                currentAnswer === index + 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
              }`}
              onClick={() => onAnswerSelected(index + 1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="block font-medium">{label}</span>
              <span className="text-xs mt-1 block truncate" title={ratingDescriptions[index]}>
                {ratingDescriptions[index].substring(0, 30)}...
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Question;