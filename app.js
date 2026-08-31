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
let transactions = []; // riwayat transaksi penjualan
let expenses = []; // riwayat pengeluaran
let kasbonList = []; // riwayat kasbon pelanggan
let nextTransactionId = 1;
let nextExpenseId = 1;
let nextKasbonId = 1;
let currentPaymentMode = 'cash'; // 'cash' | 'kasbon'
let currentSelectedKasbonId = null;

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

// Payment Method Switcher & Kasbon in Cart
const pmBtnCash = document.getElementById('pmBtnCash');
const pmBtnKasbon = document.getElementById('pmBtnKasbon');
const cashCalculatorSection = document.getElementById('cashCalculatorSection');
const cartKasbonSection = document.getElementById('cartKasbonSection');
const cartCustomerName = document.getElementById('cartCustomerName');
const cartCustomerPhone = document.getElementById('cartCustomerPhone');
const cartKasbonDP = document.getElementById('cartKasbonDP');

// Cash Calculator
const cartCashPaid = document.getElementById('cartCashPaid');
const calcChips = document.getElementById('calcChips');
const chipExact = document.getElementById('chipExact');
const calcResultRow = document.getElementById('calcResultRow');
const calcResultLabel = document.getElementById('calcResultLabel');
const calcChangeValue = document.getElementById('calcChangeValue');
let currentGrandTotal = 0;

// Pay Kasbon Modal
const payKasbonModal = document.getElementById('payKasbonModal');
const payKasbonClose = document.getElementById('payKasbonClose');
const payKasbonForm = document.getElementById('payKasbonForm');
const payKasbonAmount = document.getElementById('payKasbonAmount');
const chipPayFull = document.getElementById('chipPayFull');
const payKasbonNote = document.getElementById('payKasbonNote');

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
    loadTransactionsLocal();
    loadExpensesLocal();
    loadKasbonLocal();
    checkLowStock();
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
        checkLowStock();
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

    // Listen to transactions
    db.ref('transactions').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            transactions = Object.values(data).sort((a, b) => new Date(b.date) - new Date(a.date));
            nextTransactionId = Math.max(...transactions.map(t => t.id), 0) + 1;
        } else {
            transactions = [];
        }
        if (adminModal.classList.contains('active')) {
            renderTransactionHistory();
            renderFinancialSummary();
        }
    });

    // Listen to expenses
    db.ref('expenses').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            expenses = Object.values(data).sort((a, b) => new Date(b.date) - new Date(a.date));
            nextExpenseId = Math.max(...expenses.map(e => e.id), 0) + 1;
        } else {
            expenses = [];
        }
        if (adminModal.classList.contains('active')) {
            renderExpenseList();
            renderFinancialSummary();
        }
    });

    // Listen to kasbon
    db.ref('kasbon').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            kasbonList = Object.values(data).sort((a, b) => new Date(b.date) - new Date(a.date));
            nextKasbonId = Math.max(...kasbonList.map(k => k.id), 0) + 1;
        } else {
            kasbonList = [];
        }
        if (adminModal.classList.contains('active')) {
            renderKasbonList();
            renderKasbonSummary();
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
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
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
    checkLowStock();
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
    // Also render content for active tab
    const activeTab = document.querySelector('.admin-tab.active');
    if (activeTab) {
        const tabName = activeTab.dataset.tab;
        if (tabName === 'riwayat') renderTransactionHistory();
        else if (tabName === 'keuangan') { renderFinancialSummary(); renderExpenseList(); }
        else if (tabName === 'kasbon') { renderKasbonSummary(); renderKasbonList(); }
        else if (tabName === 'stokRendah') renderLowStockList();
    }
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

function switchPaymentMode(mode) {
    currentPaymentMode = mode;
    if (mode === 'kasbon') {
        if (pmBtnCash) pmBtnCash.classList.remove('active');
        if (pmBtnKasbon) pmBtnKasbon.classList.add('active');
        if (cashCalculatorSection) cashCalculatorSection.style.display = 'none';
        if (cartKasbonSection) cartKasbonSection.style.display = 'block';
    } else {
        if (pmBtnKasbon) pmBtnKasbon.classList.remove('active');
        if (pmBtnCash) pmBtnCash.classList.add('active');
        if (cartKasbonSection) cartKasbonSection.style.display = 'none';
        if (cashCalculatorSection) cashCalculatorSection.style.display = 'block';
    }
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

    // Validate Kasbon payment mode details
    let customerName = '';
    let customerPhone = '';
    let dpVal = 0;
    if (currentPaymentMode === 'kasbon') {
        customerName = cartCustomerName ? cartCustomerName.value.trim() : '';
        if (!customerName) {
            showToast('Nama pelanggan wajib diisi untuk transaksi Kasbon!', 'error');
            if (cartCustomerName) cartCustomerName.focus();
            return;
        }
        customerPhone = cartCustomerPhone ? cartCustomerPhone.value.trim() : '';
        dpVal = parseInt(cartKasbonDP?.value) || 0;
        if (dpVal < 0) {
            showToast('Nominal DP tidak valid!', 'error');
            return;
        }
    }

    let grandTotal = 0;
    let totalItems = 0;
    const transactionItems = [];

    // Reduce stock for all items
    for (const item of cart) {
        const product = products.find(p => p.id === item.productId);
        product.stock -= item.qty;
        const subtotal = product.price * item.qty;
        grandTotal += subtotal;
        totalItems += item.qty;

        transactionItems.push({
            productId: product.id,
            name: product.name,
            emoji: product.emoji || CATEGORY_EMOJIS[product.category] || '📦',
            price: product.price,
            qty: item.qty,
            unit: product.unit,
            subtotal: subtotal
        });

        if (useFirebase) {
            firebaseSaveProduct(product);
        }
    }

    // Always update localStorage and UI instantly
    saveToLocalStorage();
    renderProducts();
    updateStats();

    if (currentPaymentMode === 'kasbon') {
        if (dpVal > grandTotal) {
            showToast(`DP (${formatRupiah(dpVal)}) tidak boleh lebih dari total belanja (${formatRupiah(grandTotal)})!`, 'error');
            return;
        }
        const remainingAmount = grandTotal - dpVal;
        const status = remainingAmount === 0 ? 'lunas' : (dpVal > 0 ? 'dicicil' : 'belum_lunas');

        const kasbonItem = {
            id: nextKasbonId++,
            customerName: customerName,
            phone: customerPhone,
            date: new Date().toISOString(),
            totalAmount: grandTotal,
            paidAmount: dpVal,
            remainingAmount: remainingAmount,
            status: status,
            itemsDescription: transactionItems.map(i => `${i.qty} ${i.unit} ${i.name}`).join(', '),
            items: transactionItems,
            payments: dpVal > 0 ? [{ id: 1, date: new Date().toISOString(), amount: dpVal, note: 'Uang Muka / DP Kasir' }] : []
        };
        saveKasbonItem(kasbonItem);

        const transaction = {
            id: nextTransactionId++,
            date: new Date().toISOString(),
            items: transactionItems,
            totalItems: totalItems,
            grandTotal: grandTotal,
            cashPaid: dpVal,
            change: 0,
            paymentMode: 'kasbon',
            customerName: customerName,
            kasbonId: kasbonItem.id
        };
        saveTransaction(transaction);

        const itemCount = cart.length;
        cart = [];
        if (cartCustomerName) cartCustomerName.value = '';
        if (cartCustomerPhone) cartCustomerPhone.value = '';
        if (cartKasbonDP) cartKasbonDP.value = '0';
        switchPaymentMode('cash'); // Reset back to cash
        updateCartBadge();
        renderProducts();
        closeCartModal();
        showToast(`✓ Kasbon dicatat a.n ${customerName}! Total: ${formatRupiah(grandTotal)} (Sisa Hutang: ${formatRupiah(remainingAmount)})`, 'success');
        return;
    }

    // Cash mode
    let changeMsg = '';
    const cashVal = parseInt(cartCashPaid?.value) || 0;
    let changeAmount = 0;
    if (cashVal >= grandTotal) {
        changeAmount = cashVal - grandTotal;
        changeMsg = ` | Kembalian: ${formatRupiah(changeAmount)}`;
    }

    // ── Save Transaction ──
    const transaction = {
        id: nextTransactionId++,
        date: new Date().toISOString(),
        items: transactionItems,
        totalItems: totalItems,
        grandTotal: grandTotal,
        cashPaid: cashVal || grandTotal,
        change: changeAmount,
        paymentMode: 'cash'
    };
    saveTransaction(transaction);

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
            else if (payKasbonModal && payKasbonModal.classList.contains('active')) closePayKasbonModal();
            else if (cartModal.classList.contains('active')) closeCartModal();
            else if (pinModal.classList.contains('active')) closePinModal();
            else if (adminModal.classList.contains('active')) closeAdmin();
        }
    });

    // Payment mode switcher (Cash vs Kasbon)
    if (pmBtnCash) {
        pmBtnCash.addEventListener('click', () => switchPaymentMode('cash'));
    }
    if (pmBtnKasbon) {
        pmBtnKasbon.addEventListener('click', () => switchPaymentMode('kasbon'));
    }

    // Pay Kasbon modal events
    if (payKasbonClose) {
        payKasbonClose.addEventListener('click', closePayKasbonModal);
    }
    if (payKasbonModal) {
        payKasbonModal.addEventListener('click', (e) => {
            if (e.target === payKasbonModal) closePayKasbonModal();
        });
    }
    if (chipPayFull) {
        chipPayFull.addEventListener('click', () => {
            if (currentSelectedKasbonId) {
                const item = kasbonList.find(k => k.id === currentSelectedKasbonId);
                if (item && payKasbonAmount) payKasbonAmount.value = item.remainingAmount;
            }
        });
    }
    if (payKasbonForm) {
        payKasbonForm.addEventListener('submit', processKasbonPayment);
    }

    // Admin tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById('tab' + capitalize(tab.dataset.tab));
            if (target) target.classList.add('active');
            // Render new tab content
            const tabName = tab.dataset.tab;
            if (tabName === 'riwayat') renderTransactionHistory();
            else if (tabName === 'keuangan') { renderFinancialSummary(); renderExpenseList(); }
            else if (tabName === 'kasbon') { renderKasbonSummary(); renderKasbonList(); }
            else if (tabName === 'stokRendah') renderLowStockList();
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

    // Setup new tab listeners (Riwayat, Keuangan, Stok Rendah)
    setupNewTabListeners();
}

function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

// ══════════════════════════════════════════════════
// ── Transaction History System ────────────────────
// ══════════════════════════════════════════════════

function saveTransaction(transaction) {
    transactions.unshift(transaction);
    if (useFirebase) {
        db.ref('transactions/' + transaction.id).set(transaction);
    }
    saveTransactionsLocal();
}

function saveTransactionsLocal() {
    localStorage.setItem('sembako_transactions', JSON.stringify(transactions));
}

function loadTransactionsLocal() {
    if (useFirebase) return; // Firebase listener handles this
    const saved = localStorage.getItem('sembako_transactions');
    if (saved) {
        transactions = JSON.parse(saved);
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        nextTransactionId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1;
    }
}

function deleteTransaction(id) {
    if (!confirm('Hapus riwayat transaksi ini?')) return;
    transactions = transactions.filter(t => t.id !== id);
    if (useFirebase) {
        db.ref('transactions/' + id).remove();
    }
    saveTransactionsLocal();
    renderTransactionHistory();
    renderFinancialSummary();
    showToast('Riwayat transaksi dihapus', 'info');
}

function clearAllTransactions() {
    if (!confirm('Hapus SEMUA riwayat transaksi? Data tidak bisa dikembalikan!')) return;
    transactions = [];
    nextTransactionId = 1;
    if (useFirebase) {
        db.ref('transactions').remove();
    }
    saveTransactionsLocal();
    renderTransactionHistory();
    renderFinancialSummary();
    showToast('Semua riwayat transaksi dihapus', 'info');
}

function filterByPeriod(items, period) {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return items.filter(item => {
        const d = new Date(item.date);
        switch (period) {
            case 'today': return d >= startOfDay;
            case 'week': return d >= startOfWeek;
            case 'month': return d >= startOfMonth;
            default: return true;
        }
    });
}

function renderTransactionHistory() {
    const riwayatList = document.getElementById('riwayatList');
    const riwayatEmpty = document.getElementById('riwayatEmpty');
    const filterEl = document.getElementById('riwayatFilterPeriod');
    if (!riwayatList) return;

    const period = filterEl ? filterEl.value : 'month';
    const filtered = filterByPeriod(transactions, period);

    if (filtered.length === 0) {
        riwayatList.innerHTML = '';
        riwayatEmpty.style.display = 'flex';
        return;
    }

    riwayatEmpty.style.display = 'none';
    const dateOpts = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };

    riwayatList.innerHTML = filtered.map(tx => {
        const dateStr = new Date(tx.date).toLocaleDateString('id-ID', dateOpts);
        const itemsHtml = (tx.items || []).map(item =>
            `<div class="riwayat-product-row">
                <span class="rp-name">${item.emoji || ''} ${escapeHTML(item.name)}</span>
                <span class="rp-qty">${item.qty} ${item.unit}</span>
                <span class="rp-sub">${formatRupiah(item.subtotal)}</span>
            </div>`
        ).join('');

        const payInfo = tx.cashPaid > 0 ? `Bayar: ${formatRupiah(tx.cashPaid)}` : '';
        const changeInfo = tx.change > 0 ? `Kembali: ${formatRupiah(tx.change)}` : '';

        return `
            <div class="riwayat-item">
                <div class="riwayat-item-header">
                    <span class="riwayat-item-date">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        ${dateStr}
                    </span>
                    <span class="riwayat-item-total">${formatRupiah(tx.grandTotal)}</span>
                </div>
                <div class="riwayat-item-products">
                    ${itemsHtml}
                </div>
                <div class="riwayat-item-footer">
                    <div class="riwayat-payment-info">
                        ${payInfo ? `<span>${payInfo}</span>` : ''}
                        ${changeInfo ? `<span>${changeInfo}</span>` : ''}
                        <span>${tx.totalItems} barang</span>
                    </div>
                    <button class="riwayat-delete-btn" data-txid="${tx.id}" title="Hapus">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ══════════════════════════════════════════════════
// ── Expense (Pengeluaran) System ──────────────────
// ══════════════════════════════════════════════════

function saveExpense(expense) {
    expenses.unshift(expense);
    if (useFirebase) {
        db.ref('expenses/' + expense.id).set(expense);
    }
    saveExpensesLocal();
}

function saveExpensesLocal() {
    localStorage.setItem('sembako_expenses', JSON.stringify(expenses));
}

function loadExpensesLocal() {
    if (useFirebase) return;
    const saved = localStorage.getItem('sembako_expenses');
    if (saved) {
        expenses = JSON.parse(saved);
        expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
        nextExpenseId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
    }
}

function addExpense(e) {
    e.preventDefault();
    const descEl = document.getElementById('expenseDesc');
    const amountEl = document.getElementById('expenseAmount');

    const desc = descEl.value.trim();
    const amount = parseInt(amountEl.value);

    if (!desc) {
        showToast('Keterangan pengeluaran harus diisi!', 'error');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        showToast('Jumlah pengeluaran tidak valid!', 'error');
        return;
    }

    const expense = {
        id: nextExpenseId++,
        date: new Date().toISOString(),
        description: desc,
        amount: amount
    };

    saveExpense(expense);
    descEl.value = '';
    amountEl.value = '';
    renderExpenseList();
    renderFinancialSummary();
    showToast(`Pengeluaran "${desc}" (${formatRupiah(amount)}) tersimpan!`, 'success');
}

function deleteExpense(id) {
    if (!confirm('Hapus pengeluaran ini?')) return;
    expenses = expenses.filter(e => e.id !== id);
    if (useFirebase) {
        db.ref('expenses/' + id).remove();
    }
    saveExpensesLocal();
    renderExpenseList();
    renderFinancialSummary();
    showToast('Pengeluaran dihapus', 'info');
}

function clearAllExpenses() {
    if (!confirm('Hapus SEMUA riwayat pengeluaran? Data tidak bisa dikembalikan!')) return;
    expenses = [];
    nextExpenseId = 1;
    if (useFirebase) {
        db.ref('expenses').remove();
    }
    saveExpensesLocal();
    renderExpenseList();
    renderFinancialSummary();
    showToast('Semua pengeluaran dihapus', 'info');
}

function renderExpenseList() {
    const expenseList = document.getElementById('expenseList');
    const expenseEmpty = document.getElementById('expenseEmpty');
    const filterEl = document.getElementById('financeFilterPeriod');
    if (!expenseList) return;

    const period = filterEl ? filterEl.value : 'month';
    const filtered = filterByPeriod(expenses, period);

    if (filtered.length === 0) {
        expenseList.innerHTML = '';
        expenseEmpty.style.display = 'flex';
        return;
    }

    expenseEmpty.style.display = 'none';
    const dateOpts = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };

    expenseList.innerHTML = filtered.map(exp => {
        const dateStr = new Date(exp.date).toLocaleDateString('id-ID', dateOpts);
        return `
            <div class="expense-item">
                <div class="expense-item-info">
                    <span class="expense-item-desc">${escapeHTML(exp.description)}</span>
                    <span class="expense-item-date">${dateStr}</span>
                </div>
                <span class="expense-item-amount">- ${formatRupiah(exp.amount)}</span>
                <div class="expense-item-actions">
                    <button class="riwayat-delete-btn" data-expid="${exp.id}" title="Hapus">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ══════════════════════════════════════════════════
// ── Financial Summary (Keuangan) ──────────────────
// ══════════════════════════════════════════════════

function renderFinancialSummary() {
    const incomeEl = document.getElementById('financeIncome');
    const expenseEl = document.getElementById('financeExpense');
    const profitEl = document.getElementById('financeProfit');
    const filterEl = document.getElementById('financeFilterPeriod');
    if (!incomeEl) return;

    const period = filterEl ? filterEl.value : 'month';

    const filteredTx = filterByPeriod(transactions, period);
    const filteredExp = filterByPeriod(expenses, period);

    // Cash from normal transactions + DP from Kasbon transactions
    const totalTxIncome = filteredTx.reduce((sum, tx) => {
        if (tx.paymentMode === 'kasbon') {
            return sum + (tx.cashPaid || 0);
        }
        return sum + tx.grandTotal;
    }, 0);

    // Installments paid for Kasbon during this period
    let kasbonRepayments = 0;
    kasbonList.forEach(k => {
        if (k.payments) {
            k.payments.forEach(p => {
                if (p.note !== 'Uang Muka / DP Kasir') {
                    const matched = filterByPeriod([{ date: p.date }], period);
                    if (matched.length > 0) {
                        kasbonRepayments += p.amount;
                    }
                }
            });
        }
    });

    const totalIncome = totalTxIncome + kasbonRepayments;
    const totalExpense = filteredExp.reduce((sum, exp) => sum + exp.amount, 0);
    const profit = totalIncome - totalExpense;

    incomeEl.textContent = formatRupiah(totalIncome);
    expenseEl.textContent = formatRupiah(totalExpense);
    profitEl.textContent = (profit < 0 ? '- ' : '') + formatRupiah(Math.abs(profit));

    // Apply profit color
    profitEl.className = 'finance-card-value finance-profit-value' + (profit < 0 ? ' profit-negative' : '');
}

// ══════════════════════════════════════════════════
// ── Kasbon (Hutang Pelanggan) System ──────────────
// ══════════════════════════════════════════════════

function saveKasbonLocal() {
    localStorage.setItem('sembako_kasbon', JSON.stringify(kasbonList));
}

function loadKasbonLocal() {
    if (useFirebase) return;
    const saved = localStorage.getItem('sembako_kasbon');
    if (saved) {
        kasbonList = JSON.parse(saved);
        kasbonList.sort((a, b) => new Date(b.date) - new Date(a.date));
        nextKasbonId = kasbonList.length > 0 ? Math.max(...kasbonList.map(k => k.id)) + 1 : 1;
    }
}

function saveKasbonItem(kasbonItem) {
    const index = kasbonList.findIndex(k => k.id === kasbonItem.id);
    if (index >= 0) {
        kasbonList[index] = kasbonItem;
    } else {
        kasbonList.unshift(kasbonItem);
    }

    if (useFirebase) {
        db.ref('kasbon/' + kasbonItem.id).set(kasbonItem);
    }
    saveKasbonLocal();
}

function deleteKasbonItem(id) {
    const item = kasbonList.find(k => k.id === id);
    if (!item) return;

    if (!confirm(`Yakin ingin menghapus catatan kasbon a.n "${item.customerName}"?`)) return;

    kasbonList = kasbonList.filter(k => k.id !== id);
    if (useFirebase) {
        db.ref('kasbon/' + id).remove();
    }
    saveKasbonLocal();
    renderKasbonList();
    renderKasbonSummary();
    renderFinancialSummary();
    showToast(`Catatan kasbon a.n ${item.customerName} berhasil dihapus`, 'info');
}

function renderKasbonSummary() {
    const unpaidEl = document.getElementById('kasbonTotalUnpaid');
    const countEl = document.getElementById('kasbonCustomerCount');
    const paidEl = document.getElementById('kasbonTotalPaid');
    if (!unpaidEl) return;

    const activeDebts = kasbonList.filter(k => k.status !== 'lunas');
    const totalUnpaid = activeDebts.reduce((sum, k) => sum + (k.remainingAmount || 0), 0);
    const totalPaid = kasbonList.reduce((sum, k) => sum + (k.paidAmount || 0), 0);

    unpaidEl.textContent = formatRupiah(totalUnpaid);
    countEl.textContent = `${activeDebts.length} Orang`;
    paidEl.textContent = formatRupiah(totalPaid);
}

function renderKasbonList() {
    const listEl = document.getElementById('kasbonList');
    const emptyEl = document.getElementById('kasbonEmpty');
    const searchInputEl = document.getElementById('kasbonSearchInput');
    const filterSelectEl = document.getElementById('kasbonFilterStatus');
    if (!listEl) return;

    let filtered = [...kasbonList];

    const statusVal = filterSelectEl ? filterSelectEl.value : 'all';
    if (statusVal === 'belum_lunas') {
        filtered = filtered.filter(k => k.status !== 'lunas');
    } else if (statusVal === 'lunas') {
        filtered = filtered.filter(k => k.status === 'lunas');
    }

    const searchVal = searchInputEl ? searchInputEl.value.trim().toLowerCase() : '';
    if (searchVal) {
        filtered = filtered.filter(k =>
            k.customerName.toLowerCase().includes(searchVal) ||
            (k.phone && k.phone.toLowerCase().includes(searchVal)) ||
            (k.itemsDescription && k.itemsDescription.toLowerCase().includes(searchVal))
        );
    }

    if (filtered.length === 0) {
        listEl.innerHTML = '';
        emptyEl.style.display = 'flex';
        return;
    }

    emptyEl.style.display = 'none';
    const dateOpts = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };

    listEl.innerHTML = filtered.map(item => {
        const dateStr = new Date(item.date).toLocaleDateString('id-ID', dateOpts);

        let badgeHtml = '';
        if (item.status === 'lunas') {
            badgeHtml = '<span class="kasbon-badge kasbon-badge-paid">✓ LUNAS</span>';
        } else if (item.status === 'dicicil') {
            badgeHtml = '<span class="kasbon-badge kasbon-badge-partial">⏳ DICICIL</span>';
        } else {
            badgeHtml = '<span class="kasbon-badge kasbon-badge-unpaid">⚠️ BELUM LUNAS</span>';
        }

        const itemsText = item.itemsDescription || (item.items ? item.items.map(i => `${i.qty} ${i.unit} ${i.name}`).join(', ') : 'Belanja Sembako');

        return `
            <div class="kasbon-card" data-kasbonid="${item.id}">
                <div class="kasbon-card-header">
                    <div class="kasbon-customer-info">
                        <div class="kasbon-customer-name">
                            👤 ${escapeHTML(item.customerName)}
                        </div>
                        ${item.phone ? `<span class="kasbon-customer-phone">📱 ${escapeHTML(item.phone)} &bull; ${dateStr}</span>` : `<span class="kasbon-customer-phone">${dateStr}</span>`}
                    </div>
                    ${badgeHtml}
                </div>
                <div class="kasbon-items-preview">
                    📦 <strong>Barang:</strong> ${escapeHTML(itemsText)}
                </div>
                <div class="kasbon-card-body">
                    <div class="kasbon-metric">
                        <span class="kasbon-metric-label">Total Hutang</span>
                        <span class="kasbon-metric-value">${formatRupiah(item.totalAmount)}</span>
                    </div>
                    <div class="kasbon-metric">
                        <span class="kasbon-metric-label">Sudah Dibayar</span>
                        <span class="kasbon-metric-value" style="color:var(--emerald-400);">${formatRupiah(item.paidAmount)}</span>
                    </div>
                    <div class="kasbon-metric">
                        <span class="kasbon-metric-label">Sisa Piutang</span>
                        <span class="kasbon-metric-value remaining">${formatRupiah(item.remainingAmount)}</span>
                    </div>
                </div>
                <div class="kasbon-card-footer">
                    <div class="kasbon-actions">
                        ${item.status !== 'lunas' ? `
                            <button class="btn-kasbon-pay" data-kasbonid="${item.id}">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                Bayar / Cicil
                            </button>
                        ` : ''}
                        <button class="btn-kasbon-print" data-kasbonid="${item.id}" title="Cetak Nota">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                            Nota
                        </button>
                    </div>
                    <button class="riwayat-delete-btn btn-delete-kasbon" data-kasbonid="${item.id}" title="Hapus Data Kasbon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function openPayKasbonModal(kasbonId) {
    const item = kasbonList.find(k => k.id === kasbonId);
    if (!item) return;

    currentSelectedKasbonId = kasbonId;

    document.getElementById('payKasbonCustomerName').textContent = item.customerName;
    document.getElementById('payKasbonTotalBelanja').textContent = formatRupiah(item.totalAmount);
    document.getElementById('payKasbonTotalPaid').textContent = formatRupiah(item.paidAmount);
    document.getElementById('payKasbonRemaining').textContent = formatRupiah(item.remainingAmount);

    if (payKasbonAmount) {
        payKasbonAmount.value = '';
        payKasbonAmount.max = item.remainingAmount;
    }
    if (payKasbonNote) {
        payKasbonNote.value = '';
    }

    renderPayHistoryList(item);

    if (payKasbonModal) {
        payKasbonModal.classList.add('active');
        setTimeout(() => { if (payKasbonAmount) payKasbonAmount.focus(); }, 150);
    }
}

function closePayKasbonModal() {
    if (payKasbonModal) {
        payKasbonModal.classList.remove('active');
    }
    currentSelectedKasbonId = null;
}

function renderPayHistoryList(kasbonItem) {
    const list = document.getElementById('payHistoryList');
    if (!list) return;

    if (!kasbonItem.payments || kasbonItem.payments.length === 0) {
        list.innerHTML = '<div style="font-size:0.75rem; color:var(--text-muted); text-align:center; padding:10px;">Belum ada cicilan tercatat</div>';
        return;
    }

    const dateOpts = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    list.innerHTML = kasbonItem.payments.map(p => `
        <div class="pay-history-item">
            <div class="pay-history-meta">
                <span>${escapeHTML(p.note || 'Pembayaran Cicilan')}</span>
                <span class="pay-history-date">${new Date(p.date).toLocaleDateString('id-ID', dateOpts)}</span>
            </div>
            <span class="pay-history-amount">+ ${formatRupiah(p.amount)}</span>
        </div>
    `).join('');
}

function processKasbonPayment(e) {
    e.preventDefault();
    if (!currentSelectedKasbonId) return;

    const item = kasbonList.find(k => k.id === currentSelectedKasbonId);
    if (!item) return;

    const amount = parseInt(payKasbonAmount.value);
    const note = payKasbonNote.value.trim();

    if (isNaN(amount) || amount <= 0) {
        showToast('Nominal pembayaran tidak valid!', 'error');
        return;
    }
    if (amount > item.remainingAmount) {
        showToast(`Nominal melebihi sisa hutang (${formatRupiah(item.remainingAmount)})!`, 'error');
        return;
    }

    item.paidAmount += amount;
    item.remainingAmount -= amount;
    if (item.remainingAmount === 0) {
        item.status = 'lunas';
    } else {
        item.status = 'dicicil';
    }

    if (!item.payments) item.payments = [];
    item.payments.push({
        id: item.payments.length + 1,
        date: new Date().toISOString(),
        amount: amount,
        note: note || (item.remainingAmount === 0 ? 'Pelunasan Kasbon' : `Cicilan Ke-${item.payments.length + 1}`)
    });

    saveKasbonItem(item);
    closePayKasbonModal();
    renderKasbonList();
    renderKasbonSummary();
    renderFinancialSummary();
    showToast(`✓ Pembayaran ${formatRupiah(amount)} a.n ${item.customerName} berhasil disimpan!`, 'success');
}

function addManualKasbon(e) {
    e.preventDefault();
    const nameEl = document.getElementById('manualKasbonName');
    const phoneEl = document.getElementById('manualKasbonPhone');
    const descEl = document.getElementById('manualKasbonDesc');
    const totalEl = document.getElementById('manualKasbonTotal');
    const dpEl = document.getElementById('manualKasbonDP');

    const name = nameEl.value.trim();
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const desc = descEl.value.trim();
    const total = parseInt(totalEl.value);
    const dp = parseInt(dpEl ? dpEl.value : 0) || 0;

    if (!name) { showToast('Nama pelanggan wajib diisi!', 'error'); return; }
    if (!desc) { showToast('Keterangan barang belanja wajib diisi!', 'error'); return; }
    if (isNaN(total) || total <= 0) { showToast('Total hutang tidak valid!', 'error'); return; }
    if (dp < 0 || dp > total) { showToast('DP tidak valid!', 'error'); return; }

    const paid = dp;
    const remaining = total - paid;
    const status = remaining === 0 ? 'lunas' : (paid > 0 ? 'dicicil' : 'belum_lunas');

    const item = {
        id: nextKasbonId++,
        customerName: name,
        phone: phone,
        date: new Date().toISOString(),
        totalAmount: total,
        paidAmount: paid,
        remainingAmount: remaining,
        status: status,
        itemsDescription: desc,
        items: [],
        payments: paid > 0 ? [{ id: 1, date: new Date().toISOString(), amount: paid, note: 'Uang Muka / DP' }] : []
    };

    saveKasbonItem(item);
    document.getElementById('manualKasbonForm').reset();
    document.getElementById('manualKasbonSection').style.display = 'none';
    renderKasbonList();
    renderKasbonSummary();
    renderFinancialSummary();
    showToast(`Catatan kasbon manual a.n ${name} berhasil disimpan!`, 'success');
}

function printKasbonReceipt(kasbonId) {
    const item = kasbonList.find(k => k.id === kasbonId);
    if (!item) return;

    const dateStr = new Date(item.date).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const printWindow = window.open('', '_blank', 'width=450,height=600');
    if (!printWindow) {
        showToast('Izinkan popup browser untuk mencetak nota', 'error');
        return;
    }

    const itemsHtml = item.items && item.items.length > 0
        ? item.items.map(i => `<tr style="border-bottom:1px solid #eee;"><td style="padding:4px 0;">${i.name} x${i.qty} ${i.unit}</td><td style="text-align:right; padding:4px 0;">${formatRupiah(i.subtotal)}</td></tr>`).join('')
        : `<tr><td colspan="2" style="padding:6px 0;">${escapeHTML(item.itemsDescription)}</td></tr>`;

    const paymentsHtml = (item.payments || []).map(p =>
        `<div style="display:flex; justify-content:space-between; font-size:11px; color:#555; margin-top:2px;"><span>${new Date(p.date).toLocaleDateString('id-ID')} - ${escapeHTML(p.note || 'Cicilan')}</span><span style="font-weight:bold; color:#059669;">+ ${formatRupiah(p.amount)}</span></div>`
    ).join('');

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Nota Kasbon - ${escapeHTML(item.customerName)}</title>
            <style>
                body { font-family: 'Courier New', monospace, sans-serif; padding: 15px; width: 300px; margin: 0 auto; color: #111; }
                .header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 10px; margin-bottom: 10px; }
                .header h2 { margin: 0; font-size: 18px; }
                .header p { margin: 2px 0; font-size: 11px; color: #555; }
                .info { margin-bottom: 10px; font-size: 12px; }
                .info div { margin-bottom: 3px; }
                table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 10px; }
                .summary { border-top: 2px dashed #000; padding-top: 8px; font-size: 12px; }
                .summary-row { display: flex; justify-content: space-between; margin-bottom: 4px; }
                .highlight { font-weight: bold; font-size: 14px; color: #e11d48; }
                .footer { text-align: center; margin-top: 15px; font-size: 10px; color: #777; border-top: 1px solid #ccc; padding-top: 8px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h2>WARUNG JIHAN</h2>
                <p>Nota Catatan Kasbon / Piutang</p>
            </div>
            <div class="info">
                <div><strong>Pelanggan:</strong> ${escapeHTML(item.customerName)}</div>
                ${item.phone ? `<div><strong>No. HP:</strong> ${escapeHTML(item.phone)}</div>` : ''}
                <div><strong>Tanggal:</strong> ${dateStr}</div>
                <div><strong>Status:</strong> ${item.status.toUpperCase()}</div>
            </div>
            <table>
                <thead>
                    <tr style="border-bottom:1px solid #000; text-align:left;">
                        <th>Barang</th>
                        <th style="text-align:right;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
            <div class="summary">
                <div class="summary-row"><span>Total Belanja:</span><span>${formatRupiah(item.totalAmount)}</span></div>
                <div class="summary-row"><span>Sudah Dibayar:</span><span>${formatRupiah(item.paidAmount)}</span></div>
                <div class="summary-row highlight"><span>SISA HUTANG:</span><span>${formatRupiah(item.remainingAmount)}</span></div>
            </div>
            ${paymentsHtml ? `<div style="margin-top:10px; border-top:1px dashed #ccc; padding-top:6px;"><strong style="font-size:11px;">Riwayat Cicilan:</strong>${paymentsHtml}</div>` : ''}
            <div class="footer">
                <p>Terima kasih atas kepercayaannya 🙏</p>
                <p>Simpan nota ini sebagai bukti transaksi</p>
            </div>
            <script>window.onload = function() { window.print(); }</script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// ══════════════════════════════════════════════════
// ── Low Stock Alert System ────────────────────────
// ══════════════════════════════════════════════════

const LOW_STOCK_THRESHOLD = 5;

function checkLowStock() {
    const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD);
    const emptyProducts = products.filter(p => p.stock === 0);
    const alertProducts = [...lowStockProducts, ...emptyProducts];

    const btnAlert = document.getElementById('btnLowStockAlert');
    const countEl = document.getElementById('lowStockCount');

    if (alertProducts.length > 0) {
        btnAlert.style.display = 'flex';
        countEl.textContent = alertProducts.length;
    } else {
        btnAlert.style.display = 'none';
    }
}

function renderLowStockList() {
    const lowStockList = document.getElementById('lowStockList');
    const lowStockEmpty = document.getElementById('lowStockEmpty');
    if (!lowStockList) return;

    const lowStockProducts = products.filter(p => p.stock <= LOW_STOCK_THRESHOLD)
        .sort((a, b) => a.stock - b.stock);

    if (lowStockProducts.length === 0) {
        lowStockList.innerHTML = '';
        lowStockEmpty.style.display = 'flex';
        return;
    }

    lowStockEmpty.style.display = 'none';

    lowStockList.innerHTML = lowStockProducts.map(product => {
        const isCritical = product.stock <= 2;
        return `
            <div class="low-stock-item ${isCritical ? 'stock-critical' : ''}">
                <div class="low-stock-item-info">
                    <div class="low-stock-item-emoji">${product.emoji || CATEGORY_EMOJIS[product.category] || '📦'}</div>
                    <div class="low-stock-item-text">
                        <span class="low-stock-item-name">${escapeHTML(product.name)}</span>
                        <span class="low-stock-item-category">${CATEGORY_LABELS[product.category] || product.category}</span>
                    </div>
                </div>
                <div class="low-stock-item-stock">
                    <span class="stock-number">${product.stock === 0 ? 'HABIS' : product.stock}</span>
                    <span class="stock-unit-label">${product.unit}</span>
                </div>
            </div>
        `;
    }).join('');
}

// ══════════════════════════════════════════════════
// ── New Event Listeners (for new tabs) ────────────
// ══════════════════════════════════════════════════

function setupNewTabListeners() {
    // Low stock alert button
    const btnLowStockAlert = document.getElementById('btnLowStockAlert');
    if (btnLowStockAlert) {
        btnLowStockAlert.addEventListener('click', () => {
            if (isAdminLoggedIn) {
                openAdmin();
                // Switch to stok rendah tab
                document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
                const tab = document.querySelector('.admin-tab[data-tab="stokRendah"]');
                if (tab) tab.classList.add('active');
                const content = document.getElementById('tabStokRendah');
                if (content) content.classList.add('active');
                renderLowStockList();
            } else {
                openPinModal();
            }
        });
    }

    // Riwayat filter change
    const riwayatFilter = document.getElementById('riwayatFilterPeriod');
    if (riwayatFilter) {
        riwayatFilter.addEventListener('change', renderTransactionHistory);
    }

    // Finance filter change
    const financeFilter = document.getElementById('financeFilterPeriod');
    if (financeFilter) {
        financeFilter.addEventListener('change', () => {
            renderFinancialSummary();
            renderExpenseList();
        });
    }

    // Expense form
    const expenseForm = document.getElementById('expenseForm');
    if (expenseForm) {
        expenseForm.addEventListener('submit', addExpense);
    }

    // Clear all transactions
    const btnClearRiwayat = document.getElementById('btnClearRiwayat');
    if (btnClearRiwayat) {
        btnClearRiwayat.addEventListener('click', clearAllTransactions);
    }

    // Clear all expenses
    const btnClearExpenses = document.getElementById('btnClearExpenses');
    if (btnClearExpenses) {
        btnClearExpenses.addEventListener('click', clearAllExpenses);
    }

    // Delegated delete for riwayat list
    const riwayatList = document.getElementById('riwayatList');
    if (riwayatList) {
        riwayatList.addEventListener('click', (e) => {
            const delBtn = e.target.closest('.riwayat-delete-btn');
            if (delBtn && delBtn.dataset.txid) {
                deleteTransaction(parseInt(delBtn.dataset.txid));
            }
        });
    }

    // Delegated delete for expense list
    const expenseList = document.getElementById('expenseList');
    if (expenseList) {
        expenseList.addEventListener('click', (e) => {
            const delBtn = e.target.closest('.riwayat-delete-btn');
            if (delBtn && delBtn.dataset.expid) {
                deleteExpense(parseInt(delBtn.dataset.expid));
            }
        });
    }

    // Kasbon listeners
    const kasbonSearch = document.getElementById('kasbonSearchInput');
    if (kasbonSearch) {
        kasbonSearch.addEventListener('input', renderKasbonList);
    }
    const kasbonFilter = document.getElementById('kasbonFilterStatus');
    if (kasbonFilter) {
        kasbonFilter.addEventListener('change', renderKasbonList);
    }
    const btnToggleManualKasbon = document.getElementById('btnToggleManualKasbon');
    if (btnToggleManualKasbon) {
        btnToggleManualKasbon.addEventListener('click', () => {
            const sec = document.getElementById('manualKasbonSection');
            if (sec) sec.style.display = sec.style.display === 'none' ? 'block' : 'none';
        });
    }
    const manualKasbonForm = document.getElementById('manualKasbonForm');
    if (manualKasbonForm) {
        manualKasbonForm.addEventListener('submit', addManualKasbon);
    }
    const kasbonListEl = document.getElementById('kasbonList');
    if (kasbonListEl) {
        kasbonListEl.addEventListener('click', (e) => {
            const payBtn = e.target.closest('.btn-kasbon-pay');
            const printBtn = e.target.closest('.btn-kasbon-print');
            const deleteBtn = e.target.closest('.btn-delete-kasbon');

            if (payBtn && payBtn.dataset.kasbonid) {
                openPayKasbonModal(parseInt(payBtn.dataset.kasbonid));
            }
            if (printBtn && printBtn.dataset.kasbonid) {
                printKasbonReceipt(parseInt(printBtn.dataset.kasbonid));
            }
            if (deleteBtn && deleteBtn.dataset.kasbonid) {
                deleteKasbonItem(parseInt(deleteBtn.dataset.kasbonid));
            }
        });
    }
}

// ── App Startup ────────────────────────────────
document.addEventListener('DOMContentLoaded', init);

