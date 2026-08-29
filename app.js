// ==========================================
// ZADIYAH STOREFRONT ENGINE
// ==========================================

const PRODUCT_PRICE = 14.99;
let cartQty = 1;

// --- Drawer Open / Close ---
function toggleDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('drawer-overlay');
  
  if (!drawer || !overlay) return;

  const isOpen = !drawer.classList.contains('translate-x-full');

  if (isOpen) {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  } else {
    updateCartUI();
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

// --- Add to Cart Action ---
function addToCart() {
  cartQty = 1;
  const cartItem = document.getElementById('cart-item');
  if (cartItem) cartItem.classList.remove('hidden');
  
  toggleDrawer();
}

// --- Remove from Cart ---
function removeFromCart() {
  cartQty = 0;
  const cartItem = document.getElementById('cart-item');
  if (cartItem) cartItem.classList.add('hidden');
  
  updateCartUI();
}

// --- Update Cart Display & Totals ---
function updateCartUI() {
  const totalEl = document.getElementById('cart-total');
  const itemPriceEl = document.getElementById('cart-item-price');
  
  const total = (cartQty * PRODUCT_PRICE).toFixed(2);

  if (totalEl) totalEl.textContent = `£${total}`;
  if (itemPriceEl) itemPriceEl.textContent = `£${total}`;
}

// --- FAQ Accordion Logic ---
function toggleFaq(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('.faq-icon');
  const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

  // Close all other FAQs
  document.querySelectorAll('.faq-content').forEach(el => el.style.maxHeight = '0px');
  document.querySelectorAll('.faq-icon').forEach(el => {
    el.textContent = '+';
    el.style.transform = 'rotate(0deg)';
  });

  // Expand selected FAQ
  if (!isOpen) {
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.textContent = '−';
    icon.style.transform = 'rotate(180deg)';
  }
}

// --- Gallery Selector ---
function selectGalleryImage(index, element) {
  const activeImg = document.getElementById('active-product-image');
  if (activeImg && element) {
    activeImg.src = element.src;
  }
  
  document.querySelectorAll('.clickable-thumbnail').forEach(thumb => {
    thumb.classList.remove('border-[#D4AF37]');
    thumb.classList.add('border-[#1A1A1A]');
  });

  if (element) {
    element.classList.remove('border-[#1A1A1A]');
    element.classList.add('border-[#D4AF37]');
  }
}
