import type { WorkboxMessageCallback } from '../types/workbox-events';
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
export declare function registerServiceWorker({ scope, type, onUpdate, onSuccess, onError, onMessage }?: ServiceWorkerOptions): Promise<ServiceWorkerRegistration | undefined>;
/**
 * Check if the app is running in standalone mode (installed PWA)
 */
export declare function isStandalone(): boolean;
/**
 * Update the service worker and handle the update flow
 */
export declare function updateServiceWorker(registration: ServiceWorkerRegistration): Promise<void>;
/**
 * Clean up old caches and service worker registrations
 */
export declare function cleanupServiceWorker(): Promise<void>;
/**
 * Check if a new service worker is available
 */
export declare function checkForUpdates(registration: ServiceWorkerRegistration): Promise<boolean>;
/**
 * Handle custom messages from the service worker
 */
export declare function handleServiceWorkerMessage<T = any>(event: MessageEvent, handlers: Record<string, (data?: T) => void>): void;
/**
 * Monitor service worker lifecycle changes
 */
export declare function monitorServiceWorker(registration: ServiceWorkerRegistration, onChange: (status: ServiceWorkerStatus) => void): () => void;
/**
 * Force reload all clients after service worker update
 */
export declare function reloadAllClients(): void;
//# sourceMappingURL=serviceWorkerUtils.d.ts.map