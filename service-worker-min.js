const CACHE_NAME="my-pwa-cache-v1.8.5-13",urlsToCache=["./","./index.html","./about.html","./manifest.json","./README.md","./Licence.md","./css/main.min.css","./js/script.js","./images/caret-down-solid.svg","./images/caret-up-solid.svg","./images/triangle-exclamation-solid.svg","./favicon.png"];navigator.serviceWorker.getRegistrations().then((e=>{e.forEach((e=>{e.unregister()}))})),self.addEventListener("install",(e=>{e.waitUntil(caches.open(CACHE_NAME).then((e=>e.addAll(urlsToCache))).then((()=>{})).catch((e=>{})))})),self.addEventListener("activate",(e=>{const t=[CACHE_NAME];e.waitUntil(caches.keys().then((e=>Promise.all(e.map((e=>{if(!t.includes(e))return caches.delete(e)}))))))})),self.addEventListener("fetch",(e=>{e.respondWith(caches.match(e.request).then((t=>t||fetch(e.request))).catch((e=>caches.match("./index.html"))))}));