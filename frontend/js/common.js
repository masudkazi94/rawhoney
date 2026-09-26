// ==========================================
// common.js — shared across all pages
// ==========================================

// ---------- Dummy products (will come from FastAPI later) ----------
const PRODUCTS = [
  { id: 1, name: "Wild Forest Honey", weight: "500g", price: 550,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5aYyRKGyyJpHB_0OBxpSLwwTUZWH7hM6BfK_CZZd2ovHjE-szCylKR1BT&s=10" },
  { id: 2, name: "Jamun Raw Honey", weight: "250g", price: 320,
    image: "https://media.istockphoto.com/id/178427749/photo/jambul-or-jamun.jpg?s=1024x1024&w=is&k=20&c=p2I31Jmi4EqPqqYnRYGIJgNhEGYJrIMTmnYoMos7J3o=" },
  { id: 3, name: "Organic Mustard Honey", weight: "1kg", price: 1100,
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=400" },
  { id: 4, name: "Multiflora Honey", weight: "500g", price: 650,
    image: "https://images.unsplash.com/photo-1555211652-5c6222f971bc?w=400" },
];

// ---------- Persist state in localStorage so pages share it ----------
function loadCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function isLoggedIn() {
  return localStorage.getItem("loggedIn") === "true";
}
function setLoggedIn(v) {
  localStorage.setItem("loggedIn", v ? "true" : "false");
}

// ---------- Toast ----------
function showToast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.add("hidden"), 1800);
}

// ---------- Navbar auth toggle ----------
function toggleAuthUI() {
  const loginBtn = document.getElementById("btn-login");
  const logoutBtn = document.getElementById("btn-logout");
  if (!loginBtn || !logoutBtn) return;
  loginBtn.classList.toggle("hidden", isLoggedIn());
  logoutBtn.classList.toggle("hidden", !isLoggedIn());
}

// ---------- Cart badge ----------
function updateCartBadge() {
  const cart = loadCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

// ---------- Global navbar wiring (runs on every page) ----------
document.addEventListener("DOMContentLoaded", () => {
  toggleAuthUI();
  updateCartBadge();

  const logoutBtn = document.getElementById("btn-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      setLoggedIn(false);
      saveCart([]);
      showToast("Logged out");
      setTimeout(() => (window.location.href = "index.html"), 600);
    });
  }

  const cartBtn = document.getElementById("btn-cart");
  if (cartBtn) {
    cartBtn.addEventListener("click", () => (window.location.href = "cart.html"));
  }

  const ordersBtn = document.getElementById("btn-orders");
  if (ordersBtn) ordersBtn.addEventListener("click", () => (window.location.href = "orders.html"));

  const trackBtn = document.getElementById("btn-track");
  if (trackBtn) trackBtn.addEventListener("click", () => (window.location.href = "track.html"));

  const loginBtn = document.getElementById("btn-login");
  if (loginBtn) loginBtn.addEventListener("click", () => (window.location.href = "login.html"));
});