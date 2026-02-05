/* ============================================
   NutriPlan — Shared JavaScript
   ============================================ */

/* --- Searchable data across all pages --- */
const SEARCH_DATA = [
  { label: "Plan alimentaire", emoji: "📋", category: "Section principale", url: "plan-alimentaire.html" },
  { label: "Aliments", emoji: "🥑", category: "Section principale", url: "aliments.html" },
  { label: "Informations", emoji: "ℹ️", category: "Section principale", url: "informations.html" },

  { label: "Menu (14 jours)", emoji: "📅", category: "Plan alimentaire", url: "menu.html" },
  { label: "Petit-déjeuner", emoji: "🌅", category: "Plan alimentaire", url: "petit-dejeuner.html" },
  { label: "Déjeuner", emoji: "🥗", category: "Plan alimentaire", url: "dejeuner.html" },
  { label: "Dîner", emoji: "🌙", category: "Plan alimentaire", url: "diner.html" },
  { label: "Collation", emoji: "🍎", category: "Plan alimentaire", url: "collation.html" },
  { label: "Liste de courses", emoji: "🛒", category: "Plan alimentaire", url: "liste-de-courses.html" },

  { label: "Menu Jour 1", emoji: "1️⃣", category: "Menu", url: "menu-jour-1.html" },
  { label: "Menu Jour 2", emoji: "2️⃣", category: "Menu", url: "menu-jour-2.html" },
  { label: "Menu Jour 3", emoji: "3️⃣", category: "Menu", url: "menu-jour-3.html" },
  { label: "Menu Jour 4", emoji: "4️⃣", category: "Menu", url: "menu-jour-4.html" },
  { label: "Menu Jour 5", emoji: "5️⃣", category: "Menu", url: "menu-jour-5.html" },
  { label: "Menu Jour 6", emoji: "6️⃣", category: "Menu", url: "menu-jour-6.html" },
  { label: "Menu Jour 7", emoji: "7️⃣", category: "Menu", url: "menu-jour-7.html" },
  { label: "Menu Jour 8", emoji: "8️⃣", category: "Menu", url: "menu-jour-8.html" },
  { label: "Menu Jour 9", emoji: "9️⃣", category: "Menu", url: "menu-jour-9.html" },
  { label: "Menu Jour 10", emoji: "🔟", category: "Menu", url: "menu-jour-10.html" },
  { label: "Menu Jour 11", emoji: "🔢", category: "Menu", url: "menu-jour-11.html" },
  { label: "Menu Jour 12", emoji: "🔢", category: "Menu", url: "menu-jour-12.html" },
  { label: "Menu Jour 13", emoji: "🔢", category: "Menu", url: "menu-jour-13.html" },
  { label: "Menu Jour 14", emoji: "🔢", category: "Menu", url: "menu-jour-14.html" },
];

const FOOD_DATA = [];

/* --- Search Engine --- */
function initSearch(inputSel, dropdownSel, data) {
  const input = document.querySelector(inputSel);
  const dropdown = document.querySelector(dropdownSel);
  if (!input || !dropdown) return;

  const pool = data || [...SEARCH_DATA, ...FOOD_DATA];
  let timer;

  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 1) { dropdown.classList.remove('active'); dropdown.innerHTML = ''; return; }
      runSearch(q, pool, dropdown);
    }, 120);
  });

  input.addEventListener('focus', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length >= 1) runSearch(q, pool, dropdown);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search')) dropdown.classList.remove('active');
  });
}

function runSearch(query, data, dropdown) {
  const norm = normalize(query);
  const words = norm.split(/\s+/);

  const results = data.filter(item => {
    const l = normalize(item.label);
    const c = normalize(item.category || '');
    return words.every(w => l.includes(w) || c.includes(w));
  }).slice(0, 8);

  if (!results.length) {
    dropdown.innerHTML = '<div class="search-no-result">Aucun résultat pour « ' + esc(query) + ' »</div>';
    dropdown.classList.add('active');
    return;
  }

  dropdown.innerHTML = results.map(r => `
    <a href="${r.url}" class="search-result-item">
      <span class="result-emoji">${r.emoji}</span>
      <div>
        <div class="result-text">${highlight(r.label, query)}</div>
        <div class="result-category">${r.category}</div>
      </div>
    </a>
  `).join('');
  dropdown.classList.add('active');
}

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '');
}
function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function highlight(text, q) {
  const safe = esc(text);
  try { return safe.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<strong style="color:var(--green-600)">$1</strong>'); }
  catch { return safe; }
}

/* --- Accordions --- */
function initAccordions() {
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const section = trigger.closest('.accordion__section');
      section.classList.toggle('open');
    });
  });
}

/* --- Navigation helpers --- */
function goBack() {
  if (document.referrer && document.referrer.includes(window.location.hostname)) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

/* --- Shopping list checkboxes --- */
function initShoppingList() {
  document.querySelectorAll('.shopping-check').forEach(box => {
    box.addEventListener('click', () => {
      box.classList.toggle('checked');
      const item = box.closest('.shopping-item');
      if (item) item.classList.toggle('checked-item');
    });
  });
}

/* --- Init --- */
document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initShoppingList();
});
