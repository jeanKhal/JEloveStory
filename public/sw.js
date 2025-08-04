// Service Worker simple pour éviter les avertissements
const CACHE_NAME = 'joel-eunice-wedding-v1';

self.addEventListener('install', (event) => {
  console.log('Service Worker installé');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activé');
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Stratégie de cache simple
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
}); 