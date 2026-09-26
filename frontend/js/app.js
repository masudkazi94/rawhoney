// ==========================================
// app.js — home page (product listing)
// ==========================================

const productGrid = document.getElementById("product-grid");

function renderProducts() {
  productGrid.innerHTML = "";
  PRODUCTS.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="weight">${p.weight}</div>
        <div class="price">₹${p.price}</div>
        <button class="buy-btn" data-id="${p.id}">Buy Now</button>
        <button class="add-btn" data-id="${p.id}">Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(card);
  });

  document.querySelectorAll(".add-btn").forEach((btn) =>
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)))
  );
  document.querySelectorAll(".buy-btn").forEach((btn) =>
    btn.addEventListener("click", () => buyNow(Number(btn.dataset.id)))
  );
}

function addToCart(productId) {
  const cart = loadCart();
  const existing = cart.find((i) => i.id === productId);
  if (existing) existing.qty += 1;
  else cart.push({ id: productId, qty: 1 });
  saveCart(cart);
  updateCartBadge();
  showToast("Added to cart 🍯");
}

function buyNow(productId) {
  if (!isLoggedIn()) {
    showToast("Please login to buy");
    setTimeout(() => (window.location.href = "login.html"), 700);
    return;
  }
  localStorage.setItem("checkoutItem", JSON.stringify({ id: productId, qty: 1 }));
  window.location.href = "checkout.html";
}

renderProducts();

// ==========================================
// Hero Slider
// ==========================================
(function initSlider() {
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.getElementById("slider-dots");
  if (!slides.length) return;

  let current = 0;
  let timer;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll(".dot");

  function goTo(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
    resetTimer();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 4000);
  }

  document.getElementById("slide-next").addEventListener("click", next);
  document.getElementById("slide-prev").addEventListener("click", prev);

  // Pause on hover
  const slider = document.querySelector(".hero-slider");
  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", resetTimer);

  resetTimer();
})();