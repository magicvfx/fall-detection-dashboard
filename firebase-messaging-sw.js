importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCoSb7TW3Wgz5zzWVajpk2l8DqFKYEK-3o",
  authDomain: "fall-dectation.firebaseapp.com",
  databaseURL: "https://fall-dectation-default-rtdb.firebaseio.com",
  projectId: "fall-dectation",
  storageBucket: "fall-dectation.firebasestorage.app",
  messagingSenderId: "467192692594",
  appId: "1:467192692594:web:2756ad46d7d1fbb210e7eb"
});

const messaging = firebase.messaging();

// Background notifications
messaging.onBackgroundMessage(payload => {
  console.log("Background message received:", payload);

  // Determine icon based on alert type
  let alertType = payload.data?.type || "Fall"; // fallback to Fall
  let iconUrl = alertType.toLowerCase() === "sos"
                ? "https://cdn-icons-png.flaticon.com/512/564/564619.png"
                : "https://cdn-icons-png.flaticon.com/512/565/565547.png";

  const notificationTitle = `${alertType} Alert!`;
  const notificationOptions = {
    body: `Lat: ${payload.data.lat}, Lng: ${payload.data.lng}\nBattery: ${parseFloat(payload.data.battery).toFixed(2)} V`,
    icon: iconUrl
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
