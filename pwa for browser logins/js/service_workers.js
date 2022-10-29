if ("serviceWorker" in navigator) {
    window.onload = () =>
        // register service workers
        navigator.serviceWorker.
            register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))

    self.addEventListener("install", event => console.log("Service worker installed"));
    self.addEventListener("activate", event => console.log("Service worker activated"));
}