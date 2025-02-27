/// <reference types="../types/pwa-test.d.ts" />

/**
 * PWA testing utilities for service worker and installation testing
 */

/** Mock beforeinstallprompt event */
export class BeforeInstallPromptEvent extends Event implements PWAInstallPromptEvent {
  readonly platforms: string[] = ['web', 'android', 'ios'];
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  
  constructor() {
    super('beforeinstallprompt');
    this.userChoice = Promise.resolve({ outcome: 'accepted', platform: 'web' });
  }

  prompt(): Promise<void> {
    return Promise.resolve();
  }
}

/** Mock ServiceWorker implementation */
export class MockServiceWorker implements MockServiceWorkerBase {
  readonly scriptURL: string = '/sw.js';
  readonly state: ServiceWorkerState = 'activated';
  onstatechange: ((this: ServiceWorker, ev: Event) => any) | null = null;
  onerror: ((this: AbstractWorker, ev: ErrorEvent) => any) | null = null;
  private listeners: Map<string, Set<EventListenerOrEventListenerObject>> = new Map();

  addEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)?.add(listener);
  }

  removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
    this.listeners.get(type)?.delete(listener);
  }

  dispatchEvent(event: Event): boolean {
    const listeners = this.listeners.get(event.type) || new Set();
    listeners.forEach(listener => {
      if (typeof listener === 'function') {
        listener.call(this, event);
      } else {
        listener.handleEvent(event);
      }
    });
    return !event.defaultPrevented;
  }

  postMessage(message: any): void {
    this.dispatchEvent(new MessageEvent('message', { data: message }));
  }
}

/** Mock ServiceWorkerRegistration implementation */
export class MockServiceWorkerRegistration implements MockServiceWorkerRegistrationBase {
  active: ServiceWorker | null = null;
  installing: ServiceWorker | null = null;
  waiting: ServiceWorker | null = null;
  readonly scope: string = '/';
  readonly navigationPreload: MockNavigationPreloadManager;
  readonly pushManager: PushManager;
  readonly sync: SyncManager;
  readonly updateViaCache: ServiceWorkerUpdateViaCache = 'none';
  onupdatefound: ((this: ServiceWorkerRegistration, ev: Event) => any) | null = null;
  private listeners: Map<string, Set<EventListenerOrEventListenerObject>> = new Map();

  constructor() {
    this.navigationPreload = {
      enable: () => Promise.resolve(),
      disable: () => Promise.resolve(),
      setHeaderValue: () => Promise.resolve(),
      getState: () => Promise.resolve({ enabled: false })
    };
    this.pushManager = {
      getSubscription: () => Promise.resolve(null),
      permissionState: () => Promise.resolve('prompt'),
      subscribe: () => Promise.resolve({} as PushSubscription),
    } as PushManager;
    this.sync = {
      getTags: () => Promise.resolve([]),
      register: () => Promise.resolve()
    };
  }

  addEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)?.add(listener);
  }

  removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
    this.listeners.get(type)?.delete(listener);
  }

  dispatchEvent(event: Event): boolean {
    const listeners = this.listeners.get(event.type) || new Set();
    listeners.forEach(listener => {
      if (typeof listener === 'function') {
        listener.call(this, event);
      } else {
        listener.handleEvent(event);
      }
    });
    if (event.type === 'updatefound' && this.onupdatefound) {
      this.onupdatefound.call(this, event);
    }
    return !event.defaultPrevented;
  }

  getNotifications(): Promise<Notification[]> {
    return Promise.resolve([]);
  }

  showNotification(): Promise<void> {
    return Promise.resolve();
  }

  unregister(): Promise<boolean> {
    return Promise.resolve(true);
  }

  update(): Promise<void> {
    return Promise.resolve();
  }
}

/** Mock Storage implementation */
export class MockStorage implements MockStorageBase {
  private store: Record<string, string> = {};
  length: number = 0;

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
    this.length = Object.keys(this.store).length;
  }

  removeItem(key: string): void {
    delete this.store[key];
    this.length = Object.keys(this.store).length;
  }

  clear(): void {
    this.store = {};
    this.length = 0;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

/** Environment setup interface */
export interface PWAEnvironment {
  registration: MockServiceWorkerRegistration;
  serviceWorker: MockServiceWorker;
  localStorage: MockStorage;
  installPrompt: BeforeInstallPromptEvent;
}

/** Setup mock PWA environment */
export const setupPWAEnvironment = (): PWAEnvironment => {
  const registration = new MockServiceWorkerRegistration();
  const serviceWorker = new MockServiceWorker();
  const localStorage = new MockStorage();
  const installPrompt = new BeforeInstallPromptEvent();

  registration.active = serviceWorker;

  const mockServiceWorkerContainer: ServiceWorkerContainer = {
    controller: serviceWorker,
    ready: Promise.resolve(registration),
    register: () => Promise.resolve(registration),
    getRegistration: () => Promise.resolve(registration),
    getRegistrations: () => Promise.resolve([registration]),
    startMessages: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
    oncontrollerchange: null,
    onmessage: null,
    onmessageerror: null
  };

  Object.defineProperty(window.navigator, 'serviceWorker', {
    value: mockServiceWorkerContainer,
    configurable: true
  });

  Object.defineProperty(window, 'localStorage', {
    value: localStorage,
    configurable: true
  });

  Object.defineProperty(window, 'matchMedia', {
    value: (query: string) => ({
      matches: query === '(display-mode: standalone)',
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true
    }),
    configurable: true
  });

  return {
    registration,
    serviceWorker,
    localStorage,
    installPrompt
  };
};

/** Mock online/offline status */
export const mockNetworkStatus = (online: boolean): void => {
  Object.defineProperty(window.navigator, 'onLine', {
    value: online,
    configurable: true
  });
};

/** Create a mock PWA installation event */
export const createInstallPrompt = (): BeforeInstallPromptEvent => {
  return new BeforeInstallPromptEvent();
};

/** Helper to trigger PWA-related events */
export const triggerPWAEvent = (eventName: string, detail?: unknown): void => {
  const event = new CustomEvent(eventName, { detail });
  window.dispatchEvent(event);
};

/** Restore mocked environment */
export const cleanupPWAEnvironment = (): void => {
  jest.resetAllMocks();
};

/** Wait for PWA-related operations to complete */
export const waitForPWAOperation = (): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, 0));
