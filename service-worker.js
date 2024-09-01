// Cache name with version
const CACHE_NAME = 'game-cache-v2'; // Update this version whenever you make changes

// Files to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/game.js',
    '/images/cat.png',
    '/images/cow.png',
    '/images/dog.png',
    '/images/duck.png',
    '/images/elephant.png',
    '/images/goat.png',
    '/images/hen.png',
    '/images/horse.png',
    '/images/parrot.png',
    '/images/tiger.png',
    '/sounds/cat.mp3',
    '/sounds/cow.mp3',
    '/sounds/dog.mp3',
    '/sounds/duck.mp3',
    '/sounds/elephant.mp3',
    '/sounds/goat.mp3',
    '/sounds/hen.mp3',
    '/sounds/horse.mp3',
    '/sounds/parrot.mp3',
    '/sounds/tiger.mp3'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting()) // Activate the new service worker immediately
    );
});

// Activate event
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
        .then(() => self.clients.claim()) // Ensure the new service worker takes control immediately
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
