import React, { useState } from 'react';
import { Search, AlertTriangle, Info } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface PopupInterfaceProps {
  onAnalyze: (text: string) => void;
  isAnalyzing: boolean;
}

export function PopupInterface({ onAnalyze, isAnalyzing }: PopupInterfaceProps) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onAnalyze(inputText.trim());
    }
  };

  const insertSampleText = (sampleText: string) => {
    setInputText(sampleText);
  };

  return (
    <div className="space-y-6 bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary">
      {/* Header */}
      <div className="text-center relative">
        <div className="absolute top-0 right-0">
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-center mb-3">
          <div className="p-2 rounded-xl bg-gradient-accent mr-3">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
            Misinformation Analyzer
          </h1>
        </div>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          Paste any text or claim to check its credibility
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <label htmlFor="text-input" className="block text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Text to Analyze
          </label>
          <textarea
            id="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste the text, headline, or claim you want to verify..."
            className="w-full h-28 px-4 py-3 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-transparent resize-none text-sm text-light-text-primary dark:text-dark-text-primary placeholder-light-text-muted dark:placeholder-dark-text-muted shadow-light dark:shadow-dark transition-all duration-200"
            disabled={isAnalyzing}
          />
        </div>

        <button
          type="submit"
          disabled={!inputText.trim() || isAnalyzing}
          className="w-full bg-gradient-accent text-white py-3 px-6 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-3" />
              Analyze Text
            </>
          )}
        </button>
      </form>

      {/* Sample Texts */}
      <div className="bg-light-card dark:bg-dark-card rounded-xl p-5 border border-light-border dark:border-dark-border shadow-light dark:shadow-dark">
        <div className="flex items-center mb-4">
          <div className="p-1.5 rounded-lg bg-accent-info/10 mr-3">
            <Info className="h-4 w-4 text-accent-info" />
          </div>
          <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">Try Sample Texts</h3>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => insertSampleText('Breaking: Government secretly planning to ban all social media platforms!')}
            className="w-full text-left text-xs bg-light-surface dark:bg-dark-surface p-3 rounded-lg border border-light-border dark:border-dark-border hover:border-accent-error hover:bg-red-50 dark:hover:bg-red-950/20 text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-error transition-all duration-200"
            disabled={isAnalyzing}
          >
            <span className="text-accent-error mr-2">🚨</span>
            "Breaking: Government secretly planning to ban all social media platforms!"
          </button>
          <button
            onClick={() => insertSampleText('Scientists at MIT develop new battery technology that charges phones in 10 seconds')}
            className="w-full text-left text-xs bg-light-surface dark:bg-dark-surface p-3 rounded-lg border border-light-border dark:border-dark-border hover:border-accent-warning hover:bg-yellow-50 dark:hover:bg-yellow-950/20 text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-warning transition-all duration-200"
            disabled={isAnalyzing}
          >
            <span className="text-accent-warning mr-2">🔬</span>
            "Scientists at MIT develop new battery technology..."
          </button>
          <button
            onClick={() => insertSampleText('Local weather forecast predicts rain tomorrow with 70% chance of precipitation')}
            className="w-full text-left text-xs bg-light-surface dark:bg-dark-surface p-3 rounded-lg border border-light-border dark:border-dark-border hover:border-accent-success hover:bg-green-50 dark:hover:bg-green-950/20 text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-success transition-all duration-200"
            disabled={isAnalyzing}
          >
            <span className="text-accent-success mr-2">🌧️</span>
            "Local weather forecast predicts rain tomorrow..."
          </button>
        </div>
      </div>
    </div>
  );
}