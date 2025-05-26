import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, CheckCircle, ArrowRight } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

interface IntroductionProps {
  onStart: () => void;
}

const Introduction: React.FC<IntroductionProps> = ({ onStart }) => {
  const { startNewAssessment } = useAssessment();
  const [teamName, setTeamName] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startNewAssessment(teamName);
    onStart();
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <ClipboardCheck className="h-16 w-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Agile Assessment Tool</h1>
        <p className="text-xl text-slate-600">
          Evaluate your team's agile practices and identify areas for improvement
        </p>
      </motion.div>
      
      <motion.div
        className="bg-white rounded-lg shadow-md p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
        
        <div className="space-y-6">
          <motion.div 
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="bg-blue-100 rounded-full p-2 mr-4">
              <span className="flex items-center justify-center h-6 w-6 bg-blue-600 text-white rounded-full font-medium">1</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-1">Answer 12 Questions</h3>
              <p className="text-slate-600">
                Respond to 12 key questions based on the core principles of agile development.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="bg-blue-100 rounded-full p-2 mr-4">
              <span className="flex items-center justify-center h-6 w-6 bg-blue-600 text-white rounded-full font-medium">2</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-1">Get Your Assessment</h3>
              <p className="text-slate-600">
                Receive detailed analysis of your team's agile maturity across key categories.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="bg-blue-100 rounded-full p-2 mr-4">
              <span className="flex items-center justify-center h-6 w-6 bg-blue-600 text-white rounded-full font-medium">3</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-1">Implement Recommendations</h3>
              <p className="text-slate-600">
                Use the personalized improvement suggestions to enhance your agile practices.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        className="bg-white rounded-lg shadow-md p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Start Your Assessment</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="teamName" className="block text-sm font-medium text-slate-700 mb-2">
              Team or Project Name (Optional)
            </label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your team name"
            />
          </div>
          
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-slate-600">Takes approximately 5-10 minutes to complete</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <span>Start Assessment</span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Introduction;