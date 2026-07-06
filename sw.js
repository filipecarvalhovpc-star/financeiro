const C='fin-v7';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./icon-192.png','./icon-512.png','./icon-180.png','./favicon.ico','./manifest.json','./inter-400.woff2?v=6','./inter-500.woff2?v=6','./inter-600.woff2?v=6','./inter-700.woff2?v=6','./inter-800.woff2?v=6'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(res=>{const cl=res.clone();caches.open(C).then(c=>c.put('./index.html',cl));return res;}).catch(()=>caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    if(e.request.url.startsWith(self.location.origin)){const cl=res.clone();caches.open(C).then(c=>c.put(e.request,cl));}
    return res;
  })));
});
