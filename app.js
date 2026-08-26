/* ============================================
   Daftar Harga Toko Sembako - App Logic
   Supports: Firebase (online) + localStorage (offline fallback)
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

    // Lainnya (27-30)
    { id: 27, name: 'Sabun Mandi Lifebuoy 80g', price: 4500, stock: 50, unit: 'pcs', category: 'lainnya', emoji: '🧼' },
    { id: 28, name: 'Deterjen Rinso 800g', price: 18000, stock: 35, unit: 'pack', category: 'lainnya', emoji: '🫧' },
    { id: 29, name: 'Shampo Sunsilk 170ml', price: 22000, stock: 25, unit: 'botol', category: 'lainnya', emoji: '🧴' },
    { id: 30, name: 'Pasta Gigi Pepsodent 190g', price: 13000, stock: 40, unit: 'pcs', category: 'lainnya', emoji: '🪥' },

    // Obat & P3K (31-34)
    { id: 31, name: 'Bodrex 1 Strip (4 Kaplet)', price: 5000, stock: 50, unit: 'pcs', category: 'obat', emoji: '💊' },
    { id: 32, name: 'Tolak Angin Cair 1 Sachet', price: 4500, stock: 60, unit: 'pcs', category: 'obat', emoji: '🌿' },
    { id: 33, name: 'Paracetamol 500mg (10 Tab)', price: 6000, stock: 40, unit: 'pack', category: 'obat', emoji: '💊' },
    { id: 34, name: 'Minyak Kayu Putih Cap Lang 60ml', price: 24000, stock: 25, unit: 'botol', category: 'obat', emoji: '🧴' },

    // Rokok (35-38)
    { id: 35, name: 'Sampoerna Mild 16', price: 35000, stock: 30, unit: 'bungkus', category: 'rokok', emoji: '🚬' },
    { id: 36, name: 'Gudang Garam Surya 16', price: 34000, stock: 30, unit: 'bungkus', category: 'rokok', emoji: '🚬' },
    { id: 37, name: 'Djarum Super 12', price: 25000, stock: 25, unit: 'bungkus', category: 'rokok', emoji: '🚬' },
    { id: 38, name: 'Marlboro Filter Black', price: 42000, stock: 20, unit: 'bungkus', category: 'rokok', emoji: '🚬' },

    // Jajanan & Snack (39-42)
    { id: 39, name: 'Chitato Sapi Panggang 68g', price: 11500, stock: 30, unit: 'bungkus', category: 'jajanan', emoji: '🥔' },
    { id: 40, name: 'Taro Net Seaweed 65g', price: 9500, stock: 35, unit: 'bungkus', category: 'jajanan', emoji: '🍿' },
    { id: 41, name: 'Beng-Beng 1 Pack (12pcs)', price: 24000, stock: 20, unit: 'pack', category: 'jajanan', emoji: '🍫' },
    { id: 42, name: 'Biskuit Roma Kelapa 300g', price: 10500, stock: 40, unit: 'bungkus', category: 'jajanan', emoji: '🍪' },

    // Es Krim (43-46)
    { id: 43, name: 'Walls Cornetto Disc Coklat', price: 12000, stock: 20, unit: 'pcs', category: 'eskrim', emoji: '🍦' },
    { id: 44, name: 'Walls Feast Coklat', price: 7000, stock: 25, unit: 'pcs', category: 'eskrim', emoji: '🍦' },
    { id: 45, name: 'Walls Magnum Classic', price: 18000, stock: 15, unit: 'pcs', category: 'eskrim', emoji: '🍨' },
    { id: 46, name: 'Walls Paddle Pop Rainbow', price: 5000, stock: 30, unit: 'pcs', category: 'eskrim', emoji: '🍧' },
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
    obat: 'Obat & P3K',
    rokok: 'Rokok',
    jajanan: 'Jajanan & Snack',
    eskrim: 'Es Krim',
    lainnya: 'Lainnya',
};

const CATEGORY_EMOJIS = {
    beras: '🍚',
    minyak: '🫗',
    gula: '🍬',
    telur: '🥚',
    mie: '🍜',
    minuman: '☕',
    obat: '💊',
    rokok: '🚬',
    jajanan: '🍿',
    eskrim: '🍦',
    lainnya: '📦',
};

// ── State ──────────────────────────────────────
let products = [];
let currentCategory = 'semua';
let searchQuery = '';
let nextId = 100;
let isAdminLoggedIn = false;
let db = null;
let useFirebase = false;
let currentPurchaseProduct = null;

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
const pinModal = document.getElementById('pinModal');
const pinInput = document.getElementById('pinInput');
const pinForm = document.getElementById('pinForm');
const pinClose = document.getElementById('pinClose');
const pinError = document.getElementById('pinError');
const btnLogout = document.getElementById('btnLogout');

// Purchase Modal
const purchaseModal = document.getElementById('purchaseModal');
const purchaseClose = document.getElementById('purchaseClose');
const purchaseEmoji = document.getElementById('purchaseEmoji');
const purchaseProductName = document.getElementById('purchaseProductName');
const purchaseProductCategory = document.getElementById('purchaseProductCategory');
const purchaseUnitPrice = document.getElementById('purchaseUnitPrice');
const purchaseAvailableStock = document.getElementById('purchaseAvailableStock');
const purchaseQty = document.getElementById('purchaseQty');
const purchaseTotalPrice = document.getElementById('purchaseTotalPrice');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const btnConfirmPurchase = document.getElementById('btnConfirmPurchase');

// Stats
const totalProductsEl = document.getElementById('totalProducts');
const totalStockEl = document.getElementById('totalStock');
const availableProductsEl = document.getElementById('availableProducts');
const emptyStockEl = document.getElementById('emptyStock');

// ── Init ───────────────────────────────────────
function init() {
    initFirebase();
    createParticles();
    setupEventListeners();
}

// ── Firebase Init ──────────────────────────────
function initFirebase() {
    const config = typeof APP_CONFIG !== 'undefined' ? APP_CONFIG : null;

    if (config && config.firebase && config.firebase.apiKey && config.firebase.apiKey !== '') {
        try {
            firebase.initializeApp(config.firebase);
            db = firebase.database();
            useFirebase = true;
            console.log('✅ Firebase connected! Data akan tersinkronisasi online.');
            listenToFirebase();
        } catch (err) {
            console.warn('⚠️ Firebase gagal terhubung, menggunakan mode offline:', err.message);
            useFirebase = false;
            loadFromLocalStorage();
        }
    } else {
        console.log('ℹ️ Firebase belum dikonfigurasi. Menggunakan mode offline (localStorage).');
        useFirebase = false;
        loadFromLocalStorage();
    }
}

// ── Firebase Real-time Listener ────────────────
function listenToFirebase() {
    // Listen to products
    db.ref('products').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Check if any default products are missing in database keys
            let hasMissing = false;
            DEFAULT_PRODUCTS.forEach(dp => {
                if (!data[dp.id]) {
                    db.ref('products/' + dp.id).set(dp);
                    hasMissing = true;
                }
            });
            
            if (hasMissing) {
                return; // listener will trigger again with newly synced items
            }

            // Convert object to array
            products = Object.values(data);
            nextId = Math.max(...products.map(p => p.id), 99) + 1;
        } else {
            // First time: seed with defaults
            seedFirebaseDefaults();
            return; // Will be called again after seeding
        }
        renderProducts();
        updateStats();
    }, (error) => {
        console.error('Firebase read error:', error);
        showToast('Gagal membaca data dari server', 'error');
        // Fallback to localStorage
        useFirebase = false;
        loadFromLocalStorage();
    });

    // Listen to lastUpdated
    db.ref('lastUpdated').on('value', (snapshot) => {
        const ts = snapshot.val();
        if (ts) {
            displayLastUpdated(new Date(ts));
        }
    });
}

function seedFirebaseDefaults() {
    const productsObj = {};
    DEFAULT_PRODUCTS.forEach(p => {
        productsObj[p.id] = p;
    });
    db.ref('products').set(productsObj);
    db.ref('lastUpdated').set(new Date().toISOString());
    console.log('🌱 Database telah diisi dengan data default.');
}

// ── Firebase Write Operations ──────────────────
function firebaseSaveProduct(product) {
    if (!useFirebase) return;
    db.ref('products/' + product.id).set(product);
    db.ref('lastUpdated').set(new Date().toISOString());
}

function firebaseDeleteProduct(id) {
    if (!useFirebase) return;
    db.ref('products/' + id).remove();
    db.ref('lastUpdated').set(new Date().toISOString());
}

function firebaseResetToDefaults() {
    if (!useFirebase) return;
    seedFirebaseDefaults();
}

// ── LocalStorage Fallback ──────────────────────
function loadFromLocalStorage() {
    const saved = localStorage.getItem('sembako_products');
    if (saved) {
        products = JSON.parse(saved);
        // Merge any new default items
        DEFAULT_PRODUCTS.forEach(dp => {
            if (!products.some(p => p.id === dp.id || p.name.toLowerCase() === dp.name.toLowerCase())) {
                products.push(dp);
            }
        });
        nextId = Math.max(...products.map(p => p.id), 99) + 1;
    } else {
        products = [...DEFAULT_PRODUCTS];
        nextId = 100;
        saveToLocalStorage();
    }
    renderProducts();
    updateStats();
    updateLastUpdatedFromLocal();
}

function saveToLocalStorage() {
    localStorage.setItem('sembako_products', JSON.stringify(products));
    localStorage.setItem('sembako_last_updated', new Date().toISOString());
    updateLastUpdatedFromLocal();
}

function updateLastUpdatedFromLocal() {
    const saved = localStorage.getItem('sembako_last_updated');
    if (saved) {
        displayLastUpdated(new Date(saved));
    }
}

// ── Display Last Updated ───────────────────────
function displayLastUpdated(date) {
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    lastUpdated.querySelector('span:last-child').textContent =
        'Terakhir diupdate: ' + date.toLocaleDateString('id-ID', options);
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
        const isSoldOut = product.stock === 0;
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
                <button class="btn-buy-product ${isSoldOut ? 'btn-buy-disabled' : ''}" data-id="${product.id}" ${isSoldOut ? 'disabled' : ''}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    ${isSoldOut ? 'Stok Habis' : 'Beli Sekarang'}
                </button>
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
    const current = parseInt(element.textContent.replace(/\./g, '')) || 0;
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

// ── Admin PIN Login ────────────────────────────
function openPinModal() {
    pinModal.classList.add('active');
    pinInput.value = '';
    pinError.style.display = 'none';
    document.body.style.overflow = 'hidden';
    setTimeout(() => pinInput.focus(), 200);
}

function closePinModal() {
    pinModal.classList.remove('active');
    document.body.style.overflow = '';
    pinInput.value = '';
    pinError.style.display = 'none';
}

function verifyPin(e) {
    e.preventDefault();
    const enteredPin = pinInput.value.trim();
    const config = typeof APP_CONFIG !== 'undefined' ? APP_CONFIG : null;
    const correctPin = config ? config.adminPin : '1234';

    if (enteredPin === correctPin) {
        isAdminLoggedIn = true;
        closePinModal();
        openAdmin();
        updateAdminButton();
        showToast('Login admin berhasil!', 'success');
    } else {
        pinError.style.display = 'block';
        pinInput.value = '';
        pinInput.focus();
        // Shake animation
        pinInput.classList.add('shake');
        setTimeout(() => pinInput.classList.remove('shake'), 500);
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    closeAdmin();
    updateAdminButton();
    showToast('Anda telah logout dari admin', 'info');
}

function updateAdminButton() {
    if (isAdminLoggedIn) {
        btnAdmin.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
            <span>Admin</span>`;
        btnLogout.style.display = 'flex';
    } else {
        btnLogout.style.display = 'none';
    }
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

        if (useFirebase) {
            firebaseSaveProduct(product);
        } else {
            saveToLocalStorage();
            renderProducts();
            updateStats();
        }
        showToast(`${product.name} berhasil diupdate!`, 'success');
    }
}

function deleteProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (confirm(`Yakin ingin menghapus "${product.name}"?`)) {
        products = products.filter(p => p.id !== id);

        if (useFirebase) {
            firebaseDeleteProduct(id);
        } else {
            saveToLocalStorage();
            renderProducts();
            updateStats();
        }

        renderAdminList(adminSearch.value);
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

    if (useFirebase) {
        firebaseSaveProduct(newProduct);
    } else {
        saveToLocalStorage();
        renderProducts();
        updateStats();
    }

    addProductForm.reset();
    renderAdminList();
    showToast(`${name} berhasil ditambahkan!`, 'success');
}

// ── Purchase Modal ─────────────────────────────
function openPurchaseModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    currentPurchaseProduct = product;

    purchaseEmoji.textContent = product.emoji || CATEGORY_EMOJIS[product.category] || '📦';
    purchaseProductName.textContent = product.name;
    purchaseProductCategory.textContent = CATEGORY_LABELS[product.category] || product.category;
    purchaseUnitPrice.textContent = formatRupiah(product.price);
    purchaseAvailableStock.textContent = `${product.stock} ${product.unit}`;
    purchaseQty.value = 1;
    purchaseQty.max = product.stock;
    updatePurchaseTotal();

    purchaseModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePurchaseModal() {
    purchaseModal.classList.remove('active');
    document.body.style.overflow = '';
    currentPurchaseProduct = null;
}

function updatePurchaseTotal() {
    if (!currentPurchaseProduct) return;

    let qty = parseInt(purchaseQty.value) || 0;
    if (qty < 1) qty = 1;
    if (qty > currentPurchaseProduct.stock) qty = currentPurchaseProduct.stock;
    purchaseQty.value = qty;

    const total = currentPurchaseProduct.price * qty;
    purchaseTotalPrice.textContent = formatRupiah(total);

    // Update button state
    const btn = document.getElementById('btnConfirmPurchase');
    if (qty > currentPurchaseProduct.stock || qty < 1) {
        btn.disabled = true;
        btn.classList.add('btn-purchase-disabled');
    } else {
        btn.disabled = false;
        btn.classList.remove('btn-purchase-disabled');
    }
}

function confirmPurchase() {
    if (!currentPurchaseProduct) return;

    const qty = parseInt(purchaseQty.value) || 0;
    if (qty < 1 || qty > currentPurchaseProduct.stock) {
        showToast('Jumlah pembelian tidak valid!', 'error');
        return;
    }

    const product = products.find(p => p.id === currentPurchaseProduct.id);
    if (!product) return;

    const totalPrice = product.price * qty;
    product.stock -= qty;

    if (useFirebase) {
        firebaseSaveProduct(product);
    } else {
        saveToLocalStorage();
        renderProducts();
        updateStats();
    }

    closePurchaseModal();
    showToast(`Berhasil membeli ${qty} ${product.unit} ${product.name} — Total: ${formatRupiah(totalPrice)}`, 'success');
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

    // Admin button - check if logged in
    btnAdmin.addEventListener('click', () => {
        if (isAdminLoggedIn) {
            openAdmin();
        } else {
            openPinModal();
        }
    });

    // Logout button
    btnLogout.addEventListener('click', logoutAdmin);

    // PIN modal
    pinForm.addEventListener('submit', verifyPin);
    pinClose.addEventListener('click', closePinModal);
    pinModal.addEventListener('click', (e) => {
        if (e.target === pinModal) closePinModal();
    });

    // Admin modal
    modalClose.addEventListener('click', closeAdmin);
    adminModal.addEventListener('click', (e) => {
        if (e.target === adminModal) closeAdmin();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (purchaseModal.classList.contains('active')) closePurchaseModal();
            else if (pinModal.classList.contains('active')) closePinModal();
            else if (adminModal.classList.contains('active')) closeAdmin();
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

    // Purchase modal events
    productsGrid.addEventListener('click', (e) => {
        const buyBtn = e.target.closest('.btn-buy-product');
        if (buyBtn && !buyBtn.disabled) {
            openPurchaseModal(parseInt(buyBtn.dataset.id));
        }
    });

    purchaseClose.addEventListener('click', closePurchaseModal);
    purchaseModal.addEventListener('click', (e) => {
        if (e.target === purchaseModal) closePurchaseModal();
    });

    qtyMinus.addEventListener('click', () => {
        let val = parseInt(purchaseQty.value) || 1;
        if (val > 1) purchaseQty.value = val - 1;
        updatePurchaseTotal();
    });

    qtyPlus.addEventListener('click', () => {
        let val = parseInt(purchaseQty.value) || 1;
        if (currentPurchaseProduct && val < currentPurchaseProduct.stock) {
            purchaseQty.value = val + 1;
        }
        updatePurchaseTotal();
    });

    purchaseQty.addEventListener('input', updatePurchaseTotal);
    purchaseQty.addEventListener('change', updatePurchaseTotal);

    btnConfirmPurchase.addEventListener('click', confirmPurchase);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Start ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
