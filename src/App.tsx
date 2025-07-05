import React from 'react';
import { useApp } from './contexts/AppContext';
import Header from './components/Header';
import StepLine from './components/StepLine';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import JobDescriptionStep from './components/steps/JobDescriptionStep';
import DocumentUploadStep from './components/steps/DocumentUploadStep';
import ProcessingStep from './components/steps/ProcessingStep';
import ResultsStep from './components/steps/ResultsStep';
import ContactPage from './components/pages/ContactPage';
import ReportBugPage from './components/pages/ReportBugPage';
import AboutPage from './components/pages/AboutPage';

function App() {
  const { state } = useApp();

  const renderCurrentView = () => {
    if (state.currentView === 'home') {
      return <HomePage />;
    }

    if (state.currentView === 'page') {
      switch ((state as any).currentPage) {
        case 'contact':
          return <ContactPage />;
        case 'report-bug':
          return <ReportBugPage />;
        case 'about':
          return <AboutPage />;
        default:
          return <HomePage />;
      }
    }

    // Vista de proceso
    switch (state.currentStep) {
      case 0:
        return <JobDescriptionStep />;
      case 1:
        return <DocumentUploadStep />;
      case 2:
        return <ProcessingStep />;
      case 3:
        return <ResultsStep />;
      default:
        return <JobDescriptionStep />;
    }
  };

  const showStepLine = state.currentView === 'process';
  const showFooter = state.currentView === 'home';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Header />
      {showStepLine && <StepLine />}
      <main className={`flex-1 ${state.currentView === 'home' ? '' : 'py-6'}`}>
        {renderCurrentView()}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;