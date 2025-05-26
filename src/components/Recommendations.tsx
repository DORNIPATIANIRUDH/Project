import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { CategoryScore } from '../types';

interface RecommendationsProps {
  categoryScores: CategoryScore[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ categoryScores }) => {
  const getLowScoreCategories = () => {
    return categoryScores
      .filter(score => (score.score / score.maxScore) * 100 < 60)
      .sort((a, b) => (a.score / a.maxScore) - (b.score / b.maxScore));
  };

  const getHighScoreCategories = () => {
    return categoryScores
      .filter(score => (score.score / score.maxScore) * 100 >= 80)
      .sort((a, b) => (b.score / b.maxScore) - (a.score / a.maxScore));
  };

  const getRecommendationsForCategory = (category: string) => {
    switch (category) {
      case 'delivery':
        return [
          "Implement shorter iteration cycles to deliver value more frequently",
          "Break work down into smaller, deliverable increments",
          "Focus on deploying working software rather than documentation",
          "Implement continuous integration and deployment practices"
        ];
      case 'adaptation':
        return [
          "Create processes for incorporating feedback throughout development",
          "Hold more frequent retrospectives to identify improvement areas",
          "Build flexibility into your planning to accommodate changes",
          "Develop a backlog refinement practice to prioritize changing requirements"
        ];
      case 'collaboration':
        return [
          "Schedule regular face-to-face interactions between team members",
          "Implement daily standups to improve communication",
          "Co-locate product owners with development teams when possible",
          "Create more opportunities for stakeholder feedback and involvement"
        ];
      case 'technical':
        return [
          "Invest in refactoring to improve code quality",
          "Implement pair programming or code reviews",
          "Develop a robust automated testing strategy",
          "Create time for technical debt reduction"
        ];
      case 'optimization':
        return [
          "Identify and eliminate waste in your development process",
          "Focus on creating minimum viable solutions before adding features",
          "Implement value stream mapping to identify bottlenecks",
          "Regularly review and simplify your processes"
        ];
      case 'team':
        return [
          "Empower teams to make more decisions without management approval",
          "Create a sustainable pace with reasonable sprint commitments",
          "Invest in team building and trust development",
          "Provide training opportunities to increase team capabilities"
        ];
      default:
        return ["No specific recommendations available for this category"];
    }
  };

  const lowScoreCategories = getLowScoreCategories();
  const highScoreCategories = getHighScoreCategories();

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h3 className="text-xl font-medium text-slate-800 mb-6">Recommendations for Improvement</h3>
      
      {lowScoreCategories.length > 0 ? (
        <div className="mb-8">
          <h4 className="text-lg font-medium text-red-600 flex items-center mb-4">
            <AlertCircle className="h-5 w-5 mr-2" />
            Areas Needing Improvement
          </h4>
          
          <div className="space-y-6">
            {lowScoreCategories.map(category => (
              <div key={category.category} className="border-l-4 border-red-500 pl-4 py-1">
                <h5 className="text-md font-medium text-slate-800 capitalize mb-2">
                  {category.category}
                </h5>
                <ul className="list-disc list-inside space-y-2 text-slate-700">
                  {getRecommendationsForCategory(category.category).map((rec, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      {rec}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-8 bg-green-50 p-4 rounded-md">
          <p className="text-green-700 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Great job! All categories score above 60%.
          </p>
        </div>
      )}
      
      {highScoreCategories.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-green-600 flex items-center mb-4">
            <CheckCircle className="h-5 w-5 mr-2" />
            Areas of Strength
          </h4>
          
          <div className="space-y-6">
            {highScoreCategories.map(category => (
              <div key={category.category} className="border-l-4 border-green-500 pl-4 py-1">
                <h5 className="text-md font-medium text-slate-800 capitalize mb-1">
                  {category.category}
                </h5>
                <p className="text-slate-600">
                  You're doing well in this area. Consider sharing your successful practices with other teams.
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-8 bg-blue-50 p-4 rounded-md flex items-start">
        <HelpCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
        <div className="text-blue-700">
          <p className="font-medium mb-1">Next Steps</p>
          <p className="text-sm">
            Consider reviewing these recommendations with your team during your next retrospective.
            Choose 1-2 focus areas to improve in your next sprint, then reassess in 2-4 weeks to track progress.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Recommendations;