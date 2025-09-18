  // 🔹 Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com/",
  projectId: "YOUR_PROJECT_ID",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

// 🔹 Listen for status updates
db.ref("status").on("value", snapshot => {
  const data = snapshot.val();
  document.getElementById("battery").innerText = data.battery + " V";
  document.getElementById("mpu").innerText = data.mpu;
  document.getElementById("gps").innerText = data.gps;
});

// 🔹 Listen for alerts
db.ref("alerts").on("child_added", snapshot => {
  const msg = snapshot.val();
  const li = document.createElement("li");
  li.innerText = msg;
  document.getElementById("alerts").appendChild(li);
});

// 🔹 Update Google Maps
db.ref("location").on("value", snapshot => {
  const loc = snapshot.val();
  if (loc && loc.lat && loc.lng) {
    document.getElementById("map").src =
      `https://www.google.com/maps?q=${loc.lat},${loc.lng}&hl=es;z=14&output=embed`;
  }
});
