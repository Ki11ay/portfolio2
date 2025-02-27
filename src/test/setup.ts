import '@testing-library/jest-dom';

// Mock Text Encoder/Decoder
class MockTextEncoder {
  encode(input?: string): Uint8Array {
    return new Uint8Array(Buffer.from(input || ''));
  }
}

class MockTextDecoder {
  decode(input?: BufferSource): string {
    if (!input) return '';
    return Buffer.from(input as ArrayBuffer).toString();
  }
}

global.TextEncoder = MockTextEncoder as any;
global.TextDecoder = MockTextDecoder as any;

// Local Storage Mock
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    key: (index: number) => Object.keys(store)[index] || null,
    get length() {
      return Object.keys(store).length;
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Match Media Mock
window.matchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn()
});

// Service Worker Mock
Object.defineProperty(window.navigator, 'serviceWorker', {
  writable: true,
  value: {
    controller: null,
    ready: Promise.resolve({
      active: {
        state: 'activated'
      }
    }),
    register: jest.fn().mockResolvedValue({
      active: { state: 'activated' },
      installing: null,
      waiting: null,
      scope: '/',
      unregister: jest.fn().mockResolvedValue(true),
      update: jest.fn().mockResolvedValue(undefined),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }),
    getRegistration: jest.fn(),
    getRegistrations: jest.fn().mockResolvedValue([]),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  }
});

// Online Status Mock
Object.defineProperty(window.navigator, 'onLine', {
  writable: true,
  value: true
});

// Workbox Mock
window.workbox = {
  messageSkipWaiting: jest.fn(),
  clientsClaim: jest.fn(),
  precaching: {
    precacheAndRoute: jest.fn()
  },
  routing: {
    registerRoute: jest.fn()
  },
  strategies: {
    NetworkFirst: jest.fn(),
    CacheFirst: jest.fn(),
    StaleWhileRevalidate: jest.fn()
  },
  cacheableResponse: {
    CacheableResponsePlugin: jest.fn()
  },
  expiration: {
    ExpirationPlugin: jest.fn()
  }
};

// ResizeObserver Mock
class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

global.ResizeObserver = ResizeObserverMock as any;

// Intersection Observer Mock
class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '0px';
  readonly thresholds: ReadonlyArray<number> = [0];
  
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = () => [];

  constructor(
    private callback: IntersectionObserverCallback,
    private options: IntersectionObserverInit = {}
  ) {
    if (options.root) this.root = options.root;
    if (options.rootMargin) this.rootMargin = options.rootMargin;
    if (options.threshold) {
      this.thresholds = Array.isArray(options.threshold) 
        ? options.threshold 
        : [options.threshold];
    }
    setTimeout(() => {
      callback([], this);
    }, 0);
  }
}

global.IntersectionObserver = IntersectionObserverMock as any;

// Error and Console Mocks
const originalError = console.error;
const originalWarn = console.warn;
const originalLog = console.log;

beforeAll(() => {
  console.error = jest.fn();
  console.warn = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
  console.log = originalLog;
});

// Clear all mocks between tests
afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});
