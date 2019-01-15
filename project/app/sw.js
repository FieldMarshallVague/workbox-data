importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.precaching.precacheAndRoute([]);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

const showNotification = () => {
    self.registration.showNotification('Background sync success!', {
      body: '🎉`🎉`🎉`'
    });
  };
  
  const bgSyncPlugin = new workbox.backgroundSync.Plugin(
    'dashboardr-queue',
    {
      callbacks: {
        queueDidReplay: showNotification
        // other types of callbacks could go here
      }
    }
  );
  
const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
  plugins: [bgSyncPlugin],
});

workbox.routing.registerRoute(
  /\/api\/add/,
  networkWithBackgroundSync,
  'POST'
);