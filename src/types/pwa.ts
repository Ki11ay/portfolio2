export interface PWAContextType {
  isInstallable: boolean;
  isPWAInstalled: boolean;
  hasUpdate: boolean;
  installPWA: () => Promise<void>;
  updateServiceWorker: () => void;
  registration: ServiceWorkerRegistration | null;
  deferredPrompt: PWAInstallPromptEvent | null;
}

export interface PWAInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface PWAStatusInfo {
  isInstallable: boolean;
  isPWAInstalled: boolean;
  hasServiceWorker: boolean;
  hasUpdate: boolean;
  isOffline: boolean;
  serviceWorkerState: ServiceWorkerState | null;
}

export interface PWAEventHandlers {
  onUpdate?: () => void;
  onSuccess?: () => void;
  onOffline?: () => void;
  onOnline?: () => void;
  onInstall?: () => void;
  onError?: (error: Error) => void;
}

// Extend global window interface
declare global {
  interface Window {
    deferredPrompt?: PWAInstallPromptEvent;
    workbox: any;
  }
}

// Define service worker states
export type ServiceWorkerState = 'installing' | 'installed' | 'activating' | 'activated' | 'redundant';

export interface ServiceWorkerUpdateEvent extends Event {
  isUpdate?: boolean;
  registration?: ServiceWorkerRegistration;
}

export interface PWAInstallPromptOptions {
  title?: string;
  description?: string;
  showInstallButton?: boolean;
  showDismissButton?: boolean;
  installButtonText?: string;
  dismissButtonText?: string;
  onDismiss?: () => void;
}

// Extend WindowEventMap for PWA events
declare global {
  interface WindowEventMap {
    'appinstalled': Event;
    'beforeinstallprompt': PWAInstallPromptEvent;
  }
}

// Export event names as constants
export const PWA_EVENTS = {
  BEFORE_INSTALL_PROMPT: 'beforeinstallprompt',
  APP_INSTALLED: 'appinstalled',
  SERVICE_WORKER_UPDATE: 'serviceworkerupdate',
  PWA_UPDATE_READY: 'pwa-update-ready',
  PWA_UPDATE_FAILED: 'pwa-update-failed',
  PWA_OFFLINE: 'pwa-offline',
  PWA_ONLINE: 'pwa-online'
} as const;

// Export event types
export type PWAEventType = typeof PWA_EVENTS[keyof typeof PWA_EVENTS];

// Custom events
export interface PWACustomEvents {
  'pwa-update-ready': CustomEvent<ServiceWorkerRegistration>;
  'pwa-update-failed': CustomEvent<Error>;
  'pwa-offline': CustomEvent<void>;
  'pwa-online': CustomEvent<void>;
}

// Extend WindowEventMap with custom events
declare global {
  interface WindowEventMap extends PWACustomEvents {}
}
