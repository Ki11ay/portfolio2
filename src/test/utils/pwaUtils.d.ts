/**
 * PWA testing utilities for service worker and installation testing
 */
/** Mock beforeinstallprompt event */
export declare class BeforeInstallPromptEvent extends Event implements PWAInstallPromptEvent {
    readonly platforms: string[];
    userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    constructor();
    prompt(): Promise<void>;
}
/** Mock ServiceWorker implementation */
export declare class MockServiceWorker implements MockServiceWorkerBase {
    readonly scriptURL: string;
    readonly state: ServiceWorkerState;
    onstatechange: ((this: ServiceWorker, ev: Event) => any) | null;
    onerror: ((this: AbstractWorker, ev: ErrorEvent) => any) | null;
    private listeners;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    dispatchEvent(event: Event): boolean;
    postMessage(message: any): void;
}
/** Mock ServiceWorkerRegistration implementation */
export declare class MockServiceWorkerRegistration implements MockServiceWorkerRegistrationBase {
    active: ServiceWorker | null;
    installing: ServiceWorker | null;
    waiting: ServiceWorker | null;
    readonly scope: string;
    readonly navigationPreload: MockNavigationPreloadManager;
    readonly pushManager: PushManager;
    readonly sync: SyncManager;
    readonly updateViaCache: ServiceWorkerUpdateViaCache;
    onupdatefound: ((this: ServiceWorkerRegistration, ev: Event) => any) | null;
    private listeners;
    constructor();
    addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    dispatchEvent(event: Event): boolean;
    getNotifications(): Promise<Notification[]>;
    showNotification(): Promise<void>;
    unregister(): Promise<boolean>;
    update(): Promise<void>;
}
/** Mock Storage implementation */
export declare class MockStorage implements MockStorageBase {
    private store;
    length: number;
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
    key(index: number): string | null;
}
/** Environment setup interface */
export interface PWAEnvironment {
    registration: MockServiceWorkerRegistration;
    serviceWorker: MockServiceWorker;
    localStorage: MockStorage;
    installPrompt: BeforeInstallPromptEvent;
}
/** Setup mock PWA environment */
export declare const setupPWAEnvironment: () => PWAEnvironment;
/** Mock online/offline status */
export declare const mockNetworkStatus: (online: boolean) => void;
/** Create a mock PWA installation event */
export declare const createInstallPrompt: () => BeforeInstallPromptEvent;
/** Helper to trigger PWA-related events */
export declare const triggerPWAEvent: (eventName: string, detail?: unknown) => void;
/** Restore mocked environment */
export declare const cleanupPWAEnvironment: () => void;
/** Wait for PWA-related operations to complete */
export declare const waitForPWAOperation: () => Promise<void>;
//# sourceMappingURL=pwaUtils.d.ts.map