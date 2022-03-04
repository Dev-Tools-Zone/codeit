
// worker-side
// client/service worker communication channel


// update cache names any time any of the cached files change
const CACHE_NAME = 'static-cache-v319';


// create broadcast channel
const broadcast = new BroadcastChannel('worker-channel');

broadcast.onmessage = (event) => {
  if (event.data && event.data.type === 'hello!') {
    broadcast.postMessage({
      payload: 'hi, what\'s up?'
    });
  }
};


self.addEventListener('fetch', (evt) => {
  
  console.log(evt);
  /*broadcast.postMessage({
    payload: evt.clone()
  });*/
  
  evt.respondWith(

    // try the cache
    caches.match(evt.request).then(function(response) {

      // fall back to network
      return response || fetch(evt.request);

    }).catch(function() {

      // if both fail, show the fallback:
      return caches.match('full.html');

    })
  );

});

