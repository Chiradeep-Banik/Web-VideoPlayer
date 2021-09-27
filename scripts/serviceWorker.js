self.addEventListener("install",(e)=>{
    console.log("Service Worker Installed");
    e.waitUntil(
      caches.open("static").then((cache)=>{
          return cache.addAll(["./index.html","./Icons/logos.png"]);
      }).catch((err)=>{
          console.log("Badd--",err);
      })
    );
});

self.addEventListener("fetch",(e)=>{
  e.respondWith(
    caches.match(e.request).then((response)=>{
      return response || fetch(e.request);
    })
  );
});
