// ElexMart Main JavaScript Application Logic

// Initial Mock Data
let products = [
    {
        id: 1,
        title: "iPhone 15 Pro Max 256GB - Blue Titanium",
        price: 21999000,
        category: "Smartphone",
        seller: "iBox Official Store",
        location: "Jakarta Selatan",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
        rating: 4.9
    },
    {
        id: 2,
        title: "MacBook Pro M3 Max 16-inch 36GB RAM",
        price: 38499000,
        category: "Laptop",
        seller: "Apple StoreID",
        location: "Surabaya",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
        rating: 5.0
    },
    {
        id: 3,
        title: "Sony PlayStation 5 Slim Digital Edition",
        price: 7299000,
        category: "Gaming",
        seller: "PlayStation Store ID",
        location: "Bandung",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
        rating: 4.8
    },
    {
        id: 4,
        title: "Sony WH-1000XM5 Wireless Noise Canceling",
        price: 4599000,
        category: "Aksesoris",
        seller: "AudioTech Indo",
        location: "Jakarta Barat",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        rating: 4.7
    }
];

let categories = [
    { name: "Semua", icon: "fa-border-all" },
    { name: "Smartphone", icon: "fa-mobile-screen-button" },
    { name: "Laptop", icon: "fa-laptop" },
    { name: "Gaming", icon: "fa-gamepad" },
    { name: "Aksesoris", icon: "fa-headphones" }
];

let currentUser = null;
let cart = [];
let activeCategory = "Semua";

// DOM Ready initialization
document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
    renderProducts();
    checkAuthSession();
});

// Category Rendering
function renderCategories() {
    const container = document.getElementById("categoryContainer");
    if (!container) return;
    
    container.innerHTML = categories.map(cat => `
        <button onclick="filterCategory('${cat.name}')" 
            class="flex items-center space-x-3 p-4 rounded-2xl border transition text-left ${activeCategory === cat.name ? 'bg-electric-600/20 border-electric-500 text-electric-400' : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'}">
            <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-electric-400">
                <i class="fa-solid ${cat.icon}"></i>
            </div>
            <span class="font-semibold text-sm">${cat.name}</span>
        </button>
    `).join('');
}

function filterCategory(catName) {
    activeCategory = catName;
    renderCategories();
    renderProducts();
}

// Product Rendering
function renderProducts() {
    const container = document.getElementById("productList");
    if (!container) return;

    let filtered = activeCategory === "Semua" ? products : products.filter(p => p.category === activeCategory);
    
    const sortVal = document.getElementById("sortFilter")?.value;
    if (sortVal === "price-low") filtered.sort((a,b) => a.price - b.price);
    if (sortVal === "price-high") filtered.sort((a,b) => b.price - a.price);

    if (filtered.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400">Tidak ada produk ditemukan.</div>`;
        return;
    }

    container.innerHTML = filtered.map(prod => `
        <div class="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-electric-500/50 transition duration-300 flex flex-col group">
            <div class="relative h-48 overflow-hidden bg-slate-950">
                <img src="${prod.image}" alt="${prod.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <span class="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-electric-400 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-electric-500/30">
                    ${prod.category}
                </span>
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <div class="flex items-center text-xs text-slate-400 mb-2 space-x-2">
                    <span class="text-amber-400 flex items-center"><i class="fa-solid fa-star text-[10px] mr-1"></i>${prod.rating || 5.0}</span>
                    <span>•</span>
                    <span>${prod.location}</span>
                </div>
                <h3 class="font-bold text-slate-100 text-sm mb-2 line-clamp-2 group-hover:text-electric-400 transition">${prod.title}</h3>
                <p class="text-xs text-slate-400 mb-4">${prod.seller}</p>
                <div class="mt-auto flex items-center justify-between">
                    <span class="text-lg font-extrabold text-electric-400">Rp ${prod.price.toLocaleString('id-ID')}</span>
                    <button onclick="addToCart(${prod.id})" class="p-2.5 bg-electric-600/20 hover:bg-electric-600 text-electric-400 hover:text-white rounded-xl transition">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Modal Toggle Helpers
function openModal(id) {
    document.getElementById(id)?.classList.remove("hidden");
}
function closeModal(id) {
    document.getElementById(id)?.classList.add("hidden");
}
function switchModal(fromId, toId) {
    closeModal(fromId);
    openModal(toId);
}

// Auth Handlers
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    currentUser = {
        name: email.split('@')[0],
        email: email,
        hasStore: false
    };
    localStorage.setItem("elexmart_user", JSON.stringify(currentUser));
    updateAuthUI();
    closeModal("loginModal");
    showToast(`Selamat datang kembali, ${currentUser.name}!`);
    addNotification(`Anda telah masuk sebagai ${currentUser.email}`);
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    currentUser = { name, email, hasStore: false };
    localStorage.setItem("elexmart_user", JSON.stringify(currentUser));
    updateAuthUI();
    closeModal("registerModal");
    showToast(`Akun ElexMart berhasil dibuat!`);
    addNotification(`Selamat datang di ElexMart, ${name}!`);
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem("elexmart_user");
    updateAuthUI();
    showToast("Anda telah keluar dari akun.");
}

function checkAuthSession() {
    const saved = localStorage.getItem("elexmart_user");
    if (saved) {
        currentUser = JSON.parse(saved);
        updateAuthUI();
    }
}

function updateAuthUI() {
    const authSec = document.getElementById("userAuthSection");
    const infoSec = document.getElementById("userInfoSection");
    
    if (currentUser) {
        authSec?.classList.add("hidden");
        infoSec?.classList.remove("hidden");
        document.getElementById("menuUserName").innerText = currentUser.name;
        document.getElementById("menuUserEmail").innerText = currentUser.email;
    } else {
        authSec?.classList.remove("hidden");
        infoSec?.classList.add("hidden");
    }
}

function toggleUserMenu() {
    document.getElementById("userMenuDropdown")?.classList.toggle("hidden");
}

// Store & Sell Products
function handleSellClick() {
    if (!currentUser) {
        openModal("loginModal");
        showToast("Silakan masuk terlebih dahulu!");
        return;
    }
    openModal("sellProductModal");
}

function handleCreateStore(e) {
    e.preventDefault();
    if (!currentUser) return;
    const storeName = document.getElementById("storeName").value;
    currentUser.hasStore = true;
    currentUser.storeName = storeName;
    localStorage.setItem("elexmart_user", JSON.stringify(currentUser));
    closeModal("createStoreModal");
    showToast(`Toko "${storeName}" berhasil diaktifkan!`);
    addNotification(`Toko ${storeName} telah resmi dibuka di ElexMart!`);
}

function handleAddProduct(e) {
    e.preventDefault();
    const newProd = {
        id: Date.now(),
        title: document.getElementById("prodTitle").value,
        price: parseInt(document.getElementById("prodPrice").value),
        category: document.getElementById("prodCategory").value,
        seller: currentUser?.storeName || currentUser?.name || "Penjual ElexMart",
        location: "Indonesia",
        image: document.getElementById("prodImg").value,
        rating: 5.0
    };
    products.unshift(newProd);
    renderProducts();
    closeModal("sellProductModal");
    showToast("Produk Anda berhasil ditayangkan!");
    addNotification(`Produk "${newProd.title}" berhasil dipublikasikan.`);
}

// Cart System
function addToCart(prodId) {
    const prod = products.find(p => p.id === prodId);
    if (!prod) return;
    cart.push(prod);
    updateCartUI();
    showToast(`"${prod.title}" ditambahkan ke keranjang.`);
}

function updateCartUI() {
    document.getElementById("cartCount").innerText = cart.length;
    const cartList = document.getElementById("cartItemsList");
    const totalEl = document.getElementById("cartTotal");
    
    if (!cartList) return;
    
    if (cart.length === 0) {
        cartList.innerHTML = `<p class="text-center py-6 text-slate-400 text-sm">Keranjang masih kosong.</p>`;
        totalEl.innerText = "Rp 0";
        return;
    }

    let total = 0;
    cartList.innerHTML = cart.map((item, idx) => {
        total += item.price;
        return `
            <div class="py-3 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <img src="${item.image}" class="w-12 h-12 rounded-lg object-cover">
                    <div>
                        <h4 class="text-xs font-bold text-white line-clamp-1">${item.title}</h4>
                        <p class="text-xs text-electric-400">Rp ${item.price.toLocaleString('id-ID')}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${idx})" class="text-red-400 hover:text-red-300 text-xs p-1">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    totalEl.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    updateCartUI();
}

function toggleCartModal() {
    updateCartUI();
    openModal("cartModal");
}

function checkoutCart() {
    if (cart.length === 0) return;
    showToast("Pesanan Anda berhasil dibuat!");
    addNotification(`Pesanan senilai ${document.getElementById("cartTotal").innerText} telah diproses.`);
    cart = [];
    updateCartUI();
    closeModal("cartModal");
}

// Notifications
function toggleNotifications() {
    document.getElementById("notifDropdown")?.classList.toggle("hidden");
}

function addNotification(msg) {
    const list = document.getElementById("notifList");
    if (!list) return;
    const item = document.createElement("div");
    item.className = "p-3.5 hover:bg-slate-800/50 transition border-b border-slate-800";
    item.innerHTML = `
        <p class="font-medium text-slate-200">${msg}</p>
        <p class="text-slate-400 text-[11px] mt-1">Baru saja</p>
    `;
    list.prepend(item);
    document.getElementById("notifBadge")?.classList.remove("hidden");
}

function clearNotifs() {
    document.getElementById("notifBadge")?.classList.add("hidden");
}

// Toast
function showToast(msg) {
    const toast = document.getElementById("toast");
    const msgEl = document.getElementById("toastMsg");
    if (!toast || !msgEl) return;
    msgEl.innerText = msg;
    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}

function scrollToProducts() {
    document.getElementById("productsSection")?.scrollIntoView({ behavior: 'smooth' });
}
