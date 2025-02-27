import React from 'react';
import { useMouseContext } from '../context/MouseContext';
import './styles/Loading.css';

interface LoadingProps {
  message?: string;
  progress?: number;
}

const Loading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  progress = 0
}) => {
  const { cursorChangeHandler } = useMouseContext();

  return (
    <div 
      className="loading"
      onMouseEnter={() => cursorChangeHandler('default')}
      onMouseLeave={() => cursorChangeHandler('')}
    >
      <div className="loading-content">
        <div className="loading-spinner">
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="spinner-circle"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              stroke="currentColor"
              strokeDasharray={126}
              strokeDashoffset={126 - (126 * progress) / 100}
            />
            <circle
              className="spinner-background"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
              stroke="currentColor"
              opacity="0.2"
            />
          </svg>
          <span className="loading-progress">{Math.round(progress)}%</span>
        </div>

        <div className="loading-text">
          <p>{message}</p>
          <div className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      </div>

      <div className="loading-background">
        <div className="gradient-sphere"></div>
        <div className="dots-pattern"></div>
      </div>
    </div>
  );
};

export default Loading;
