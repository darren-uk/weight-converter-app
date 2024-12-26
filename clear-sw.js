if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
            registration.unregister();
        });
    }).catch(error => {
        console.error('Error getting Service Worker registrations:', error);
    });

    caches.keys().then(names => {
        names.forEach(name => {
            caches.delete(name);
        });
    }).catch(error => {
        console.error('Error clearing caches:', error);
    });
}