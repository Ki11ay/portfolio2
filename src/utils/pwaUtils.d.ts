import type { ServiceWorkerState } from '../types/pwa';
import type { WorkboxEventMap } from '../types/workbox-events';
/**
 * Checks if service workers are supported in the current environment
 */
export declare function isServiceWorkerSupported(): boolean;
/**
 * Validates if a given state is a valid service worker state
 */
export declare function isValidServiceWorkerState(state: string): state is ServiceWorkerState;
/**
 * Gets current path to restore after update
 */
export declare function getUpdatePath(): string;
/**
 * Checks if the app is running in standalone mode
 */
export declare function isStandalone(): boolean;
/**
 * Creates a PWA offline page response
 */
export declare function createOfflineResponse(fallbackUrl?: string): Promise<Response>;
/**
 * Safely unregisters all service workers
 */
export declare function unregisterServiceWorkers(): Promise<void>;
/**
 * Cleans up service worker caches
 */
export declare function clearServiceWorkerCaches(): Promise<void>;
/**
 * Creates a workbox event dispatcher
 */
export declare function createWorkboxEventDispatcher<K extends keyof WorkboxEventMap>(type: K, detail?: Partial<WorkboxEventMap[K]>): CustomEvent<WorkboxEventMap[K]>;
/**
 * Safely updates a service worker
 */
export declare function updateServiceWorker(registration: ServiceWorkerRegistration): Promise<boolean>;
/**
 * Checks if PWA installation is available
 */
export declare function canInstallPWA(): boolean;
/**
 * Gets PWA manifest data
 */
export declare function getManifestData(): Promise<WebAppManifest | null>;
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
//# sourceMappingURL=pwaUtils.d.ts.map