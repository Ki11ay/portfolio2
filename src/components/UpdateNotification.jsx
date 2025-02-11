import { useState, useEffect } from 'react';
import './styles/UpdateNotification.css';

const UpdateNotification = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setShow(true);
    };

    window.addEventListener('swUpdateAvailable', handleUpdate);

    return () => {
      window.removeEventListener('swUpdateAvailable', handleUpdate);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleDismiss = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="update-notification">
      <div className="update-content">
        <p>A new version is available!</p>
        <div className="update-actions">
          <button onClick={handleRefresh} className="update-button">
            Refresh
          </button>
          <button onClick={handleDismiss} className="dismiss-button">
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateNotification;
