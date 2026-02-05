/* ============================================
   NUTRI PLAN — Main Application JavaScript
   ============================================ */

'use strict';

// ── Search Data Index ──
// This index contains ALL searchable items across the entire app.
// Each item: { name, keywords, emoji, category, url, section? }
const SEARCH_INDEX = [
  // Main pages
  { name: 'Plan alimentaire', keywords: 'plan alimentaire repas programme nutrition', emoji: '📋', category: 'Page principale', url: 'plan-alimentaire.html' },
  { name: 'Aliments autorisés', keywords: 'aliments nourriture liste autorisé permis', emoji: '🥗', category: 'Page principale', url: 'aliments.html' },
  { name: 'Informations', keywords: 'informations info aide guide', emoji: 'ℹ️', category: 'Page principale', url: 'informations.html' },
  
  // Plan alimentaire sub-pages
  { name: 'Menu 14 jours', keywords: 'menu jours semaine planning', emoji: '📅', category: 'Plan alimentaire', url: 'menu.html' },
  { name: 'Petit-déjeuner', keywords: 'petit dejeuner matin breakfast', emoji: '🌅', category: 'Plan alimentaire', url: 'petit-dejeuner.html' },
  { name: 'Déjeuner', keywords: 'dejeuner midi lunch repas', emoji: '☀️', category: 'Plan alimentaire', url: 'dejeuner.html' },
  { name: 'Dîner', keywords: 'diner soir souper evening', emoji: '🌙', category: 'Plan alimentaire', url: 'diner.html' },
  { name: 'Collation', keywords: 'collation snack encas gouter', emoji: '🍎', category: 'Plan alimentaire', url: 'collation.html' },
  { name: 'Liste de courses', keywords: 'liste course courses shopping achats', emoji: '🛒', category: 'Plan alimentaire', url: 'liste-course.html' },

  // Menu days
  { name: 'Jour 1 — Lundi', keywords: 'jour 1 lundi tajine poulet merlan', emoji: '1️⃣', category: 'Menu', url: 'pages/menu-jour-1.html' },
  { name: 'Jour 2', keywords: 'jour 2 omelette salade marocaine fenouil', emoji: '2️⃣', category: 'Menu', url: 'pages/menu-jour-2.html' },
  { name: 'Jour 3', keywords: 'jour 3 porridge gingembre tajine poisson', emoji: '3️⃣', category: 'Menu', url: 'pages/menu-jour-3.html' },
  { name: 'Jour 4', keywords: 'jour 4 chakchouka harira saumon', emoji: '4️⃣', category: 'Menu', url: 'pages/menu-jour-4.html' },
  { name: 'Jour 5', keywords: 'jour 5 porridge cannelle tajine légumes dorade', emoji: '5️⃣', category: 'Menu', url: 'pages/menu-jour-5.html' },
  { name: 'Jour 6', keywords: 'jour 6 oeufs brouillés chorba kefta ratatouille', emoji: '6️⃣', category: 'Menu', url: 'pages/menu-jour-6.html' },
  { name: 'Jour 7', keywords: 'jour 7 porridge chia tajine agneau soupe', emoji: '7️⃣', category: 'Menu', url: 'pages/menu-jour-7.html' },
  { name: 'Jour 8', keywords: 'jour 8 porridge noix poulet rôti colin vapeur', emoji: '8️⃣', category: 'Menu', url: 'pages/menu-jour-8.html' },
  { name: 'Jour 9', keywords: 'jour 9 omelette légumes salade lentilles brochettes', emoji: '9️⃣', category: 'Menu', url: 'pages/menu-jour-9.html' },
  { name: 'Jour 10', keywords: 'jour 10 cottage tajine merlan salade niçoise', emoji: '🔟', category: 'Menu', url: 'pages/menu-jour-10.html' },
  { name: 'Jour 11', keywords: 'jour 11 chakchouka harira sole', emoji: '1️⃣1️⃣', category: 'Menu', url: 'pages/menu-jour-11.html' },
  { name: 'Jour 12', keywords: 'jour 12 porridge pois chiches sardines', emoji: '1️⃣2️⃣', category: 'Menu', url: 'pages/menu-jour-12.html' },
  { name: 'Jour 13', keywords: 'jour 13 oeufs pochés tajine pruneaux papillote colin', emoji: '1️⃣3️⃣', category: 'Menu', url: 'pages/menu-jour-13.html' },
  { name: 'Jour 14', keywords: 'jour 14 porridge couscous soupe', emoji: '1️⃣4️⃣', category: 'Menu', url: 'pages/menu-jour-14.html' },

  // Key meals (searchable)
  { name: 'Porridge avoine cannelle', keywords: 'porridge avoine cannelle fromage blanc myrtilles amandes petit dejeuner', emoji: '🥣', category: 'Petit-déjeuner', url: 'pages/menu-jour-1.html#petit-dejeuner' },
  { name: 'Tajine poulet citron-olives', keywords: 'tajine poulet citron olives quinoa zaalouk', emoji: '🍲', category: 'Déjeuner', url: 'pages/menu-jour-1.html#dejeuner' },
  { name: 'Merlan grillé', keywords: 'merlan grillé poisson haricots verts courgettes', emoji: '🐟', category: 'Dîner', url: 'pages/menu-jour-1.html#diner' },
  { name: 'Omelette herbes', keywords: 'omelette oeuf herbes cumin coriandre pain levain chèvre', emoji: '🍳', category: 'Petit-déjeuner', url: 'pages/menu-jour-2.html#petit-dejeuner' },
  { name: 'Salade marocaine', keywords: 'salade marocaine concombre tomates poivrons pois chiches thon', emoji: '🥗', category: 'Déjeuner', url: 'pages/menu-jour-2.html#dejeuner' },
  { name: 'Chakchouka', keywords: 'chakchouka oeufs poivrons tomates cumin', emoji: '🍳', category: 'Petit-déjeuner', url: 'pages/menu-jour-4.html#petit-dejeuner' },
  { name: 'Harira légère', keywords: 'harira soupe lentilles corail carottes céleri', emoji: '🍲', category: 'Déjeuner', url: 'pages/menu-jour-4.html#dejeuner' },
  { name: 'Saumon grillé', keywords: 'saumon grillé épinards courgettes', emoji: '🐟', category: 'Dîner', url: 'pages/menu-jour-4.html#diner' },
  { name: 'Dorade au four', keywords: 'dorade four fenouil orange haricots verts', emoji: '🐟', category: 'Dîner', url: 'pages/menu-jour-5.html#diner' },
  { name: 'Chorba légumes', keywords: 'chorba soupe légumes kefta viande hachée', emoji: '🍲', category: 'Déjeuner', url: 'pages/menu-jour-6.html#dejeuner' },
  { name: 'Couscous adapté', keywords: 'couscous quinoa poulet merguez légumes', emoji: '🍲', category: 'Déjeuner', url: 'pages/menu-jour-14.html#dejeuner' },

  // Food categories
  { name: 'Légumes et plantes', keywords: 'légumes plantes carottes haricots courgettes', emoji: '🥬', category: 'Aliments', url: 'aliments.html#legumes' },
  { name: 'Fruits', keywords: 'fruits myrtilles fraises framboises pommes oranges', emoji: '🍎', category: 'Aliments', url: 'aliments.html#fruits' },
  { name: 'Protéines animales', keywords: 'protéines animales poulet poisson boeuf agneau oeuf', emoji: '🥩', category: 'Aliments', url: 'aliments.html#proteines-animales' },
  { name: 'Protéines végétales', keywords: 'protéines végétales tofu lentilles pois chiches haricots', emoji: '🌱', category: 'Aliments', url: 'aliments.html#proteines-vegetales' },
  { name: 'Céréales et féculents', keywords: 'céréales féculents riz quinoa avoine pain', emoji: '🌾', category: 'Aliments', url: 'aliments.html#cereales-feculents' },
  { name: 'Produits laitiers', keywords: 'produits laitiers yaourt fromage lait cottage', emoji: '🧀', category: 'Aliments', url: 'aliments.html#produits-laitiers' },
  { name: 'Huiles et graisses', keywords: 'huiles graisses olive argan avocat coco', emoji: '🫒', category: 'Aliments', url: 'aliments.html#huiles-graisses' },
  { name: 'Noix et graines', keywords: 'noix graines amandes noix cacahuètes chia', emoji: '🥜', category: 'Aliments', url: 'aliments.html#noix-graines' },
  { name: 'Herbes et épices', keywords: 'herbes épices cannelle cumin coriandre gingembre', emoji: '🌿', category: 'Aliments', url: 'aliments.html#herbes-epices' },

  // Individual foods (popular ones for quick access)
  { name: 'Poulet (blanc)', keywords: 'poulet blanc volaille protéine', emoji: '🍗', category: 'Protéines', url: 'aliments.html#proteines-animales' },
  { name: 'Saumon', keywords: 'saumon poisson gras oméga', emoji: '🐟', category: 'Protéines', url: 'aliments.html#proteines-animales' },
  { name: 'Quinoa', keywords: 'quinoa céréale féculent', emoji: '🌾', category: 'Céréales', url: 'aliments.html#cereales-feculents' },
  { name: 'Flocons d\'avoine', keywords: 'flocons avoine porridge', emoji: '🥣', category: 'Céréales', url: 'aliments.html#cereales-feculents' },
  { name: 'Myrtilles', keywords: 'myrtilles baies antioxydant', emoji: '🫐', category: 'Fruits', url: 'aliments.html#fruits' },
  { name: 'Huile d\'olive', keywords: 'huile olive extra vierge', emoji: '🫒', category: 'Huiles', url: 'aliments.html#huiles-graisses' },
  { name: 'Amandes', keywords: 'amandes noix oléagineux', emoji: '🌰', category: 'Noix', url: 'aliments.html#noix-graines' },
  { name: 'Épinards', keywords: 'épinards feuilles vertes oxalates', emoji: '🥬', category: 'Légumes', url: 'aliments.html#legumes' },
  { name: 'Œuf entier', keywords: 'oeuf œuf entier protéine', emoji: '🥚', category: 'Protéines', url: 'aliments.html#proteines-animales' },
  { name: 'Yaourt grec', keywords: 'yaourt grec sans lactose protéine', emoji: '🥛', category: 'Laitiers', url: 'aliments.html#produits-laitiers' },
  { name: 'Cannelle', keywords: 'cannelle épice glycémie', emoji: '🌿', category: 'Épices', url: 'aliments.html#herbes-epices' },
  { name: 'Curcuma', keywords: 'curcuma anti-inflammatoire épice', emoji: '🌿', category: 'Épices', url: 'aliments.html#herbes-epices' },
  { name: 'Lentilles corail', keywords: 'lentilles corail légumineuse protéine végétale', emoji: '🫘', category: 'Protéines végétales', url: 'aliments.html#proteines-vegetales' },
  { name: 'Pois chiches', keywords: 'pois chiches légumineuse FODMAP', emoji: '🫘', category: 'Protéines végétales', url: 'aliments.html#proteines-vegetales' },
  { name: 'Riz basmati', keywords: 'riz basmati féculent', emoji: '🍚', category: 'Céréales', url: 'aliments.html#cereales-feculents' },

  // Shopping list items
  { name: 'Liste de courses — Protéines', keywords: 'courses protéines poulet poisson saumon sardines oeufs thon', emoji: '🛒', category: 'Courses', url: 'liste-course.html#proteines' },
  { name: 'Liste de courses — Produits laitiers', keywords: 'courses laitiers fromage blanc yaourt cottage chèvre feta comté', emoji: '🛒', category: 'Courses', url: 'liste-course.html#laitiers' },
  { name: 'Liste de courses — Légumes', keywords: 'courses légumes courgettes carottes haricots aubergines poivrons', emoji: '🛒', category: 'Courses', url: 'liste-course.html#legumes' },
  { name: 'Liste de courses — Fruits', keywords: 'courses fruits myrtilles framboises fraises pommes oranges citrons', emoji: '🛒', category: 'Courses', url: 'liste-course.html#fruits' },
  { name: 'Liste de courses — Épices', keywords: 'courses épices cannelle gingembre cumin coriandre paprika', emoji: '🛒', category: 'Courses', url: 'liste-course.html#epices' },
];


// ── SVG Icons ──
const ICONS = {
  search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
};


// ── Debounce Utility ──
function debounce(fn, delay = 200) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}


// ── Normalize string for search (remove accents, lowercase) ──
function normalizeStr(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}


// ── Global Search Engine ──
class SearchEngine {
  constructor(data) {
    this.data = data.map(item => ({
      ...item,
      _normalized: normalizeStr(item.name + ' ' + item.keywords)
    }));
  }

  search(query) {
    if (!query || query.length < 2) return [];
    
    const normalizedQuery = normalizeStr(query);
    const queryTerms = normalizedQuery.split(' ').filter(t => t.length > 1);
    
    if (queryTerms.length === 0) return [];

    const results = [];

    for (const item of this.data) {
      let score = 0;
      const normalizedName = normalizeStr(item.name);

      // Exact name match (highest)
      if (normalizedName === normalizedQuery) {
        score += 100;
      }
      // Name starts with query
      else if (normalizedName.startsWith(normalizedQuery)) {
        score += 50;
      }
      // Name contains query
      else if (normalizedName.includes(normalizedQuery)) {
        score += 30;
      }

      // Check each query term
      for (const term of queryTerms) {
        if (normalizedName.includes(term)) {
          score += 20;
        }
        if (item._normalized.includes(term)) {
          score += 10;
        }
      }

      if (score > 0) {
        results.push({ ...item, _score: score });
      }
    }

    // Sort by score desc, then alphabetically
    results.sort((a, b) => b._score - a._score || a.name.localeCompare(b.name));

    return results.slice(0, 12);
  }
}


// ── Highlight matching text ──
function highlightMatch(text, query) {
  if (!query || query.length < 2) return text;
  
  const normalizedQuery = normalizeStr(query);
  const terms = normalizedQuery.split(' ').filter(t => t.length > 1);
  
  let result = text;
  for (const term of terms) {
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(regex, '<mark>$1</mark>');
  }
  return result;
}


// ── Resolve relative URL based on current page depth ──
function resolveUrl(url) {
  // Determine current depth
  const path = window.location.pathname;
  const depth = (path.match(/\//g) || []).length - 1;
  const inPages = path.includes('/pages/');
  
  if (inPages) {
    return '../' + url;
  }
  return url;
}


// ── Initialize Search ──
function initSearch() {
  const searchInput = document.getElementById('global-search');
  const searchResults = document.getElementById('search-results');
  const searchClear = document.getElementById('search-clear');
  
  if (!searchInput || !searchResults) return;

  const engine = new SearchEngine(SEARCH_INDEX);

  const performSearch = debounce((query) => {
    if (query.length < 2) {
      searchResults.classList.remove('active');
      return;
    }

    const results = engine.search(query);
    
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-no-results">
          <div class="no-results-emoji">🔍</div>
          <p>Aucun résultat pour « ${escapeHtml(query)} »</p>
        </div>`;
    } else {
      searchResults.innerHTML = `
        <div class="search-results-header">${results.length} résultat${results.length > 1 ? 's' : ''}</div>
        ${results.map(r => `
          <a href="${resolveUrl(r.url)}" class="search-result-item" role="option">
            <span class="result-emoji">${r.emoji}</span>
            <div class="result-info">
              <div class="result-name">${highlightMatch(r.name, query)}</div>
              <div class="result-category">${r.category}</div>
            </div>
            <span class="result-arrow">${ICONS.chevronRight}</span>
          </a>
        `).join('')}`;
    }

    searchResults.classList.add('active');
  }, 150);

  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    
    if (searchClear) {
      searchClear.classList.toggle('visible', value.length > 0);
    }
    
    performSearch(value);
  });

  // Clear button
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      searchResults.classList.remove('active');
      searchClear.classList.remove('visible');
    });
  }

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      searchResults.classList.remove('active');
    }
  });

  // Keyboard navigation
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchResults.classList.remove('active');
      searchInput.blur();
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const first = searchResults.querySelector('.search-result-item');
      if (first) first.focus();
    }
  });

  searchResults.addEventListener('keydown', (e) => {
    const items = [...searchResults.querySelectorAll('.search-result-item')];
    const current = document.activeElement;
    const idx = items.indexOf(current);

    if (e.key === 'ArrowDown' && idx < items.length - 1) {
      e.preventDefault();
      items[idx + 1].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx > 0) items[idx - 1].focus();
      else searchInput.focus();
    } else if (e.key === 'Escape') {
      searchResults.classList.remove('active');
      searchInput.focus();
    }
  });
}


// ── Hamburger Menu ──
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('nav-overlay');
  const navDrawer = document.getElementById('nav-drawer');

  if (!hamburger || !navDrawer) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !hamburger.classList.contains('active');
    hamburger.classList.toggle('active', isOpen);
    if (navOverlay) navOverlay.classList.toggle('active', isOpen);
    navDrawer.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen);
  }

  hamburger.addEventListener('click', () => toggleMenu());
  
  if (navOverlay) {
    navOverlay.addEventListener('click', () => toggleMenu(false));
  }

  // Close on link click
  navDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}


// ── Sticky Header Shadow ──
function initHeaderScroll() {
  const header = document.querySelector('.app-header');
  if (!header) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle('scrolled', !entry.isIntersecting);
    },
    { threshold: 1, rootMargin: '-1px 0px 0px 0px' }
  );

  // Create a sentinel element
  const sentinel = document.createElement('div');
  sentinel.style.height = '1px';
  sentinel.style.position = 'absolute';
  sentinel.style.top = '0';
  document.body.prepend(sentinel);
  observer.observe(sentinel);
}


// ── Accordion / Collapsible ──
function initAccordions() {
  document.querySelectorAll('.accordion-header, .meal-section-header, .food-category-header, .food-item-header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.closest('.accordion-item, .meal-section, .food-category-card, .food-item');
      if (!parent) return;

      const body = parent.querySelector('.accordion-body, .meal-section-body, .food-category-body, .food-item-details');
      if (!body) return;

      const isOpen = parent.classList.contains('open');

      if (isOpen) {
        body.style.maxHeight = body.scrollHeight + 'px';
        requestAnimationFrame(() => {
          body.style.maxHeight = '0px';
        });
        parent.classList.remove('open');
      } else {
        parent.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        
        // Remove max-height after transition for dynamic content
        body.addEventListener('transitionend', function handler() {
          if (parent.classList.contains('open')) {
            body.style.maxHeight = 'none';
          }
          body.removeEventListener('transitionend', handler);
        });
      }
    });
  });
}


// ── Shopping List Checkboxes ──
function initShoppingList() {
  const STORAGE_KEY = 'nutriplan_shopping';

  function loadChecked() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  }

  function saveChecked(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch { /* ignore */ }
  }

  const checked = loadChecked();

  document.querySelectorAll('.shopping-item').forEach(item => {
    const checkbox = item.querySelector('.shopping-checkbox');
    const id = item.dataset.id;

    if (!checkbox || !id) return;

    // Restore state
    if (checked[id]) {
      checkbox.classList.add('checked');
      item.classList.add('checked');
    }

    checkbox.addEventListener('click', () => {
      const isChecked = checkbox.classList.toggle('checked');
      item.classList.toggle('checked', isChecked);

      if (isChecked) {
        checked[id] = true;
      } else {
        delete checked[id];
      }
      saveChecked(checked);
    });
  });
}


// ── Escape HTML (prevent XSS in search) ──
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}


// ── Page Load Animations ──
function initAnimations() {
  const animated = document.querySelectorAll('[data-animate]');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    animated.forEach(el => observer.observe(el));
  } else {
    animated.forEach(el => el.classList.add('animate-fade-in-up'));
  }
}


// ── Food Search (local to aliments page) ──
function initFoodSearch() {
  const searchInput = document.getElementById('food-search');
  if (!searchInput) return;

  const performSearch = debounce((query) => {
    const normalizedQuery = normalizeStr(query);
    const terms = normalizedQuery.split(' ').filter(t => t.length > 1);

    document.querySelectorAll('.food-item').forEach(item => {
      if (terms.length === 0) {
        item.style.display = '';
        return;
      }

      const name = normalizeStr(item.querySelector('.food-item-name')?.textContent || '');
      const notes = normalizeStr(item.querySelector('.food-item-notes')?.textContent || '');
      const text = name + ' ' + notes;

      const match = terms.every(term => text.includes(term));
      item.style.display = match ? '' : 'none';
    });

    // Show/hide categories with no visible items
    document.querySelectorAll('.food-category-card').forEach(card => {
      const visibleItems = card.querySelectorAll('.food-item:not([style*="display: none"])');
      card.style.display = visibleItems.length === 0 && terms.length > 0 ? 'none' : '';
      
      // Auto-open categories with matches
      if (visibleItems.length > 0 && terms.length > 0 && !card.classList.contains('open')) {
        card.classList.add('open');
        const body = card.querySelector('.food-category-body');
        if (body) body.style.maxHeight = 'none';
      }
    });
  }, 200);

  searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value.trim());
  });
}


// ── Initialize Everything ──
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initHamburger();
  initHeaderScroll();
  initAccordions();
  initShoppingList();
  initAnimations();
  initFoodSearch();
});
