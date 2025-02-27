import type { PWAInstallPromptEvent, ServiceWorkerState } from '../../types/pwa';
import type { WorkboxEventMap, WorkboxStateChangeEvent, WorkboxLifecycleEvent, WorkboxMessageEvent } from '../../types/workbox-events';
import '../types/service-worker-mock';

interface MockEventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail?: any;
}

interface BaseMockEvent {
  bubbles: boolean;
  cancelable: boolean;
  composed: boolean;
  currentTarget: EventTarget | null;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  returnValue: boolean;
  srcElement: EventTarget | null;
  target: EventTarget | null;
  timeStamp: number;
  type: string;
  composedPath(): EventTarget[];
  initEvent: jest.Mock;
  preventDefault: jest.Mock;
  stopImmediatePropagation: jest.Mock;
  stopPropagation: jest.Mock;
}

interface MockCustomEvent<T = any> extends BaseMockEvent {
  detail: T;
  initCustomEvent: jest.Mock;
}

export interface PWATestEnvironment {
  registration: MockServiceWorkerRegistration;
  serviceWorker: MockServiceWorker | null;
  isInstallable: boolean;
  isPWAInstalled: boolean;
  hasUpdate: boolean;
  hasServiceWorker: boolean;
  isOffline: boolean;
  clearMocks: () => void;
}

let originalServiceWorker: ServiceWorkerContainer | undefined;
let originalMediaQuery: typeof window.matchMedia;
let originalOnline: boolean;

function createBaseMockEvent(type: string, init: MockEventInit = {}): BaseMockEvent {
  return {
    type,
    bubbles: init.bubbles ?? true,
    cancelable: init.cancelable ?? true,
    composed: init.composed ?? true,
    currentTarget: null,
    defaultPrevented: false,
    eventPhase: Event.AT_TARGET,
    isTrusted: true,
    returnValue: true,
    srcElement: null,
    target: null,
    timeStamp: Date.now(),
    composedPath: () => [],
    initEvent: jest.fn(),
    preventDefault: jest.fn(),
    stopImmediatePropagation: jest.fn(),
    stopPropagation: jest.fn()
  };
}

function createMockCustomEvent<T>(
  type: string, 
  detail: T, 
  init: MockEventInit = {}
): MockCustomEvent<T> {
  return {
    ...createBaseMockEvent(type, init),
    detail,
    initCustomEvent: jest.fn()
  };
}

function createMockServiceWorker(state: ServiceWorkerState = 'activated'): MockServiceWorker {
  return {
    state,
    scriptURL: '/sw.js',
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    postMessage: jest.fn(),
    dispatchEvent: jest.fn().mockReturnValue(true),
    onstatechange: null,
    onerror: null
  };
}

function createMockRegistration(): MockServiceWorkerRegistration {
  const active = createMockServiceWorker('activated');
  const waiting = null;
  const installing = null;

  return {
    active,
    waiting,
    installing,
    scope: '/',
    navigationPreload: {
      enable: jest.fn().mockResolvedValue(undefined),
      disable: jest.fn().mockResolvedValue(undefined),
      getState: jest.fn().mockResolvedValue(false),
      setHeaderValue: jest.fn().mockResolvedValue(undefined)
    },
    pushManager: {} as PushManager,
    unregister: jest.fn().mockResolvedValue(true),
    update: jest.fn().mockResolvedValue(undefined),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn().mockReturnValue(true),
    getNotifications: jest.fn(),
    showNotification: jest.fn()
  };
}

function createMockStateChangeEvent(sw: MockServiceWorker): WorkboxStateChangeEvent {
  const event = createMockCustomEvent('statechange', { state: sw.state });
  Object.defineProperty(event, 'target', { value: sw, writable: true });
  Object.defineProperty(event, 'state', { value: sw.state, writable: true });
  return event as unknown as WorkboxStateChangeEvent;
}

function createMockLifecycleEvent(
  type: keyof WorkboxEventMap,
  sw: MockServiceWorker,
  isUpdate: boolean
): WorkboxLifecycleEvent {
  const event = createMockCustomEvent(type, { sw, isUpdate });
  Object.defineProperty(event, 'sw', { value: sw, writable: true });
  Object.defineProperty(event, 'isUpdate', { value: isUpdate, writable: true });
  return event as unknown as WorkboxLifecycleEvent;
}

function createMockMessageEvent(data: any, sw: MockServiceWorker): WorkboxMessageEvent {
  const event = new MessageEvent('message', {
    data,
    source: sw,
    ports: []
  });
  Object.defineProperty(event, 'sw', { value: sw, writable: true });
  return event as WorkboxMessageEvent;
}

export function createMockWorkboxEvent<K extends keyof WorkboxEventMap>(
  type: K,
  serviceWorker?: MockServiceWorker,
  isUpdate = false
): WorkboxEventMap[K] {
  const sw = serviceWorker || createMockServiceWorker();

  if (type === 'statechange') {
    return createMockStateChangeEvent(sw) as WorkboxEventMap[K];
  }

  if (type === 'message') {
    return createMockMessageEvent({ type: 'TEST' }, sw) as WorkboxEventMap[K];
  }

  return createMockLifecycleEvent(type, sw, isUpdate) as WorkboxEventMap[K];
}

function createMockInstallPromptEvent(): PWAInstallPromptEvent {
  const event = createBaseMockEvent('beforeinstallprompt');
  const prompt = jest.fn().mockResolvedValue(undefined);
  const userChoice = Promise.resolve({ outcome: 'accepted' as const, platform: 'web' });
  const platforms = ['web'];

  return Object.assign(event, {
    platforms,
    prompt,
    userChoice
  }) as unknown as PWAInstallPromptEvent;
}

export function setupPWAEnvironment(options: Partial<PWATestEnvironment> = {}): PWATestEnvironment {
  // Store original values
  originalServiceWorker = window.navigator.serviceWorker;
  originalMediaQuery = window.matchMedia;
  originalOnline = window.navigator.onLine;

  const registration = createMockRegistration();
  const serviceWorker = registration.active;

  // Mock service worker container
  const mockServiceWorkerContainer = {
    register: jest.fn().mockResolvedValue(registration),
    getRegistration: jest.fn().mockResolvedValue(registration),
    getRegistrations: jest.fn().mockResolvedValue([registration]),
    ready: Promise.resolve(registration),
    controller: serviceWorker,
    startMessages: jest.fn()
  };

  Object.defineProperty(window.navigator, 'serviceWorker', {
    value: mockServiceWorkerContainer,
    configurable: true
  });

  // Mock matchMedia
  window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: options.isPWAInstalled ?? false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }));

  // Mock online status
  Object.defineProperty(window.navigator, 'onLine', {
    value: !options.isOffline,
    configurable: true
  });

  return {
    registration,
    serviceWorker,
    isInstallable: options.isInstallable ?? false,
    isPWAInstalled: options.isPWAInstalled ?? false,
    hasUpdate: options.hasUpdate ?? false,
    hasServiceWorker: options.hasServiceWorker ?? true,
    isOffline: options.isOffline ?? false,
    clearMocks: () => {
      registration.addEventListener.mockClear();
      registration.removeEventListener.mockClear();
      registration.unregister.mockClear();
      registration.update.mockClear();
      if (serviceWorker) {
        serviceWorker.addEventListener.mockClear();
        serviceWorker.removeEventListener.mockClear();
        serviceWorker.postMessage.mockClear();
      }
    }
  };
}

export function cleanupPWAEnvironment(): void {
  if (originalServiceWorker) {
    Object.defineProperty(window.navigator, 'serviceWorker', {
      value: originalServiceWorker,
      configurable: true
    });
  }

  window.matchMedia = originalMediaQuery;

  Object.defineProperty(window.navigator, 'onLine', {
    value: originalOnline,
    configurable: true
  });
}

export async function simulateServiceWorkerUpdate(
  registration: MockServiceWorkerRegistration
): Promise<void> {
  const waiting = createMockServiceWorker('installed');
  registration.waiting = waiting;

  const updateEvent = createMockWorkboxEvent('waiting', waiting, true);
  registration.addEventListener.mock.calls
    .filter(([type]) => type === 'waiting')
    .forEach(([, handler]) => handler(updateEvent));
}

export function simulateNetworkStatusChange(online: boolean): void {
  Object.defineProperty(window.navigator, 'onLine', {
    value: online,
    configurable: true
  });

  window.dispatchEvent(new Event(online ? 'online' : 'offline'));
}

export function simulatePWAInstall(accepted = true): PWAInstallPromptEvent {
  const event = createMockInstallPromptEvent();
  Object.defineProperty(event, 'userChoice', {
    value: Promise.resolve({
      outcome: accepted ? 'accepted' as const : 'dismissed' as const,
      platform: 'web'
    })
  });
  window.dispatchEvent(event);
  return event;
}

export function mockNetworkStatus(online: boolean): void {
  Object.defineProperty(window.navigator, 'onLine', {
    value: online,
    configurable: true,
    writable: true
  });
}
