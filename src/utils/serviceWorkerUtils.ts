import { Workbox } from 'workbox-window';
import type { WorkboxMessageCallback, WorkboxLifecycleEvent } from '../types/workbox-events';

/** Service Worker registration status */
export type ServiceWorkerStatus = 'pending' | 'registered' | 'active' | 'error';

/** Service Worker registration options */
export interface ServiceWorkerOptions {
  scope?: string;
  type?: 'classic' | 'module';
  onUpdate?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMessage?: WorkboxMessageCallback;
}

/**
 * Register the service worker for PWA functionality
 */
export async function registerServiceWorker({
  scope = '/',
  type = 'classic',
  onUpdate,
  onSuccess,
  onError,
  onMessage
}: ServiceWorkerOptions = {}): Promise<ServiceWorkerRegistration | undefined> {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported');
    return;
  }

  try {
    const wb = new Workbox('/sw.js', { scope, type });

    // Handle updates
    wb.addEventListener('waiting', () => {
      onUpdate?.();
    });

    // Handle successful installation
    wb.addEventListener('activated', (event: WorkboxLifecycleEvent) => {
      // Claim clients only if it's a new installation
      if (!event.isUpdate) {
        wb.messageSW({ type: 'CLIENTS_CLAIM' });
      }
      onSuccess?.();
    });

    // Handle messages from the service worker
    if (onMessage) {
      wb.addEventListener('message', onMessage);
    }

    const registration = await wb.register();
    return registration;
  } catch (error) {
    console.error('Service worker registration failed:', error);
    onError?.(error as Error);
  }
}

/**
 * Check if the app is running in standalone mode (installed PWA)
 */
export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone ||
    document.referrer.includes('android-app://')
  );
}

/**
 * Update the service worker and handle the update flow
 */
export async function updateServiceWorker(
  registration: ServiceWorkerRegistration
): Promise<void> {
  if (!registration.waiting) {
    // Check for updates
    await registration.update();
    return;
  }

  // Store the current path for restoration after update
  const currentPath = window.location.pathname;
  localStorage.setItem('pwa_update_path', currentPath);

  // Notify the waiting service worker to skip waiting
  registration.waiting.postMessage({ type: 'SKIP_WAITING' });
}

/**
 * Clean up old caches and service worker registrations
 */
export async function cleanupServiceWorker(): Promise<void> {
  try {
    // Clean up old service workers
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations.map(registration => 
        registration.scope !== window.location.origin + '/' 
          ? registration.unregister() 
          : Promise.resolve()
      )
    );

    // Clean up old caches
    const cacheKeys = await caches.keys();
    const validCacheNames = [
      'pages-cache',
      'image-cache',
      'static-resources',
      'offline-cache',
      'google-fonts-cache',
      'gstatic-fonts-cache',
      'api-cache'
    ];

    await Promise.all(
      cacheKeys
        .filter(key => !validCacheNames.includes(key))
        .map(key => caches.delete(key))
    );
  } catch (error) {
    console.error('Error cleaning up service worker:', error);
  }
}

/**
 * Check if a new service worker is available
 */
export async function checkForUpdates(
  registration: ServiceWorkerRegistration
): Promise<boolean> {
  try {
    await registration.update();
    return !!registration.waiting;
  } catch (error) {
    console.error('Error checking for updates:', error);
    return false;
  }
}

/**
 * Handle custom messages from the service worker
 */
export function handleServiceWorkerMessage<T = any>(
  event: MessageEvent,
  handlers: Record<string, (data?: T) => void>
): void {
  const { type, payload } = event.data || {};
  
  if (type && handlers[type]) {
    handlers[type](payload);
  }
}

/**
 * Monitor service worker lifecycle changes
 */
export function monitorServiceWorker(
  registration: ServiceWorkerRegistration,
  onChange: (status: ServiceWorkerStatus) => void
): () => void {
  const handleStateChange = (event: Event) => {
    const worker = event.target as ServiceWorker;
    
    switch (worker.state) {
      case 'installed':
        onChange('registered');
        break;
      case 'activated':
        onChange('active');
        break;
      case 'redundant':
        onChange('error');
        break;
    }
  };

  // Monitor service worker state changes
  const addStateChangeListener = (worker: ServiceWorker | null) => {
    if (worker) {
      worker.addEventListener('statechange', handleStateChange);
    }
  };

  const removeStateChangeListener = (worker: ServiceWorker | null) => {
    if (worker) {
      worker.removeEventListener('statechange', handleStateChange);
    }
  };

  // Start monitoring
  addStateChangeListener(registration.installing);
  addStateChangeListener(registration.waiting);
  addStateChangeListener(registration.active);

  // Return cleanup function
  return () => {
    removeStateChangeListener(registration.installing);
    removeStateChangeListener(registration.waiting);
    removeStateChangeListener(registration.active);
  };
}

/**
 * Force reload all clients after service worker update
 */
export function reloadAllClients(): void {
  if (!navigator.serviceWorker.controller) return;

  const handleStateChange = (event: Event) => {
    const worker = event.target as ServiceWorker;
    if (worker.state === 'activated') {
      window.location.reload();
    }
  };

  navigator.serviceWorker.controller.addEventListener('statechange', handleStateChange);
}
