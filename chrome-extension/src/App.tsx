import React, { useState } from 'react';
import { History, Brain } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import { PopupInterface } from './components/PopupInterface';
import { AnalysisResultComponent } from './components/AnalysisResult';
import { HistorySection } from './components/HistorySection';
import { LearningQuiz } from './components/LearningQuiz';
import { AnalysisResult, dummyAnalysisResults } from './utils/dummyData';

type ViewState = 'main' | 'analysis' | 'history' | 'quiz';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('main');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [analysisHistory] = useState<AnalysisResult[]>(dummyAnalysisResults);

  const handleAnalyze = async (text: string) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Find matching dummy result or create a new one
    let result = dummyAnalysisResults.find(r => 
      r.text.toLowerCase().includes(text.toLowerCase().substring(0, 20))
    );
    
    if (!result) {
      // Create a random result for unknown text
      const randomScore = Math.floor(Math.random() * 100);
      result = {
        id: Date.now().toString(),
        text: text,
        score: randomScore,
        explanations: [
          'Content analyzed using AI detection algorithms',
          'Cross-referenced against known fact-checking databases',
          'Language pattern analysis completed',
          'Source credibility assessment performed'
        ],
        learnMoreUrl: 'https://factcheck.example.com/analysis-details',
        timestamp: new Date()
      };
    }
    
    setCurrentResult(result);
    setIsAnalyzing(false);
    setCurrentView('analysis');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setCurrentResult(null);
  };

  const handleViewHistory = () => {
    setCurrentView('history');
  };

  const handleViewQuiz = () => {
    setCurrentView('quiz');
  };

  const handleSelectHistoryResult = (result: AnalysisResult) => {
    setCurrentResult(result);
    setCurrentView('analysis');
  };

  const renderBottomNavigation = () => {
    if (currentView !== 'main') return null;

    return (
      <div className="border-t border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface px-5 py-4">
        <div className="flex space-x-3">
          <button
            onClick={handleViewHistory}
            className="flex-1 flex items-center justify-center py-3 px-4 text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 rounded-xl transition-all duration-200 border border-transparent hover:border-accent-primary/20"
          >
            <History className="h-4 w-4 mr-2" />
            History
          </button>
          <button
            onClick={handleViewQuiz}
            className="flex-1 flex items-center justify-center py-3 px-4 text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-secondary hover:bg-accent-secondary/10 rounded-xl transition-all duration-200 border border-transparent hover:border-accent-secondary/20"
          >
            <Brain className="h-4 w-4 mr-2" />
            Quiz
          </button>
        </div>
      </div>
    );
  };

  return (
    <ThemeProvider>
      <div className="w-[400px] max-h-[600px] bg-light-bg dark:bg-dark-bg flex flex-col overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 p-5 overflow-y-auto">
          {currentView === 'main' && (
            <PopupInterface 
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          )}
          
          {currentView === 'analysis' && currentResult && (
            <AnalysisResultComponent 
              result={currentResult}
              onBack={handleBackToMain}
            />
          )}
          
          {currentView === 'history' && (
            <HistorySection 
              history={analysisHistory}
              onSelectResult={handleSelectHistoryResult}
              onBack={handleBackToMain}
            />
          )}
          
          {currentView === 'quiz' && (
            <LearningQuiz onBack={handleBackToMain} />
          )}
        </div>

        {/* Bottom Navigation */}
        {renderBottomNavigation()}
      </div>
    </ThemeProvider>
  );
}

export default App;