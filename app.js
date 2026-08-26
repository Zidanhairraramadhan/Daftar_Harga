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
let cart = []; // { productId, qty }

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

// Cart
const btnHeaderCart = document.getElementById('btnHeaderCart');
const headerCartBadge = document.getElementById('headerCartBadge');
const floatingCartBtn = document.getElementById('floatingCartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartModal = document.getElementById('cartModal');
const cartClose = document.getElementById('cartClose');
const cartHeaderCount = document.getElementById('cartHeaderCount');
const cartItemsList = document.getElementById('cartItemsList');
const cartEmpty = document.getElementById('cartEmpty');
const cartSummary = document.getElementById('cartSummary');
const cartTotalTypes = document.getElementById('cartTotalTypes');
const cartTotalItems = document.getElementById('cartTotalItems');
const cartGrandTotal = document.getElementById('cartGrandTotal');
const btnProcessCart = document.getElementById('btnProcessCart');
const btnClearCart = document.getElementById('btnClearCart');

// Quick Add Popup
const quickAddOverlay = document.getElementById('quickAddOverlay');
const quickAddEmoji = document.getElementById('quickAddEmoji');
const quickAddName = document.getElementById('quickAddName');
const quickAddPrice = document.getElementById('quickAddPrice');
const quickAddStock = document.getElementById('quickAddStock');
const quickAddQty = document.getElementById('quickAddQty');
const quickAddMinus = document.getElementById('quickAddMinus');
const quickAddPlus = document.getElementById('quickAddPlus');
const quickAddSubtotal = document.getElementById('quickAddSubtotal');
const quickAddCancel = document.getElementById('quickAddCancel');
const quickAddConfirm = document.getElementById('quickAddConfirm');
let quickAddProductId = null;

// Cash Calculator
const cartCashPaid = document.getElementById('cartCashPaid');
const calcChips = document.getElementById('calcChips');
const chipExact = document.getElementById('chipExact');
const calcResultRow = document.getElementById('calcResultRow');
const calcResultLabel = document.getElementById('calcResultLabel');
const calcChangeValue = document.getElementById('calcChangeValue');
let currentGrandTotal = 0;

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
        const cartItem = cart.find(c => c.productId === product.id);
        const inCartBadge = cartItem ? `<span class="product-in-cart-tag">🛒 ${cartItem.qty} di keranjang</span>` : '';

        return `
            <div class="product-card" style="animation-delay: ${index * 0.04}s">
                <div class="product-card-top">
                    <div class="product-emoji">${product.emoji || CATEGORY_EMOJIS[product.category] || '📦'}</div>
                    <div class="product-badges">
                        ${inCartBadge}
                        <span class="product-badge ${stockStatus.class}">${stockStatus.label}</span>
                    </div>
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
                <button class="btn-buy-product ${isSoldOut ? 'btn-buy-disabled' : ''} ${cartItem ? 'btn-has-cart' : ''}" data-id="${product.id}" ${isSoldOut ? 'disabled' : ''}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    ${isSoldOut ? 'Stok Habis' : (cartItem ? `Tambah Lagi (${cartItem.qty} di keranjang)` : 'Tambah ke Keranjang')}
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

// ── Cart System ────────────────────────────────

// Quick Add Popup — tampil saat klik "Tambah ke Keranjang"
function openQuickAdd(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    quickAddProductId = productId;
    quickAddEmoji.textContent = product.emoji || CATEGORY_EMOJIS[product.category] || '📦';
    quickAddName.textContent = product.name;
    quickAddPrice.textContent = `${formatRupiah(product.price)} / ${product.unit}`;
    
    const existing = cart.find(c => c.productId === productId);
    const existingText = existing ? ` (sudah ada ${existing.qty} di keranjang)` : '';
    quickAddStock.textContent = `${product.stock} ${product.unit}${existingText}`;
    
    quickAddQty.value = 1;
    quickAddQty.max = product.stock - (existing ? existing.qty : 0);
    if (quickAddQty.max <= 0) {
        showToast(`Semua stok ${product.name} sudah ada di keranjang!`, 'info');
        return;
    }

    updateQuickAddSubtotal();
    quickAddOverlay.classList.add('active');
    setTimeout(() => {
        quickAddQty.focus();
        quickAddQty.select();
    }, 150);
}

function closeQuickAdd() {
    quickAddOverlay.classList.remove('active');
    quickAddProductId = null;
}

function adjustQuickAddQty(delta) {
    if (!quickAddProductId) return;
    const product = products.find(p => p.id === quickAddProductId);
    if (!product) return;

    const existing = cart.find(c => c.productId === quickAddProductId);
    const maxAllowed = product.stock - (existing ? existing.qty : 0);

    let currentVal = parseInt(quickAddQty.value) || 0;
    let newVal = currentVal + delta;
    if (newVal < 1) newVal = 1;
    if (newVal > maxAllowed) newVal = maxAllowed;

    quickAddQty.value = newVal;
    updateQuickAddSubtotal();
}

function addQuickAddQty(addValue) {
    if (!quickAddProductId) return;
    const product = products.find(p => p.id === quickAddProductId);
    if (!product) return;

    const existing = cart.find(c => c.productId === quickAddProductId);
    const maxAllowed = product.stock - (existing ? existing.qty : 0);

    let currentVal = parseInt(quickAddQty.value) || 0;
    let newVal = currentVal + addValue;
    if (newVal > maxAllowed) newVal = maxAllowed;

    quickAddQty.value = newVal;
    updateQuickAddSubtotal();
}

function updateQuickAddSubtotal() {
    if (!quickAddProductId) return;
    const product = products.find(p => p.id === quickAddProductId);
    if (!product) return;

    let qty = parseInt(quickAddQty.value) || 0;
    if (qty < 1) qty = 1;
    if (qty > product.stock) qty = product.stock;

    const subtotal = product.price * qty;
    quickAddSubtotal.textContent = formatRupiah(subtotal);
}

function confirmQuickAdd() {
    if (!quickAddProductId) return;
    const product = products.find(p => p.id === quickAddProductId);
    if (!product) return;

    let qty = parseInt(quickAddQty.value) || 0;
    if (qty < 1) {
        showToast('Jumlah minimal 1!', 'error');
        return;
    }
    if (qty > product.stock) {
        showToast(`Stok ${product.name} hanya ${product.stock} ${product.unit}!`, 'error');
        return;
    }

    // Cek apakah produk sudah ada di keranjang
    const existing = cart.find(c => c.productId === quickAddProductId);
    if (existing) {
        const newQty = existing.qty + qty;
        if (newQty > product.stock) {
            showToast(`Total melebihi stok! (sudah ada ${existing.qty} di keranjang, sisa stok: ${product.stock - existing.qty})`, 'error');
            return;
        }
        existing.qty = newQty;
    } else {
        cart.push({ productId: quickAddProductId, qty });
    }

    closeQuickAdd();
    updateCartBadge();
    renderProducts(); // Refresh card badge
    if (cartModal.classList.contains('active')) {
        renderCartItems();
    }
    showToast(`✓ Ditambahkan: ${qty} ${product.unit} ${product.name}`, 'success');
}

function updateCartBadge() {
    const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
    if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = 'flex';
        floatingCartBtn.classList.add('has-items');

        if (headerCartBadge) {
            headerCartBadge.textContent = totalItems;
            headerCartBadge.style.display = 'inline-flex';
        }
    } else {
        cartBadge.style.display = 'none';
        floatingCartBtn.classList.remove('has-items');

        if (headerCartBadge) {
            headerCartBadge.style.display = 'none';
        }
    }
}

function openCartModal() {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCartItems();
}

function closeCartModal() {
    cartModal.classList.remove('active');
    document.body.style.overflow = '';
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItemsList.innerHTML = '';
        cartEmpty.style.display = 'flex';
        cartSummary.style.display = 'none';
        cartHeaderCount.textContent = '0 item';
        currentGrandTotal = 0;
        return;
    }

    cartEmpty.style.display = 'none';
    cartSummary.style.display = 'block';

    let grandTotal = 0;
    let totalQty = 0;

    cartItemsList.innerHTML = cart.map((item, index) => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';

        const subtotal = product.price * item.qty;
        grandTotal += subtotal;
        totalQty += item.qty;

        return `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item-top">
                    <div class="cart-item-info">
                        <span class="cart-item-emoji">${product.emoji || CATEGORY_EMOJIS[product.category] || '📦'}</span>
                        <div class="cart-item-text">
                            <span class="cart-item-name">${escapeHTML(product.name)}</span>
                            <span class="cart-item-price">${formatRupiah(product.price)} / ${product.unit} (Sisa stok: ${product.stock})</span>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-index="${index}" title="Hapus produk">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                </div>
                <div class="cart-item-bottom">
                    <div class="cart-item-qty-controls">
                        <button class="cart-qty-btn cart-qty-minus" data-index="${index}" type="button" title="Kurangi">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                        <span class="cart-qty-value">${item.qty}</span>
                        <button class="cart-qty-btn cart-qty-plus" data-index="${index}" type="button" ${item.qty >= product.stock ? 'disabled' : ''} title="Tambah">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                    </div>
                    <span class="cart-item-subtotal">${formatRupiah(subtotal)}</span>
                </div>
                ${item.qty >= product.stock ? '<span class="cart-stock-warning">Maksimal stok tercapai</span>' : ''}
            </div>
        `;
    }).join('');

    currentGrandTotal = grandTotal;
    cartHeaderCount.textContent = `${cart.length} item`;
    cartTotalTypes.textContent = `${cart.length} jenis`;
    cartTotalItems.textContent = `${totalQty} barang`;
    cartGrandTotal.textContent = formatRupiah(grandTotal);

    updateChangeCalculator();
}

function updateCartItemQty(index, delta) {
    if (index < 0 || index >= cart.length) return;

    const item = cart[index];
    const product = products.find(p => p.id === item.productId);
    if (!product) return;

    const newQty = item.qty + delta;
    if (newQty < 1) {
        removeCartItem(index);
        return;
    }
    if (newQty > product.stock) {
        showToast(`Stok ${product.name} hanya ${product.stock} ${product.unit}`, 'error');
        return;
    }

    item.qty = newQty;
    updateCartBadge();
    renderProducts();
    renderCartItems();
}

function removeCartItem(index) {
    if (index < 0 || index >= cart.length) return;
    const removed = cart.splice(index, 1)[0];
    const product = products.find(p => p.id === removed.productId);
    if (product) {
        showToast(`${product.name} dihapus dari keranjang`, 'info');
    }
    updateCartBadge();
    renderProducts();
    renderCartItems();
}

function clearCart() {
    if (cart.length === 0) return;
    if (!confirm('Kosongkan semua pesanan di keranjang?')) return;
    cart = [];
    if (cartCashPaid) cartCashPaid.value = '';
    updateCartBadge();
    renderProducts();
    renderCartItems();
    showToast('Keranjang telah dikosongkan', 'info');
}

// ── Payment & Change Calculator ────────────────
function updateChangeCalculator() {
    if (!cartCashPaid || currentGrandTotal === 0) {
        if (calcResultRow) calcResultRow.style.display = 'none';
        return;
    }

    const cashText = cartCashPaid.value.trim();
    if (!cashText) {
        calcResultRow.style.display = 'none';
        return;
    }

    const cashVal = parseInt(cashText) || 0;
    const diff = cashVal - currentGrandTotal;

    calcResultRow.style.display = 'flex';
    if (diff >= 0) {
        calcResultLabel.textContent = 'Kembalian:';
        calcChangeValue.textContent = formatRupiah(diff);
        calcChangeValue.className = 'calc-result-value change-ok';
    } else {
        calcResultLabel.textContent = 'Uang Kurang:';
        calcChangeValue.textContent = formatRupiah(Math.abs(diff));
        calcChangeValue.className = 'calc-result-value change-short';
    }
}

function setExactCash() {
    if (!cartCashPaid || currentGrandTotal === 0) return;
    cartCashPaid.value = currentGrandTotal;
    updateChangeCalculator();
}

function setCashAmount(amount) {
    if (!cartCashPaid) return;
    cartCashPaid.value = amount;
    updateChangeCalculator();
}

function processCart() {
    if (cart.length === 0) {
        showToast('Keranjang masih kosong!', 'error');
        return;
    }

    // Validate stock availability for all items
    for (const item of cart) {
        const product = products.find(p => p.id === item.productId);
        if (!product) {
            showToast('Produk tidak ditemukan!', 'error');
            return;
        }
        if (item.qty > product.stock) {
            showToast(`Stok ${product.name} tidak mencukupi (sisa: ${product.stock})`, 'error');
            return;
        }
    }

    let grandTotal = 0;
    let totalItems = 0;

    // Reduce stock for all items
    for (const item of cart) {
        const product = products.find(p => p.id === item.productId);
        product.stock -= item.qty;
        grandTotal += product.price * item.qty;
        totalItems += item.qty;

        if (useFirebase) {
            firebaseSaveProduct(product);
        }
    }

    // Always update localStorage and UI instantly
    saveToLocalStorage();
    renderProducts();
    updateStats();

    // Check change
    let changeMsg = '';
    const cashVal = parseInt(cartCashPaid?.value) || 0;
    if (cashVal >= grandTotal) {
        const change = cashVal - grandTotal;
        changeMsg = ` | Kembalian: ${formatRupiah(change)}`;
    }

    const itemCount = cart.length;
    cart = [];
    if (cartCashPaid) cartCashPaid.value = '';
    updateCartBadge();
    renderProducts();
    closeCartModal();
    showToast(`✓ Pembelian berhasil! ${itemCount} jenis (${totalItems} barang) — Total: ${formatRupiah(grandTotal)}${changeMsg}`, 'success');
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
    toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ── Particles Background ───────────────────────
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
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

    // Category filter tabs
    filterTabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.filter-tab');
        if (!tab) return;
        filterTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.dataset.category;
        renderProducts();
    });

    // Admin button
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

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (quickAddOverlay.classList.contains('active')) closeQuickAdd();
            else if (cartModal.classList.contains('active')) closeCartModal();
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
            const target = document.getElementById('tab' + capitalize(tab.dataset.tab));
            if (target) target.classList.add('active');
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

    // Product grid - Tambah ke Keranjang button click
    productsGrid.addEventListener('click', (e) => {
        const buyBtn = e.target.closest('.btn-buy-product');
        if (buyBtn && !buyBtn.disabled) {
            openQuickAdd(parseInt(buyBtn.dataset.id));
        }
    });

    // Quick Add Popup events
    if (quickAddQty) {
        quickAddQty.addEventListener('input', updateQuickAddSubtotal);
        quickAddQty.addEventListener('change', updateQuickAddSubtotal);
        quickAddQty.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); confirmQuickAdd(); }
        });
    }

    if (quickAddMinus) {
        quickAddMinus.addEventListener('click', () => adjustQuickAddQty(-1));
    }
    if (quickAddPlus) {
        quickAddPlus.addEventListener('click', () => adjustQuickAddQty(1));
    }

    document.querySelectorAll('.quick-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const addVal = parseInt(chip.dataset.add) || 1;
            addQuickAddQty(addVal);
        });
    });

    if (quickAddConfirm) {
        quickAddConfirm.addEventListener('click', confirmQuickAdd);
    }
    if (quickAddCancel) {
        quickAddCancel.addEventListener('click', closeQuickAdd);
    }
    if (quickAddOverlay) {
        quickAddOverlay.addEventListener('click', (e) => {
            if (e.target === quickAddOverlay) closeQuickAdd();
        });
    }

    // Header & Floating cart buttons
    if (btnHeaderCart) {
        btnHeaderCart.addEventListener('click', openCartModal);
    }
    if (floatingCartBtn) {
        floatingCartBtn.addEventListener('click', openCartModal);
    }

    // Cart modal close
    if (cartClose) {
        cartClose.addEventListener('click', closeCartModal);
    }
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) closeCartModal();
        });
    }

    // Cash payment & change calculator events
    if (cartCashPaid) {
        cartCashPaid.addEventListener('input', updateChangeCalculator);
        cartCashPaid.addEventListener('change', updateChangeCalculator);
        cartCashPaid.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); processCart(); }
        });
    }

    if (chipExact) {
        chipExact.addEventListener('click', setExactCash);
    }

    document.querySelectorAll('.calc-chip[data-cash]').forEach(chip => {
        chip.addEventListener('click', () => {
            const cash = parseInt(chip.dataset.cash) || 0;
            setCashAmount(cash);
        });
    });

    // Cart item quantity adjustments & removal (delegated)
    cartItemsList.addEventListener('click', (e) => {
        const minusBtn = e.target.closest('.cart-qty-minus');
        const plusBtn = e.target.closest('.cart-qty-plus');
        const removeBtn = e.target.closest('.cart-item-remove');

        if (minusBtn) {
            updateCartItemQty(parseInt(minusBtn.dataset.index), -1);
        }
        if (plusBtn && !plusBtn.disabled) {
            updateCartItemQty(parseInt(plusBtn.dataset.index), 1);
        }
        if (removeBtn) {
            removeCartItem(parseInt(removeBtn.dataset.index));
        }
    });

    // Process & clear cart
    if (btnProcessCart) {
        btnProcessCart.addEventListener('click', processCart);
    }
    if (btnClearCart) {
        btnClearCart.addEventListener('click', clearCart);
    }
}

function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

// ── App Startup ────────────────────────────────
document.addEventListener('DOMContentLoaded', init);

