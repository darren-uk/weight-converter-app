const CACHE_NAME = "my-pwa-cache-v1.8.5-17";
const urlsToCache = [
	"./",
	"./index.html",
	"./about.html",
	"./manifest.json",
	"./README.md",
	"./Licence.md",
	// "./css/main.min.css",
	// "./js/script.js",
	// "./images/caret-down-solid.svg",
	// "./images/caret-up-solid.svg",
	// "./images/triangle-exclamation-solid.svg",
	// "./favicon.png",
	// "https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2/webcomponents-loader.min.js",
	// "https://cdn.jsdelivr.net/gh/zerodevx/zero-md@1/src/zero-md.min.js",
];

self.addEventListener("install", (event) => {
	console.log("Service Worker installing.");
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => {
				console.log("Opened cache");
				return cache.addAll(urlsToCache);
			})
			.then(() => {
				console.log("All files cached");
			})
			.catch((error) => {
				console.error("Failed to cache files", error);
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

self.addEventListener("fetch", (event) => {
	console.log("Fetch event for ", event.request.url);
	event.respondWith(
		caches
			.match(event.request)
			.then((response) => {
				if (response) {
					console.log("Found ", event.request.url, " in cache");
					return response;
				}
				console.log("Network request for ", event.request.url);
				return fetch(event.request);
			})
			.catch((error) => {
				console.error("Fetch failed; returning offline page instead.", error);
				return caches.match("./index.html");
			})
	);
});
