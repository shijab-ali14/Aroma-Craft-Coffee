
// Menu Items Data Array
const menuProducts = [
    {
        id: 'm1',
        title: 'Velvet Caramel Latte',
        category: 'specialty',
        price: 380,
        rating: 4.9,
        badge: 'Popular',
        notes: 'Caramel • Honey • Vanilla',
        desc: 'Rich double espresso layered with velvety steamed milk and artisanal salted caramel syrup.',
        origin: 'Ethiopia Yirgacheffe',
        strength: 'Medium',
        img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'm2',
        title: 'Classic Espresso Single',
        category: 'hot',
        price: 180,
        rating: 4.8,
        badge: 'Single Origin',
        notes: 'Dark Chocolate • Citrus',
        desc: 'Pure, concentrated single shot extracted under 9-bar pressure with a thick hazelnut crema.',
        origin: 'Colombia Huila',
        strength: 'High',
        img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'm3',
        title: 'Nitrogen Cold Brew',
        category: 'cold',
        price: 320,
        rating: 4.9,
        badge: 'Cold Brewed 18h',
        notes: 'Smoky • Cocoa • Mild Berry',
        desc: 'Infused with nitrogen for a cascading creamy draft texture without added dairy or sugar.',
        origin: 'Guatemala Antigua',
        strength: 'High',
        img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'm4',
        title: 'Flaky Butter Croissant',
        category: 'bakery',
        price: 220,
        rating: 4.9,
        badge: 'Fresh Baked',
        notes: 'Butter • Golden Flaky',
        desc: 'French traditional multi-layered croissant baked fresh every morning with French butter.',
        origin: 'Pastry Kitchen',
        strength: 'N/A',
        img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'm5',
        title: 'Matcha Green Tea Latte',
        category: 'specialty',
        price: 360,
        rating: 4.7,
        badge: 'Ceremonial Grade',
        notes: 'Earthy • Mild Sweet',
        desc: 'Authentic Japanese ceremonial matcha whisked smoothly with oat or almond milk.',
        origin: 'Uji, Kyoto',
        strength: 'Low',
        img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'm6',
        title: 'Bandarban Reserve Drip',
        category: 'hot',
        price: 290,
        rating: 5.0,
        badge: 'Local Pride',
        notes: 'Wild Honey • Nutty',
        desc: 'Hand-poured filter coffee using beans harvested from local organic farms in Chittagong Hill Tracts.',
        origin: 'Bandarban, Bangladesh',
        strength: 'Medium High',
        img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=80'
    }
];

// Global State Variables
let currentCategory = 'all';
let cart = [];
let customBrew = {
    base: { name: 'Espresso Shot', price: 180, cal: 10 },
    milk: { name: 'Whole Milk', price: 0, cal: 120 },
    syrup: { name: 'None', price: 0, cal: 0 },
    isIced: false,
    sweetness: 50
};

// Mobile Menu Toggle
document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('hidden');
});
document.querySelectorAll('.mobile-link').forEach(l => {
    l.addEventListener('click', () => document.getElementById('mobileMenu').classList.add('hidden'));
});

// Cart Drawer Toggling
function toggleCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const content = document.getElementById('cartContent');
    
    if (drawer.classList.contains('opacity-0')) {
        drawer.classList.remove('opacity-0', 'pointer-events-none');
        content.classList.remove('translate-x-full');
    } else {
        drawer.classList.add('opacity-0', 'pointer-events-none');
        content.classList.add('translate-x-full');
    }
}

// Render Menu Cards
function renderMenu() {
    const container = document.getElementById('menuItemsGrid');
    const searchVal = document.getElementById('menuSearch').value.toLowerCase();
    
    container.innerHTML = '';

    const filtered = menuProducts.filter(item => {
        const matchCat = currentCategory === 'all' || item.category === currentCategory;
        const matchSearch = item.title.toLowerCase().includes(searchVal) || item.notes.toLowerCase().includes(searchVal);
        return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 text-espresso-500">
                <i class="fa-solid fa-mug-saucer text-4xl mb-3"></i>
                <p class="font-medium text-base">No items match your search criteria.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = "glass-panel rounded-3xl p-5 border border-espresso-200/80 hover:border-espresso-400 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-sm hover:shadow-espresso-card";
        card.innerHTML = `
            <div>
                <div class="relative h-48 rounded-2xl overflow-hidden mb-4 bg-espresso-200">
                    <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://placehold.co/500x500/6f421e/fff?text=${encodeURIComponent(item.title)}'">
                    <span class="absolute top-3 left-3 bg-espresso-950/80 text-gold text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-gold/30">${item.badge}</span>
                    <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-espresso-900 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                        <i class="fa-solid fa-star text-gold text-xs"></i> ${item.rating}
                    </div>
                </div>

                <div class="space-y-1.5 mb-4">
                    <h3 class="text-xl font-serif font-bold text-espresso-950 group-hover:text-caramel transition-colors">${item.title}</h3>
                    <p class="text-xs font-semibold text-espresso-600">${item.notes}</p>
                    <p class="text-xs text-espresso-500 line-clamp-2 leading-relaxed">${item.desc}</p>
                </div>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-espresso-100">
                <span class="text-2xl font-serif font-bold text-espresso-900">৳${item.price}</span>
                <div class="flex gap-2">
                    <button onclick="openProductModal('${item.id}')" class="p-2.5 rounded-xl glass-panel text-espresso-700 hover:text-espresso-950 text-xs font-bold" title="View Details">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button onclick="addToCart('${item.title}', ${item.price})" class="px-4 py-2.5 rounded-xl bg-espresso-800 hover:bg-espresso-700 text-cream-100 font-bold text-xs uppercase tracking-wider shadow-sm transition-all">
                        Add +
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function setMenuCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.cat-tab').forEach(btn => {
        btn.className = "cat-tab px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase whitespace-nowrap glass-panel text-espresso-800 hover:bg-espresso-100 transition-all";
    });
    event.target.className = "cat-tab active px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase whitespace-nowrap bg-espresso-800 text-cream-100 transition-all";
    renderMenu();
}

function filterMenuItems() {
    renderMenu();
}

// Virtual Barista Customizer Logic
function selectCustomOption(type, name, price, cal) {
    if (type === 'base') {
        customBrew.base = { name, price, cal };
        document.querySelectorAll('.opt-base').forEach(b => {
            b.className = "opt-base p-3 rounded-xl border border-espresso-200 bg-white hover:bg-espresso-100 text-espresso-900 font-medium text-xs text-left transition-all flex items-center justify-between";
        });
    } else if (type === 'milk') {
        customBrew.milk = { name, price, cal };
        document.querySelectorAll('.opt-milk').forEach(b => {
            b.className = "opt-milk p-3 rounded-xl border border-espresso-200 bg-white text-espresso-900 font-medium text-xs transition-all text-center";
        });
    } else if (type === 'syrup') {
        customBrew.syrup = { name, price, cal };
        document.querySelectorAll('.opt-syrup').forEach(b => {
            b.className = "opt-syrup p-3 rounded-xl border border-espresso-200 bg-white text-espresso-900 font-medium text-xs transition-all text-center";
        });
    }
    event.currentTarget.className = (type === 'base' ? "opt-base active p-3 rounded-xl border border-espresso-300 bg-espresso-800 text-cream-100 font-medium text-xs text-left transition-all flex items-center justify-between" : `opt-${type} active p-3 rounded-xl border border-espresso-300 bg-espresso-800 text-cream-100 font-medium text-xs transition-all text-center`);
    
    updateCustomPreview();
}

function updateCustomSliders() {
    const isIcedVal = document.getElementById('tempSlider').value === '1';
    const sweetVal = document.getElementById('sweetSlider').value;

    customBrew.isIced = isIcedVal;
    customBrew.sweetness = sweetVal;

    document.getElementById('tempVal').textContent = isIcedVal ? 'Iced (-5°C)' : 'Hot (75°C)';
    document.getElementById('sweetVal').textContent = `${sweetVal}% Sweetness`;

    updateCustomPreview();
}

function updateCustomPreview() {
    const totalPrice = customBrew.base.price + customBrew.milk.price + customBrew.syrup.price;
    const totalCal = customBrew.base.cal + customBrew.milk.cal + customBrew.syrup.cal;

    document.getElementById('previewTitle').textContent = `${customBrew.isIced ? 'Iced ' : ''}${customBrew.base.name}`;
    document.getElementById('previewRecipeSummary').textContent = `${customBrew.milk.name} • ${customBrew.syrup.name !== 'None' ? customBrew.syrup.name : 'No Syrup'} • ${customBrew.sweetness}% Sweet`;
    document.getElementById('previewCalories').textContent = `${totalCal} kcal`;
    document.getElementById('previewPrice').textContent = `৳${totalPrice}`;
    document.getElementById('previewTempBadge').textContent = customBrew.isIced ? 'Chilled Iced' : 'Hot Steamed';
}

function addCustomBrewToCart() {
    const title = `Custom ${customBrew.isIced ? 'Iced ' : ''}${customBrew.base.name} (${customBrew.milk.name})`;
    const price = customBrew.base.price + customBrew.milk.price + customBrew.syrup.price;
    addToCart(title, price);
}

// Cart Actions & State Management
function addToCart(title, price) {
    const existing = cart.find(item => item.title === title);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ title, price, qty: 1 });
    }
    updateCartUI();
    toggleCartDrawer();
}

function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const badge = document.getElementById('cartBadge');
    const emptyMsg = document.getElementById('emptyCartMsg');
    
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = totalItems;

    if (cart.length === 0) {
        emptyMsg.classList.remove('hidden');
        container.innerHTML = '';
        container.appendChild(emptyMsg);
    } else {
        emptyMsg.classList.add('hidden');
        container.innerHTML = '';

        cart.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = "bg-white p-4 rounded-2xl border border-espresso-100 flex items-center justify-between shadow-xs";
            row.innerHTML = `
                <div>
                    <h4 class="font-serif font-bold text-espresso-950 text-sm">${item.title}</h4>
                    <span class="text-xs text-espresso-600 font-bold">৳${item.price} each</span>
                </div>

                <div class="flex items-center space-x-3">
                    <div class="flex items-center space-x-2 bg-espresso-100 rounded-lg p-1 border border-espresso-200">
                        <button onclick="changeQty(${index}, -1)" class="w-6 h-6 flex items-center justify-center text-espresso-800 font-bold text-xs">-</button>
                        <span class="text-xs font-bold text-espresso-950 w-4 text-center">${item.qty}</span>
                        <button onclick="changeQty(${index}, 1)" class="w-6 h-6 flex items-center justify-center text-espresso-800 font-bold text-xs">+</button>
                    </div>
                    <button onclick="removeItem(${index})" class="text-terracotta hover:text-red-700 text-sm p-1">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(row);
        });
    }

    // Calculations
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    document.getElementById('cartSubtotal').textContent = `৳${subtotal}`;
    document.getElementById('cartTax').textContent = `৳${tax}`;
    document.getElementById('cartTotal').textContent = `৳${total}`;
}

function changeQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function checkoutOrder() {
    if (cart.length === 0) return;
    cart = [];
    updateCartUI();
    toggleCartDrawer();

    showConfirmation('Order Placed Successfully!', 'Your artisan coffee order has been sent to our barista counter. Get ready for a flavorful experience!');
}

// Product Modal Logic
function openProductModal(id) {
    const item = menuProducts.find(p => p.id === id);
    if (!item) return;

    document.getElementById('mTitle').textContent = item.title;
    document.getElementById('mCategory').textContent = item.category.toUpperCase();
    document.getElementById('mDesc').textContent = item.desc;
    document.getElementById('mOrigin').textContent = item.origin;
    document.getElementById('mStrength').textContent = item.strength;
    document.getElementById('mPrice').textContent = `৳${item.price}`;

    document.getElementById('mAddBtn').onclick = () => {
        addToCart(item.title, item.price);
        closeProductModal();
    };

    document.getElementById('productModal').classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('productModal').classList.add('hidden');
}

// Reservation Form Logic
let currentBookingMode = 'table';
function setBookingMode(mode) {
    currentBookingMode = mode;
    const btnT = document.getElementById('btnModeTable');
    const btnP = document.getElementById('btnModePickup');
    const guests = document.getElementById('guestsField');
    const submitText = document.getElementById('submitBtnText');

    if (mode === 'table') {
        btnT.className = "px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all bg-espresso-800 text-cream-100 shadow-sm";
        btnP.className = "px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all text-espresso-800 hover:text-espresso-950";
        guests.classList.remove('hidden');
        submitText.textContent = 'Confirm Reservation';
    } else {
        btnP.className = "px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all bg-espresso-800 text-cream-100 shadow-sm";
        btnT.className = "px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all text-espresso-800 hover:text-espresso-950";
        guests.classList.add('hidden');
        submitText.textContent = 'Confirm Express Pickup';
    }
}

function handleBookingSubmit(e) {
    e.preventDefault();
    const heading = currentBookingMode === 'table' ? 'Table Reserved!' : 'Express Pickup Scheduled!';
    const text = currentBookingMode === 'table' 
        ? 'Your seating reservation at Aroma Craft Coffee is locked in. We have reserved a cozy table for you.' 
        : 'Your pickup timing has been scheduled. Your coffee will be piping hot when you arrive!';

    document.getElementById('bookingForm').reset();
    showConfirmation(heading, text);
}

function showConfirmation(heading, text) {
    document.getElementById('confirmHeading').textContent = heading;
    document.getElementById('confirmText').textContent = text;
    document.getElementById('confirmId').textContent = `REF: #AC-${Math.floor(10000 + Math.random() * 90000)}`;
    document.getElementById('confirmModal').classList.remove('hidden');
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.add('hidden');
}

// Initial Load Actions
window.onload = function() {
    renderMenu();
    updateCustomPreview();
};