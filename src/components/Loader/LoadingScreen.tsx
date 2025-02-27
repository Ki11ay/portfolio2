import React, { useEffect, useState } from 'react';
import { useMouseContext } from '../../context/MouseContext';
import './styles/Loader.css';

interface LoadingScreenProps {
  onLoadComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState(0);
  const { cursorChangeHandler } = useMouseContext();

  const loadingMessages = [
    'Initializing...',
    'Loading assets...',
    'Preparing animations...',
    'Almost there...'
  ];

  useEffect(() => {
    const duration = 2000; // Total loading duration in ms
    const interval = 10; // Update interval in ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      // Update loading stage based on progress
      const stage = Math.floor((newProgress / 100) * loadingMessages.length);
      setLoadingStage(Math.min(stage, loadingMessages.length - 1));

      if (currentStep >= steps) {
        clearInterval(timer);
        if (onLoadComplete) {
          setTimeout(onLoadComplete, 500); // Delay to show 100%
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <div 
      className="loading-screen"
      onMouseEnter={() => cursorChangeHandler('default')}
      onMouseLeave={() => cursorChangeHandler('')}
    >
      <div className="loader-content">
        <div className="logo-animation">
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="logo-svg"
          >
            <circle
              className="logo-circle"
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
            />
            <path
              className="logo-path"
              d="M30,50 L70,50 M50,30 L50,70"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="80"
              strokeDashoffset={80 - (80 * progress) / 100}
            />
          </svg>
        </div>

        <div className="loading-info">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="loading-text">
            <span className="loading-message">
              {loadingMessages[loadingStage]}
            </span>
            <span className="loading-percentage">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      <div className="loader-background">
        <div className="gradient-sphere"></div>
        <div className="dots-pattern"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
