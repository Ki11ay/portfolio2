const CACHE_NAME = 'portfolio-v1';
const APP_SHELL = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/screenshots/desktop.png',
  '/screenshots/mobile.png',
  '/models/67a8d41c980281f00b82de5f.glb',
  '/images/Markoni.jpeg',
  '/images/MyBus.png',
  '/images/Collector.png'
];

// Static cache - App Shell
async function cacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(APP_SHELL);
  console.log('App shell cached');
}

// Dynamic cache - Runtime caching
async function cacheResponse(request, response) {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
}

// Check if a request is an HTML navigation
function isHtmlRequest(request) {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && 
          request.headers.get('accept').includes('text/html'));
}

// Install event - Cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    cacheAppShell()
      .then(() => self.skipWaiting())
  );
});

// Activate event - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Handle GET requests only
  if (event.request.method !== 'GET') return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Try cache first
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        // Return cached response and update cache in background
        event.waitUntil(
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse.ok) {
                cache.put(event.request, networkResponse.clone());
              }
            })
            .catch(() => { /* Ignore errors */ })
        );
        return cachedResponse;
      }

      // If not in cache, try network
      try {
        const networkResponse = await fetch(event.request);
        if (networkResponse.ok) {
          // Cache successful responses
          event.waitUntil(
            cache.put(event.request, networkResponse.clone())
          );
        }
        return networkResponse;
      } catch (error) {
        // Network failure
        if (isHtmlRequest(event.request)) {
          // For HTML requests, return offline page
          const offlineResponse = await cache.match('/offline.html');
          if (offlineResponse) {
            return offlineResponse;
          }
        }
        // For non-HTML requests or if offline page is not available
        throw error;
      }
    })()
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Periodic sync for content updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(
      cacheAppShell()
    );
  }
});
