const programFiles = [
    '/',
    '/categories.js',
    '/class.js',
    '/createtask.js',
    '/favicon.png',
    '/index.html',
    '/showtask.js',
    '/sort.js',
    '/storage.js',
    '/styles.css',
    '/user-defualt.webp'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('sw-cache').then(cache => {
            cache.addAll(programFiles)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
})