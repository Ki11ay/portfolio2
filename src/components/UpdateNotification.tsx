import React, { useEffect, useState } from 'react';
import { useUpdatePWA } from '../context/PWAContext';
import './styles/UpdateNotification.css';

interface UpdateNotificationProps {
  className?: string;
  message?: string;
  updateButtonText?: string;
  dismissButtonText?: string;
  showDismiss?: boolean;
  autoShow?: boolean;
  autoHideDelay?: number;
}

export function UpdateNotification({
  className = '',
  message = 'A new version is available',
  updateButtonText = 'Update Now',
  dismissButtonText = 'Later',
  showDismiss = true,
  autoShow = true,
  autoHideDelay = 0
}: UpdateNotificationProps): JSX.Element | null {
  const { hasUpdate, updateServiceWorker } = useUpdatePWA();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!hasUpdate || isDismissed) {
      setIsVisible(false);
      return;
    }

    if (autoShow) {
      // Show notification after a small delay
      const showTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      // Optional auto-hide functionality
      let hideTimeout: NodeJS.Timeout | undefined;
      if (autoHideDelay > 0) {
        hideTimeout = setTimeout(() => {
          setIsVisible(false);
        }, autoHideDelay);
      }

      return () => {
        clearTimeout(showTimeout);
        if (hideTimeout) {
          clearTimeout(hideTimeout);
        }
      };
    }
  }, [hasUpdate, autoShow, autoHideDelay, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleUpdate = () => {
    updateServiceWorker();
    setIsVisible(false);
  };

  if (!hasUpdate || !isVisible) {
    return null;
  }

  return (
    <div
      className={`update-notification ${className} ${isVisible ? 'visible' : ''}`}
      role="alert"
      aria-live="polite"
    >
      <div className="update-notification-content">
        <span className="update-notification-icon">🔄</span>
        <span className="update-notification-message">{message}</span>
        <div className="update-notification-actions">
          <button
            className="update-notification-button update"
            onClick={handleUpdate}
            aria-label={updateButtonText}
          >
            {updateButtonText}
          </button>
          {showDismiss && (
            <button
              className="update-notification-button dismiss"
              onClick={handleDismiss}
              aria-label={dismissButtonText}
            >
              {dismissButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateNotification;
