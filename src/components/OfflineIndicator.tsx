import React, { useEffect, useState } from 'react';
import { useNetwork } from '../context/NetworkContext';
import { useMouseContext } from '../context/MouseContext';
import './styles/OfflineIndicator.css';

const OfflineIndicator: React.FC = () => {
  const { isOnline } = useNetwork();
  const { cursorChangeHandler } = useMouseContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isOnline) {
      setIsVisible(true);
      setIsExiting(false);
    } else if (isVisible) {
      setIsExiting(true);
      timeout = setTimeout(() => {
        setIsVisible(false);
        setIsExiting(false);
      }, 300); // Match transition duration
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isOnline, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`offline-indicator ${isExiting ? 'exit' : ''}`}
      role="alert"
      onMouseEnter={() => cursorChangeHandler('hover')}
      onMouseLeave={() => cursorChangeHandler('')}
    >
      <div className="offline-content">
        <div className="offline-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.69 4.69L3.81 2.57C4.2 2.18 4.84 2.18 5.23 2.57L21.43 18.77C21.82 19.16 21.82 19.8 21.43 20.19L19.31 22.31C18.92 22.7 18.28 22.7 17.89 22.31L1.69 6.11C1.3 5.72 1.3 5.08 1.69 4.69Z"
              fill="currentColor"
            />
            <path
              d="M12 4C14.95 4 17.61 5.14 19.7 7.23L17.89 9.04C16.24 7.39 14.23 6.5 12 6.5C9.76 6.5 7.76 7.39 6.11 9.04L4.3 7.23C6.39 5.14 9.05 4 12 4Z"
              fill="currentColor"
            />
            <path
              d="M12 9C13.66 9 15.14 9.69 16.22 10.78L14.41 12.59C13.76 11.94 12.95 11.5 12 11.5C11.05 11.5 10.24 11.94 9.59 12.59L7.78 10.78C8.86 9.69 10.34 9 12 9Z"
              fill="currentColor"
            />
            <path
              d="M12 14C12.55 14 13.05 14.22 13.41 14.58L12 16L10.59 14.58C10.95 14.22 11.45 14 12 14Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="offline-message">
          <h3>You're offline</h3>
          <p>Check your internet connection</p>
        </div>
      </div>
    </div>
  );
};

export default OfflineIndicator;
