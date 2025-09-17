import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, CheckCircle, AlertTriangle, XCircle, Eye, ArrowLeft } from 'lucide-react';
import { AnalysisResult, getScoreColor, getScoreBgColor, getScoreLabel } from '../utils/dummyData';
import { NewsChatbot } from './NewsChatbot';

interface AnalysisResultProps {
  result: AnalysisResult;
  onBack: () => void;
}

export function AnalysisResultComponent({ result, onBack }: AnalysisResultProps) {
  const [showEducational, setShowEducational] = useState(false);

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-6 w-6 text-accent-success" />;
    if (score >= 60) return <AlertTriangle className="h-6 w-6 text-accent-warning" />;
    if (score >= 40) return <AlertTriangle className="h-6 w-6 text-orange-500" />;
    return <XCircle className="h-6 w-6 text-accent-error" />;
  };

  const educationalTips = [
    {
      title: 'Check the Source',
      content: 'Always verify who published the information. Look for author credentials, publication date, and institutional backing.'
    },
    {
      title: 'Cross-Reference Multiple Sources',
      content: 'Don\'t rely on a single source. Check if the same information is reported by multiple credible outlets.'
    },
    {
      title: 'Watch for Emotional Language',
      content: 'Be skeptical of content that uses excessive emotional triggers like "SHOCKING", "UNBELIEVABLE", or all-caps text.'
    },
    {
      title: 'Verify Images and Videos',
      content: 'Images can be manipulated or used out of context. Use reverse image search to check their origin.'
    },
    {
      title: 'Check Publication Date',
      content: 'Old news can be recycled and presented as current. Always check when information was first published.'
    }
  ];

  return (
    <div className="space-y-5 bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary">
      {/* Header with Back Button */}
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
            <Eye className="h-3 w-3 text-accent-info" />
          </div>
          <span className="text-xs text-light-text-muted dark:text-dark-text-muted font-medium">Analysis Result</span>
        </div>
      </div>

      {/* Analyzed Text */}
      <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border shadow-light dark:shadow-dark">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3 mt-1">
            <div className="p-2 rounded-lg bg-gradient-accent">
              <span className="text-white text-sm">🔍</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Analyzed Text:</h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">"{result.text}"</p>
          </div>
        </div>
      </div>

      {/* Credibility Score */}
      <div className="bg-light-surface dark:bg-dark-surface rounded-xl p-5 border border-light-border dark:border-dark-border shadow-light-lg dark:shadow-dark-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {getScoreIcon(result.score)}
            <h3 className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary ml-3">Credibility Score</h3>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
              {result.score}/100
            </div>
            <div className={`text-sm font-semibold ${getScoreColor(result.score)}`}>
              {getScoreLabel(result.score)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-light-border dark:bg-dark-border rounded-full h-4 mb-2 overflow-hidden">
          <div
            className={`h-4 rounded-full transition-all duration-1000 ease-out ${
              result.score >= 80 ? 'bg-gradient-to-r from-accent-success to-green-400' :
              result.score >= 60 ? 'bg-gradient-to-r from-accent-warning to-yellow-400' :
              result.score >= 40 ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
              'bg-gradient-to-r from-accent-error to-red-400'
            }`}
            style={{ width: `${result.score}%` }}
          ></div>
        </div>
      </div>

      {/* Explanations */}
      <div className="bg-light-surface dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border p-5 shadow-light dark:shadow-dark">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 mr-3">
            <div className="p-2 rounded-lg bg-accent-warning/10">
              <span className="text-accent-warning text-sm">💡</span>
            </div>
          </div>
          <h3 className="text-sm font-bold text-light-text-primary dark:text-dark-text-primary">Analysis Details</h3>
        </div>
        <ul className="space-y-3">
          {result.explanations.map((explanation, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="flex-shrink-0 w-2 h-2 bg-accent-primary rounded-full mt-2 mr-4"></span>
              <span className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">{explanation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Learn More Link */}
      <div className="bg-accent-primary/5 border border-accent-primary/20 rounded-xl p-4">
        <a
          href={result.learnMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-accent-primary hover:text-accent-secondary font-semibold transition-colors duration-200 group"
        >
          <ExternalLink className="h-4 w-4 mr-3 group-hover:translate-x-1 transition-transform duration-200" />
          Learn more about this analysis
        </a>
      </div>

      {/* Educational Section */}
      <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl shadow-light dark:shadow-dark overflow-hidden">
        <button
          onClick={() => setShowEducational(!showEducational)}
          className="w-full p-5 text-left flex items-center justify-between hover:bg-light-card dark:hover:bg-dark-card transition-colors duration-200"
        >
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-accent-secondary/10 mr-3">
              <span className="text-accent-secondary">🎓</span>
            </div>
            <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">Why is this misinformation?</span>
          </div>
          {showEducational ? (
            <ChevronUp className="h-5 w-5 text-light-text-muted dark:text-dark-text-muted" />
          ) : (
            <ChevronDown className="h-5 w-5 text-light-text-muted dark:text-dark-text-muted" />
          )}
        </button>

        {showEducational && (
          <div className="border-t border-light-border dark:border-dark-border p-5 space-y-4 bg-light-card dark:bg-dark-card">
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
              Here are some key principles to help you identify misinformation:
            </p>
            {educationalTips.map((tip, index) => (
              <div key={index} className="bg-light-surface dark:bg-dark-surface rounded-lg p-4 border border-light-border dark:border-dark-border">
                <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary text-sm mb-2">{tip.title}</h4>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">{tip.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LLM Chatbot Section */}
      <NewsChatbot analysisResult={result} />
    </div>
  );
}