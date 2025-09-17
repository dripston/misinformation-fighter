# Misinformation Fighter - Chrome Extension

A powerful Chrome extension that helps users detect misinformation and fake news using AI-powered analysis. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Real-time Content Analysis**: Analyze text content for credibility scores
- **Educational Quiz System**: Learn to identify misinformation patterns
- **Analysis History**: Track previously analyzed content
- **Dark/Light Theme**: Toggle between dark and light modes
- **Credibility Scoring**: Get numerical scores (0-100) indicating content reliability

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

## Development

To run the extension in development mode:

```bash
npm run dev
```

## Technology Stack

- **React 19** - User interface framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/          # React components
│   ├── AnalysisResult.tsx
│   ├── HistorySection.tsx
│   ├── LearningQuiz.tsx
│   ├── PopupInterface.tsx
│   └── ThemeToggle.tsx
├── contexts/           # React contexts
│   └── ThemeContext.tsx
├── utils/              # Utility functions and data
│   └── dummyData.ts
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the extension
5. Submit a pull request

## License

This project is licensed under the MIT License.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
