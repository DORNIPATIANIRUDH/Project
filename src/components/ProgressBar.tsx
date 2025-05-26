import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const roundedPercentage = Math.round(percentage);
  
  return (
    <div className="w-full bg-slate-200 rounded-full h-4 mb-6">
      <motion.div
        className="h-4 rounded-full bg-blue-600"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5 }}
      />
      <div className="flex justify-end mt-1">
        <span className="text-sm text-slate-600">
          {roundedPercentage}% complete
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;