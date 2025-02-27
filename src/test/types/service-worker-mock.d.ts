import type { ServiceWorkerState } from '../../types/pwa';
import type { 
  WorkboxEventMap, 
  WorkboxLifecycleEvent, 
  WorkboxStateChangeEvent,
  WorkboxMessageEvent
} from '../../types/workbox-events';

declare global {
  interface ServiceWorkerNavigationPreload {
    enable(): Promise<void>;
    disable(): Promise<void>;
    getState(): Promise<boolean>;
    setHeaderValue(value: string): Promise<void>;
  }

  interface MockEventTarget {
    addEventListener: jest.Mock;
    removeEventListener: jest.Mock;
    dispatchEvent: jest.Mock;
  }

  interface MockServiceWorker extends MockEventTarget {
    state: ServiceWorkerState;
    scriptURL: string;
    postMessage: jest.Mock;
    onstatechange: ((this: ServiceWorker, ev: Event) => any) | null;
    onerror: OnErrorEventHandler;
  }

  interface MockServiceWorkerRegistration extends MockEventTarget {
    active: MockServiceWorker | null;
    waiting: MockServiceWorker | null;
    installing: MockServiceWorker | null;
    scope: string;
    navigationPreload: ServiceWorkerNavigationPreload;
    pushManager: PushManager;
    unregister: jest.Mock<Promise<boolean>>;
    update: jest.Mock<Promise<void>>;
    getNotifications: jest.Mock;
    showNotification: jest.Mock;
  }

  interface MockWorkboxLifecycleEvent extends Omit<WorkboxLifecycleEvent, 'sw'> {
    sw?: MockServiceWorker;
  }

  interface MockWorkboxStateChangeEvent extends Omit<WorkboxStateChangeEvent, 'target'> {
    target: MockServiceWorker;
  }

  interface MockWorkboxMessageEvent extends WorkboxMessageEvent {
    sw?: MockServiceWorker;
  }

  type MockWorkboxEventMap = {
    installing: MockWorkboxLifecycleEvent;
    installed: MockWorkboxLifecycleEvent;
    activating: MockWorkboxLifecycleEvent;
    activated: MockWorkboxLifecycleEvent;
    controlling: MockWorkboxLifecycleEvent;
    redundant: MockWorkboxLifecycleEvent;
    waiting: MockWorkboxLifecycleEvent;
    statechange: MockWorkboxStateChangeEvent;
    message: MockWorkboxMessageEvent;
  };

  interface CustomEventInit<T = any> {
    sw?: MockServiceWorker;
    isUpdate?: boolean;
    state?: ServiceWorkerState;
  }

  interface CustomEvent<T = any> {
    sw?: MockServiceWorker;
    isUpdate?: boolean;
    state?: ServiceWorkerState;
  }
}

export {};
