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
  if (!('serviceWorker' in navigator)) return false;
  
  try {
    const registration = await navigator.serviceWorker.ready;
    return registration.active !== null;
  } catch (error) {
    console.debug('Service Worker registration check:', error);
    return false;
  }
}

// Check for periodic sync permission
async function checkPeriodicSyncPermission() {
  if (!('permissions' in navigator)) return false;
  
  try {
    const status = await navigator.permissions.query({
      name: 'periodic-background-sync',
    });
    return status.state === 'granted';
  } catch {
    return false;
  }
}

// Initialize offline support
async function initOfflineSupport() {
  // Skip in development
  if (import.meta.env.DEV) {
    console.debug('Offline support initialization skipped in development');
    return false;
  }

  if (!('serviceWorker' in navigator)) {
    console.debug('Service Worker is not supported');
    return false;
  }

  try {
    const hasPermission = await checkPeriodicSyncPermission();
    if (!hasPermission) {
      console.debug('Periodic sync permission not granted');
      return false;
    }

    const registration = await navigator.serviceWorker.ready;
    const tags = await registration.periodicSync.getTags();
    
    // Only register if not already registered
    if (!tags.includes('content-sync')) {
      await registration.periodicSync.register('content-sync', {
        minInterval: 24 * 60 * 60 * 1000 // One day
      });
      console.debug('Periodic sync registered successfully');
    }
    
    return true;
  } catch (error) {
    console.debug('Periodic sync setup:', error);
    return false;
  }
}

// Handle offline fallback
function handleOfflineFallback() {
  if (!isOnline) {
    document.body.classList.add('offline-mode');
  } else {
    document.body.classList.remove('offline-mode');
  }
}

// Handle PWA installation
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

async function showInstallPrompt() {
  if (!deferredPrompt) return false;

  try {
    const result = await deferredPrompt.prompt();
    console.debug('Install prompt result:', result);
    deferredPrompt = null;
    return true;
  } catch (error) {
    console.debug('Install prompt error:', error);
    return false;
  }
}

function isInstallable() {
  return !!deferredPrompt;
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
  handleOfflineFallback,
  showInstallPrompt,
  isInstallable
};
