// ======================= No Internet =======================
const noInternet = document.querySelector('.noInternet');

function toggleNoInternet() {
    if (!noInternet) return;
    noInternet.style.display = navigator.onLine ? 'none' : 'block';
}

window.addEventListener("load", toggleNoInternet);
window.addEventListener("online", toggleNoInternet);
window.addEventListener("offline", toggleNoInternet);

// ======================= Products =======================
const allProducts = document.querySelector(".products");
const buyProudect = document.querySelector(".buyProudect");
const totalPriceEl = document.querySelector(".total .totalPrice");
const badge = document.querySelector(".badge");
const shoppingCartIcon = document.querySelector(".shoppingCart");
const cartsProudect = document.querySelector(".cartsProudect");

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

let cart = JSON.parse(localStorage.getItem("proudectInCart")) || [];
let total = +localStorage.getItem("totalPrice") || 0;

// ---------- Render Products ----------
function renderProducts(productsArray) {
    if (!allProducts) return;
    allProducts.innerHTML = productsArray.map(item => {
        const inCart = cart.some(p => p.id === item.id);
        const heartClass = checkFavorite(item.id) ? "fas" : "far";
        const addDisplay = inCart ? "none" : "inline-block";
        const removeDisplay = inCart ? "inline-block" : "none";
        const height = item.category === 'phone' ? '330px' : item.category === 'smart watch' ? '240px' : '200px';

        return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card h-100 border-info p-2 d-flex flex-column">
                <img src="${item.imageURL}" class="card-img-top mx-auto" style="width: 80%; height: ${height}; object-fit: contain;" alt="${item.title}" loading="lazy">
                <div class="card-body">
                    <p class="card-title font-weight-bold">${item.title}</p>
                    <p>Category: ${item.category}</p>
                    <p>Color: ${item.color}</p>
                    <p>Price: <del>${item.price}</del> <span class="text-primary">${item.salePrice}</span></p>
                </div>
                <div class="d-flex justify-content-between p-2 align-items-center mt-auto">
                    <button id="add-btn-${item.id}" class="btn btn-primary btn-sm" style="display:${addDisplay}" onclick="addToCart(${item.id})">Add To Cart</button>
                    <button id="remove-btn-${item.id}" class="btn btn-secondary btn-sm" style="display:${removeDisplay}" onclick="removeFromCart(${item.id})">Remove</button>
                    <i id="fav-${item.id}" class="${heartClass} fa-heart" style="cursor:pointer" onclick="toggleFavorite(${item.id})"></i>
                </div>
            </div>
        </div>`;
    }).join('');
}

renderProducts(products);

// ======================= Cart Functions =======================
function drawCartItem(item) {
    if (!buyProudect || document.getElementById(`buyProudectItem-${item.id}`)) return;
    const qty = +localStorage.getItem(`quantity-${item.id}`) || 1;
    buyProudect.innerHTML += `
        <div id="buyProudectItem-${item.id}" class="row my-2 align-items-center">
            <span class="col-6">${item.title}</span>
            <span class="col-2" id="quantity-${item.id}">${qty}</span>
            <span class="text-danger col-2" style="cursor:pointer" onclick="updateQty(${item.id}, -1)">-</span>
            <span class="text-success col-2" style="cursor:pointer" onclick="updateQty(${item.id}, 1)">+</span>
        </div>`;
}

function addToCart(id) {
    if (!localStorage.getItem("userName")) return window.location = "login.html";
    const item = products.find(p => p.id === id);
    if (!cart.some(p => p.id === id)) {
        cart.push(item);
        localStorage.setItem("proudectInCart", JSON.stringify(cart));
        drawCartItem(item);
        document.getElementById(`add-btn-${id}`).style.display = "none";
        document.getElementById(`remove-btn-${id}`).style.display = "inline-block";
        recalcTotal();
        updateBadge();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("proudectInCart", JSON.stringify(cart));
    document.getElementById(`buyProudectItem-${id}`)?.remove();
    document.getElementById(`add-btn-${id}`).style.display = "inline-block";
    document.getElementById(`remove-btn-${id}`).style.display = "none";
    recalcTotal();
    updateBadge();
}

function updateQty(id, change) {
    const qtyEl = document.getElementById(`quantity-${id}`);
    if (!qtyEl) return;
    let qty = +qtyEl.innerText + change;
    if (qty < 1) return removeFromCart(id);
    qtyEl.innerText = qty;
    localStorage.setItem(`quantity-${id}`, qty);
    recalcTotal();
}

function recalcTotal() {
    total = cart.reduce((sum, item) => {
        const qty = +localStorage.getItem(`quantity-${item.id}`) || 1;
        return sum + item.salePrice * qty;
    }, 0);
    if (totalPriceEl) totalPriceEl.innerText = total + " EGP";
    localStorage.setItem("totalPrice", total);
}

function updateBadge() {
    if (!badge) return;
    badge.style.display = cart.length ? "block" : "none";
    badge.innerText = cart.length;
}

// Initialize cart UI
cart.forEach(drawCartItem);
recalcTotal();
updateBadge();

if (shoppingCartIcon) {
    shoppingCartIcon.addEventListener("click", () => {
        if (!cartsProudect) return;
        cartsProudect.style.display = cartsProudect.style.display === "block" ? "none" : "block";
    });
}

// ======================= Favorites Functions =======================
function checkFavorite(id) {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    return favs.includes(id);
}

function toggleFavorite(id) {
    if (!localStorage.getItem("userName")) return window.location = "login.html";
    const heart = document.getElementById(`fav-${id}`);
    if (!heart) return;
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    if (heart.classList.contains("far")) {
        heart.classList.replace("far", "fas");
        if (!favs.includes(id)) favs.push(id);
    } else {
        heart.classList.replace("fas", "far");
        const index = favs.indexOf(id);
        if (index > -1) favs.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
}

// ======================= Search =======================
const search = document.getElementById('search');
const searchOption = document.getElementById('searchOption');
let mode = 'title';

searchOption?.addEventListener('change', function() {
    mode = this.value === "searchCategory" ? "category" : "title";
    if (search) search.placeholder = `Search by ${mode}`;
    renderProducts(products);
});

search?.addEventListener('input', function() {
    const value = this.value.toLowerCase().trim();
    renderProducts(products.filter(item => item[mode].toLowerCase().includes(value)));
});
