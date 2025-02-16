/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache and route assets from the manifest
precacheAndRoute(self.__WB_MANIFEST);

// Cache Google Fonts
registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com',
  new NetworkFirst({
    cacheName: 'google-fonts-stylesheets',
  })
);

registerRoute(
  ({url}) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        maxEntries: 30,
      }),
    ],
  })
);

// Cache images
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Background sync for offline support
self.addEventListener('sync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(
      // Sync operations here
      Promise.resolve()
    );
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png'
  };

  event.waitUntil(
    self.registration.showNotification('Portfolio Update', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Skip waiting on install
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

// Claim clients on activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Clear old caches if needed
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Delete outdated caches here if needed
            return Promise.resolve();
          })
        );
      })
    ])
  );
});
