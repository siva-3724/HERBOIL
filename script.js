/**
 * SIVA & HERB OILS - Comprehensive Interactive E-Commerce Suite
 * Complete frontend logic: Cart, Wishlist, Quick View, Live Search,
 * Catalog Filtering & Sorting, Checkout & Order Simulation.
 */

// =========================================================
// 1. GLOBAL PRODUCTS DATABASE
// =========================================================
const SIVA_PRODUCTS = [
  {
    id: "p1",
    name: "Cold Pressed Coconut Oil",
    category: "cooking",
    categoryLabel: "Cooking & Hair Care",
    price: 299,
    originalPrice: 399,
    rating: 5.0,
    reviewsCount: 142,
    badge: "Bestseller",
    badgeClass: "badge-green",
    image: "assets/product-1.jpg",
    link: "p1.html",
    description: "Pure cold-pressed virgin coconut oil traditionally extracted from fresh sun-dried coconuts for hair nourishment and culinary perfection.",
    sizes: [
      { label: "100 ML", price: 299 },
      { label: "500 ML", price: 649 },
      { label: "1 L", price: 1199 }
    ],
    inStock: true
  },
  {
    id: "p2",
    name: "Amla & Brahmi Hair Oil",
    category: "hair-care",
    categoryLabel: "Herbal Hair Care",
    price: 499,
    originalPrice: 599,
    rating: 4.9,
    reviewsCount: 188,
    badge: "Herbal Blend",
    badgeClass: "badge-gold",
    image: "assets/product-2.jpg",
    link: "p2.html",
    description: "Authentic slow-infused botanical formula with fresh amla, organic brahmi, and hibiscus to stimulate follicular growth and prevent premature greying.",
    sizes: [
      { label: "100 ML", price: 499 },
      { label: "250 ML", price: 899 },
      { label: "500 ML", price: 1599 }
    ],
    inStock: true
  },
  {
    id: "p3",
    name: "Neem Scalp Care Oil",
    category: "hair-care",
    categoryLabel: "Anti-Dandruff & Scalp",
    price: 199,
    originalPrice: 280,
    rating: 4.8,
    reviewsCount: 96,
    badge: "Anti-Dandruff",
    badgeClass: "badge-green",
    image: "assets/product-4.jpg",
    link: "p3.html",
    description: "Therapeutic blend of wild neem leaves, tea tree extracts, and pure carrier oils to eliminate stubborn flaking, itchiness, and scalp inflammation.",
    sizes: [
      { label: "100 ML", price: 199 },
      { label: "200 ML", price: 349 },
      { label: "500 ML", price: 749 }
    ],
    inStock: true
  },
  {
    id: "p4",
    name: "Intensive Hair Care Oil",
    category: "hair-care",
    categoryLabel: "Luxury Hair Care",
    price: 399,
    originalPrice: 499,
    rating: 5.0,
    reviewsCount: 215,
    badge: "Luxury Care",
    badgeClass: "badge-gold",
    image: "assets/product-6.jpg",
    link: "p4.html",
    description: "Deep conditioning restorative elixer crafted with 18 botanical roots and seeds for intense volume, root fortification, and silky luster.",
    sizes: [
      { label: "100 ML", price: 399 },
      { label: "250 ML", price: 799 },
      { label: "500 ML", price: 1399 }
    ],
    inStock: true
  },
  {
    id: "p5",
    name: "Oils and Restorative Serum",
    category: "skin-care",
    categoryLabel: "Skin & Face Care",
    price: 329,
    originalPrice: 420,
    rating: 4.8,
    reviewsCount: 112,
    badge: "Popular",
    badgeClass: "badge-green",
    image: "assets/product-5.jpg",
    link: "p5.html",
    description: "Ultra-nourishing face & body botanical serum rich in antioxidants, squalene, and cold-pressed botanical lipids for a timeless dewy glow.",
    sizes: [
      { label: "50 ML", price: 329 },
      { label: "100 ML", price: 579 },
      { label: "200 ML", price: 999 }
    ],
    inStock: true
  },
  {
    id: "p6",
    name: "Cold Pressed Sesame Oil",
    category: "cooking",
    categoryLabel: "Cooking & Massage",
    price: 349,
    originalPrice: 449,
    rating: 4.9,
    reviewsCount: 79,
    badge: "100% Traditional",
    badgeClass: "badge-gold",
    image: "assets/Screenshot 2026-09-10 103944.png",
    link: "p3.html",
    description: "Traditional wood-pressed black sesame oil with a robust nutty aroma, perfect for authentic South Indian cooking, abhyanga, and oil pulling.",
    sizes: [
      { label: "250 ML", price: 349 },
      { label: "500 ML", price: 620 },
      { label: "1 L", price: 1150 }
    ],
    inStock: true
  },
  {
    id: "p7",
    name: "Golden Castor Growth Oil",
    category: "hair-care",
    categoryLabel: "Hair & Eyebrow Care",
    price: 279,
    originalPrice: 350,
    rating: 4.7,
    reviewsCount: 64,
    badge: "Pure Castor",
    badgeClass: "badge-green",
    image: "assets/Screenshot 2026-09-10 104117.png",
    link: "catalog.html",
    description: "Thick unrefined castor oil cold-pressed from premium seeds to promote thicker eyelashes, fuller eyebrows, and resilient hair roots.",
    sizes: [
      { label: "100 ML", price: 279 },
      { label: "200 ML", price: 499 }
    ],
    inStock: true
  },
  {
    id: "p8",
    name: "Pure Almond Radiance Oil",
    category: "skin-care",
    categoryLabel: "Skin & Baby Massage",
    price: 449,
    originalPrice: 560,
    rating: 5.0,
    reviewsCount: 88,
    badge: "Cold-Pressed",
    badgeClass: "badge-gold",
    image: "assets/product-8.jpg",
    link: "catalog.html",
    description: "100% pure sweet almond oil naturally infused with Vitamin E, delivering deep hydration and gentle soothing for sensitive skin and dark circles.",
    sizes: [
      { label: "100 ML", price: 449 },
      { label: "200 ML", price: 799 }
    ],
    inStock: true
  }
];

// =========================================================
// 2. LOCAL STORAGE CART & WISHLIST ENGINE
// =========================================================
const CART_STORAGE_KEY = "siva_cart_items_v2";
const WISHLIST_STORAGE_KEY = "siva_wishlist_items_v2";
const COUPON_STORAGE_KEY = "siva_active_coupon_v2";

// Pre-seed sample items if cart is empty on first visit
function initStorage() {
  if (!localStorage.getItem(CART_STORAGE_KEY)) {
    const initialCart = [
      {
        id: "p1",
        name: "Cold Pressed Coconut Oil",
        price: 299,
        originalPrice: 399,
        image: "assets/product-1.jpg",
        volume: "100 ML",
        quantity: 1,
        category: "Cooking & Hair Care"
      },
      {
        id: "p2",
        name: "Amla & Brahmi Hair Oil",
        price: 499,
        originalPrice: 599,
        image: "assets/product-2.jpg",
        volume: "100 ML",
        quantity: 1,
        category: "Herbal Hair Care"
      },
      {
        id: "p5",
        name: "Oils and Restorative Serum",
        price: 329,
        originalPrice: 420,
        image: "assets/product-5.jpg",
        volume: "50 ML",
        quantity: 1,
        category: "Skin & Face Care"
      }
    ];
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(initialCart));
  }

  if (!localStorage.getItem(WISHLIST_STORAGE_KEY)) {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(["p2", "p4"]));
  }
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  syncBadges();
}

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(wishlist) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  syncBadges();
}

// =========================================================
// 3. CART OPERATIONS
// =========================================================
function addToCart(productOrName, price, imgUrl, volume = "100 ML", qty = 1, showToastNotification = true) {
  let item = null;

  if (typeof productOrName === "object" && productOrName !== null) {
    item = {
      id: productOrName.id || "custom_" + Date.now(),
      name: productOrName.name || "Herbal Oil",
      price: Number(productOrName.price) || 299,
      originalPrice: Number(productOrName.originalPrice) || Number(productOrName.price) + 100,
      image: productOrName.image || productOrName.img || "assets/product-1.jpg",
      volume: productOrName.volume || volume || "100 ML",
      quantity: Number(qty) || 1,
      category: productOrName.categoryLabel || productOrName.category || "Herbal Oil"
    };
  } else {
    // Look up in database by name or ID
    const found = SIVA_PRODUCTS.find(p => p.name.toLowerCase() === String(productOrName).toLowerCase() || p.id === String(productOrName));
    item = {
      id: found ? found.id : "custom_" + Date.now(),
      name: found ? found.name : String(productOrName),
      price: Number(price) || (found ? found.price : 299),
      originalPrice: found ? found.originalPrice : (Number(price) + 100 || 399),
      image: imgUrl || (found ? found.image : "assets/product-1.jpg"),
      volume: volume || "100 ML",
      quantity: Number(qty) || 1,
      category: found ? found.categoryLabel : "Herbal Care"
    };
  }

  const cart = getCart();
  const existingIndex = cart.findIndex(c => c.name === item.name && c.volume === item.volume);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);

  if (showToastNotification) {
    showToast(
      "Added to Bag! 🌿",
      `"${item.name}" (${item.volume}) - ₹${item.price} added to your botanical cart.`,
      "cart",
      item.image
    );
  }

  // If on cart page, re-render
  if (document.getElementById("cartItemsContainer")) {
    renderCartPage();
  }

  // If on checkout page, re-render
  if (document.getElementById("checkoutSummaryItems")) {
    renderCheckoutPage();
  }
}

function removeFromCart(productName, volume) {
  let cart = getCart();
  cart = cart.filter(item => !(item.name === productName && item.volume === volume));
  saveCart(cart);

  showToast("Removed from Bag", `Item removed from your cart.`, "info");

  if (document.getElementById("cartItemsContainer")) {
    renderCartPage();
  }
  if (document.getElementById("checkoutSummaryItems")) {
    renderCheckoutPage();
  }
}

function updateCartQuantity(productName, volume, change) {
  const cart = getCart();
  const item = cart.find(c => c.name === productName && c.volume === volume);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productName, volume);
      return;
    }
  }

  saveCart(cart);

  if (document.getElementById("cartItemsContainer")) {
    renderCartPage();
  }
  if (document.getElementById("checkoutSummaryItems")) {
    renderCheckoutPage();
  }
}

function clearCart() {
  saveCart([]);
  if (document.getElementById("cartItemsContainer")) {
    renderCartPage();
  }
  if (document.getElementById("checkoutSummaryItems")) {
    renderCheckoutPage();
  }
  showToast("Bag Cleared", "All items have been removed from your shopping bag.", "info");
}

function getCartTotals() {
  const cart = getCart();
  let subtotal = 0;
  let totalItems = 0;

  cart.forEach(item => {
    subtotal += (item.price * item.quantity);
    totalItems += item.quantity;
  });

  // Coupon handling
  const activeCoupon = localStorage.getItem(COUPON_STORAGE_KEY) || "";
  let discount = 0;
  let discountPercent = 0;

  if (activeCoupon.toUpperCase() === "PURE15") {
    discountPercent = 15;
    discount = Math.round(subtotal * 0.15);
  } else if (activeCoupon.toUpperCase() === "NATURE20") {
    discountPercent = 20;
    discount = Math.round(subtotal * 0.20);
  } else if (activeCoupon.toUpperCase() === "HERBAL10") {
    discountPercent = 10;
    discount = Math.round(subtotal * 0.10);
  }

  const FREE_SHIPPING_THRESHOLD = 999;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shipping = isFreeShipping ? 0 : 79;
  const tax = Math.round((subtotal - discount) * 0.05); // 5% GST
  const grandTotal = Math.max(0, subtotal - discount + shipping + tax);
  const neededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return {
    subtotal,
    discount,
    discountPercent,
    activeCoupon,
    shipping,
    tax,
    grandTotal,
    totalItems,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    neededForFreeShipping,
    isFreeShipping
  };
}

function applyCoupon(code) {
  const cleanCode = (code || "").trim().toUpperCase();
  if (!cleanCode) {
    showToast("Invalid Coupon", "Please enter a valid discount promo code.", "error");
    return false;
  }

  if (["PURE15", "NATURE20", "HERBAL10"].includes(cleanCode)) {
    localStorage.setItem(COUPON_STORAGE_KEY, cleanCode);
    showToast("Coupon Applied! 🎉", `Discount promo code "${cleanCode}" successfully applied.`, "coupon");
    if (document.getElementById("cartItemsContainer")) renderCartPage();
    if (document.getElementById("checkoutSummaryItems")) renderCheckoutPage();
    return true;
  } else {
    showToast("Coupon Not Found", `"${cleanCode}" is not a recognized coupon code. Try PURE15 for 15% off.`, "error");
    return false;
  }
}

function removeCoupon() {
  localStorage.removeItem(COUPON_STORAGE_KEY);
  showToast("Coupon Removed", "Discount promo code has been removed.", "info");
  if (document.getElementById("cartItemsContainer")) renderCartPage();
  if (document.getElementById("checkoutSummaryItems")) renderCheckoutPage();
}

// =========================================================
// 4. WISHLIST OPERATIONS
// =========================================================
function toggleWishlist(btnOrId, productName, price, imgUrl) {
  let targetId = "";
  let name = productName;

  if (typeof btnOrId === "object" && btnOrId !== null) {
    targetId = btnOrId.dataset.productId || "";
  } else if (typeof btnOrId === "string") {
    targetId = btnOrId;
  }

  if (!name && targetId) {
    const prod = SIVA_PRODUCTS.find(p => p.id === targetId);
    if (prod) name = prod.name;
  }

  if (!name) name = "Herbal Oil";

  const wishlist = getWishlist();
  const index = wishlist.indexOf(name);
  const isAdding = (index === -1);

  if (isAdding) {
    wishlist.push(name);
    showToast("Saved to Wishlist ❤️", `"${name}" has been added to your favorites.`, "wishlist");
  } else {
    wishlist.splice(index, 1);
    showToast("Removed from Wishlist", `"${name}" removed from favorites.`, "info");
  }

  saveWishlist(wishlist);
  syncWishlistButtons();
}

function isWishlisted(productName) {
  return getWishlist().includes(productName);
}

function syncWishlistButtons() {
  const wishlist = getWishlist();
  document.querySelectorAll(".heart, .wishlist-btn").forEach(btn => {
    const card = btn.closest(".product-card, .catalog-card, .product-section");
    const title = btn.dataset.productName || (card ? (card.querySelector(".product-title, .product-name, h1, h3")?.textContent.trim()) : "");
    const icon = btn.querySelector("i");

    if (title && wishlist.includes(title)) {
      btn.classList.add("active");
      if (icon) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        icon.style.color = "#e63946";
      }
    } else {
      btn.classList.remove("active");
      if (icon) {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        icon.style.color = "";
      }
    }
  });
}

// =========================================================
// 5. LIVE BADGES SYNCHRONIZATION
// =========================================================
function syncBadges() {
  const cartTotals = getCartTotals();
  const wishlist = getWishlist();

  // Update Cart Badges
  document.querySelectorAll(".cart-count, #cartCount").forEach(badge => {
    badge.textContent = cartTotals.totalItems;
    badge.classList.remove("cart-bounce");
    void badge.offsetWidth; // Reflow
    badge.classList.add("cart-bounce");
  });

  // Update Wishlist Badges
  document.querySelectorAll(".wishlist-count, #wishlistCount").forEach(badge => {
    badge.textContent = wishlist.length;
    badge.classList.remove("cart-bounce");
    void badge.offsetWidth;
    badge.classList.add("cart-bounce");
  });
}

// =========================================================
// 6. FLOATING TOAST NOTIFICATION SYSTEM
// =========================================================
let toastTimeout;

function showToast(title, message, type = "cart", customImage = "") {
  let toast = document.getElementById("cartToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cartToast";
    toast.className = "cart-toast";
    toast.innerHTML = `
      <div class="toast-icon-wrap" id="toastIcon">
        <i class="fa-solid fa-check"></i>
      </div>
      <div class="toast-body">
        <strong id="toastTitle">Notification</strong>
        <p id="toastMessage">Action performed successfully.</p>
        <div class="toast-actions" id="toastActions">
          <a href="cart.html" class="toast-cart-btn">View Bag →</a>
        </div>
      </div>
      <button class="toast-close" onclick="closeToast()" aria-label="Close notification">&times;</button>
    `;
    document.body.appendChild(toast);
  }

  const titleEl = document.getElementById("toastTitle");
  const messageEl = document.getElementById("toastMessage");
  const iconEl = document.getElementById("toastIcon");
  const actionsEl = document.getElementById("toastActions");

  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;

  if (iconEl) {
    if (customImage) {
      iconEl.innerHTML = `<img src="${customImage}" alt="Product" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
    } else if (type === "wishlist") {
      iconEl.innerHTML = '<i class="fa-solid fa-heart" style="color: #e63946;"></i>';
    } else if (type === "coupon") {
      iconEl.innerHTML = '<i class="fa-solid fa-ticket" style="color: #c69d36;"></i>';
    } else if (type === "error") {
      iconEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="color: #d90429;"></i>';
    } else {
      iconEl.innerHTML = '<i class="fa-solid fa-cart-shopping" style="color: #123c29;"></i>';
    }
  }

  if (actionsEl) {
    actionsEl.style.display = (type === "cart") ? "block" : "none";
  }

  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    closeToast();
  }, 4200);
}

function closeToast() {
  const toast = document.getElementById("cartToast");
  if (toast) {
    toast.classList.remove("show");
  }
}

// =========================================================
// 7. QUICK VIEW MODAL SYSTEM
// =========================================================
function openQuickView(productId) {
  const product = SIVA_PRODUCTS.find(p => p.id === productId) || SIVA_PRODUCTS[0];
  let modalEl = document.getElementById("quickViewModal");

  if (!modalEl) {
    modalEl = document.createElement("div");
    modalEl.id = "quickViewModal";
    modalEl.className = "modal fade";
    modalEl.setAttribute("tabindex", "-1");
    modalEl.setAttribute("aria-hidden", "true");
    document.body.appendChild(modalEl);
  }

  const sizesHtml = product.sizes.map((s, idx) => `
    <button type="button" class="btn btn-outline-dark btn-sm qv-size-btn ${idx === 0 ? 'active' : ''}" 
      data-price="${s.price}" data-size="${s.label}">
      ${s.label} - ₹${s.price}
    </button>
  `).join("");

  modalEl.innerHTML = `
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 rounded-4 overflow-hidden shadow-lg">
        <div class="modal-header border-0 bg-cream py-3">
          <span class="badge bg-green px-3 py-2 text-white fw-semibold rounded-pill">
            <i class="fa-solid fa-leaf me-1"></i> ${product.badge}
          </span>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4 bg-white">
          <div class="row g-4 align-items-center">
            <div class="col-md-5">
              <div class="rounded-4 overflow-hidden shadow-sm bg-sage text-center p-3">
                <img src="${product.image}" id="qvModalImg" alt="${product.name}" class="img-fluid rounded-3" style="max-height: 320px; object-fit: contain;">
              </div>
            </div>
            <div class="col-md-7">
              <span class="text-uppercase tracking-wider text-gold fw-bold small">${product.categoryLabel}</span>
              <h3 class="font-serif fw-bold text-dark mt-1 mb-2">${product.name}</h3>
              <div class="d-flex align-items-center gap-2 mb-3">
                <span class="text-gold"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>
                <span class="fw-bold">${product.rating}</span>
                <span class="text-muted small">(${product.reviewsCount} customer reviews)</span>
              </div>
              <div class="d-flex align-items-baseline gap-2 mb-3">
                <h4 class="text-green fw-bold mb-0" id="qvPriceDisplay">₹${product.price}</h4>
                <del class="text-muted small">₹${product.originalPrice}</del>
                <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill ms-2">Save ₹${product.originalPrice - product.price}</span>
              </div>
              <p class="text-muted small mb-4">${product.description}</p>
              
              <div class="mb-3">
                <label class="fw-bold small d-block mb-2">Select Volume:</label>
                <div class="d-flex flex-wrap gap-2" id="qvSizeContainer">
                  ${sizesHtml}
                </div>
              </div>

              <div class="d-flex align-items-center gap-3 mt-4">
                <div class="input-group" style="width: 120px;">
                  <button class="btn btn-outline-secondary" type="button" onclick="adjustQvQty(-1)">-</button>
                  <input type="number" id="qvQtyInput" class="form-control text-center fw-bold" value="1" min="1" readonly>
                  <button class="btn btn-outline-secondary" type="button" onclick="adjustQvQty(1)">+</button>
                </div>
                <button type="button" class="btn btn-green flex-grow-1 py-2 rounded-3 fw-bold shadow-sm" id="qvAddBtn">
                  <i class="fa-solid fa-cart-shopping me-2"></i> Add to Bag
                </button>
              </div>

              <div class="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                <a href="${product.link}" class="text-green fw-semibold text-decoration-none small">
                  View Full Product Details <i class="fa-solid fa-arrow-right ms-1"></i>
                </a>
                <span class="text-success small fw-semibold"><i class="fa-solid fa-circle-check me-1"></i> In Stock & Ready to Ship</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach interactive size change listeners
  let currentPrice = product.price;
  let currentSize = product.sizes[0]?.label || "100 ML";

  modalEl.querySelectorAll(".qv-size-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      modalEl.querySelectorAll(".qv-size-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentPrice = Number(btn.dataset.price);
      currentSize = btn.dataset.size;
      const priceDisplay = document.getElementById("qvPriceDisplay");
      if (priceDisplay) priceDisplay.textContent = `₹${currentPrice}`;
    });
  });

  // Attach Add to Bag listener
  const addBtn = document.getElementById("qvAddBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const qty = Number(document.getElementById("qvQtyInput")?.value) || 1;
      addToCart({
        id: product.id,
        name: product.name,
        price: currentPrice,
        originalPrice: product.originalPrice,
        image: product.image,
        volume: currentSize,
        category: product.categoryLabel
      }, currentPrice, product.image, currentSize, qty);

      // Close modal
      const bsModal = bootstrap.Modal.getInstance(modalEl);
      if (bsModal) bsModal.hide();
    });
  }

  // Show Bootstrap modal
  if (typeof bootstrap !== "undefined" && bootstrap.Modal) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

function adjustQvQty(change) {
  const input = document.getElementById("qvQtyInput");
  if (!input) return;
  let val = Number(input.value) || 1;
  val = Math.max(1, val + change);
  input.value = val;
}

// =========================================================
// 8. LIVE SEARCH AUTOCOMPLETE WITH PREVIEW
// =========================================================
function initLiveSearch() {
  const searchForms = document.querySelectorAll(".search-form");

  searchForms.forEach(form => {
    const input = form.querySelector('input[type="text"], input[name="search"]');
    if (!input) return;

    // Create results dropdown box if not present
    let dropdown = form.parentElement.querySelector(".search-autocomplete-dropdown");
    if (!dropdown) {
      dropdown = document.createElement("div");
      dropdown.className = "search-autocomplete-dropdown shadow-lg rounded-3";
      form.parentElement.style.position = "relative";
      form.parentElement.appendChild(dropdown);
    }

    input.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (query.length < 2) {
        dropdown.classList.remove("show");
        dropdown.innerHTML = "";
        return;
      }

      const matches = SIVA_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.categoryLabel.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      ).slice(0, 5);

      if (matches.length === 0) {
        dropdown.innerHTML = `
          <div class="p-3 text-center text-muted small">
            <i class="fa-solid fa-magnifying-glass mb-2 d-block text-secondary"></i>
            No botanical oils matching "<strong>${query}</strong>"
          </div>
        `;
      } else {
        dropdown.innerHTML = `
          <div class="search-results-header px-3 py-2 bg-light border-bottom small fw-bold text-muted d-flex justify-content-between align-items-center">
            <span>SUGGESTED OILS (${matches.length})</span>
            <a href="catalog.html?search=${encodeURIComponent(query)}" class="text-green text-decoration-none small">View All →</a>
          </div>
          ${matches.map(m => `
            <a href="${m.link}" class="search-result-item d-flex align-items-center gap-3 p-2 text-decoration-none border-bottom">
              <img src="${m.image}" alt="${m.name}" class="rounded-2" style="width: 44px; height: 44px; object-fit: cover;">
              <div class="flex-grow-1">
                <span class="d-block fw-semibold text-dark small">${m.name}</span>
                <span class="text-gold fw-bold small">₹${m.price}</span>
                <span class="text-muted ms-2" style="font-size: 11px;">${m.categoryLabel}</span>
              </div>
              <button type="button" class="btn btn-sm btn-outline-success py-0 px-2 rounded-pill small" 
                onclick="event.preventDefault(); addToCart('${m.name}', ${m.price}, '${m.image}', '${m.sizes[0].label}');">
                + Bag
              </button>
            </a>
          `).join("")}
        `;
      }
      dropdown.classList.add("show");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!form.parentElement.contains(e.target)) {
        dropdown.classList.remove("show");
      }
    });

    // Form submit redirection
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = input.value.trim();
      window.location.href = `catalog.html?search=${encodeURIComponent(val)}`;
    });
  });
}

// =========================================================
// 9. CART PAGE DYNAMIC RENDERER
// =========================================================
function renderCartPage() {
  const container = document.getElementById("cartItemsContainer");
  const emptyState = document.getElementById("emptyCartState");
  const summaryBox = document.getElementById("cartSummaryBox");
  if (!container) return;

  const cart = getCart();
  const totals = getCartTotals();

  if (cart.length === 0) {
    container.style.display = "none";
    if (summaryBox) summaryBox.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  container.style.display = "block";
  if (summaryBox) summaryBox.style.display = "block";
  if (emptyState) emptyState.style.display = "none";

  // Update Free Shipping Progress Bar
  const progressEl = document.getElementById("shippingProgressBar");
  const progressText = document.getElementById("shippingProgressText");

  if (progressEl && progressText) {
    const percent = Math.min(100, Math.round((totals.subtotal / totals.freeShippingThreshold) * 100));
    progressEl.style.width = `${percent}%`;

    if (totals.isFreeShipping) {
      progressText.innerHTML = `🎉 <strong>Congratulations!</strong> You qualify for <strong>FREE Express Shipping</strong>!`;
      progressEl.classList.remove("bg-warning");
      progressEl.classList.add("bg-success");
    } else {
      progressText.innerHTML = `Add <strong>₹${totals.neededForFreeShipping}</strong> more to unlock <strong>FREE Express Delivery</strong>!`;
      progressEl.classList.remove("bg-success");
      progressEl.classList.add("bg-warning");
    }
  }

  // Render Table Rows
  container.innerHTML = cart.map(item => `
    <div class="cart-item-card p-3 mb-3 bg-white rounded-3 border shadow-sm d-flex flex-wrap align-items-center justify-content-between gap-3">
      <div class="d-flex align-items-center gap-3">
        <a href="p1.html">
          <img src="${item.image}" alt="${item.name}" class="rounded-3" style="width: 76px; height: 76px; object-fit: cover; background: #f5f4ef;">
        </a>
        <div>
          <span class="badge bg-sage text-green fw-semibold mb-1" style="font-size: 11px;">${item.category || 'Herbal Oil'}</span>
          <h5 class="mb-1 font-serif fw-bold" style="font-size: 16px;">${item.name}</h5>
          <span class="text-muted small d-block">Volume: <strong>${item.volume}</strong></span>
          <span class="text-gold fw-bold">₹${item.price} each</span>
        </div>
      </div>

      <div class="d-flex align-items-center gap-4 ms-auto">
        <div class="input-group input-group-sm" style="width: 110px;">
          <button class="btn btn-outline-secondary px-2" type="button" onclick="updateCartQuantity('${item.name}', '${item.volume}', -1)">-</button>
          <input type="text" class="form-control text-center fw-bold bg-white" value="${item.quantity}" readonly>
          <button class="btn btn-outline-secondary px-2" type="button" onclick="updateCartQuantity('${item.name}', '${item.volume}', 1)">+</button>
        </div>

        <div class="text-end" style="min-width: 80px;">
          <span class="text-muted small d-block" style="font-size: 11px;">Total</span>
          <strong class="text-green fs-6">₹${item.price * item.quantity}</strong>
        </div>

        <button type="button" class="btn btn-link text-danger p-0 fs-5" title="Remove item" 
          onclick="removeFromCart('${item.name}', '${item.volume}')">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join("");

  // Update Summary Rows
  const subtotalEl = document.getElementById("cartSubtotal");
  const discountRow = document.getElementById("cartDiscountRow");
  const discountEl = document.getElementById("cartDiscount");
  const shippingEl = document.getElementById("cartShipping");
  const taxEl = document.getElementById("cartTax");
  const grandTotalEl = document.getElementById("cartGrandTotal");

  if (subtotalEl) subtotalEl.textContent = `₹${totals.subtotal}`;

  if (discountRow && discountEl) {
    if (totals.discount > 0) {
      discountRow.classList.remove("d-none");
      discountEl.textContent = `-₹${totals.discount} (${totals.activeCoupon})`;
    } else {
      discountRow.classList.add("d-none");
    }
  }

  if (shippingEl) {
    shippingEl.innerHTML = totals.shipping === 0 
      ? '<span class="text-success fw-bold">FREE</span>' 
      : `₹${totals.shipping}`;
  }

  if (taxEl) taxEl.textContent = `₹${totals.tax}`;
  if (grandTotalEl) grandTotalEl.textContent = `₹${totals.grandTotal}`;
}

// =========================================================
// 10. CHECKOUT PAGE DYNAMIC RENDERER & SIMULATION
// =========================================================
function renderCheckoutPage() {
  const summaryContainer = document.getElementById("checkoutSummaryItems");
  if (!summaryContainer) return;

  const cart = getCart();
  const totals = getCartTotals();

  if (cart.length === 0) {
    summaryContainer.innerHTML = `
      <div class="text-center p-4">
        <p class="text-muted mb-3">Your shopping bag is empty.</p>
        <a href="catalog.html" class="btn btn-green btn-sm rounded-pill px-4">Browse Catalog</a>
      </div>
    `;
    return;
  }

  summaryContainer.innerHTML = cart.map(item => `
    <div class="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
      <div class="d-flex align-items-center gap-3">
        <div class="position-relative">
          <img src="${item.image}" alt="${item.name}" class="rounded-3" style="width: 55px; height: 55px; object-fit: cover; background: #eee;">
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-green text-white" style="font-size: 10px;">
            ${item.quantity}
          </span>
        </div>
        <div>
          <h6 class="mb-0 fw-semibold" style="font-size: 14px;">${item.name}</h6>
          <small class="text-muted">${item.volume}</small>
        </div>
      </div>
      <span class="fw-bold text-dark">₹${item.price * item.quantity}</span>
    </div>
  `).join("");

  // Update totals
  const subtotalEl = document.getElementById("checkoutSubtotal");
  const discountEl = document.getElementById("checkoutDiscount");
  const discountRow = document.getElementById("checkoutDiscountRow");
  const shippingEl = document.getElementById("checkoutShipping");
  const taxEl = document.getElementById("checkoutTax");
  const totalEl = document.getElementById("checkoutGrandTotal");
  const placeOrderBtnText = document.getElementById("placeOrderBtnPrice");

  if (subtotalEl) subtotalEl.textContent = `₹${totals.subtotal}`;

  if (discountRow && discountEl) {
    if (totals.discount > 0) {
      discountRow.classList.remove("d-none");
      discountEl.textContent = `-₹${totals.discount}`;
    } else {
      discountRow.classList.add("d-none");
    }
  }

  // Delivery options listener
  let deliveryFee = totals.shipping;
  const expressRadio = document.querySelector('input[name="shippingMethod"]:checked');
  if (expressRadio && expressRadio.value === "express") {
    deliveryFee = 99;
  }

  if (shippingEl) {
    shippingEl.innerHTML = deliveryFee === 0 ? '<span class="text-success fw-bold">FREE</span>' : `₹${deliveryFee}`;
  }

  const finalTotal = totals.subtotal - totals.discount + deliveryFee + totals.tax;
  if (taxEl) taxEl.textContent = `₹${totals.tax}`;
  if (totalEl) totalEl.textContent = `₹${finalTotal}`;
  if (placeOrderBtnText) placeOrderBtnText.textContent = `₹${finalTotal}`;
}

function handleCheckoutSubmission(e) {
  if (e) e.preventDefault();

  const cart = getCart();
  if (cart.length === 0) {
    showToast("Empty Bag", "Please add items to your cart before proceeding.", "error");
    return;
  }

  const form = document.getElementById("checkoutForm");
  if (form && !form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const btn = document.getElementById("placeOrderBtn");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span> Securing your order...`;
  }

  // Generate randomized realistic Order ID
  const orderId = "SHO-" + Math.floor(100000 + Math.random() * 900000);
  const totals = getCartTotals();
  const customerName = document.getElementById("shippingFirstName")?.value || "Valued Customer";
  const customerEmail = document.getElementById("checkoutEmail")?.value || "customer@example.com";
  const address = document.getElementById("shippingAddress")?.value || "123 Botanical Lane";
  const city = document.getElementById("shippingCity")?.value || "Chennai";

  setTimeout(() => {
    // Show Order Confirmation Modal
    let modalEl = document.getElementById("orderSuccessModal");
    if (!modalEl) {
      modalEl = document.createElement("div");
      modalEl.id = "orderSuccessModal";
      modalEl.className = "modal fade";
      modalEl.setAttribute("data-bs-backdrop", "static");
      modalEl.setAttribute("tabindex", "-1");
      document.body.appendChild(modalEl);
    }

    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 3)).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });

    modalEl.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 rounded-4 shadow-lg text-center p-4">
          <div class="my-3">
            <div class="success-checkmark-circle mx-auto mb-3">
              <i class="fa-solid fa-check text-white fs-2"></i>
            </div>
            <span class="text-uppercase tracking-wider text-gold fw-bold small">Order Confirmed</span>
            <h3 class="font-serif fw-bold mt-1 text-green">Thank You, ${customerName}!</h3>
            <p class="text-muted small">Your botanical handcrafted oils are being carefully prepared for dispatch.</p>
          </div>

          <div class="bg-sage rounded-3 p-3 text-start small mb-3">
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Order Number:</span>
              <strong class="text-green font-monospace">${orderId}</strong>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Estimated Delivery:</span>
              <strong class="text-dark">${deliveryDate}</strong>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Confirmation Sent to:</span>
              <strong class="text-dark">${customerEmail}</strong>
            </div>
            <div class="d-flex justify-content-between pt-2 border-top">
              <span class="text-muted">Total Paid:</span>
              <strong class="text-green fs-6">₹${totals.grandTotal}</strong>
            </div>
          </div>

          <div class="alert alert-light border small text-muted text-start mb-4">
            <i class="fa-solid fa-shield-halved text-gold me-2"></i>
            A tracking link has been generated and dispatched to your email address and SMS.
          </div>

          <div class="d-grid gap-2">
            <a href="index.html" class="btn btn-green py-2 rounded-pill fw-bold">
              Continue Shopping
            </a>
            <button type="button" class="btn btn-outline-secondary py-2 rounded-pill small" onclick="window.print()">
              <i class="fa-solid fa-print me-1"></i> Print Receipt
            </button>
          </div>
        </div>
      </div>
    `;

    // Clear cart
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(COUPON_STORAGE_KEY);
    syncBadges();

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `Place Order`;
    }

    if (typeof bootstrap !== "undefined" && bootstrap.Modal) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }, 1200);
}

// =========================================================
// 11. CATALOG FILTER & SORT CONTROLLER
// =========================================================
function initCatalogController() {
  const gridContainer = document.getElementById("catalogProductGrid");
  if (!gridContainer) return;

  const searchInput = document.getElementById("catalogSearchInput");
  const categoryFilters = document.querySelectorAll(".catalog-cat-filter");
  const priceSlider = document.getElementById("catalogPriceRange");
  const priceVal = document.getElementById("catalogPriceVal");
  const sortSelect = document.getElementById("catalogSortSelect");
  const resultCount = document.getElementById("catalogResultCount");
  const resetBtn = document.getElementById("resetFiltersBtn");
  const viewGridBtn = document.getElementById("viewGridBtn");
  const viewListBtn = document.getElementById("viewListBtn");

  // Read URL parameters (e.g. ?category=hair-care or ?search=coconut)
  const urlParams = new URLSearchParams(window.location.search);
  let activeCategory = urlParams.get("category") || "all";
  let activeSearch = urlParams.get("search") || "";
  let maxPrice = 1200;
  let activeSort = "featured";
  let activeViewMode = "grid";

  if (activeSearch && searchInput) {
    searchInput.value = activeSearch;
  }

  // Set active category UI
  if (categoryFilters.length) {
    categoryFilters.forEach(btn => {
      if (btn.dataset.category === activeCategory) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  function filterAndRender() {
    let filtered = SIVA_PRODUCTS.filter(prod => {
      // Category match
      if (activeCategory !== "all" && prod.category !== activeCategory) {
        return false;
      }

      // Search match
      if (activeSearch) {
        const q = activeSearch.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesDesc = prod.description.toLowerCase().includes(q);
        const matchesCat = prod.categoryLabel.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // Price match
      if (prod.price > maxPrice) return false;

      return true;
    });

    // Sort
    if (activeSort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeSort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (activeSort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (activeSort === "reviews") {
      filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    // Update Result Counter
    if (resultCount) {
      resultCount.textContent = `Showing ${filtered.length} of ${SIVA_PRODUCTS.length} natural oils`;
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="p-4 bg-sage rounded-4 d-inline-block" style="max-width: 500px;">
            <i class="fa-solid fa-leaf text-gold fs-1 mb-3"></i>
            <h4 class="font-serif">No botanical formulations found</h4>
            <p class="text-muted small">We couldn't find any products matching your current filters. Try resetting the filters or searching with a different term.</p>
            <button class="btn btn-green rounded-pill btn-sm px-4" id="emptyResetBtn">Reset All Filters</button>
          </div>
        </div>
      `;
      document.getElementById("emptyResetBtn")?.addEventListener("click", resetAll);
      return;
    }

    if (activeViewMode === "list") {
      gridContainer.innerHTML = filtered.map(prod => `
        <div class="col-12 mb-3">
          <div class="catalog-list-card p-3 bg-white rounded-3 border shadow-sm d-flex flex-wrap align-items-center gap-4">
            <div class="position-relative" style="width: 140px; height: 140px; flex-shrink: 0;">
              <img src="${prod.image}" alt="${prod.name}" class="rounded-3 w-100 h-100 object-fit-cover bg-sage">
              <span class="badge ${prod.badgeClass} position-absolute top-0 start-0 m-2 font-xs">${prod.badge}</span>
            </div>
            <div class="flex-grow-1">
              <span class="text-gold fw-bold text-uppercase" style="font-size: 11px;">${prod.categoryLabel}</span>
              <h4 class="font-serif fw-bold mb-1">${prod.name}</h4>
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="text-gold small"><i class="fa-solid fa-star"></i> ${prod.rating}</span>
                <span class="text-muted small">(${prod.reviewsCount} reviews)</span>
              </div>
              <p class="text-muted small mb-0 d-none d-md-block" style="max-width: 600px;">${prod.description}</p>
            </div>
            <div class="text-end d-flex flex-column align-items-end gap-2 ms-auto">
              <div class="d-flex align-items-baseline gap-2">
                <span class="fs-4 fw-bold text-green">₹${prod.price}</span>
                <del class="text-muted small">₹${prod.originalPrice}</del>
              </div>
              <div class="d-flex gap-2">
                <button type="button" class="btn btn-outline-dark btn-sm rounded-pill" onclick="openQuickView('${prod.id}')" title="Quick View">
                  <i class="fa-regular fa-eye"></i> Quick View
                </button>
                <button type="button" class="btn btn-green btn-sm rounded-pill" onclick="addToCart('${prod.name}', ${prod.price}, '${prod.image}', '${prod.sizes[0].label}')">
                  <i class="fa-solid fa-cart-shopping me-1"></i> Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      `).join("");
    } else {
      gridContainer.innerHTML = filtered.map(prod => `
        <div class="col-lg-4 col-md-6 col-sm-6 mb-4">
          <article class="product-card h-100 d-flex flex-column">
            <span class="card-badge ${prod.badge.toLowerCase().includes('blend') || prod.badge.toLowerCase().includes('traditional') ? 'gold' : ''}">${prod.badge}</span>
            <button class="heart" aria-label="Add to wishlist" data-product-name="${prod.name}" onclick="toggleWishlist(this, '${prod.name}', ${prod.price}, '${prod.image}')">
              <i class="fa-regular fa-heart"></i>
            </button>
            <div class="card-img-wrap" style="height: 250px; overflow: hidden; position: relative;">
              <img src="${prod.image}" alt="${prod.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
              <button class="quick-view-overlay-btn" onclick="openQuickView('${prod.id}')">
                <i class="fa-regular fa-eye me-1"></i> Quick View
              </button>
            </div>
            <div class="product-info flex-grow-1 d-flex flex-column justify-content-between p-3">
              <div>
                <div class="product-stars text-gold small mb-1">
                  <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                  <span class="ms-1 text-muted fw-bold">${prod.rating}</span>
                </div>
                <span class="text-uppercase text-muted" style="font-size: 11px; letter-spacing: 1px;">${prod.categoryLabel}</span>
                <h5 class="product-title font-serif fw-bold mb-2" style="font-size: 18px;">
                  <a href="${prod.link}" class="text-decoration-none text-dark">${prod.name}</a>
                </h5>
              </div>
              <div class="pt-2 border-top d-flex align-items-center justify-content-between mt-2">
                <div>
                  <b class="product-price text-green fs-5">₹ ${prod.price}.00</b>
                  <del class="text-muted small ms-1">₹${prod.originalPrice}</del>
                </div>
                <button type="button" class="btn btn-green btn-sm rounded-pill px-3" onclick="addToCart('${prod.name}', ${prod.price}, '${prod.image}', '${prod.sizes[0].label}')">
                  + Add
                </button>
              </div>
            </div>
          </article>
        </div>
      `).join("");
    }

    syncWishlistButtons();
  }

  function resetAll() {
    activeCategory = "all";
    activeSearch = "";
    maxPrice = 1200;
    activeSort = "featured";
    if (searchInput) searchInput.value = "";
    if (priceSlider) priceSlider.value = 1200;
    if (priceVal) priceVal.textContent = "₹1200";
    if (sortSelect) sortSelect.value = "featured";
    categoryFilters.forEach(btn => {
      if (btn.dataset.category === "all") btn.classList.add("active");
      else btn.classList.remove("active");
    });
    filterAndRender();
  }

  // Category filter clicks
  categoryFilters.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      categoryFilters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      filterAndRender();
    });
  });

  // Search input filter
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeSearch = e.target.value.trim();
      filterAndRender();
    });
  }

  // Price slider filter
  if (priceSlider && priceVal) {
    priceSlider.addEventListener("input", (e) => {
      maxPrice = Number(e.target.value);
      priceVal.textContent = `₹${maxPrice}`;
      filterAndRender();
    });
  }

  // Sort dropdown
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeSort = e.target.value;
      filterAndRender();
    });
  }

  // View buttons
  if (viewGridBtn && viewListBtn) {
    viewGridBtn.addEventListener("click", () => {
      viewGridBtn.classList.add("active");
      viewListBtn.classList.remove("active");
      activeViewMode = "grid";
      filterAndRender();
    });

    viewListBtn.addEventListener("click", () => {
      viewListBtn.classList.add("active");
      viewGridBtn.classList.remove("active");
      activeViewMode = "list";
      filterAndRender();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetAll);
  }

  // Initial call
  filterAndRender();
}

// =========================================================
// 12. PRODUCT DETAIL PAGE CONTROLLER
// =========================================================
function initProductDetailPage() {
  const thumbnails = document.querySelectorAll(".thumbnail img, .product-thumb img");
  const mainImage = document.querySelector(".main-image img, #mainProductImg");

  if (mainImage && thumbnails.length) {
    thumbnails.forEach(thumb => {
      thumb.parentElement.addEventListener("click", () => {
        thumbnails.forEach(t => t.parentElement.classList.remove("active"));
        thumb.parentElement.classList.add("active");
        mainImage.src = thumb.src;
      });
    });
  }

  // Size buttons selector
  const sizeButtons = document.querySelectorAll(".sizes .size, .product-size-btn");
  const priceDisplay = document.querySelector(".product-price, #detailProductPrice");

  if (sizeButtons.length && priceDisplay) {
    sizeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        sizeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const text = btn.textContent.trim();
        let basePrice = 299;
        if (text.includes("500") || text.includes("250")) basePrice = 599;
        if (text.includes("1 L") || text.includes("1000")) basePrice = 1099;

        priceDisplay.textContent = `₹${basePrice}`;
      });
    });
  }

  // Quantity input in details
  const qtyInput = document.getElementById("detailQtyInput");
  window.adjustDetailQty = function(change) {
    if (!qtyInput) return;
    let val = Number(qtyInput.value) || 1;
    val = Math.max(1, val + change);
    qtyInput.value = val;
  };

  // Add to Bag Button in Product Details
  const addBtn = document.getElementById("detailAddCartBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const title = document.querySelector("h1, .product-name")?.textContent.trim() || "Herbal Oil";
      const priceText = priceDisplay?.textContent.replace(/[^0-9]/g, "") || "299";
      const activeSize = document.querySelector(".sizes .size.active, .product-size-btn.active")?.textContent.trim() || "100 ML";
      const qty = Number(qtyInput?.value) || 1;
      const imgSrc = mainImage?.src || "assets/product-1.jpg";

      addToCart(title, Number(priceText), imgSrc, activeSize, qty);
    });
  }

  // Buy Now Button in Product Details
  const buyBtn = document.getElementById("detailBuyNowBtn");
  if (buyBtn) {
    buyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const title = document.querySelector("h1, .product-name")?.textContent.trim() || "Herbal Oil";
      const priceText = priceDisplay?.textContent.replace(/[^0-9]/g, "") || "299";
      const activeSize = document.querySelector(".sizes .size.active, .product-size-btn.active")?.textContent.trim() || "100 ML";
      const qty = Number(qtyInput?.value) || 1;
      const imgSrc = mainImage?.src || "assets/product-1.jpg";

      addToCart(title, Number(priceText), imgSrc, activeSize, qty, false);
      window.location.href = "productcheckout.html";
    });
  }

  // Interactive Review Submission
  const reviewForm = document.getElementById("writeReviewForm");
  if (reviewForm) {
    let selectedRating = 5;
    const starBtns = reviewForm.querySelectorAll(".rating-select-star");
    starBtns.forEach(star => {
      star.addEventListener("click", () => {
        selectedRating = Number(star.dataset.star);
        starBtns.forEach(s => {
          const sVal = Number(s.dataset.star);
          if (sVal <= selectedRating) {
            s.classList.remove("fa-regular");
            s.classList.add("fa-solid");
            s.style.color = "#c69d36";
          } else {
            s.classList.remove("fa-solid");
            s.classList.add("fa-regular");
            s.style.color = "#ccc";
          }
        });
      });
    });

    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reviewerName")?.value || "Verified Customer";
      const comment = document.getElementById("reviewerComment")?.value || "";
      const reviewsList = document.getElementById("productReviewsList");

      if (reviewsList && comment.trim()) {
        const starsHtml = '<i class="fa-solid fa-star text-gold"></i>'.repeat(selectedRating);
        const newReviewEl = document.createElement("div");
        newReviewEl.className = "review-item p-3 mb-3 bg-white rounded-3 border shadow-sm";
        newReviewEl.innerHTML = `
          <div class="d-flex justify-content-between align-items-center mb-1">
            <strong class="text-dark">${name}</strong>
            <span class="text-muted small">Just now</span>
          </div>
          <div class="small mb-2">${starsHtml}</div>
          <p class="text-muted small mb-0">${comment}</p>
        `;
        reviewsList.prepend(newReviewEl);
        reviewForm.reset();
        showToast("Review Posted! 🌟", "Thank you for sharing your botanical experience.", "info");
      }
    });
  }
}

// =========================================================
// 13. CORE SITE UTILITIES
// =========================================================
function initPreloader() {
  const loader = document.getElementById("siteLoader");
  if (!loader) return;

  const dismissLoader = () => {
    loader.classList.add("loader-hidden");
    document.body.classList.add("site-loaded");
    setTimeout(() => {
      if (loader.parentNode) {
        loader.style.display = "none";
      }
    }, 700);
  };

  if (document.readyState === "complete") {
    setTimeout(dismissLoader, 700);
  } else {
    window.addEventListener("load", () => setTimeout(dismissLoader, 600));
    setTimeout(dismissLoader, 1800);
  }
}

function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuBtn.innerHTML = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.innerHTML = "☰";
      menuBtn.setAttribute("aria-label", "Open menu");
    });
  });
}

function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if (!revealElements.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -20px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("revealed"));
  }
}

function initBackToTop() {
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  }, { passive: true });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function handleNewsletter(e) {
  if (e) e.preventDefault();
  const input = document.getElementById("newsletterEmail");
  const msg = document.getElementById("newsletterMsg");
  const btn = document.getElementById("newsletterBtn");

  if (!input || !input.value.trim()) return;

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span>Subscribing...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
  }

  setTimeout(() => {
    if (msg) {
      msg.innerHTML = '<span class="newsletter-success"><i class="fa-solid fa-circle-check"></i> Thank you! Your 15% discount code is <b>PURE15</b>.</span>';
    }
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<span>Subscribed!</span> <i class="fa-solid fa-check"></i>';
      btn.style.background = "#2a6c4b";
    }
    input.value = "";
    showToast("Welcome to the Ritual! 🌿", "Coupon code PURE15 sent to your email.", "coupon");
  }, 600);
}

// Legacy checkout helper maintained for backward compatibility
function placeOrder() {
  handleCheckoutSubmission();
}

// =========================================================
// 14. DOCUMENT INITIALIZATION
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  initStorage();
  initPreloader();
  initMobileMenu();
  initStickyHeader();
  initScrollReveal();
  initBackToTop();
  syncBadges();
  syncWishlistButtons();
  initLiveSearch();

  // Page-specific initializers
  if (document.getElementById("catalogProductGrid")) {
    initCatalogController();
  }
  if (document.getElementById("cartItemsContainer")) {
    renderCartPage();
  }
  if (document.getElementById("checkoutSummaryItems")) {
    renderCheckoutPage();
  }
  if (document.querySelector(".product-section") || document.querySelector(".gallery")) {
    initProductDetailPage();
  }
});
