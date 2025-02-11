import { useState, useEffect } from 'react';
import { subscribeToNetworkStatus, getConnectionType } from '../utils/networkUtils';
import './styles/OfflineIndicator.css';

const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [connection, setConnection] = useState(getConnectionType());

  useEffect(() => {
    // Subscribe to network status changes
    const unsubscribe = subscribeToNetworkStatus((online) => {
      setIsOffline(!online);
    });

    // Monitor connection quality
    if ('connection' in navigator) {
      const handleConnectionChange = () => {
        setConnection(getConnectionType());
      };

      navigator.connection.addEventListener('change', handleConnectionChange);
      return () => {
        unsubscribe();
        navigator.connection.removeEventListener('change', handleConnectionChange);
      };
    }

    return unsubscribe;
  }, []);

  if (!isOffline && !connection?.saveData) return null;

  return (
    <div className={`offline-indicator ${isOffline ? 'offline' : 'slow-connection'}`}>
      <div className="offline-content">
        {isOffline ? (
          <>
            <span className="offline-icon">📡</span>
            <span className="offline-text">You're offline</span>
          </>
        ) : connection?.saveData ? (
          <>
            <span className="offline-icon">🔄</span>
            <span className="offline-text">
              Data Saver {connection.effectiveType ? `(${connection.effectiveType})` : ''}
            </span>
          </>
        ) : connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g' ? (
          <>
            <span className="offline-icon">📶</span>
            <span className="offline-text">Slow connection</span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default OfflineIndicator;
