// Register service worker
async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.debug('Service workers are not supported');
    return false;
  }

  // Skip registration in development
  if (import.meta.env.DEV) {
    console.debug('Service worker registration skipped in development');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      type: 'module'
    });

    if (registration.waiting) {
      console.debug('New service worker waiting');
    }

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      newWorker?.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.debug('New content is available; please refresh.');
        }
      });
    });

    return true;
  } catch (error) {
    console.debug('Service worker registration failed:', error);
    return false;
  }
}

// Unregister service worker
async function unregisterServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.unregister();
    console.debug('Service Worker unregistered successfully');
    return true;
  } catch (error) {
    console.debug('Service Worker unregistration failed:', error);
    return false;
  }
}

// Check for service worker updates
async function checkForUpdates() {
  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    return true;
  } catch (error) {
    console.debug('Update check failed:', error);
    return false;
  }
}

// Initialize service worker
async function initServiceWorker() {
  if (import.meta.env.DEV) {
    console.debug('Service worker initialization skipped in development');
    return false;
  }

  try {
    // If already controlled by a service worker, check for updates
    if (navigator.serviceWorker.controller) {
      await checkForUpdates();
      return true;
    }

    // Otherwise, register a new service worker
    return await registerServiceWorker();
  } catch (error) {
    console.debug('Service worker initialization failed:', error);
    return false;
  }
}

// Force reload when new service worker takes over
let refreshing = false;

navigator.serviceWorker?.addEventListener('controllerchange', () => {
  if (!refreshing) {
    refreshing = true;
    window.location.reload();
  }
});

export {
  initServiceWorker,
  registerServiceWorker,
  unregisterServiceWorker,
  checkForUpdates
};
