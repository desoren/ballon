const CACHE_NAME = 'balloon-pop-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/components/Balloon.tsx',
  '/components/GameOverScreen.tsx',
  '/components/Scoreboard.tsx',
  '/components/StartScreen.tsx',
  '/constants.ts',
  '/types.ts',
  '/icon.svg',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap',
  'https://aistudiocdn.com/react@^19.1.1',
  'https://aistudiocdn.com/react-dom@^19.1.1/',
  'https://aistudiocdn.com/react@^19.1.1/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add all URLs without waiting for them to complete, to avoid installation failure on flaky networks.
        // The app will still work offline for cached assets.
        cache.addAll(urlsToCache).catch(err => console.log('Failed to cache some assets during install:', err));
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request to use it in the cache and for the network request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200) {
              return response;
            }
            // Don't cache non-GET requests or responses from chrome-extension protocol
            if(event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://')) {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
