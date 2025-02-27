import { useState, useEffect, useCallback } from 'react';
import { Workbox } from 'workbox-window';
import type { 
  PWAContextType, 
  PWAEventHandlers, 
  PWAInstallPromptEvent, 
  PWAStatusInfo, 
  ServiceWorkerState 
} from '../types/pwa';
import type { 
  WorkboxLifecycleEvent,
  WorkboxStateChangeEvent,
  WorkboxEventMap
} from '../types/workbox-events';

export interface PWAHookOptions extends PWAEventHandlers {
  scope?: string;
  workerPath?: string;
}

function isValidServiceWorkerState(state: string): state is ServiceWorkerState {
  return ['installing', 'installed', 'activating', 'activated', 'redundant'].includes(state);
}

export function usePWA(options: PWAHookOptions = {}): PWAContextType & PWAStatusInfo {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<PWAInstallPromptEvent | null>(null);
  const [serviceWorkerState, setServiceWorkerState] = useState<ServiceWorkerState | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const {
    onUpdate,
    onSuccess,
    onOffline,
    onOnline,
    onError,
    onInstall,
    scope = '/',
    workerPath = '/sw.js'
  } = options;

  const updateServiceWorkerState = useCallback((state: string | undefined | null) => {
    if (state && isValidServiceWorkerState(state)) {
      setServiceWorkerState(state);
    }
  }, []);

  // Check if app is installed
  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    setIsPWAInstalled(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsPWAInstalled(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Handle installation prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setIsInstallable(true);
      setDeferredPrompt(e as PWAInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
      setIsPWAInstalled(true);
      onInstall?.();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [onInstall]);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      onOnline?.();
    };

    const handleOffline = () => {
      setIsOffline(true);
      onOffline?.();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onOnline, onOffline]);

  // Register service worker
  useEffect(() => {
    if (
      import.meta.env.PROD &&
      'serviceWorker' in navigator &&
      typeof window !== 'undefined'
    ) {
      try {
        const wb = new Workbox(workerPath, { scope, type: import.meta.env.DEV ? 'module' : 'classic' });

        const handleUpdate = (event: WorkboxEventMap['waiting']) => {
          setHasUpdate(true);
          if (event.sw?.state) {
            updateServiceWorkerState(event.sw.state);
          }
          onUpdate?.();
        };

        const handleSuccess = (event: WorkboxLifecycleEvent) => {
          setHasUpdate(false);
          if (event.sw?.state) {
            updateServiceWorkerState(event.sw.state);
          }
          onSuccess?.();
        };

        const handleStateChange = (event: WorkboxStateChangeEvent) => {
          if (event.state) {
            updateServiceWorkerState(event.state);
          }
        };

        wb.addEventListener('waiting', handleUpdate);
        wb.addEventListener('activated', handleSuccess);
        wb.addEventListener('controlling', handleSuccess);
        wb.addEventListener('statechange', handleStateChange);

        wb.register().then(r => {
          if (r) {
            setRegistration(r);
            if (r.active?.state) {
              updateServiceWorkerState(r.active.state);
            }
          }
        }).catch(error => {
          console.error('Error registering service worker:', error);
          onError?.(error instanceof Error ? error : new Error(String(error)));
        });

        return () => {
          wb.removeEventListener('waiting', handleUpdate);
          wb.removeEventListener('activated', handleSuccess);
          wb.removeEventListener('controlling', handleSuccess);
          wb.removeEventListener('statechange', handleStateChange);
        };
      } catch (error) {
        console.error('Error setting up service worker:', error);
        onError?.(error instanceof Error ? error : new Error(String(error)));
      }
    }
  }, [onUpdate, onSuccess, onError, scope, workerPath, updateServiceWorkerState]);

  // Install PWA
  const installPWA = useCallback(async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setIsInstallable(false);
        setDeferredPrompt(null);
        onInstall?.();
      }
    } catch (error) {
      console.error('Error installing PWA:', error);
      onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  }, [deferredPrompt, onInstall, onError]);

  // Update service worker
  const updateServiceWorker = useCallback(() => {
    if (!registration?.waiting) return;

    // Store current path for restoration after update
    localStorage.setItem('pwa_update_path', window.location.pathname);

    // Send skip waiting message
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });

    // Listen for state changes on the new service worker
    const handleStateChange = (event: Event) => {
      const worker = event.target as ServiceWorker;
      if (worker.state) {
        updateServiceWorkerState(worker.state);
        if (worker.state === 'activated') {
          window.location.reload();
        }
      }
    };

    if (registration.waiting) {
      registration.waiting.addEventListener('statechange', handleStateChange);
    }

    setHasUpdate(false);
  }, [registration, updateServiceWorkerState]);

  return {
    isInstallable,
    isPWAInstalled,
    hasUpdate,
    registration,
    deferredPrompt,
    installPWA,
    updateServiceWorker,
    hasServiceWorker: !!registration,
    isOffline,
    serviceWorkerState
  };
}

export default usePWA;
