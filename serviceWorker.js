var cacheName = 'v1:static';

self.addEventListener('install',async e=>{
    e.waitUntil(
        caches.open(cacheName).then(async cache=>{
            try {
            await cache.addAll([
              '.',
              './styles/style.css',
              './scripts/script.js',
              './scripts/serviceWorker.js'
            ]);
            console.log('All resources have been fetched and cached.');
          } catch (err) {
            return console.log(err);
          }
        })
    );
});

self.addEventListener('fetch', event=>{
    event.respondWith(
        caches.match(event.request).then((response)=>{
            return response || fetch(event.request);
        })
    );
});