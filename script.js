/* Interactive E-Commerce Product Showcase
   Extended version:
   - layout modes: grid, list, masonry
   - more product data & categories
   - preserves all previous features (quick view, cart localStorage, checkout)
*/

/* ---------- Data (expanded) ---------- */
const PRODUCTS = [
  {
    id: 'p1',
    title: 'Classic Knit Sweater',
    price: 64.00,
    category: 'clothing',
    tags: ['new', 'popular'],
    desc: 'Cozy mid-weight knit sweater, breathable and stylish. Perfect for interviews & casual wear.',
    img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6c2f3b0c1e3b66c6547f8d2a8ece0d3f'
  },
  {
    id: 'p2',
    title: 'Noise-Cancel Headphones',
    price: 129.00,
    category: 'tech',
    tags: ['popular'],
    desc: 'Over-ear noise cancelling headphones with premium sound and 20h battery life.',
    img: 'https://images.unsplash.com/photo-1518444029353-19b08b5f4f88?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=d0b3c16e8b93b764e9a84d9e0b56a0d8'
  },
  {
    id: 'p3',
    title: 'Minimal Desk Lamp',
    price: 49.50,
    category: 'home',
    tags: ['sale'],
    desc: 'Sleek LED desk lamp with adjustable arm and warm/cool modes — great for remote work setups.',
    img: 'https://images.unsplash.com/photo-1497935589775-8d95b3a6d6a7?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2b1d5a4be0a69ad2f5fee4c3dfd923a1'
  },
  {
    id: 'p4',
    title: 'Leather Card Wallet',
    price: 34.00,
    category: 'accessory',
    tags: ['new'],
    desc: 'Slim leather wallet that holds cards and a few bills — handcrafted finish.',
    img: 'https://images.unsplash.com/photo-1542293787937-6d3b2b3a2c73?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2763b8f99943d3f6c2f1000c7f1a9c02'
  },
  {
    id: 'p5',
    title: 'Canvas Tote Bag',
    price: 22.00,
    category: 'accessory',
    tags: ['sale','popular','eco'],
    desc: 'Durable canvas tote with interior pocket — eco-friendly and stylish.',
    img: 'https://images.unsplash.com/photo-1520975919838-8f6b5b1fb46b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=c1b1ce3f2e7a2b6f2dfe7a6b9a18e1f6'
  },
  {
    id: 'p6',
    title: 'Smartphone Stand',
    price: 15.00,
    category: 'tech',
    tags: ['popular','sale'],
    desc: 'Adjustable aluminum stand for phones & small tablets — clean desk essential.',
    img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=a8d6a6a8f8f6f7d9bfcdd2e7b2f2f9e3'
  },
  {
    id: 'p7',
    title: 'Trail Running Shoes',
    price: 89.99,
    category: 'fitness',
    tags: ['new','popular'],
    desc: 'Lightweight trail shoes with grippy sole and breathable upper — built for long runs.',
    img: 'https://images.unsplash.com/photo-1528701800489-476c8b6a9aa6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1e1bfcf0aa6ef4e5b9fb2b1d2f5c9e6a'
  },
  {
    id: 'p8',
    title: 'Camping Hammock',
    price: 39.50,
    category: 'outdoor',
    tags: ['sale','eco'],
    desc: 'Compact camping hammock with quick-attach carabiners, fits two people.',
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7172c8e9f1d2a3b8c1c2a3d8f1a2b5c6'
  },
  {
    id: 'p9',
    title: 'Insulated Water Bottle',
    price: 27.00,
    category: 'fitness',
    tags: ['popular','eco'],
    desc: 'Vacuum-insulated bottle that keeps drinks cold for 24h and hot for 12h.',
    img: 'https://images.unsplash.com/photo-1526401485004-8ddb4d0d3f0b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=fc9d4d2b1e8f7c3b2a6f8d3e7b1a2c4d'
  },
  {
    id: 'p10',
    title: 'Wireless Charger Pad',
    price: 29.00,
    category: 'tech',
    tags: ['new'],
    desc: 'Thin Qi-certified wireless charger for fast charging compatible phones.',
    img: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3b2f2e4d4c6b9a1f2f3e4b5c6a7d8e9f'
  }
];

/* ---------- State ---------- */
let state = {
  products: PRODUCTS.slice(),
  filter: {
    category: 'all',
    search: '',
    maxPrice: 1000,
    tags: new Set()
  },
  sort: 'featured',
  layout: 'grid', // grid | list | masonry
  cart: loadCart() // {productId: qty}
};

/* ---------- DOM ---------- */
const el = {
  productsGrid: document.getElementById('productsGrid'),
  categories: Array.from(document.querySelectorAll('.category')),
  searchInput: document.getElementById('searchInput'),
  priceRange: document.getElementById('priceRange'),
  priceVal: document.getElementById('priceVal'),
  tagFilters: Array.from(document.querySelectorAll('.tag-filter')),
  clearFilters: document.getElementById('clearFilters'),
  resetSearch: document.getElementById('resetSearch'),
  emptyState: document.getElementById('emptyState'),
  sortSelect: document.getElementById('sortSelect'),
  cartBtn: document.getElementById('cartBtn'),
  cartCount: document.getElementById('cartCount'),
  cartDrawer: document.getElementById('cartDrawer'),
  cartList: document.getElementById('cartList'),
  subtotal: document.getElementById('subtotal'),
  clearCart: document.getElementById('clearCart'),
  checkoutBtn: document.getElementById('checkoutBtn'),
  quickView: document.getElementById('quickView'),
  qvImage: document.getElementById('qvImage'),
  qvTitle: document.getElementById('qvTitle'),
  qvDesc: document.getElementById('qvDesc'),
  qvPrice: document.getElementById('qvPrice'),
  qvTag: document.getElementById('qvTag'),
  qvQty: document.getElementById('qvQty'),
  qvAdd: document.getElementById('qvAdd'),
  qvCheckout: document.getElementById('qvCheckout'),
  closeQuick: document.getElementById('closeQuick'),
  checkoutModal: document.getElementById('checkoutModal'),
  checkoutForm: document.getElementById('checkoutForm'),
  orderPreview: document.getElementById('orderPreview'),
  paySim: document.getElementById('paySim'),
  cancelCheckout: document.getElementById('cancelCheckout'),
  toast: document.getElementById('toast'),
  closeCart: document.getElementById('closeCart'),
  layoutBtns: Array.from(document.querySelectorAll('.layout-btn'))
};

/* ---------- Init ---------- */
function init(){
  attachListeners();
  el.priceRange.max = Math.ceil(Math.max(...PRODUCTS.map(p=>p.price))*1.2);
  state.filter.maxPrice = el.priceRange.max;
  el.priceRange.value = state.filter.maxPrice;
  el.priceVal.textContent = formatPrice(state.filter.maxPrice);
  renderProducts();
  updateCartUI();
  renderCartList();
}
init();

/* ---------- Render ---------- */
function renderProducts(){
  const filtered = PRODUCTS
    .filter(p => {
      if(state.filter.category !== 'all' && p.category !== state.filter.category) return false;
      if(p.price > state.filter.maxPrice) return false;
      if(state.filter.search && !(`${p.title} ${p.desc}`.toLowerCase().includes(state.filter.search.toLowerCase()))) return false;
      if(state.filter.tags.size > 0){
        const any = Array.from(state.filter.tags).some(t => p.tags.includes(t));
        if(!any) return false;
      }
      return true;
    });

  // sort
  const sorted = filtered.slice().sort((a,b)=>{
    switch(state.sort){
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name-asc': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  el.productsGrid.classList.remove('grid','list','masonry');
  el.productsGrid.classList.add(state.layout);

  el.productsGrid.innerHTML = '';
  if(sorted.length === 0){
    el.emptyState.hidden = false;
    return;
  } else {
    el.emptyState.hidden = true;
  }

  for(const p of sorted){
    const card = document.createElement('article');
    card.className = 'product-card';
    // template varies by layout (list has image on left, masonry uses normal card)
    if(state.layout === 'list'){
      card.innerHTML = `
        <div class="product-media" data-id="${p.id}">
          <img loading="lazy" src="${p.img}" alt="${escapeHtml(p.title)}" />
        </div>
        <div class="product-body">
          <h3 class="product-title">${escapeHtml(p.title)}</h3>
          <p class="product-sub">${escapeHtml(p.desc)}</p>
          <div class="price-row">
            <div class="price">${formatPrice(p.price)}</div>
            <div class="pill">${escapeHtml(p.category)}</div>
          </div>
          <div style="margin-top:8px">
            <button class="btn small-quick" data-id="${p.id}">Quick view</button>
            <button class="btn primary add-now" data-id="${p.id}">Add</button>
          </div>
        </div>
      `;
    } else {
      // grid / masonry
      card.innerHTML = `
        <div class="product-media" data-id="${p.id}">
          <img loading="lazy" src="${p.img}" alt="${escapeHtml(p.title)}" />
        </div>
        <div class="product-body">
          <h3 class="product-title">${escapeHtml(p.title)}</h3>
          <p class="product-sub">${escapeHtml(p.desc)}</p>
          <div class="price-row">
            <div class="price">${formatPrice(p.price)}</div>
            <div class="pill">${escapeHtml(p.category)}</div>
          </div>
        </div>
      `;
    }

    // attach events
    if(state.layout === 'list'){
      card.querySelector('.small-quick').addEventListener('click', ()=>openQuickView(p.id));
      card.querySelector('.add-now').addEventListener('click', ()=>addToCart(p.id,1));
    } else {
      card.querySelector('.product-media').addEventListener('click', ()=>openQuickView(p.id));
      card.querySelector('.product-title').addEventListener('click', ()=>openQuickView(p.id));
    }

    el.productsGrid.appendChild(card);
  }
}

/* ---------- Quick View ---------- */
let currentQuick = null;
function openQuickView(productId){
  const p = PRODUCTS.find(x=>x.id===productId);
  if(!p) return;
  currentQuick = p;
  el.qvImage.src = p.img;
  el.qvImage.alt = p.title;
  el.qvTitle.textContent = p.title;
  el.qvDesc.textContent = p.desc;
  el.qvPrice.textContent = formatPrice(p.price);
  el.qvTag.textContent = p.tags.join(' • ');
  el.qvQty.value = 1;
  el.quickView.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeQuickView(){
  el.quickView.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  currentQuick = null;
}

/* ---------- Cart (localStorage) ---------- */
function loadCart(){
  try{
    const raw = localStorage.getItem('portfolio_cart_v1');
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}

function saveCart(){
  localStorage.setItem('portfolio_cart_v1', JSON.stringify(state.cart));
}

function addToCart(productId, qty=1){
  qty = Number(qty) || 1;
  state.cart[productId] = (state.cart[productId] || 0) + qty;
  saveCart();
  showToast('Added to cart');
  updateCartUI();
  renderCartList();
}

/* ---------- Cart UI ---------- */
function updateCartUI(){
  const totalCount = Object.values(state.cart).reduce((s,n)=>s+n,0);
  el.cartCount.textContent = totalCount;
  el.cartCount.style.display = totalCount>0 ? 'inline-block' : 'none';
  el.subtotal.textContent = formatPrice(cartSubtotal());
}

function cartSubtotal(){
  let s=0;
  for(const [id,qty] of Object.entries(state.cart)){
    const p = PRODUCTS.find(x=>x.id===id);
    if(p) s += p.price * qty;
  }
  return Math.round(s*100)/100;
}

function renderCartList(){
  el.cartList.innerHTML = '';
  if(Object.keys(state.cart).length === 0){
    el.cartList.innerHTML = `<p style="color:var(--muted);padding:12px">Cart is empty. Add items from the product grid.</p>`;
    updateCartUI();
    return;
  }
  for(const [id,qty] of Object.entries(state.cart)){
    const p = PRODUCTS.find(x=>x.id===id);
    if(!p) continue;
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <img src="${p.img}" alt="${escapeHtml(p.title)}" />
      <div style="flex:1;">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-weight:700">${escapeHtml(p.title)}</div>
            <div style="color:var(--muted);font-size:13px">${formatPrice(p.price)}</div>
          </div>
          <div style="text-align:right">
            <div class="qty-control">
              <button class="btn dec" data-id="${p.id}">−</button>
              <input class="qty" data-id="${p.id}" value="${qty}" min="1" style="width:42px;text-align:center;background:transparent;border:1px solid rgba(255,255,255,0.03);border-radius:6px;padding:6px;color:inherit" />
              <button class="btn inc" data-id="${p.id}">+</button>
            </div>
            <div style="margin-top:8px"><button class="btn remove" data-id="${p.id}">Remove</button></div>
          </div>
        </div>
      </div>
    `;
    el.cartList.appendChild(item);
  }

  // attach cart controls
  el.cartList.querySelectorAll('.inc').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id = e.currentTarget.dataset.id;
      state.cart[id] = (state.cart[id] || 0) + 1;
      saveCart();
      renderCartList();
      updateCartUI();
    });
  });
  el.cartList.querySelectorAll('.dec').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id = e.currentTarget.dataset.id;
      state.cart[id] = Math.max(0, (state.cart[id] || 0) - 1);
      if(state.cart[id] === 0) delete state.cart[id];
      saveCart();
      renderCartList();
      updateCartUI();
    });
  });
  el.cartList.querySelectorAll('.qty').forEach(input=>{
    input.addEventListener('change', e=>{
      const id = e.target.dataset.id;
      let v = Number(e.target.value) || 1;
      v = Math.max(0, Math.floor(v));
      if(v === 0) delete state.cart[id];
      else state.cart[id] = v;
      saveCart();
      renderCartList();
      updateCartUI();
    });
  });
  el.cartList.querySelectorAll('.remove').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id = e.currentTarget.dataset.id;
      delete state.cart[id];
      saveCart();
      renderCartList();
      updateCartUI();
    });
  });

  updateCartUI();
}

/* ---------- Checkout Simulation ---------- */
function openCart(){
  el.cartDrawer.setAttribute('aria-hidden','false');
  el.cartDrawer.style.transition = 'transform .28s';
}
function closeCart(){
  el.cartDrawer.setAttribute('aria-hidden','true');
}

function openCheckout(){
  el.orderPreview.innerHTML = '';
  if(Object.keys(state.cart).length === 0){
    showToast('Your cart is empty');
    return;
  }
  for(const [id,qty] of Object.entries(state.cart)){
    const p = PRODUCTS.find(x=>x.id===id);
    if(!p) continue;
    const line = document.createElement('div');
    line.className = 'order-line';
    line.innerHTML = `
      <div style="max-width:70%">${escapeHtml(p.title)} × ${qty}</div>
      <div style="font-weight:700">${formatPrice(p.price * qty)}</div>
    `;
    el.orderPreview.appendChild(line);
  }
  const totLine = document.createElement('div');
  totLine.className = 'order-line';
  totLine.style.borderTop = '1px dashed rgba(255,255,255,0.03)';
  totLine.style.paddingTop = '10px';
  totLine.innerHTML = `<div style="font-weight:700">Total</div><div style="font-weight:700">${formatPrice(cartSubtotal())}</div>`;
  el.orderPreview.appendChild(totLine);

  el.checkoutModal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

function closeCheckout(){
  el.checkoutModal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

function simulatePayment(){
  const form = el.checkoutForm;
  const data = new FormData(form);
  const name = data.get('name')?.trim();
  const email = data.get('email')?.trim();
  const address = data.get('address')?.trim();
  const city = data.get('city')?.trim();

  if(!name || !email || !address || !city){
    showToast('Please complete the form');
    return;
  }

  const orderId = 'ORD-' + Date.now().toString(36).slice(-8).toUpperCase();
  state.cart = {};
  saveCart();
  renderCartList();
  updateCartUI();
  closeCheckout();
  closeCart();

  showToast(`Order placed — ${orderId}`);
}

/* ---------- Events ---------- */
function attachListeners(){
  el.categories.forEach(btn=>{
    btn.addEventListener('click', e=>{
      el.categories.forEach(b=>b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.filter.category = e.currentTarget.dataset.category;
      renderProducts();
    });
  });

  el.searchInput.addEventListener('input', e=>{
    state.filter.search = e.target.value;
    renderProducts();
  });

  el.priceRange.addEventListener('input', e=>{
    state.filter.maxPrice = Number(e.target.value);
    el.priceVal.textContent = formatPrice(state.filter.maxPrice);
    renderProducts();
  });

  el.tagFilters.forEach(cb=>{
    cb.addEventListener('change', e=>{
      if(e.target.checked) state.filter.tags.add(e.target.value);
      else state.filter.tags.delete(e.target.value);
      renderProducts();
    });
  });

  el.clearFilters.addEventListener('click', ()=>{
    state.filter.tags.clear();
    state.filter.search = '';
    state.filter.maxPrice = el.priceRange.max;
    el.searchInput.value = '';
    el.tagFilters.forEach(cb=>cb.checked=false);
    el.priceRange.value = el.priceRange.max;
    el.priceVal.textContent = formatPrice(el.priceRange.max);
    renderProducts();
  });

  el.resetSearch.addEventListener('click', ()=>location.reload());

  el.sortSelect.addEventListener('change', e=>{
    state.sort = e.target.value;
    renderProducts();
  });

  el.cartBtn.addEventListener('click', ()=>{
    openCart();
  });

  el.closeCart.addEventListener('click', closeCart);

  el.clearCart.addEventListener('click', ()=>{
    state.cart = {};
    saveCart();
    renderCartList();
    updateCartUI();
  });

  el.checkoutBtn.addEventListener('click', openCheckout);

  // quick view actions
  el.qvAdd.addEventListener('click', ()=>{
    if(!currentQuick) return;
    addToCart(currentQuick.id, Number(el.qvQty.value) || 1);
  });

  el.qvCheckout.addEventListener('click', ()=>{
    if(!currentQuick) return;
    addToCart(currentQuick.id, Number(el.qvQty.value) || 1);
    openCart();
    openCheckout();
  });

  el.closeQuick.addEventListener('click', closeQuickView);
  el.quickView.addEventListener('click', (e)=>{ if(e.target === el.quickView) closeQuickView(); });

  // checkout modal
  document.getElementById('closeCheckout').addEventListener('click', closeCheckout);
  el.cancelCheckout.addEventListener('click', closeCheckout);
  el.paySim.addEventListener('click', simulatePayment);

  // toast click to hide quickly
  el.toast.addEventListener('click', ()=>{ el.toast.hidden = true; });

  // keyboard escape to close modals
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      if(el.quickView.getAttribute('aria-hidden') === 'false') closeQuickView();
      if(el.checkoutModal.getAttribute('aria-hidden') === 'false') closeCheckout();
      if(el.cartDrawer.getAttribute('aria-hidden') === 'false') closeCart();
    }
  });

  // layout buttons
  el.layoutBtns.forEach(btn=>{
    btn.addEventListener('click', e=>{
      el.layoutBtns.forEach(b=>{
        b.classList.remove('active');
        b.setAttribute('aria-pressed','false');
      });
      e.currentTarget.classList.add('active');
      e.currentTarget.setAttribute('aria-pressed','true');
      state.layout = e.currentTarget.dataset.layout;
      renderProducts();
    });
  });
}

/* ---------- Utilities ---------- */
function formatPrice(n){
  return '$' + (Number(n).toFixed(2));
}

function escapeHtml(s){
  return (s + '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m]));
}

let toastTimer = null;
function showToast(msg, timeout=2200){
  el.toast.textContent = msg;
  el.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{ el.toast.hidden = true; }, timeout);
}

/* ---------- Expose some helpers for console (dev) ---------- */
window.__portfolio = {
  addToCart,
  state,
  PRODUCTS
};