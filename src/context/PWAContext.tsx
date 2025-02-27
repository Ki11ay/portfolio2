import React, { createContext, useEffect, useState, useCallback, useContext } from 'react';
import { Workbox } from 'workbox-window';
import type { 
  PWAContextType, 
  PWAEventHandlers, 
  PWAInstallPromptEvent, 
  ServiceWorkerState,
  PWAStatusInfo
} from '../types/pwa';
import type { WorkboxLifecycleEvent, WorkboxStateChangeEvent } from '../types/workbox-events';
import { isServiceWorkerSupported } from '../utils/pwaUtils';

// Extend PWAContextType with ServiceWorkerState
interface ExtendedPWAContextType extends Omit<PWAContextType, 'serviceWorkerState'> {
  serviceWorkerState: ServiceWorkerState | null;
}

const defaultContext: ExtendedPWAContextType = {
  isInstallable: false,
  isPWAInstalled: false,
  hasUpdate: false,
  installPWA: async () => {},
  updateServiceWorker: () => {},
  registration: null,
  deferredPrompt: null,
  serviceWorkerState: null
};

export const PWAContext = createContext<ExtendedPWAContextType>(defaultContext);

function getStatusInfo(
  context: ExtendedPWAContextType,
  isOffline: boolean
): PWAStatusInfo {
  return {
    isInstallable: context.isInstallable,
    isPWAInstalled: context.isPWAInstalled,
    hasUpdate: context.hasUpdate,
    hasServiceWorker: !!context.registration,
    isOffline,
    serviceWorkerState: context.serviceWorkerState
  };
}

export function usePWAStatus(): PWAStatusInfo {
  const context = useContext(PWAContext);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!context) {
    throw new Error('usePWAStatus must be used within a PWAProvider');
  }

  return getStatusInfo(context, isOffline);
}

export function useInstallPWA() {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('useInstallPWA must be used within a PWAProvider');
  }
  return {
    isInstallable: context.isInstallable,
    isPWAInstalled: context.isPWAInstalled,
    installPWA: context.installPWA,
    deferredPrompt: context.deferredPrompt
  };
}

export function useUpdatePWA() {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('useUpdatePWA must be used within a PWAProvider');
  }
  return {
    hasUpdate: context.hasUpdate,
    updateServiceWorker: context.updateServiceWorker
  };
}

interface PWAProviderProps extends PWAEventHandlers {
  children: React.ReactNode;
  workerPath?: string;
  scope?: string;
}

export function PWAProvider({
  children,
  workerPath = '/sw.js',
  scope = '/',
  onUpdate,
  onSuccess,
  onError,
  onInstall
}: PWAProviderProps): JSX.Element {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<PWAInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [serviceWorkerState, setServiceWorkerState] = useState<ServiceWorkerState | null>(null);

  // Check if app is installed
  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    setIsPWAInstalled(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsPWAInstalled(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Register service worker
  useEffect(() => {
    if (!isServiceWorkerSupported()) return;

    try {
      const wb = new Workbox(workerPath, { scope });

      const handleUpdate = (event: WorkboxLifecycleEvent) => {
        setHasUpdate(true);
        if (event.sw?.state && isValidServiceWorkerState(event.sw.state)) {
          setServiceWorkerState(event.sw.state);
        }
        onUpdate?.();
      };

      const handleSuccess = (event: WorkboxLifecycleEvent) => {
        setHasUpdate(false);
        if (event.sw?.state && isValidServiceWorkerState(event.sw.state)) {
          setServiceWorkerState(event.sw.state);
        }
        onSuccess?.();
      };

      const handleStateChange = (event: WorkboxStateChangeEvent) => {
        if (event.state && isValidServiceWorkerState(event.state)) {
          setServiceWorkerState(event.state);
        }
      };

      // Register service worker and update handlers
      wb.addEventListener('waiting', handleUpdate);
      wb.addEventListener('activated', handleSuccess);
      wb.addEventListener('controlling', handleSuccess);
      wb.addEventListener('statechange', handleStateChange);

      wb.register()
        .then(reg => {
          if (reg) {
            setRegistration(reg);
            if (reg.active?.state && isValidServiceWorkerState(reg.active.state)) {
              setServiceWorkerState(reg.active.state);
            }
          }
        })
        .catch(error => {
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
  }, [workerPath, scope, onUpdate, onSuccess, onError]);

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
      if (worker.state === 'activated') {
        window.location.reload();
      }
    };

    if (registration.waiting) {
      registration.waiting.addEventListener('statechange', handleStateChange);
    }

    setHasUpdate(false);
  }, [registration]);

  const value: ExtendedPWAContextType = {
    isInstallable,
    isPWAInstalled,
    hasUpdate,
    installPWA,
    updateServiceWorker,
    registration,
    deferredPrompt,
    serviceWorkerState
  };

  return <PWAContext.Provider value={value}>{children}</PWAContext.Provider>;
}

// Type guard for ServiceWorkerState
function isValidServiceWorkerState(state: string): state is ServiceWorkerState {
  return ['installing', 'installed', 'activating', 'activated', 'redundant'].includes(state);
}
