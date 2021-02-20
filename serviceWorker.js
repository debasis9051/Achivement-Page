var CACHE_NAME = 'achivement-page-cache';

var staticAssets=[
    './',
    './styles/style.css',
    './scripts/app.js',
    './scripts/firebase.js',
    './scripts/theme.js',
    './assets/profile.png',
    './index.html',
    './about.html',
    './info.html',
    '/Team-Members/akash.jpg',
    '/Team-Members/bidisha%20jpg.jpg',
    '/Team-Members/debasish.jpg ',
    '/Team-Members/rajdeep.jpg',
    '/Team-Members/rikta.jpg' ,
    '/Team-Members/sanjukta.jpg',
    '/Team-Members/sarojit.jpg' ,
    '/Team-Members/soumya.jpg' ,
    '/Team-Members/trisha.jpg',
    '/Team-Members/atanu.jpg' ,
    "https://kit.fontawesome.com/719d7c4744.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js",
    "https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/darkly/bootstrap.min.css",
    "https://code.jquery.com/jquery-3.5.1.slim.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js",
    "https://www.gstatic.com/firebasejs/8.2.6/firebase-app.js",
    "https://www.gstatic.com/firebasejs/8.2.6/firebase-analytics.js",
    "https://www.gstatic.com/firebasejs/8.2.6/firebase-auth.js",
    "https://www.gstatic.com/firebasejs/8.2.6/firebase-database.js",
    "https://www.gstatic.com/firebasejs/8.2.6/firebase-storage.js"
  ];

self.addEventListener('install', async event=>{
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);
    console.log(req)
    if(req=="GET"){

    if(url.origin === location.url){
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(newtorkFirst(req));
    }
}
});

async function cacheFirst(req){
    if(req=="GET"){
    const cachedResponse = caches.match(req);
    return cachedResponse || fetch(req);
    }
}

async function newtorkFirst(req){
    if(req=="GET"){
    const cache = await caches.open(CACHE_NAME);
    try {
        if(req=="GET"){
        const res = await fetch(req);
        
            console.log(req)
            cache.put(req, res.clone());
            return res;
            
        }
        
    } catch (error) {
        return await cache.match(req);
    }
}
}