const V='palestra-v3',SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
if(u.hostname.endsWith('google.com')||u.hostname.endsWith('googleusercontent.com'))return; // sync: sempre in rete
e.respondWith(caches.open(V).then(c=>c.match(e.request,{ignoreSearch:true}).then(h=>{const n=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>h);return h||n})))});
