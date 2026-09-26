// ==========================================
// checkout.js — order summary + payment stub
// ==========================================

const itemsEl = document.getElementById("checkout-items");
const totalEl = document.getElementById("checkout-total");

function getCheckoutItems() {
  const stored = JSON.parse(localStorage.getItem("checkoutItem") || "null");
  if (!stored) return [];
  if (stored.cart) return loadCart();                // checkout whole cart
  return [{ id: stored.id, qty: stored.qty || 1 }];  // checkout one product
}

function renderCheckout() {
  const items = getCheckoutItems();
  itemsEl.innerHTML = "";
  let total = 0;

  if (items.length === 0) {
    itemsEl.innerHTML = "<p>Nothing to checkout.</p>";
    totalEl.textContent = 0;
    return;
  }

  items.forEach((i) => {
    const p = PRODUCTS.find((x) => x.id === i.id);
    const sub = p.price * i.qty;
    total += sub;

    const row = document.createElement("div");
    row.className = "checkout-row";
    row.innerHTML = `
      <span>${p.name} (${p.weight}) × ${i.qty}</span>
      <span>₹${sub}</span>
    `;
    itemsEl.appendChild(row);
  });

  totalEl.textContent = total;
}

document.getElementById("payment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const method = document.querySelector('input[name="pay"]:checked').value;

  // Later: POST /api/v1/orders { items, payment_method }
  showToast(`Order placed via ${method.toUpperCase()} ✅`);

  // Clear cart & checkout item
  saveCart([]);
  localStorage.removeItem("checkoutItem");
  updateCartBadge();

  setTimeout(() => (window.location.href = "orders.html"), 1000);
});

renderCheckout();