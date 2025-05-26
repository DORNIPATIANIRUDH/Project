import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ArrowDown } from 'lucide-react';
import { CategoryScore } from '../types';
import { categoryDescriptions } from '../data/questions';

interface CategoryScoresProps {
  categoryScores: CategoryScore[];
}

const CategoryScores: React.FC<CategoryScoresProps> = ({ categoryScores }) => {
  const sortedScores = [...categoryScores].sort((a, b) => {
    const percentA = (a.score / a.maxScore) * 100;
    const percentB = (b.score / b.maxScore) * 100;
    return percentB - percentA;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'delivery':
        return <ArrowUpRight className="h-5 w-5" />;
      case 'adaptation':
        return <ArrowRight className="h-5 w-5" />;
      case 'collaboration':
        return <ArrowUpRight className="h-5 w-5" />;
      case 'technical':
        return <ArrowRight className="h-5 w-5" />;
      case 'optimization':
        return <ArrowRight className="h-5 w-5" />;
      case 'team':
        return <ArrowDown className="h-5 w-5" />;
      default:
        return <ArrowRight className="h-5 w-5" />;
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-600';
    if (percentage >= 60) return 'bg-blue-600';
    if (percentage >= 40) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-xl font-medium text-slate-800 mb-6">Detailed Category Scores</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedScores.map((score, index) => {
          const percentage = Math.round((score.score / score.maxScore) * 100);
          const categoryKey = score.category as keyof typeof categoryDescriptions;
          
          return (
            <motion.div
              key={score.category}
              className="border border-slate-200 rounded-md p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <div className="flex items-center mb-2">
                <div className={`p-2 rounded-full mr-3 ${
                  percentage >= 80 ? 'bg-green-100 text-green-600' :
                  percentage >= 60 ? 'bg-blue-100 text-blue-600' :
                  percentage >= 40 ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                }`}>
                  {getCategoryIcon(score.category)}
                </div>
                <h4 className="text-lg font-medium text-slate-800 capitalize">
                  {score.category}
                </h4>
              </div>
              
              <p className="text-sm text-slate-600 mb-3">
                {categoryDescriptions[categoryKey]}
              </p>
              
              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <motion.div
                      className={`h-2.5 rounded-full ${getProgressColor(percentage)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
                
                <div className={`text-lg font-bold ${getScoreColor(percentage)}`}>
                  {percentage}%
                </div>
              </div>
              
              <div className="text-xs text-slate-500 mt-1 text-right">
                {score.score} / {score.maxScore} points
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CategoryScores;