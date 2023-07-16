const CACHE_NAME = 'my-cache';
const MAX_ENTRIES = 50;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['/', '/index.html', '/manifest.json']);
    }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            return caches.delete(name);
          }),
      );
    }),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate' || !shouldBypassRequest(event.request)) {
    event.respondWith(fetchAndUpdateCache(event.request));
  }
});

async function fetchAndUpdateCache(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    // Return cached response
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    await cacheResponse(cache, request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    // Handle fetch error
    console.error('Fetch failed:', error);
    throw error;
  }
}

async function cacheResponse(cache, request, response) {
  if (response.ok) {
    const clonedResponse = response.clone();
    cache.put(request, clonedResponse);

    // Limit the cache size by removing old entries
    const cacheKeys = await cache.keys();
    if (cacheKeys.length > MAX_ENTRIES) {
      await cache.delete(cacheKeys[0]);
    }
  }
}

function shouldBypassRequest(request) {
  const url = new URL(request.url);
  const fileExtensionRegexp = /\.(?:png|jpg|jpeg|gif|svg|ico)$/i;

  return request.mode !== 'navigate' || url.pathname.startsWith('/_') || url.pathname.match(fileExtensionRegexp);
}
