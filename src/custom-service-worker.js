self.addEventListener('notificationclick', function(event) {
  //console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is


  const iconUrl = event.notification.icon;
  const matchPosition = iconUrl.search("/static");
  const site = iconUrl.slice(0,matchPosition);
  //console.log(site);
  const urlToOpen = new URL(site, self.location.origin).href;

const promiseChain = clients.matchAll({
  type: 'window',
  includeUncontrolled: true
}).then((windowClients) => {
  let matchingClient = null;

  for (let i = 0; i < windowClients.length; i++) {
    const windowClient = windowClients[i];
    if (windowClient.url === urlToOpen) {
      matchingClient = windowClient;
      break;
    }
  }

  if (matchingClient) {
    return matchingClient.focus();
  } else {
    return clients.openWindow(urlToOpen);
  }
});

event.waitUntil(promiseChain);
});