// Network status and event handlers
let isOnline = navigator.onLine;
const listeners = new Set();

// Update network status
function updateNetworkStatus(status) {
  isOnline = status;
  notifyListeners();
}

// Add event listener for network status changes
function initNetworkListeners() {
  window.addEventListener('online', () => updateNetworkStatus(true));
  window.addEventListener('offline', () => updateNetworkStatus(false));
}

// Subscribe to network status changes
function subscribeToNetworkStatus(callback) {
  listeners.add(callback);
  // Initial callback with current status
  callback(isOnline);
  
  return () => {
    listeners.delete(callback);
  };
}

// Notify all listeners of network status change
function notifyListeners() {
  listeners.forEach(listener => listener(isOnline));
}

// Check if browser supports connection API
const hasNetworkInfoSupport = () => {
  return 'connection' in navigator && 'effectiveType' in navigator.connection;
};

// Get connection type if available
function getConnectionType() {
  if (!hasNetworkInfoSupport()) return null;
  
  return {
    type: navigator.connection.effectiveType,
    saveData: navigator.connection.saveData,
    downlink: navigator.connection.downlink,
    rtt: navigator.connection.rtt
  };
}

// Monitor connection changes
function monitorConnectionChanges(callback) {
  if (!hasNetworkInfoSupport()) return () => {};

  navigator.connection.addEventListener('change', callback);
  return () => {
    navigator.connection.removeEventListener('change', callback);
  };
}

// Check if service worker is registered
async function checkServiceWorkerRegistration() {
  try {
    const registration = await navigator.serviceWorker.ready;
    return registration.active !== null;
  } catch (error) {
    console.error('Service Worker registration check failed:', error);
    return false;
  }
}

// Initialize offline support
async function initOfflineSupport() {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker is not supported');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.periodicSync.register('content-sync', {
      minInterval: 24 * 60 * 60 * 1000 // One day
    });
    return true;
  } catch (error) {
    console.warn('Periodic Sync could not be registered:', error);
    return false;
  }
}

// Handle offline fallback
function handleOfflineFallback() {
  if (!isOnline) {
    // Show offline UI or notification
    document.body.classList.add('offline-mode');
  } else {
    document.body.classList.remove('offline-mode');
  }
}

// Export utilities
export {
  isOnline,
  initNetworkListeners,
  subscribeToNetworkStatus,
  getConnectionType,
  monitorConnectionChanges,
  checkServiceWorkerRegistration,
  initOfflineSupport,
  handleOfflineFallback
};
