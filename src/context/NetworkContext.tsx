import React, { createContext, useContext, useEffect, useState } from 'react';
import type { NetworkContextType, NetworkType, EffectiveConnectionType } from '../types/network';

const defaultNetworkState: NetworkContextType = {
  isOnline: true,
  networkType: 'unknown',
  effectiveType: 'unknown',
  downlink: undefined,
  rtt: undefined,
  saveData: undefined
};

const NetworkContext = createContext<NetworkContextType>(defaultNetworkState);

export const useNetwork = () => useContext(NetworkContext);

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [networkState, setNetworkState] = useState<NetworkContextType>({
    ...defaultNetworkState,
    isOnline: navigator.onLine
  });

  useEffect(() => {
    const updateNetworkInfo = () => {
      const connection = navigator.connection;
      
      setNetworkState(prevState => ({
        ...prevState,
        isOnline: navigator.onLine,
        networkType: connection?.type ?? 'unknown',
        effectiveType: connection?.effectiveType ?? 'unknown',
        downlink: connection?.downlink,
        rtt: connection?.rtt,
        saveData: connection?.saveData
      }));
    };

    // Initial update
    updateNetworkInfo();

    // Online/Offline events
    const handleOnline = () => {
      setNetworkState(prevState => ({
        ...prevState,
        isOnline: true
      }));
    };

    const handleOffline = () => {
      setNetworkState(prevState => ({
        ...prevState,
        isOnline: false
      }));
    };

    // Connection change events
    const handleConnectionChange = () => {
      updateNetworkInfo();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (navigator.connection) {
      navigator.connection.addEventListener('change', handleConnectionChange);
    }

    // Cleanup function
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      if (navigator.connection) {
        navigator.connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []); // Empty dependency array as we don't depend on any props or state

  useEffect(() => {
    // Log network status changes in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Network status:', networkState);
    }
  }, [networkState]);

  return (
    <NetworkContext.Provider value={networkState}>
      {children}
    </NetworkContext.Provider>
  );
};

// Hook to check if we're offline and need to show offline content
export const useIsOffline = () => {
  const { isOnline } = useNetwork();
  return !isOnline;
};

// Hook to check if we're on a slow connection
export const useIsSlowConnection = () => {
  const { effectiveType, networkType } = useNetwork();
  return (
    effectiveType === 'slow-2g' ||
    effectiveType === '2g' ||
    networkType === 'none' ||
    networkType === 'unknown'
  );
};

// Hook to get the connection quality level
export const useConnectionQuality = () => {
  const { effectiveType } = useNetwork();
  
  switch (effectiveType) {
    case '4g':
      return 'high';
    case '3g':
      return 'medium';
    case '2g':
      return 'low';
    case 'slow-2g':
      return 'very-low';
    default:
      return 'unknown';
  }
};

// Helper function to check if the app should use reduced data mode
export const useReducedData = () => {
  const { saveData, effectiveType } = useNetwork();
  return saveData || effectiveType === 'slow-2g' || effectiveType === '2g';
};
