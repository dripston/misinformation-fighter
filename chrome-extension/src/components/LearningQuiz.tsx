import React, { useState, useEffect } from 'react';
import { Brain, CheckCircle, XCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { QuizQuestion, dummyQuizQuestions } from '../utils/dummyData';

interface LearningQuizProps {
  onBack: () => void;
}

export function LearningQuiz({ onBack }: LearningQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const currentQuestion = dummyQuizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === dummyQuizQuestions.length - 1;
  const totalQuestions = dummyQuizQuestions.length;

  useEffect(() => {
    setAnswers(new Array(totalQuestions).fill(null));
  }, [totalQuestions]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (isLastQuestion) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(totalQuestions).fill(null));
  };

  const getScoreEmoji = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return '🏆';
    if (percentage >= 80) return '🌟';
    if (percentage >= 60) return '👍';
    return '📚';
  };

  if (showResult) {
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
            <div className="p-1.5 rounded-lg bg-accent-secondary/10 mr-2">
              <Brain className="h-3 w-3 text-accent-secondary" />
            </div>
            <span className="text-xs text-light-text-muted dark:text-dark-text-muted font-medium">Quiz Results</span>
          </div>
        </div>

        {/* Results */}
        <div className="text-center py-8 bg-light-surface dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border shadow-light-lg dark:shadow-dark-lg">
          <div className="text-4xl mb-4">
            {getScoreEmoji(score, totalQuestions)}
          </div>
          <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3">Quiz Complete!</h2>
          <div className="text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-3">
            {score}/{totalQuestions}
          </div>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary px-4">
            {score === totalQuestions
              ? "Perfect! You're a misinformation detection expert!"
              : score >= Math.ceil(totalQuestions * 0.8)
              ? "Great job! You have excellent detection skills."
              : score >= Math.ceil(totalQuestions * 0.6)
              ? "Good work! Keep practicing to improve your skills."
              : "Keep learning! Practice makes perfect."
            }
          </p>
        </div>

        {/* Question Review */}
        <div className="space-y-4">
          <h3 className="font-bold text-light-text-primary dark:text-dark-text-primary text-sm">Review:</h3>
          {dummyQuizQuestions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={question.id} className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border shadow-light dark:shadow-dark">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
                      {index + 1}. {question.question}
                    </p>
                  </div>
                  <div className="ml-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-accent-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-accent-error" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-1">
                  <strong>Correct:</strong> {question.options[question.correctAnswer]}
                </p>
                {!isCorrect && userAnswer !== null && (
                  <p className="text-xs text-accent-error">
                    <strong>You chose:</strong> {question.options[userAnswer]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={resetQuiz}
            className="flex-1 bg-gradient-accent text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200 text-sm font-semibold flex items-center justify-center transform hover:scale-[1.02]"
          >
            <RotateCcw className="h-4 w-4 mr-3" />
            Try Again
          </button>
          <button
            onClick={onBack}
            className="flex-1 bg-light-card dark:bg-dark-card text-light-text-primary dark:text-dark-text-primary py-3 px-4 rounded-xl hover:bg-light-border dark:hover:bg-dark-border border border-light-border dark:border-dark-border transition-all duration-200 text-sm font-semibold transform hover:scale-[1.02]"
          >
            Back to Main
          </button>
        </div>
      </div>
    );
  }

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
          <div className="p-1.5 rounded-lg bg-accent-secondary/10 mr-2">
            <Brain className="h-3 w-3 text-accent-secondary" />
          </div>
          <span className="text-xs text-light-text-muted dark:text-dark-text-muted font-medium">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-light-border dark:bg-dark-border rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-accent h-3 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`
          }}
        ></div>
      </div>

      {/* Quiz Header */}
      <div className="text-center py-2">
        <div className="p-3 rounded-xl bg-gradient-accent inline-block mb-3">
          <span className="text-white text-2xl">🎯</span>
        </div>
        <h2 className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary mb-2">Spot the Manipulation</h2>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Test your misinformation detection skills</p>
      </div>

      {/* Question */}
      <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-5 shadow-light-lg dark:shadow-dark-lg">
        <h3 className="font-bold text-light-text-primary dark:text-dark-text-primary mb-5 text-sm leading-relaxed">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left text-sm rounded-xl border transition-all duration-200 ${
                selectedAnswer === index
                  ? 'bg-accent-primary/10 border-accent-primary text-accent-primary shadow-light dark:shadow-dark'
                  : 'bg-light-card dark:bg-dark-card border-light-border dark:border-dark-border hover:bg-light-surface dark:hover:bg-dark-surface hover:border-accent-primary/30'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 transition-all duration-200 ${
                    selectedAnswer === index
                      ? 'border-accent-primary bg-accent-primary'
                      : 'border-light-text-muted dark:border-dark-text-muted'
                  }`}
                >
                  {selectedAnswer === index && (
                    <div className="w-full h-full rounded-full bg-white scale-50 transition-transform duration-200"></div>
                  )}
                </div>
                <span className="text-light-text-primary dark:text-dark-text-primary">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNextQuestion}
        disabled={selectedAnswer === null}
        className="w-full bg-gradient-accent text-white py-4 px-6 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
      </button>

      {/* Current Score */}
      <div className="text-center">
        <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
          Current Score: {score}/{currentQuestionIndex + (selectedAnswer !== null ? 1 : 0)}
        </p>
      </div>
    </div>
  );
}