import type {
  NetworkInformation,
  ConnectionState,
  NetworkMonitorOptions,
  NetworkQuality
} from '../types/network';
import { ConnectionType, ConnectionSpeed } from '../types/network';

// Type guard
export const isNetworkInformation = (value: unknown): value is NetworkInformation => {
  return (
    value !== null &&
    typeof value === 'object' &&
    'downlink' in value &&
    'effectiveType' in value &&
    'rtt' in value &&
    'type' in value
  );
};

export const getCurrentConnection = (): NetworkInformation | null => {
  const nav = navigator as Navigator & {
    connection?: NetworkInformation;
    mozConnection?: NetworkInformation;
    webkitConnection?: NetworkInformation;
  };

  return nav.connection || nav.mozConnection || nav.webkitConnection || null;
};

export const isOnline = (): boolean => {
  return navigator.onLine;
};

export const hasInternetConnection = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch('/ping', {
      method: 'HEAD',
      signal,
      cache: 'no-store'
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
};

export const getConnectionState = (): ConnectionState => {
  const connection = getCurrentConnection();
  const online = isOnline();

  if (connection && isNetworkInformation(connection)) {
    return {
      online,
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
      type: connection.type
    };
  }

  return {
    online,
    effectiveType: ConnectionSpeed.Unknown,
    downlink: 0,
    rtt: 0,
    saveData: false,
    type: ConnectionType.Unknown
  };
};

export const monitorNetworkStatus = ({
  checkInterval = 30000,
  onStatusChange,
  onConnect,
  onDisconnect
}: NetworkMonitorOptions = {}): () => void => {
  let intervalId: number;

  const handleOnline = () => {
    onConnect?.();
    checkStatus();
  };

  const handleOffline = () => {
    onDisconnect?.();
    checkStatus();
  };

  const checkStatus = () => {
    const state = getConnectionState();
    onStatusChange?.(state);
  };

  // Set up event listeners
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Set up connection change listener
  const connection = getCurrentConnection();
  if (connection) {
    connection.onchange = checkStatus;
  }

  // Initial check
  checkStatus();

  // Set up periodic checks
  if (checkInterval > 0) {
    intervalId = window.setInterval(checkStatus, checkInterval);
  }

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
    if (connection) {
      connection.onchange = null;
    }
    if (intervalId) {
      window.clearInterval(intervalId);
    }
  };
};

export const waitForOnline = (): Promise<void> => {
  return new Promise(resolve => {
    if (isOnline()) {
      resolve();
      return;
    }

    const handleOnline = () => {
      window.removeEventListener('online', handleOnline);
      resolve();
    };

    window.addEventListener('online', handleOnline);
  });
};

export const getNetworkQuality = (): NetworkQuality => {
  const connection = getCurrentConnection();
  if (!connection) return 'unknown';

  const { effectiveType, downlink, rtt } = connection;

  if (effectiveType === 'slow-2g' || effectiveType === '2g' || rtt > 500) {
    return 'poor';
  }

  if (effectiveType === '3g' || (rtt > 100 && rtt <= 500)) {
    return 'fair';
  }

  if (effectiveType === '4g' && downlink >= 5 && rtt <= 100) {
    return 'excellent';
  }

  return 'good';
};

export { ConnectionType, ConnectionSpeed };
