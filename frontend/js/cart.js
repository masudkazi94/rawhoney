// ==========================================
// cart.js — full cart page
// ==========================================

const cartList = document.getElementById("cart-list");
const cartTotalEl = document.getElementById("cart-total");

function renderCartPage() {
  const cart = loadCart();
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = `<p class="empty-msg">Your cart is empty. <a href="index.html">Shop honey →</a></p>`;
    cartTotalEl.textContent = 0;
    return;
  }

  cart.forEach((item) => {
    const p = PRODUCTS.find((x) => x.id === item.id);
    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <div class="cart-row-info">
        <h4>${p.name}</h4>
        <div class="weight">${p.weight}</div>
        <div class="price">₹${p.price}</div>
      </div>
      <div class="cart-row-qty">
        <button class="qty-dec" data-id="${p.id}">−</button>
        <span>${item.qty}</span>
        <button class="qty-inc" data-id="${p.id}">+</button>
      </div>
      <div class="cart-row-subtotal">₹${p.price * item.qty}</div>
      <button class="remove-btn" data-id="${p.id}">✕</button>
    `;
    cartList.appendChild(row);
  });

  // Listeners
  document.querySelectorAll(".qty-inc").forEach((b) =>
    b.addEventListener("click", () => changeQty(Number(b.dataset.id), +1))
  );
  document.querySelectorAll(".qty-dec").forEach((b) =>
    b.addEventListener("click", () => changeQty(Number(b.dataset.id), -1))
  );
  document.querySelectorAll(".remove-btn").forEach((b) =>
    b.addEventListener("click", () => removeItem(Number(b.dataset.id)))
  );

  // Total
  const total = cart.reduce((s, i) => {
    const p = PRODUCTS.find((p) => p.id === i.id);
    return s + p.price * i.qty;
  }, 0);
  cartTotalEl.textContent = total;
}

function changeQty(id, delta) {
  const cart = loadCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    saveCart(cart.filter((i) => i.id !== id));
  } else {
    saveCart(cart);
  }
  renderCartPage();
  updateCartBadge();
}

function removeItem(id) {
  const cart = loadCart().filter((i) => i.id !== id);
  saveCart(cart);
  renderCartPage();
  updateCartBadge();
  showToast("Item removed");
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (!isLoggedIn()) {
    showToast("Please login to checkout");
    setTimeout(() => (window.location.href = "login.html"), 700);
    return;
  }
  const cart = loadCart();
  if (cart.length === 0) {
    showToast("Cart is empty");
    return;
  }
  localStorage.setItem("checkoutItem", JSON.stringify({ cart: true }));
  window.location.href = "checkout.html";
});

renderCartPage();