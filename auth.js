// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Initialize Firebase App
const firebaseConfig = {
  apiKey: "AIzaSyD_vEtmsv1CSgBKDUxEmf-l5lSgPSl38ys",
  authDomain: "my-community-629c4.firebaseapp.com",
  projectId: "my-community-629c4",
  storageBucket: "my-community-629c4.firebasestorage.app",
  messagingSenderId: "1087996148026",
  appId: "1:1087996148026:web:c38e745fcd94a01ca8b803"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html"; // Redirect to dashboard
    } catch (error) {
      const errorContainer = document.getElementById('error-container');
      if (errorContainer) {
        errorContainer.textContent = error.message;
        errorContainer.style.color = 'red';
      } else {
        alert('Error: ' + error.message);
      }
    }
  });
}

// Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html"; // Redirect to dashboard
    } catch (error) {
      const errorContainer = document.getElementById('error-container');
      if (errorContainer) {
        errorContainer.textContent = error.message;
        errorContainer.style.color = 'red';
      } else {
        alert('Error: ' + error.message);
      }
    }
  });
}

// Logout
const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await signOut(auth);
      window.location.href = "login.html"; // Redirect to login
    } catch (error) {
      const errorContainer = document.getElementById('error-container');
      if (errorContainer) {
        errorContainer.textContent = error.message;
        errorContainer.style.color = 'red';
      } else {
        alert('Error: ' + error.message);
      }
    }
  });
}

// Forgot Password
const forgotPasswordLink = document.getElementById('forgot-password');
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;

    if (!email) {
      alert('Please enter your email address to reset your password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Check your inbox.');
    } catch (error) {
      const errorContainer = document.getElementById('error-container');
      if (errorContainer) {
        errorContainer.textContent = error.message;
        errorContainer.style.color = 'red';
      } else {
        alert('Error: ' + error.message);
      }
    }
  });
}

// Show/Hide Password
document.addEventListener('DOMContentLoaded', () => {
  // Login Page Password Toggle
  const toggleLoginPassword = document.getElementById('toggle-password');
  const loginPasswordInput = document.getElementById('login-password');

  if (toggleLoginPassword && loginPasswordInput) {
    toggleLoginPassword.addEventListener('click', () => {
      const type = loginPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      loginPasswordInput.setAttribute('type', type);

      // Toggle the eye icon (optional)
      toggleLoginPassword.textContent = type === 'password' ? '👁️' : '🙈';
    });
  }

  // Sign-Up Page Password Toggle
  const toggleSignupPassword = document.getElementById('toggle-signup-password');
  const signupPasswordInput = document.getElementById('signup-password');

  if (toggleSignupPassword && signupPasswordInput) {
    toggleSignupPassword.addEventListener('click', () => {
      const type = signupPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      signupPasswordInput.setAttribute('type', type);

      // Toggle the eye icon (optional)
      toggleSignupPassword.textContent = type === 'password' ? '👁️' : '🙈';
    });
  }
});

// Helper Function to Display Errors
function displayError(message) {
  const errorContainer = document.getElementById('error-container');
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
  } else {
    alert(message); // Fallback to alert if no error container exists
  }
}

// Export auth object
export { auth };