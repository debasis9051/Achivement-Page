var CACHE_NAME = 'achivement-page-cache';

var staticAssets=[
    './',
    './styles/style.css',
    './scripts/app.js',
    './index.html',
    './about.html',
    '/Team-Members/akash.jpg',
    '/Team-Members/bidisha%20jpg.jpg',
    '/Team-Members/debasish.jpg ',
    '/Team-Members/rajdeep.jpg',
    '/Team-Members/rikta.jpg' ,
    '/Team-Members/sanjukta.jpg',
    '/Team-Members/sarojit.jpg' ,
    '/Team-Members/soumya.jpg' ,
    '/Team-Members/trisha.jpg',
    '/Team-Members/atanu.jpg' 
  ];

self.addEventListener('install', async event=>{
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);

    if(url.origin === location.url){
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(newtorkFirst(req));
    }
});

async function cacheFirst(req){
    const cachedResponse = caches.match(req);
    return cachedResponse || fetch(req);
}

async function newtorkFirst(req){
    const cache = await caches.open(CACHE_NAME);
    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        return await cache.match(req);
    }
}