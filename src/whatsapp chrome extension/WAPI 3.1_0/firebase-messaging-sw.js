// debugger;
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');
debugger;
firebase.initializeApp({
    apiKey: "AIzaSyDjppzSuS1Hv8UCEgnLXfAiN_O--EXJ5Yw",
    authDomain: "bulksend-a7b20.firebaseapp.com",
    projectId: "bulksend-a7b20",
    storageBucket: "bulksend-a7b20.appspot.com",
    messagingSenderId: "478823932973",
    appId: "1:478823932973:web:6064072bcdd216e3ae44a4"
  });

  // console.error('background message ');
  // console.error(firebase);
  const messaging = firebase.messaging();

// NEVER TRIGGER
messaging.setBackgroundMessageHandler(function(payload) {
    // console.error('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
      notificationOptions);
});