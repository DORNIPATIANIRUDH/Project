import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, BarChart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ClipboardCheck className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-semibold text-slate-900">Agile Assessment Tool</h1>
          </motion.div>
          <nav>
            <ul className="flex space-x-6">
              <motion.li 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="/" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                  <ClipboardCheck className="h-4 w-4" />
                  <span>Assessment</span>
                </a>
              </motion.li>
              <motion.li 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="/results" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                  <BarChart className="h-4 w-4" />
                  <span>Results</span>
                </a>
              </motion.li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-slate-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© 2025 Agile Assessment Tool</p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">About</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;