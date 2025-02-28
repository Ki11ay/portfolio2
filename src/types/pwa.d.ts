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
declare global {
    interface Window {
        deferredPrompt?: PWAInstallPromptEvent;
        workbox: any;
    }
}
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
declare global {
    interface WindowEventMap {
        'appinstalled': Event;
        'beforeinstallprompt': PWAInstallPromptEvent;
    }
}
export declare const PWA_EVENTS: {
    readonly BEFORE_INSTALL_PROMPT: "beforeinstallprompt";
    readonly APP_INSTALLED: "appinstalled";
    readonly SERVICE_WORKER_UPDATE: "serviceworkerupdate";
    readonly PWA_UPDATE_READY: "pwa-update-ready";
    readonly PWA_UPDATE_FAILED: "pwa-update-failed";
    readonly PWA_OFFLINE: "pwa-offline";
    readonly PWA_ONLINE: "pwa-online";
};
export type PWAEventType = typeof PWA_EVENTS[keyof typeof PWA_EVENTS];
export interface PWACustomEvents {
    'pwa-update-ready': CustomEvent<ServiceWorkerRegistration>;
    'pwa-update-failed': CustomEvent<Error>;
    'pwa-offline': CustomEvent<void>;
    'pwa-online': CustomEvent<void>;
}
declare global {
    interface WindowEventMap extends PWACustomEvents {
    }
}
//# sourceMappingURL=pwa.d.ts.map