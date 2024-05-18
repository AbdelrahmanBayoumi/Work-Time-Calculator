const version = '1.0.1-' + new Date().getTime();
const CACHE_NAME = `work-time-calculator-v${version}`;
const staticAssets = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./android-icon-36x36.png",
  "./android-icon-48x48.png",
  "./android-icon-72x72.png",
  "./android-icon-96x96.png",
  "./android-icon-144x144.png",
  "./android-icon-192x192.png",
];

self.addEventListener('install', (event) => {
	// Perform install steps
	console.log('Installing new service worker...');
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => {
				console.log('Opened cache');
				return cache.addAll(staticAssets);
			})
			.then(() => {
				console.log('Skip waiting on install');
				return self.skipWaiting(); // Add this line to activate the service worker immediately
			}),
	);
});

self.addEventListener('activate', (event) => {
	console.log('Activating new service worker...');
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					console.log('cacheName', cacheName);
					if (cacheName !== CACHE_NAME) {
						console.log('Deleting old cache...', cacheName);
						return caches.delete(cacheName);
					}
				}),
			);
		}),
	);
});

self.addEventListener('fetch', (event) => {
	// Check if the request is a GET request and comes from our origin
	if (event.request.method === 'GET' && new URL(event.request.url).origin === location.origin) {
		event.respondWith(
			fetch(event.request)
				.then((res) => {
					// Check if we received a valid response
					if (!res || res.status !== 200 || res.type !== 'basic') {
						return res;
					}

					// Make copy/clone of response
					const resClone = res.clone();
					// Open cache
					caches.open(CACHE_NAME).then((cache) => {
						// Add response to cache
						cache.put(event.request, resClone);
					});
					return res;
				})
				.catch((err) => {
					// Check if the response exists in the cache
					return caches.match(event.request).then((response) => {
						return response || Promise.reject(new Error('no-match'));
					});
				}),
		);
	} else {
		// If the request is not from our origin or not a GET request, just fetch it without caching
		event.respondWith(fetch(event.request));
	}
});
