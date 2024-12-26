const CACHE_NAME = "my-pwa-cache-v1.8.5-8";
const urlsToCache = [
	"./",
	"./index.html",
	"./about.html",
	"./manifest.json",
	"./README.md",
	"./Licence.md",
	"./css/main.min.css",
	"./js/script.js",
	"./images/caret-down-solid.svg",
	"./images/caret-up-solid.svg",
	"./images/triangle-exclamation-solid.svg",
	"./favicon.png",
	"https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2/webcomponents-loader.min.js",
	"https://cdn.jsdelivr.net/gh/zerodevx/zero-md@1/src/zero-md.min.js",
];

// Install event - Cache files
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log("opened cache");
			return cache.addAll(urlsToCache);
		})
	);
});

// Activate event - Clean old caches
self.addEventListener("activate", (event) => {
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cache) => {
					if (!cacheWhitelist.includes(cache)) {
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

// Fetch event - Serve cached content when offline
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
