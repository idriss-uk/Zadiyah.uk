/* =============================================
   ZADIYAH — London Rain
   Application JavaScript
   ============================================= */

// ===== STATE =====
let cartQty = 0;
let productQty = 1;
let currentQuote = 0;
let quoteInterval;
const PRICE = 14.99;

// =============================================
// SLIDE-OVER SHOPPING BAG DRAWER
// =============================================
function toggleDrawer() {
  const overlay = document.getElementById('drawer-overlay');
  const panel = document.getElementById('drawer-panel');
  const isOpen = panel.classList.contains('open');

  if (isOpen) {
    overlay.classList.remove('open');
    panel.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    overlay.classList.add('open');
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

// =============================================
// MOBILE NAVIGATION TOGGLE
// =============================================
function toggleMobileNav() {
  document.getElementById('mobile-nav').classList.toggle('open');
}

// =============================================
// PRODUCT QUANTITY SELECTOR
// =============================================
function adjustQty(delta) {
  productQty = Math.max(1, Math.min(10, productQty + delta));
  document.getElementById('qty-display').textContent = productQty;
}

// =============================================
// CART LOGIC
// =============================================
function addToCart() {
  cartQty += productQty;
  updateCartUI();
  toggleDrawer();

  // Reset product qty
  productQty = 1;
  document.getElementById('qty-display').textContent = 1;
}

function adjustCartQty(delta) {
  cartQty = Math.max(1, Math.min(10, cartQty + delta));
  updateCartUI();
}

function removeFromCart() {
  cartQty = 0;
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('bag-count');
  const empty = document.getElementById('drawer-empty');
  const item = document.getElementById('drawer-item');
  const footer = document.getElementById('drawer-footer');
  const cartQtyEl = document.getElementById('cart-qty');
  const cartTotal = document.getElementById('cart-total');
  const cartItemPrice = document.getElementById('cart-item-price');

  if (cartQty > 0) {
    badge.textContent = cartQty;
    badge.style.opacity = '1';
    empty.classList.add('hidden');
    item.classList.remove('hidden');
    footer.classList.remove('hidden');
    cartQtyEl.textContent = cartQty;
    cartItemPrice.textContent = `£${(PRICE * cartQty).toFixed(2)}`;
    cartTotal.textContent = `£${(PRICE * cartQty).toFixed(2)}`;
  } else {
    badge.style.opacity = '0';
    empty.classList.remove('hidden');
    item.classList.add('hidden');
    footer.classList.add('hidden');
  }
}

// =============================================
// ACCORDION TOGGLE
// =============================================
function toggleAccordion(id) {
  const content = document.getElementById(`accordion-${id}`);
  const icon = document.getElementById(`accordion-icon-${id}`);
  const isOpen = content.classList.contains('open');

  // Close all first
  document.querySelectorAll('.accordion-content').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.accordion-icon').forEach(el => { el.classList.remove('open'); el.textContent = '+'; });

  if (!isOpen) {
    content.classList.add('open');
    icon.classList.add('open');
    icon.textContent = '+';
  }
}

// =============================================
// SCENT PYRAMID TABS
// =============================================
function switchScentTab(tier) {
  document.querySelectorAll('.scent-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${tier}`).classList.add('active');

  const cards = document.querySelectorAll('.scent-card');
  cards.forEach(card => {
    card.style.opacity = '0.3';
    card.style.transform = 'scale(0.97)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const targetCard = document.querySelector(`.scent-card[data-scent="${tier}"]`);
  if (targetCard) {
    targetCard.style.opacity = '1';
    targetCard.style.transform = 'scale(1)';
  }

  // Reset after brief highlight
  setTimeout(() => {
    cards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = '';
    });
  }, 1500);
}

// =============================================
// EDITORIAL QUOTE SLIDER
// =============================================
function goToQuote(index) {
  currentQuote = index;
  const slides = document.querySelectorAll('.quote-slide');
  const dots = document.querySelectorAll('#quote-dots button');

  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => { d.classList.remove('bg-gold'); d.classList.add('bg-white/20'); });

  slides[index].classList.add('active');
  dots[index].classList.remove('bg-white/20');
  dots[index].classList.add('bg-gold');

  // Reset auto-advance timer
  clearInterval(quoteInterval);
  startQuoteInterval();
}

function startQuoteInterval() {
  quoteInterval = setInterval(() => {
    const next = (currentQuote + 1) % 4;
    goToQuote(next);
  }, 5000);
}

// =============================================
// NEWSLETTER FORM
// =============================================
function handleNewsletter(e) {
  e.preventDefault();
  const success = document.getElementById('newsletter-success');
  const form = document.getElementById('newsletter-form');
  form.classList.add('hidden');
  success.classList.remove('hidden');
}

// =============================================
// INITIALIZATION (runs on DOMContentLoaded)
// =============================================
document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll Reveal (Intersection Observer) ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // --- Header scroll effect ---
  const header = document.getElementById('site-header');
  const announcementBar = document.getElementById('announcement-bar');

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Collapse announcement bar on scroll
    if (currentScroll > 50) {
      announcementBar.style.marginTop = `-${announcementBar.offsetHeight}px`;
      header.style.top = '0';
    } else {
      announcementBar.style.marginTop = '0';
      header.style.top = `${announcementBar.offsetHeight}px`;
    }

    // Subtle gold border on scroll
    if (currentScroll > 100) {
      header.style.borderBottomColor = 'rgba(212,175,55,0.1)';
    } else {
      header.style.borderBottomColor = 'rgba(255,255,255,0.05)';
    }
  });

  // --- Mobile Sticky Buy Bar ---
  const buyBarObserver = new IntersectionObserver((entries) => {
    const mobileBuyBar = document.getElementById('mobile-buy-bar');
    entries.forEach(entry => {
      if (!entry.isIntersecting && window.scrollY > 600) {
        mobileBuyBar.classList.add('visible');
      } else {
        mobileBuyBar.classList.remove('visible');
      }
    });
  }, { threshold: 0 });

  const heroSection = document.getElementById('fragrance');
  if (heroSection) buyBarObserver.observe(heroSection);

  // --- Rain Particle Effect ---
  const rainContainer = document.getElementById('rain-container');
  if (rainContainer) {
    for (let i = 0; i < 40; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${1.5 + Math.random() * 2}s`;
      drop.style.animationDelay = `${Math.random() * 3}s`;
      drop.style.opacity = `${0.1 + Math.random() * 0.3}`;
      rainContainer.appendChild(drop);
    }
  }

  // --- Start Quote Auto-Advance ---
  startQuoteInterval();
});

// =============================================
// MARKETPLACE GALLERY INTERACTION
// =============================================
const galleryImages = [
  "images/1784682931474.jpg",
  "images/bottle.jpg",
  "images/1784682913725.jpg",
  "images/1784682926466.jpg",
  "images/banner.jjpg.jpeg",
  "images/scent_pyramid.jpg"
];
let currentGalleryIdx = 0;

function selectGalleryImage(idx, el) {
  if (idx < 0 || idx >= galleryImages.length) return;
  currentGalleryIdx = idx;
  const activeImg = document.getElementById('active-product-image');
  if (activeImg) {
    activeImg.style.opacity = '0.3';
    setTimeout(() => {
      activeImg.src = galleryImages[idx];
      activeImg.style.opacity = '1';
    }, 150);
  }

  // Update dots
  const dots = document.querySelectorAll('#gallery-dots span');
  dots.forEach((dot, i) => {
    if (i === idx) {
      dot.className = "w-2.5 h-2.5 rounded-full border border-white active-dot bg-white";
    } else {
      dot.className = "w-2.5 h-2.5 rounded-full border border-white inactive-dot bg-transparent";
    }
  });

  // Update thumbnails
  const thumbs = document.querySelectorAll('.clickable-thumbnail');
  thumbs.forEach((t, i) => {
    if (i === idx) {
      t.className = "w-full h-auto object-contain border-2 border-[#A0883E] active-thumbnail clickable-thumbnail cursor-pointer";
    } else {
      t.className = "w-full h-auto object-contain border-2 border-[#1A1A1A] clickable-thumbnail cursor-pointer opacity-70 hover:opacity-100";
    }
  });
}

function prevGalleryImage() {
  const newIdx = (currentGalleryIdx - 1 + galleryImages.length) % galleryImages.length;
  selectGalleryImage(newIdx);
}

function nextGalleryImage() {
  const newIdx = (currentGalleryIdx + 1) % galleryImages.length;
  selectGalleryImage(newIdx);
}

function scrollThumbsUp() {
  const container = document.getElementById('thumb-scroll-container');
  if (container) container.scrollBy({ top: -100, behavior: 'smooth' });
}

function scrollThumbsDown() {
  const container = document.getElementById('thumb-scroll-container');
  if (container) container.scrollBy({ top: 100, behavior: 'smooth' });
}


