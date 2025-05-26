import React, { useState } from 'react';
import { AssessmentProvider, useAssessment } from './context/AssessmentContext';
import Layout from './components/Layout';
import Introduction from './components/Introduction';
import AssessmentForm from './components/AssessmentForm';
import Results from './components/Results';

enum AppView {
  INTRO,
  ASSESSMENT,
  RESULTS
}

const AppContent: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.INTRO);
  const { currentAssessment } = useAssessment();
  
  // If assessment is complete, show results
  React.useEffect(() => {
    if (currentAssessment.complete) {
      setView(AppView.RESULTS);
    }
  }, [currentAssessment.complete]);
  
  const renderView = () => {
    switch (view) {
      case AppView.INTRO:
        return <Introduction onStart={() => setView(AppView.ASSESSMENT)} />;
      case AppView.ASSESSMENT:
        return <AssessmentForm />;
      case AppView.RESULTS:
        return <Results onStartNew={() => setView(AppView.INTRO)} />;
      default:
        return <Introduction onStart={() => setView(AppView.ASSESSMENT)} />;
    }
  };
  
  return (
    <Layout>
      {renderView()}
    </Layout>
  );
};

function App() {
  return (
    <AssessmentProvider>
      <AppContent />
    </AssessmentProvider>
  );
}

export default App;