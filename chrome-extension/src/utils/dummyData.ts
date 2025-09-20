export interface AnalysisResult {
  id: string;
  text: string;
  score: number;
  explanations: string[];
  learnMoreUrl: string;
  timestamp: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const dummyAnalysisResults: AnalysisResult[] = [
  {
    id: '1',
    text: 'Breaking: Government secretly planning to ban all social media platforms!',
    score: 23,
    explanations: [
      'Uses sensationalized language ("Breaking", "secretly")',
      'Makes extreme claims without credible sources',
      'Emotional manipulation through fear tactics',
      'No verifiable government statement found'
    ],
    learnMoreUrl: 'https://factcheck.example.com/social-media-ban-false',
    timestamp: new Date('2025-01-10T10:30:00')
  },
  {
    id: '2',
    text: 'Scientists at MIT develop new battery technology that charges phones in 10 seconds',
    score: 78,
    explanations: [
      'Source from reputable institution (MIT)',
      'Claim is technically plausible but needs verification',
      'No peer-reviewed publication cited',
      'Timeline seems optimistic for commercial availability'
    ],
    learnMoreUrl: 'https://factcheck.example.com/battery-tech-claim',
    timestamp: new Date('2025-01-09T14:15:00')
  },
  {
    id: '3',
    text: 'Local weather forecast predicts rain tomorrow with 70% chance of precipitation',
    score: 92,
    explanations: [
      'Information from official meteorological sources',
      'Reasonable probability statement',
      'Standard weather reporting format',
      'Easily verifiable through multiple sources'
    ],
    learnMoreUrl: 'https://weather.example.com/forecast-accuracy',
    timestamp: new Date('2025-01-08T16:45:00')
  }
];

export const dummyQuizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Which phrase shows emotional manipulation?',
    options: [
      'Government launches new healthcare scheme',
      'SHOCKING! You won\'t believe what happened next!',
      'Research study published in Nature journal',
      'Local council meeting scheduled for Tuesday'
    ],
    correctAnswer: 1,
    explanation: 'Phrases like "SHOCKING!" and "You won\'t believe" are designed to trigger emotional responses rather than provide factual information.'
  },
  {
    id: '2',
    question: 'What is a red flag for misinformation?',
    options: [
      'Author credentials clearly listed',
      'Multiple reliable sources cited',
      'No sources provided for extraordinary claims',
      'Publication date clearly visible'
    ],
    correctAnswer: 2,
    explanation: 'Extraordinary claims require extraordinary evidence. When bold statements are made without credible sources, it\'s a major red flag.'
  },
  {
    id: '3',
    question: 'Which source is most likely to be reliable?',
    options: [
      'Anonymous social media account',
      'Peer-reviewed academic journal',
      'Unverified blog post',
      'Forwarded WhatsApp message'
    ],
    correctAnswer: 1,
    explanation: 'Peer-reviewed academic journals have rigorous fact-checking and review processes, making them highly reliable sources.'
  }
];

export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-accent-success';
  if (score >= 60) return 'text-accent-warning';
  if (score >= 40) return 'text-orange-600';
  return 'text-accent-error';
};

export const getScoreBgColor = (score: number): string => {
  if (score >= 80) return 'bg-accent-success/10 border-accent-success/20';
  if (score >= 60) return 'bg-accent-warning/10 border-accent-warning/20';
  if (score >= 40) return 'bg-orange-100 border-orange-200';
  return 'bg-accent-error/10 border-accent-error/20';
};

export const getScoreLabel = (score: number): string => {
  if (score >= 80) return 'Highly Credible';
  if (score >= 60) return 'Moderately Credible';
  if (score >= 40) return 'Low Credibility';
  return 'Highly Suspicious';
};