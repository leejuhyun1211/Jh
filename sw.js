const CACHE = 'baccarat-v3';
const FILES = ['/Jh/', '/Jh/index.html', '/Jh/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(res => {
      if(res.ok){ const c=res.clone(); caches.open(CACHE).then(cache=>cache.put(e.request,c)); }
      return res;
    }).catch(() => caches.match(e.request))
  );
});
