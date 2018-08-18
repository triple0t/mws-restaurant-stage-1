if ('serviceWorker' in navigator) {
    if (location.hostname === 'triple0t.github.io') {
        navigator.serviceWorker.register('sw.js', {scope: '/mws-restaurant-stage-1/'}).then(function() {
            console.log('service worker registered for git pages');
        })
    } else {
        navigator.serviceWorker.register('sw.js').then(function() {
            console.log('service worker registered for others');
        })
    }
}