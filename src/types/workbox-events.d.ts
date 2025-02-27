import type { ServiceWorkerState } from './pwa';

export interface WorkboxEventInit extends EventInit {
  isUpdate?: boolean;
  originalEvent?: Event;
  sw?: ServiceWorker;
  wasWaitingBeforeRegister?: boolean;
  state?: ServiceWorkerState;
}

export interface WorkboxEvent extends Event {
  isUpdate?: boolean;
  originalEvent?: Event;
  sw?: ServiceWorker;
}

export interface WorkboxBaseEvent<T extends WorkboxEventInit = WorkboxEventInit> extends CustomEvent<T> {
  sw?: ServiceWorker;
  isUpdate?: boolean;
}

export type WorkboxLifecycleEventType =
  | 'installing'
  | 'installed'
  | 'activating'
  | 'activated'
  | 'redundant'
  | 'controlling'
  | 'waiting';

export interface WorkboxLifecycleEvent extends WorkboxBaseEvent {
  type: WorkboxLifecycleEventType;
  wasWaitingBeforeRegister?: boolean;
}

export interface WorkboxStateChangeEvent extends WorkboxBaseEvent<{ state: ServiceWorkerState }> {
  type: 'statechange';
  target: ServiceWorker;
  state: ServiceWorkerState;
}

export interface WorkboxMessageEvent extends MessageEvent {
  type: 'message';
  data: any;
}

export type WorkboxMessageCallback = (event: WorkboxMessageEvent) => void;

export type WorkboxEventType = 
  | WorkboxLifecycleEventType
  | 'statechange'
  | 'message';

export interface WorkboxEventMap {
  installing: WorkboxLifecycleEvent;
  installed: WorkboxLifecycleEvent;
  activating: WorkboxLifecycleEvent;
  activated: WorkboxLifecycleEvent;
  controlling: WorkboxLifecycleEvent;
  redundant: WorkboxLifecycleEvent;
  waiting: WorkboxLifecycleEvent;
  statechange: WorkboxStateChangeEvent;
  message: WorkboxMessageEvent;
}

export interface WorkboxEventListenerObject {
  handleEvent(evt: Event): void;
}

export type WorkboxEventListener<E extends Event> = ((evt: E) => void) | WorkboxEventListenerObject;

export interface WorkboxRegistrationEventTarget {
  addEventListener<K extends keyof WorkboxEventMap>(
    type: K,
    listener: WorkboxEventListener<WorkboxEventMap[K]>,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof WorkboxEventMap>(
    type: K,
    listener: WorkboxEventListener<WorkboxEventMap[K]>,
    options?: boolean | EventListenerOptions
  ): void;
  dispatchEvent(event: Event): boolean;
}

declare global {
  interface Window {
    workbox?: any;
  }

  interface ServiceWorkerRegistration extends WorkboxRegistrationEventTarget {
    addEventListener<K extends keyof WorkboxEventMap>(
      type: K,
      listener: WorkboxEventListener<WorkboxEventMap[K]>,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener<K extends keyof WorkboxEventMap>(
      type: K,
      listener: WorkboxEventListener<WorkboxEventMap[K]>,
      options?: boolean | EventListenerOptions
    ): void;
  }
  
  interface ServiceWorker extends WorkboxRegistrationEventTarget {
    addEventListener<K extends keyof WorkboxEventMap>(
      type: K,
      listener: WorkboxEventListener<WorkboxEventMap[K]>,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener<K extends keyof WorkboxEventMap>(
      type: K,
      listener: WorkboxEventListener<WorkboxEventMap[K]>,
      options?: boolean | EventListenerOptions
    ): void;
  }
}

declare module 'workbox-window' {
  export interface Workbox extends WorkboxRegistrationEventTarget {
    active: ServiceWorker | null;
    controlling: boolean;
    waiting: ServiceWorker | null;
    messageSW(data: any): Promise<any>;
    addEventListener<K extends keyof WorkboxEventMap>(
      type: K,
      listener: WorkboxEventListener<WorkboxEventMap[K]>,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener<K extends keyof WorkboxEventMap>(
      type: K,
      listener: WorkboxEventListener<WorkboxEventMap[K]>,
      options?: boolean | EventListenerOptions
    ): void;
  }
}
