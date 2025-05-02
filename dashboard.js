// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHsyZlAKYfiuqaG_nxR2EaixkorCBm1vY",
  authDomain: "mycommunity-site.firebaseapp.com",
  projectId: "mycommunity-site",
  storageBucket: "mycommunity-site.firebasestorage.app",
  messagingSenderId: "112022668246",
  appId: "1:112022668246:web:b0043ac641161b04b91a77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  onAuthStateChanged(auth, (user) => {
    const userEmailElement = document.getElementById('user-email');
    if (user) {
      if (userEmailElement) {
        userEmailElement.innerText = `Logged in as: ${user.email}`;
      }
    } else {
      // Not logged in, redirect to home
      window.location.href = "index.html";
    }
  });

  // Logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      signOut(auth)
        .then(() => {
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.log("Logout error:", error.message);
        });
    });
  }
});