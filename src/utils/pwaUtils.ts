import type { ServiceWorkerState } from '../types/pwa';
import type { WorkboxEventMap } from '../types/workbox-events';

/**
 * Checks if service workers are supported in the current environment
 */
export function isServiceWorkerSupported(): boolean {
  return 'serviceWorker' in navigator && 
         typeof window !== 'undefined' &&
         window.isSecureContext;
}

/**
 * Validates if a given state is a valid service worker state
 */
export function isValidServiceWorkerState(state: string): state is ServiceWorkerState {
  return ['installing', 'installed', 'activating', 'activated', 'redundant'].includes(state);
}

/**
 * Gets current path to restore after update
 */
export function getUpdatePath(): string {
  return localStorage.getItem('pwa_update_path') || '/';
}

/**
 * Checks if the app is running in standalone mode
 */
export function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
}

/**
 * Creates a PWA offline page response
 */
export async function createOfflineResponse(fallbackUrl = '/offline.html'): Promise<Response> {
  try {
    const cache = await caches.open('offline-fallbacks');
    const response = await cache.match(fallbackUrl);
    if (response) return response;
    
    return new Response(
      '<html><body><h1>Offline</h1><p>Please check your internet connection.</p></body></html>',
      {
        headers: { 'Content-Type': 'text/html' }
      }
    );
  } catch (error) {
    console.error('Error creating offline response:', error);
    return new Response('Offline - Please check your connection');
  }
}

/**
 * Safely unregisters all service workers
 */
export async function unregisterServiceWorkers(): Promise<void> {
  if (!isServiceWorkerSupported()) return;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations.map(registration => registration.unregister())
    );
  } catch (error) {
    console.error('Error unregistering service workers:', error);
    throw error;
  }
}

/**
 * Cleans up service worker caches
 */
export async function clearServiceWorkerCaches(): Promise<void> {
  if (!('caches' in window)) return;

  try {
    const keys = await caches.keys();
    await Promise.all(
      keys.map(key => caches.delete(key))
    );
  } catch (error) {
    console.error('Error clearing caches:', error);
    throw error;
  }
}

/**
 * Creates a workbox event dispatcher
 */
export function createWorkboxEventDispatcher<K extends keyof WorkboxEventMap>(
  type: K,
  detail: Partial<WorkboxEventMap[K]> = {}
): CustomEvent<WorkboxEventMap[K]> {
  return new CustomEvent(type, { 
    bubbles: true,
    cancelable: true,
    detail: detail as WorkboxEventMap[K]
  });
}

/**
 * Safely updates a service worker
 */
export async function updateServiceWorker(
  registration: ServiceWorkerRegistration
): Promise<boolean> {
  if (!registration.waiting) return false;

  try {
    // Store current path
    localStorage.setItem('pwa_update_path', window.location.pathname);

    // Send skip waiting message
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });

    // Create update promise
    const updatePromise = new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Update timeout')), 10000);

      const handleStateChange = () => {
        if (registration.active?.state === 'activated') {
          clearTimeout(timeout);
          registration.waiting?.removeEventListener('statechange', handleStateChange);
          resolve();
        }
      };

      registration.waiting?.addEventListener('statechange', handleStateChange);
    });

    await updatePromise;
    return true;
  } catch (error) {
    console.error('Error updating service worker:', error);
    throw error;
  }
}

/**
 * Checks if PWA installation is available
 */
export function canInstallPWA(): boolean {
  return !isStandalone() && 
         isServiceWorkerSupported() && 
         'BeforeInstallPromptEvent' in window;
}

/**
 * Gets PWA manifest data
 */
export async function getManifestData(): Promise<WebAppManifest | null> {
  const manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement | null;
  if (!manifestLink?.href) return null;

  try {
    const response = await fetch(manifestLink.href);
    if (!response.ok) {
      throw new Error(`Failed to fetch manifest: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading manifest:', error);
    return null;
  }
}

export interface WebAppManifest {
  name: string;
  short_name?: string;
  description?: string;
  start_url: string;
  display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
  background_color?: string;
  theme_color?: string;
  icons?: Array<{
    src: string;
    sizes: string;
    type?: string;
    purpose?: string;
  }>;
}
