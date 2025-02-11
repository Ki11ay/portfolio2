// Check if the browser supports service workers
export const isServiceWorkerSupported = () => {
  return 'serviceWorker' in navigator && 'Notification' in window;
};

// Register service worker
export const registerServiceWorker = async () => {
  if (!isServiceWorkerSupported()) {
    console.warn('Service workers are not supported');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });

    // Check if there's an update available
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content is available, notify the user
            dispatchUpdateEvent();
          }
        });
      }
    });

    // Handle service worker updates
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    console.log('Service worker registered successfully');
    return true;
  } catch (error) {
    console.error('Service worker registration failed:', error);
    return false;
  }
};

// Request notification permission
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn('Notifications not supported');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

// Check if the app can be installed (PWA)
export const checkInstallability = async () => {
  if (!window.deferredPrompt) {
    return false;
  }

  try {
    const promptEvent = window.deferredPrompt;
    window.deferredPrompt = null;
    await promptEvent.prompt();
    const choiceResult = await promptEvent.userChoice;
    return choiceResult.outcome === 'accepted';
  } catch (error) {
    console.error('Error showing install prompt:', error);
    return false;
  }
};

// Dispatch update event
export const dispatchUpdateEvent = () => {
  window.dispatchEvent(new CustomEvent('serviceWorkerUpdate'));
};

// Update service worker
export const updateServiceWorker = async () => {
  if (!isServiceWorkerSupported()) return;

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    return true;
  } catch (error) {
    console.error('Error updating service worker:', error);
    return false;
  }
};

// Initialize offline detection
export const initOfflineDetection = () => {
  window.addEventListener('online', () => {
    document.body.classList.remove('offline');
    // Sync data when back online
    syncData();
  });

  window.addEventListener('offline', () => {
    document.body.classList.add('offline');
  });
};

// Sync data when back online
const syncData = async () => {
  if (!isServiceWorkerSupported()) return;

  try {
    const registration = await navigator.serviceWorker.ready;
    if ('sync' in registration) {
      await registration.sync.register('syncData');
    }
  } catch (error) {
    console.error('Error registering sync:', error);
  }
};

// Handle background sync
export const handleBackgroundSync = async (event) => {
  if (event.tag === 'syncData') {
    try {
      // Add your data sync logic here
      console.log('Background sync successful');
    } catch (error) {
      console.error('Background sync failed:', error);
    }
  }
};

// Initialize service worker
export const initServiceWorker = async () => {
  if (process.env.NODE_ENV === 'production') {
    const swRegistered = await registerServiceWorker();
    if (swRegistered) {
      await requestNotificationPermission();
      initOfflineDetection();
    }
  }
};
