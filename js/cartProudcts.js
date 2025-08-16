document.addEventListener("DOMContentLoaded", function () {
  let proudectInCart = JSON.parse(localStorage.getItem("proudectInCart")) || [];
  let allProductsContainer = document.querySelector(".products");
  let totalPriceEl = document.querySelector(".total .totalPrice");

  let products = [
    { id: 1, title: "Dell G15-5520", category: "Labtop", color: "Black", price: "36870", salePrice: "36270", imageURL: "images/Labtop1.jpg" },
    { id: 2, title: "Lenovo V15", category: "Labtop", color: "gray", price: "13333", salePrice: "13011", imageURL: "images/Labtop2.jpg" },
    { id: 3, title: "HP Victus", category: "Labtop", color: "Black", price: "47699", salePrice: "47438", imageURL: "images/Labtop3.jpg" },
    { id: 4, title: "Dell Vostro", category: "Labtop", color: "Black", price: "29660", salePrice: "29320", imageURL: "images/Labtop4.jpg" },
    { id: 5, title: "R50i", category: "Earbuds", color: "Black", price: "1699", salePrice: "1399", imageURL: "images/Earbuds1.jpg" },
    { id: 6, title: "R100", category: "Earbuds", color: "White", price: "1600", salePrice: "1499", imageURL: "images/Earbuds.jpg" },
    { id: 7, title: "Life P2", category: "Earbuds", color: "Black", price: "2899", salePrice: "2699", imageURL: "images/Earbuds3.jpg" },
    { id: 8, title: "Life Note E", category: "Earbuds", color: "Black", price: "2485", salePrice: "1600", imageURL: "images/Earbuds4.jpg" },
    { id: 9, title: "Generic", category: "Over Ear", color: "Blue", price: "215", salePrice: "185", imageURL: "images/Over Ear1.jpg" },
    { id: 10, title: "Panduo", category: "smart watch", color: "Green", price: "450", salePrice: "375", imageURL: "images/smartwatch1.jpg" },
    { id: 11, title: "Muktrics", category: "smart watch", color: "Black", price: "400", salePrice: "350", imageURL: "images/smartwatch2.jpg" },
    { id: 12, title: "BigPlayer", category: "smart watch", color: "Brown", price: "730", salePrice: "650", imageURL: "images/smartwatch3.jpg" },
    { id: 13, title: "Samsung Galaxy A34", category: "phone", color: "Awesome Silver", price: "11286", salePrice: "10400", imageURL: "images/phone1.jpg" },
    { id: 14, title: "A24", category: "phone", color: "Black", price: "49900", salePrice: "38090", imageURL: "images/phone2.jpg" },
    { id: 15, title: "Oppo Reno 8T", category: "phone", color: "Gray", price: "12793", salePrice: "12445", imageURL: "images/phone3.jpg" },
    { id: 16, title: "Galaxy S22", category: "phone", color: "Green", price: "24299", salePrice: "24899", imageURL: "images/phone4.jpg" },
    { id: 17, title: "Galaxy S22 Ultra", category: "phone", color: "Phantom Black", price: "32800", salePrice: "33400", imageURL: "images/phone5.jpg" },
    { id: 18, title: "Galaxy S21", category: "phone", color: "Light Green", price: "21990", salePrice: "19299", imageURL: "images/phone6.jpg" },
    { id: 19, title: "Galaxy Z Fold5", category: "phone", color: "Light blue", price: "73930", salePrice: "66000", imageURL: "images/phone7.jpg" },
  ];

  // ===================================
  // ====== Shopping Cart Section ======
  // ===================================
  function drawProudectCart(cartItems) {
    if (!allProductsContainer) return;
    if (cartItems.length === 0) {
      allProductsContainer.innerHTML = '<p class="text-center col-12">Your shopping cart is empty.</p>';
      updateTotalPrice();
      return;
    }
    let cartHTML = cartItems.map((item) => {
      let quantity = +(localStorage.getItem(`quantity-${item.id}`)) || 1;
      return `
        <div id="product-${item.id}" class="product-item col-12 col-lg-6 mb-4">
            <div class="card h-100 border-primary shadow-sm">
                <div class="row g-0">
                    <div class="col-md-4 d-flex align-items-center p-2">
                        <img src="${item.imageURL}" class="img-fluid rounded" alt="${item.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body d-flex flex-column h-100">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text mb-1">Category: ${item.category}</p>
                            <p class="card-text mb-2">Price: <span class="fw-bold">${item.salePrice} EGP</span></p>
                            <div class="mt-auto d-flex justify-content-between align-items-center">
                                <button class="btn btn-outline-danger btn-sm" onclick="window.removeFromCart(${item.id})">Remove</button>
                                <div class="d-flex align-items-center border rounded">
                                    <button class="btn btn-ghost text-danger fw-bold" onclick="window.updateQuantity(${item.id}, -1)">-</button>
                                    <span id="quantity-${item.id}" class="mx-2 fw-bold fs-5">${quantity}</span>
                                    <button class="btn btn-ghost text-success fw-bold" onclick="window.updateQuantity(${item.id}, 1)">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');
    allProductsContainer.innerHTML = cartHTML;
    updateTotalPrice();
  }
  window.updateQuantity = function (id, change) {
    let quantityEl = document.getElementById(`quantity-${id}`);
    let currentQuantity = parseInt(quantityEl.innerHTML);
    let newQuantity = currentQuantity + change;
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      quantityEl.innerHTML = newQuantity;
      localStorage.setItem(`quantity-${id}`, newQuantity.toString());
      updateTotalPrice();
    }
  }
  window.removeFromCart = function(id) {
    let cartItems = JSON.parse(localStorage.getItem("proudectInCart")) || [];
    let updatedCart = cartItems.filter(item => item.id !== id);
    localStorage.setItem("proudectInCart", JSON.stringify(updatedCart));
    localStorage.removeItem(`quantity-${id}`);
    drawProudectCart(updatedCart);
  }
  function updateTotalPrice() {
    if (!totalPriceEl) return;
    let cartItems = JSON.parse(localStorage.getItem("proudectInCart")) || [];
    let total = 0;
    cartItems.forEach(item => {
      let quantity = +(localStorage.getItem(`quantity-${item.id}`)) || 1;
      total += item.salePrice * quantity;
    });
    totalPriceEl.innerHTML = total;
    localStorage.setItem("totalPrice", total);
  }

  // ===================================
  // ====== Favorites Section (Slider) =====
  // ===================================

  // -- FUNCTION MODIFIED FOR BETTER RESPONSIVENESS --
  function drawFavData() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const carouselInner = document.querySelector('#favoritesCarousel .carousel-inner');
    const carouselIndicators = document.querySelector('#favoritesCarousel .carousel-indicators');

    if (!carouselInner || !carouselIndicators) return;

    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';

    if (favorites.length === 0) {
      carouselInner.innerHTML = '<p class="text-center">Your favorites list is empty.</p>';
      return;
    }

    const favoriteProducts = favorites.map(id => products.find(p => p.id === id)).filter(p => p);

    let slidesHTML = '';
    let indicatorsHTML = '';

    favoriteProducts.forEach((item, index) => {
        const isActive = index === 0 ? 'active' : '';

        // Create an indicator for each item
        indicatorsHTML += `<button type="button" data-bs-target="#favoritesCarousel" data-bs-slide-to="${index}" class="${isActive}" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
        
        // Create a carousel item for each product
        slidesHTML += `
            <div class="carousel-item ${isActive}">
                <div class="row justify-content-center">
                    <div class="col-10 col-md-8 col-lg-6">
                        <div class="card h-100 shadow-sm">
                            <img src="${item.imageURL}" class="card-img-top favorite-img" alt="${item.title}">
                            <div class="card-body d-flex flex-column text-center">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text text-muted">${item.category}</p>
                                <div class="mt-auto">
                                    <i id="fav-${item.id}" class="fas fa-heart text-danger fav-btn fs-4" onclick="window.removeFromFavorites(${item.id})"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    carouselInner.innerHTML = slidesHTML;
    carouselIndicators.innerHTML = indicatorsHTML;
  }
  
  window.removeFromFavorites = function(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let updatedFavorites = favorites.filter(favId => favId !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    drawFavData();
  }

  // ===================================
  // ====== Initial Load ======
  // ===================================
  drawProudectCart(proudectInCart);
  drawFavData();
});
