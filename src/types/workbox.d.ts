import type { WorkboxRegistrationEventTarget } from './workbox-events';

export interface WorkboxInitOptions {
  scope?: string;
  type?: 'classic' | 'module';
}

export interface WorkboxClass extends WorkboxRegistrationEventTarget {
  active: ServiceWorker | null;
  controlling: boolean;
  waiting: ServiceWorker | null;
  messageSW(data: any): Promise<any>;
}

declare module 'workbox-window' {
  export class Workbox implements WorkboxClass {
    constructor(scriptURL: string, options?: WorkboxInitOptions);
    active: ServiceWorker | null;
    controlling: boolean;
    waiting: ServiceWorker | null;
    addEventListener: WorkboxClass['addEventListener'];
    removeEventListener: WorkboxClass['removeEventListener'];
    dispatchEvent: WorkboxClass['dispatchEvent'];
    register(options?: RegistrationOptions): Promise<ServiceWorkerRegistration>;
    messageSW(data: any): Promise<any>;
  }

  export type CacheableResponsePlugin = any;
  export type ExpirationPlugin = any;
  export type PrecacheController = any;
  export type NavigationRoute = any;
  export type RegExpRoute = any;
  export type Route = any;
  export type Router = any;
  export type StaleWhileRevalidate = any;
  export type NetworkFirst = any;
  export type NetworkOnly = any;
  export type CacheFirst = any;
}

declare global {
  interface Window {
    workbox: import('workbox-window').Workbox | undefined;
    workboxLoadingPromise?: Promise<void>;
  }
}
