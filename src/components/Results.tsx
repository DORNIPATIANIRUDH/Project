import React from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, ArrowLeft } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import ResultsChart from './ResultsChart';
import CategoryScores from './CategoryScores';
import Recommendations from './Recommendations';

interface ResultsProps {
  onStartNew: () => void;
}

const Results: React.FC<ResultsProps> = ({ onStartNew }) => {
  const { currentAssessment, calculateCategoryScores, getOverallScore } = useAssessment();
  
  const categoryScores = calculateCategoryScores();
  const { score, maxScore } = getOverallScore();
  const overallPercentage = Math.round((score / maxScore) * 100);
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const exportResults = () => {
    // In a real implementation, this would generate a PDF or CSV
    alert('Export functionality would be implemented here');
  };
  
  const shareResults = () => {
    // In a real implementation, this would create a shareable link
    alert('Share functionality would be implemented here');
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Agile Assessment Results</h2>
            <p className="text-slate-600">
              {currentAssessment.teamName ? `Team: ${currentAssessment.teamName}` : 'Team Assessment'} | 
              {' '}{formatDate(currentAssessment.date)}
            </p>
          </div>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportResults}
              className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareResults}
              className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </motion.button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-medium text-slate-800 mb-4">Overall Agility Score</h3>
            <div className="flex flex-col items-center">
              <div className={`text-5xl font-bold mb-2 ${getScoreColor(overallPercentage)}`}>
                {overallPercentage}%
              </div>
              <p className="text-slate-600 text-center">
                {score} out of {maxScore} points
              </p>
              <div className="w-full bg-slate-200 rounded-full h-4 mt-4">
                <motion.div
                  className={`h-4 rounded-full ${
                    overallPercentage >= 80 ? 'bg-green-600' :
                    overallPercentage >= 60 ? 'bg-blue-600' :
                    overallPercentage >= 40 ? 'bg-yellow-600' : 'bg-red-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${overallPercentage}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-medium text-slate-800 mb-4">Category Performance</h3>
            <ResultsChart categoryScores={categoryScores} />
          </motion.div>
        </div>
        
        <CategoryScores categoryScores={categoryScores} />
        
        <Recommendations categoryScores={categoryScores} />
        
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartNew}
            className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Start New Assessment
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Results;