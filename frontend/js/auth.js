// ==========================================
// auth.js — login + register (mock, no real API yet)
// ==========================================

let mode = "login"; // or "register"

const title = document.getElementById("auth-title");
const form = document.getElementById("auth-form");
const switchText = document.getElementById("switch-text");
const switchLink = document.getElementById("switch-link");

switchLink.addEventListener("click", (e) => {
  e.preventDefault();
  mode = mode === "login" ? "register" : "login";
  if (mode === "register") {
    title.textContent = "Register";
    form.querySelector(".auth-submit").textContent = "Create Account";
    switchText.textContent = "Already have an account?";
    switchLink.textContent = "Login";
  } else {
    title.textContent = "Login";
    form.querySelector(".auth-submit").textContent = "Login";
    switchText.textContent = "Don't have an account?";
    switchLink.textContent = "Register";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    showToast("Please fill all fields");
    return;
  }

  // Demo only — later this calls POST /api/v1/auth/login or /register
  setLoggedIn(true);
  showToast(mode === "login" ? "Logged in ✅" : "Account created ✅");
  setTimeout(() => (window.location.href = "index.html"), 700);
});