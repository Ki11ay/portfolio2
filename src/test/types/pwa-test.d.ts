/// <reference types="jest" />

declare global {
  interface EventListener {
    (evt: Event): void;
  }

  interface Function {
    (...args: any[]): any;
  }

  interface SyncManager {
    getTags(): Promise<string[]>;
    register(tag: string): Promise<void>;
  }

  type JestMockFn = jest.Mock;

  interface PWAInstallPromptEvent extends Event {
    readonly platforms: string[];
    userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }

  interface AbstractWorkerEventMap {
    error: ErrorEvent;
  }

  interface ServiceWorkerEventMap extends AbstractWorkerEventMap {
    statechange: Event;
  }

  interface MockServiceWorkerBase extends AbstractWorker {
    readonly scriptURL: string;
    readonly state: ServiceWorkerState;
    onstatechange: ((this: ServiceWorker, ev: Event) => any) | null;
    postMessage(message: any): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    dispatchEvent(event: Event): boolean;
  }

  interface MockNavigationPreloadManager {
    enable(): Promise<void>;
    disable(): Promise<void>;
    setHeaderValue(value: string): Promise<void>;
    getState(): Promise<NavigationPreloadState>;
  }

  interface MockServiceWorkerRegistrationBase extends EventTarget {
    readonly active: ServiceWorker | null;
    readonly installing: ServiceWorker | null;
    readonly waiting: ServiceWorker | null;
    readonly scope: string;
    readonly navigationPreload: MockNavigationPreloadManager;
    readonly pushManager: PushManager;
    readonly sync: SyncManager;
    readonly updateViaCache: ServiceWorkerUpdateViaCache;
    readonly onupdatefound: ((this: ServiceWorkerRegistration, ev: Event) => any) | null;
    getNotifications(options?: GetNotificationOptions): Promise<Notification[]>;
    showNotification(title: string, options?: NotificationOptions): Promise<void>;
    unregister(): Promise<boolean>;
    update(): Promise<void>;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    dispatchEvent(event: Event): boolean;
  }

  interface MockStorageBase {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
    readonly length: number;
    key(index: number): string | null;
  }

  interface ServiceWorkerContainer {
    readonly controller: ServiceWorker | null;
    readonly ready: Promise<ServiceWorkerRegistration>;
    getRegistration(scope?: string): Promise<ServiceWorkerRegistration | undefined>;
    getRegistrations(): Promise<ReadonlyArray<ServiceWorkerRegistration>>;
    register(scriptURL: string | URL, options?: RegistrationOptions): Promise<ServiceWorkerRegistration>;
    startMessages(): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    dispatchEvent(event: Event): boolean;
  }

  interface Navigator {
    readonly serviceWorker: ServiceWorkerContainer;
  }

  interface Window {
    navigator: Navigator;
    matchMedia(query: string): MediaQueryList;
  }
}

export {};
