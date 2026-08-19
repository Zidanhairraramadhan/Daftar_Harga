/* ============================================
   Daftar Harga Toko Sembako - App Logic
   ============================================ */

// ── Default Products Data ──────────────────────
const DEFAULT_PRODUCTS = [
    // Beras
    { id: 1, name: 'Beras Premium 5kg', price: 72000, stock: 45, unit: 'karung', category: 'beras', emoji: '🍚' },
    { id: 2, name: 'Beras Medium 5kg', price: 58000, stock: 60, unit: 'karung', category: 'beras', emoji: '🍚' },
    { id: 3, name: 'Beras Pandan Wangi 5kg', price: 78000, stock: 30, unit: 'karung', category: 'beras', emoji: '🍚' },
    { id: 4, name: 'Beras Ketan Putih 1kg', price: 22000, stock: 20, unit: 'kg', category: 'beras', emoji: '🍚' },

    // Minyak
    { id: 5, name: 'Minyak Goreng Bimoli 2L', price: 36000, stock: 50, unit: 'botol', category: 'minyak', emoji: '🫗' },
    { id: 6, name: 'Minyak Goreng Tropical 1L', price: 18500, stock: 40, unit: 'botol', category: 'minyak', emoji: '🫗' },
    { id: 7, name: 'Minyak Goreng Curah 1L', price: 15000, stock: 80, unit: 'liter', category: 'minyak', emoji: '🫗' },

    // Gula & Bumbu
    { id: 8, name: 'Gula Pasir 1kg', price: 17500, stock: 55, unit: 'kg', category: 'gula', emoji: '🍬' },
    { id: 9, name: 'Gula Merah 500g', price: 12000, stock: 35, unit: 'pcs', category: 'gula', emoji: '🍬' },
    { id: 10, name: 'Garam Halus 250g', price: 5000, stock: 100, unit: 'bungkus', category: 'gula', emoji: '🧂' },
    { id: 11, name: 'Kecap Manis ABC 275ml', price: 12500, stock: 45, unit: 'botol', category: 'gula', emoji: '🫙' },
    { id: 12, name: 'Saos Sambal ABC 335ml', price: 13000, stock: 30, unit: 'botol', category: 'gula', emoji: '🌶️' },
    { id: 13, name: 'Bumbu Racik Indofood', price: 4500, stock: 70, unit: 'bungkus', category: 'gula', emoji: '🧄' },

    // Telur & Susu
    { id: 14, name: 'Telur Ayam 1kg', price: 28000, stock: 40, unit: 'kg', category: 'telur', emoji: '🥚' },
    { id: 15, name: 'Susu Indomilk UHT 1L', price: 17000, stock: 35, unit: 'botol', category: 'telur', emoji: '🥛' },
    { id: 16, name: 'Susu Kental Manis Frisian', price: 11000, stock: 50, unit: 'pcs', category: 'telur', emoji: '🥛' },
    { id: 17, name: 'Keju Kraft Singles 10pcs', price: 22000, stock: 15, unit: 'pack', category: 'telur', emoji: '🧀' },

    // Mie & Tepung
    { id: 18, name: 'Indomie Goreng 5pcs', price: 14000, stock: 100, unit: 'pack', category: 'mie', emoji: '🍜' },
    { id: 19, name: 'Indomie Kuah Soto 5pcs', price: 13500, stock: 80, unit: 'pack', category: 'mie', emoji: '🍜' },
    { id: 20, name: 'Tepung Terigu Segitiga 1kg', price: 13000, stock: 40, unit: 'kg', category: 'mie', emoji: '🌾' },
    { id: 21, name: 'Tepung Beras Rose Brand', price: 9000, stock: 30, unit: 'pcs', category: 'mie', emoji: '🌾' },
    { id: 22, name: 'Mie Sedaap Goreng 5pcs', price: 13500, stock: 65, unit: 'pack', category: 'mie', emoji: '🍜' },

    // Minuman
    { id: 23, name: 'Teh Sariwangi 50 bags', price: 11500, stock: 30, unit: 'pack', category: 'minuman', emoji: '🍵' },
    { id: 24, name: 'Kopi Kapal Api 165g', price: 14000, stock: 25, unit: 'bungkus', category: 'minuman', emoji: '☕' },
    { id: 25, name: 'Aqua 600ml', price: 4000, stock: 120, unit: 'botol', category: 'minuman', emoji: '💧' },
    { id: 26, name: 'Teh Botol Sosro 450ml', price: 5000, stock: 60, unit: 'botol', category: 'minuman', emoji: '🧃' },

    // Lainnya
    { id: 27, name: 'Sabun Mandi Lifebuoy 80g', price: 4500, stock: 50, unit: 'pcs', category: 'lainnya', emoji: '🧼' },
    { id: 28, name: 'Deterjen Rinso 800g', price: 18000, stock: 35, unit: 'pack', category: 'lainnya', emoji: '🫧' },
    { id: 29, name: 'Shampo Sunsilk 170ml', price: 22000, stock: 25, unit: 'botol', category: 'lainnya', emoji: '🧴' },
    { id: 30, name: 'Pasta Gigi Pepsodent 190g', price: 13000, stock: 40, unit: 'pcs', category: 'lainnya', emoji: '🪥' },
];

// ── Category Labels ────────────────────────────
const CATEGORY_LABELS = {
    semua: 'Semua Produk',
    beras: 'Beras',
    minyak: 'Minyak',
    gula: 'Gula & Bumbu',
    telur: 'Telur & Susu',
    mie: 'Mie & Tepung',
    minuman: 'Minuman',
    lainnya: 'Lainnya',
};

const CATEGORY_EMOJIS = {
    beras: '🍚',
    minyak: '🫗',
    gula: '🍬',
    telur: '🥚',
    mie: '🍜',
    minuman: '☕',
    lainnya: '📦',
};

// ── State ──────────────────────────────────────
let products = [];
let currentCategory = 'semua';
let searchQuery = '';
let nextId = 100;

// ── DOM Elements ───────────────────────────────
const productsGrid = document.getElementById('productsGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const filterTabs = document.getElementById('filterTabs');
const categoryTitle = document.getElementById('categoryTitle');
const productCount = document.getElementById('productCount');
const adminModal = document.getElementById('adminModal');
const btnAdmin = document.getElementById('btnAdmin');
const modalClose = document.getElementById('modalClose');
const adminProductList = document.getElementById('adminProductList');
const adminSearch = document.getElementById('adminSearch');
const addProductForm = document.getElementById('addProductForm');
const toastContainer = document.getElementById('toastContainer');
const lastUpdated = document.getElementById('lastUpdated');

// Stats
const totalProductsEl = document.getElementById('totalProducts');
const totalStockEl = document.getElementById('totalStock');
const availableProductsEl = document.getElementById('availableProducts');
const emptyStockEl = document.getElementById('emptyStock');

// ── Init ───────────────────────────────────────
function init() {
    loadProducts();
    createParticles();
    renderProducts();
    updateStats();
    updateLastUpdated();
    setupEventListeners();
}

// ── Data Management ────────────────────────────
function loadProducts() {
    const saved = localStorage.getItem('sembako_products');
    if (saved) {
        products = JSON.parse(saved);
        nextId = Math.max(...products.map(p => p.id), 99) + 1;
    } else {
        products = [...DEFAULT_PRODUCTS];
        nextId = 100;
        saveProducts();
    }
}

function saveProducts() {
    localStorage.setItem('sembako_products', JSON.stringify(products));
    localStorage.setItem('sembako_last_updated', new Date().toISOString());
    updateLastUpdated();
}

function updateLastUpdated() {
    const saved = localStorage.getItem('sembako_last_updated');
    if (saved) {
        const date = new Date(saved);
        const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        lastUpdated.querySelector('span:last-child').textContent =
            'Terakhir diupdate: ' + date.toLocaleDateString('id-ID', options);
    }
}

// ── Render Products ────────────────────────────
function renderProducts() {
    let filtered = [...products];

    // Category filter
    if (currentCategory !== 'semua') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    // Search filter
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(q) ||
            CATEGORY_LABELS[p.category]?.toLowerCase().includes(q)
        );
    }

    // Update header
    categoryTitle.textContent = CATEGORY_LABELS[currentCategory] || 'Semua Produk';
    productCount.textContent = `${filtered.length} produk`;

    // Toggle empty state
    if (filtered.length === 0) {
        productsGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    productsGrid.style.display = 'grid';
    emptyState.style.display = 'none';

    // Build cards
    productsGrid.innerHTML = filtered.map((product, index) => {
        const stockStatus = getStockStatus(product.stock);
        return `
            <div class="product-card" style="animation-delay: ${index * 0.04}s">
                <div class="product-card-top">
                    <div class="product-emoji">${product.emoji || CATEGORY_EMOJIS[product.category] || '📦'}</div>
                    <span class="product-badge ${stockStatus.class}">${stockStatus.label}</span>
                </div>
                <div class="product-name">${escapeHTML(product.name)}</div>
                <div class="product-category">${CATEGORY_LABELS[product.category] || product.category}</div>
                <div class="product-details">
                    <div class="product-price">
                        <span class="price-label">Harga</span>
                        <span class="price-value">${formatRupiah(product.price)}</span>
                    </div>
                    <div class="product-stock">
                        <span class="stock-label">Stok</span>
                        <span class="stock-value">${product.stock} <span class="stock-unit">${product.unit}</span></span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function getStockStatus(stock) {
    if (stock === 0) return { label: 'Habis', class: 'badge-empty' };
    if (stock <= 10) return { label: 'Stok Sedikit', class: 'badge-low' };
    return { label: 'Tersedia', class: 'badge-available' };
}

function formatRupiah(num) {
    return 'Rp ' + num.toLocaleString('id-ID');
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ── Update Stats ───────────────────────────────
function updateStats() {
    const total = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const available = products.filter(p => p.stock > 0).length;
    const empty = products.filter(p => p.stock === 0).length;

    animateNumber(totalProductsEl, total);
    animateNumber(totalStockEl, totalStock);
    animateNumber(availableProductsEl, available);
    animateNumber(emptyStockEl, empty);
}

function animateNumber(element, target) {
    const current = parseInt(element.textContent) || 0;
    const diff = target - current;
    if (diff === 0) return;

    const duration = 500;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(current + diff * eased).toLocaleString('id-ID');
        if (step >= steps) {
            clearInterval(timer);
            element.textContent = target.toLocaleString('id-ID');
        }
    }, stepTime);
}

// ── Admin Panel ────────────────────────────────
function renderAdminList(filter = '') {
    let list = [...products];
    if (filter) {
        const q = filter.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(q));
    }

    adminProductList.innerHTML = list.map(product => `
        <div class="admin-product-item" data-id="${product.id}">
            <div class="admin-item-header">
                <span class="admin-item-name">${product.emoji || ''} ${escapeHTML(product.name)}</span>
                <span class="admin-item-category">${CATEGORY_LABELS[product.category] || product.category}</span>
            </div>
            <div class="admin-item-fields">
                <div class="admin-field">
                    <label>Harga (Rp)</label>
                    <input type="number" class="admin-price" value="${product.price}" min="0" data-id="${product.id}">
                </div>
                <div class="admin-field">
                    <label>Stok (${product.unit})</label>
                    <input type="number" class="admin-stock" value="${product.stock}" min="0" data-id="${product.id}">
                </div>
                <div class="admin-item-actions">
                    <button class="btn-save-item" data-id="${product.id}" title="Simpan">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    </button>
                    <button class="btn-delete-item" data-id="${product.id}" title="Hapus">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openAdmin() {
    adminModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderAdminList();
}

function closeAdmin() {
    adminModal.classList.remove('active');
    document.body.style.overflow = '';
}

function saveProductUpdate(id) {
    const item = adminProductList.querySelector(`.admin-product-item[data-id="${id}"]`);
    if (!item) return;

    const priceInput = item.querySelector('.admin-price');
    const stockInput = item.querySelector('.admin-stock');
    const newPrice = parseInt(priceInput.value);
    const newStock = parseInt(stockInput.value);

    if (isNaN(newPrice) || newPrice < 0) {
        showToast('Harga tidak valid!', 'error');
        return;
    }
    if (isNaN(newStock) || newStock < 0) {
        showToast('Stok tidak valid!', 'error');
        return;
    }

    const product = products.find(p => p.id === id);
    if (product) {
        product.price = newPrice;
        product.stock = newStock;
        saveProducts();
        renderProducts();
        updateStats();
        showToast(`${product.name} berhasil diupdate!`, 'success');
    }
}

function deleteProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (confirm(`Yakin ingin menghapus "${product.name}"?`)) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        renderProducts();
        renderAdminList(adminSearch.value);
        updateStats();
        showToast(`${product.name} telah dihapus`, 'info');
    }
}

function addProduct(e) {
    e.preventDefault();

    const name = document.getElementById('productName').value.trim();
    const price = parseInt(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const unit = document.getElementById('productUnit').value;
    const category = document.getElementById('productCategory').value;

    if (!name) {
        showToast('Nama produk harus diisi!', 'error');
        return;
    }
    if (isNaN(price) || price < 0) {
        showToast('Harga tidak valid!', 'error');
        return;
    }
    if (isNaN(stock) || stock < 0) {
        showToast('Stok tidak valid!', 'error');
        return;
    }

    const newProduct = {
        id: nextId++,
        name,
        price,
        stock,
        unit,
        category,
        emoji: CATEGORY_EMOJIS[category] || '📦',
    };

    products.push(newProduct);
    saveProducts();
    renderProducts();
    updateStats();
    addProductForm.reset();
    showToast(`${name} berhasil ditambahkan!`, 'success');

    // Switch to edit tab to show the result
    renderAdminList();
}

// ── Toast Notification ─────────────────────────
function showToast(message, type = 'info') {
    const icons = {
        success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        error: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fb7185" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ── Particles ──────────────────────────────────
function createParticles() {
    const container = document.getElementById('particles');
    const count = 25;
    const colors = [
        'rgba(99, 102, 241, 0.3)',
        'rgba(139, 92, 246, 0.25)',
        'rgba(6, 182, 212, 0.2)',
        'rgba(52, 211, 153, 0.2)',
    ];

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// ── Event Listeners ────────────────────────────
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        searchClear.style.display = searchQuery ? 'flex' : 'none';
        renderProducts();
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        searchClear.style.display = 'none';
        searchInput.focus();
        renderProducts();
    });

    // Category filter
    filterTabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.filter-tab');
        if (!tab) return;
        filterTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.dataset.category;
        renderProducts();
    });

    // Admin modal
    btnAdmin.addEventListener('click', openAdmin);
    modalClose.addEventListener('click', closeAdmin);
    adminModal.addEventListener('click', (e) => {
        if (e.target === adminModal) closeAdmin();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && adminModal.classList.contains('active')) {
            closeAdmin();
        }
    });

    // Admin tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab' + capitalize(tab.dataset.tab)).classList.add('active');
        });
    });

    // Admin search
    adminSearch.addEventListener('input', (e) => {
        renderAdminList(e.target.value);
    });

    // Admin product actions (delegated)
    adminProductList.addEventListener('click', (e) => {
        const saveBtn = e.target.closest('.btn-save-item');
        const deleteBtn = e.target.closest('.btn-delete-item');

        if (saveBtn) {
            saveProductUpdate(parseInt(saveBtn.dataset.id));
        }
        if (deleteBtn) {
            deleteProduct(parseInt(deleteBtn.dataset.id));
        }
    });

    // Add product form
    addProductForm.addEventListener('submit', addProduct);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Start ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
