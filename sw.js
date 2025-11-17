const CACHE_NAME = 'kaiser-tailor-v1';
const urlsToCache = [
    '/',
    'index.html',
    'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    // يمكنك إضافة روابط الصور الرئيسية هنا أيضاً لتحميلها بدون إنترنت
];

// Install the service worker and cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});