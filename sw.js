'use strict';

/* This acts has the cache name as well  */
const app = 'mwa-stage1-';
const version = '01'
const appName = `${app + version}`;

const path = (location.hostname === 'triple0t.github.io') ? '/mws-restaurant-stage-1/' : `/`;

/* List of resources to add to cache */
const resources = {
    app: [
        `${path}`,
        `${path}index.html`,
        `${path}restaurant.html`,
        `${path}data/restaurants.json`,
        `${path}js/dbhelper.js`,
        `${path}js/main.js`,
        `${path}js/restaurant_info.js`,
        `${path}css/styles.css`,
        `${path}css/responsive.css`,
        `${path}img/1.jpg`,
        `${path}img/2.jpg`,
        `${path}img/3.jpg`,
        `${path}img/4.jpg`,
        `${path}img/5.jpg`,
        `${path}img/6.jpg`,
        `${path}img/7.jpg`,
        `${path}img/8.jpg`,
        `${path}img/9.jpg`,
        `${path}img/10.jpg`
    ]
};

/**
 * On Installation
 * 
 * add all resources to the cache
 */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(appName)
        .then(cache => cache.addAll(resources.app) )
        .catch(err => handleError(err))
        .then( () => self.skipWaiting() )
    )
});

/**
 * On Activation, Perform Clean up on the Caches Storage by Comparing the current CacheName
 * againt the one in the database
 */
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
              cacheNames.filter(cacheName => {
                return cacheName.startsWith(app) &&
                       cacheName != appName;
              }).map(cacheName => caches.delete(cacheName) )
            );
          }).then( () => self.clients.claim() ).catch(err => handleError(err))
    );
});

/**
 * On Fetch Event. 
 * 
 * Check the cache storage for match. 
 * 
 * if found return cached item else make a request to the network
 */
self.addEventListener('fetch', event => {
    // const request = event.request;
    // const requestUrl = new URL(event.request.url);

    /* if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
        return;
    } */

    event.respondWith(
        caches.match(event.request)
        .then(res => {
            return res || fetch(event.request).then(newres => {
                caches.open(appName)
                .then(cache => {
                    cache.put(event.request, newres.clone())
                    return newres
                })
                .catch(err => handleError(err))
            })
        })
        .catch(Err => handleError(Err))
    );
});

/**
 * Handle Errors
 * 
 * @param {Any} err 
 */
const handleError = err => {
    console.log('[sw err] ', err);
} 