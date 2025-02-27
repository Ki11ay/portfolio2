export type ServiceWorkerState = 'installing' | 'installed' | 'activating' | 'activated' | 'redundant';

export interface PWAInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface PWAContextType {
  isInstallable: boolean;
  isPWAInstalled: boolean;
  hasUpdate: boolean;
  installPWA: () => Promise<void>;
  updateServiceWorker: () => void;
  registration: ServiceWorkerRegistration | null;
  deferredPrompt: PWAInstallPromptEvent | null;
  serviceWorkerState: ServiceWorkerState | null;
}

export interface PWAStatusInfo {
  isInstallable: boolean;
  isPWAInstalled: boolean;
  hasUpdate: boolean;
  hasServiceWorker: boolean;
  isOffline: boolean;
  registration: ServiceWorkerRegistration | null;
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
