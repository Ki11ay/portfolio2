import { useEffect, useState, useCallback } from 'react';
import './styles/Loading.css';

const Loading = ({ setIsLoading }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleComplete = useCallback(() => {
    setIsFading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Match the CSS transition duration

    return () => clearTimeout(timeout);
  }, [setIsLoading]);

  useEffect(() => {
    let isMounted = true;
    let progressInterval;
    let completionTimeout;

    // Set minimum loading time to prevent flickering
    const minLoadingTime = 1500; // 1.5 seconds
    const startTime = Date.now();

    // Simulate loading progress
    progressInterval = setInterval(() => {
      if (!isMounted) return;

      setProgress(prev => {
        const timePassed = Date.now() - startTime;
        const progressIncrement = Math.random() * 15; // Smoother progress
        const newProgress = Math.min(prev + progressIncrement, 
          timePassed >= minLoadingTime ? 100 : 90);

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    // Ensure minimum loading time
    completionTimeout = setTimeout(() => {
      if (!isMounted) return;
      
      setProgress(100);
      const cleanup = handleComplete();
      return () => cleanup();
    }, minLoadingTime);

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
      clearTimeout(completionTimeout);
    };
  }, [handleComplete]);

  return (
    <div className={`loading-screen ${isFading ? 'fade-out' : ''}`}>
      <div className="loading-container">
        <div className="loading-spinner" aria-hidden="true" />
        <div className="loading-progress" role="progressbar" 
             aria-valuenow={progress} aria-valuemin="0" 
             aria-valuemax="100">
          <div 
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loading-text" aria-live="polite">
          Loading<span className="loading-dots"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
