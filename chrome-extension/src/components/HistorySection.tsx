import React from 'react';
import { Clock, TrendingUp, ArrowLeft } from 'lucide-react';
import { AnalysisResult, getScoreColor, getScoreLabel } from '../utils/dummyData';

interface HistorySectionProps {
  history: AnalysisResult[];
  onSelectResult: (result: AnalysisResult) => void;
  onBack: () => void;
}

export function HistorySection({ history, onSelectResult, onBack }: HistorySectionProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-5 bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-accent-primary hover:text-accent-secondary text-sm font-semibold transition-colors duration-200 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Analyzer
        </button>
        <div className="flex items-center">
          <div className="p-1.5 rounded-lg bg-accent-info/10 mr-2">
            <Clock className="h-3 w-3 text-accent-info" />
          </div>
          <span className="text-xs text-light-text-muted dark:text-dark-text-muted font-medium">Analysis History</span>
        </div>
      </div>

      <div className="text-center py-2">
        <div className="p-3 rounded-xl bg-gradient-accent inline-block mb-3">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary mb-2">Recent Analyses</h2>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Your last {history.length} credibility checks</p>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {history.length === 0 ? (
          <div className="text-center py-12 bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border">
            <div className="text-4xl mb-3">📝</div>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">No analyses yet</p>
            <p className="text-xs text-light-text-muted dark:text-dark-text-muted">Start by analyzing some text!</p>
          </div>
        ) : (
          history.map((result) => (
            <button
              key={result.id}
              onClick={() => onSelectResult(result)}
              className="w-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-4 hover:bg-light-card dark:hover:bg-dark-card hover:border-accent-primary/30 transition-all duration-200 text-left shadow-light dark:shadow-dark hover:shadow-light-lg dark:hover:shadow-dark-lg transform hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 mr-3">
                  <p className="text-sm text-light-text-primary dark:text-dark-text-primary line-clamp-2 leading-relaxed font-medium">
                    "{result.text}"
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-xl font-bold ${getScoreColor(result.score)}`}>
                    {result.score}
                  </div>
                  <div className="text-xs text-light-text-muted dark:text-dark-text-muted">
                    {formatDate(result.timestamp)}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold ${getScoreColor(result.score)} px-2 py-1 rounded-full bg-opacity-10 ${
                  result.score >= 80 ? 'bg-accent-success' :
                  result.score >= 60 ? 'bg-accent-warning' :
                  result.score >= 40 ? 'bg-orange-500' :
                  'bg-accent-error'
                }`}>
                  {getScoreLabel(result.score)}
                </span>
                <div className="flex items-center text-xs text-light-text-muted dark:text-dark-text-muted">
                  <span>{result.explanations.length} factors</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {history.length > 0 && (
        <div className="text-center pt-4 border-t border-light-border dark:border-dark-border">
          <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
            Click any item to view detailed analysis
          </p>
        </div>
      )}
    </div>
  );
}