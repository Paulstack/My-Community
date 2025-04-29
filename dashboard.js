// Import Firebase Auth and auth object
import { auth } from './auth.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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