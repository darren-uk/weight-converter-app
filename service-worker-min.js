const CACHE_NAME="my-pwa-cache-v1.8.5-6",urlsToCache=["/","/index.html","/about.html","/manifest.json","/README.md","/Licence.md","/css/main.min.css","/js/script.js","/images/caret-down-solid.svg","/images/caret-up-solid.svg","/images/triangle-exclamation-solid.svg","/favicon.png","https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2/webcomponents-loader.min.js","https://cdn.jsdelivr.net/gh/zerodevx/zero-md@1/src/zero-md.min.js"];self.addEventListener("install",(e=>{e.waitUntil(caches.open(CACHE_NAME).then((e=>e.addAll(urlsToCache))))})),self.addEventListener("activate",(e=>{const s=[CACHE_NAME];e.waitUntil(caches.keys().then((e=>Promise.all(e.map((e=>{if(!s.includes(e))return caches.delete(e)}))))))})),self.addEventListener("fetch",(e=>{e.respondWith(caches.match(e.request).then((s=>s||fetch(e.request))))}));