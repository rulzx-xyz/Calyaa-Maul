import React, { useState } from 'react';

interface ControlsProps {
  onGenerate: (theme: string) => void;
  isLoading: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onGenerate, isLoading }) => {
  const [theme, setTheme] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (theme.trim() && !isLoading) {
      onGenerate(theme.trim());
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
      <form
        onSubmit={handleSubmit}
        className="glassmorphism max-w-xl mx-auto rounded-full shadow-lg p-2 flex items-center transition-all duration-300 focus-within:shadow-rose-500/50"
        aria-label="Generate love notes"
      >
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="What do you love? e.g., 'stars', 'ocean', 'coffee'"
          className="input-field flex-grow bg-transparent text-white placeholder-rose-300 text-lg px-6 py-2 border-none focus:ring-0"
          disabled={isLoading}
          aria-label="Theme for love notes"
        />
        <button
          type="submit"
          className="generate-button bg-rose-500 hover:bg-rose-600 disabled:bg-rose-800 disabled:cursor-not-allowed text-white font-bold rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105"
          disabled={isLoading}
          aria-live="polite"
        >
          {isLoading ? 'Creating...' : 'Generate'}
        </button>
      </form>
    </div>
  );
};

export default Controls;
