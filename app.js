// --- CONFIGURATION ---
const appState = {
    previousView: null,
    currentView: 'view-home'
};

// --- NAVIGATION CORE ---
function navigateTo(targetViewId) {
    // 1. Vérifier si la vue existe
    const targetElement = document.getElementById(targetViewId);
    
    if (!targetElement) {
        // Si la vue n'est pas encore créée (ex: Déjeuner, Menu...), on met une alerte temporaire
        console.warn(`La vue "${targetViewId}" n'existe pas encore.`);
        alert("🚧 Cette section est en cours de construction (Partie suivante) !");
        return;
    }

    // 2. Gestion de l'historique simple
    appState.previousView = appState.currentView;
    appState.currentView = targetViewId;

    // 3. Masquer toutes les vues actives
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
        // Optionnel : remettre le scroll en haut quand on change de vue
    });

    // 4. Afficher la nouvelle vue avec une petite animation (gérée par CSS)
    targetElement.classList.add('active');
    window.scrollTo(0, 0);
}

// --- BOUTONS ACCUEIL (Mapping) ---
// Note: J'ai mis à jour les onclick dans le HTML de la partie 1 pour correspondre aux ID
// Assure-toi que les boutons de l'index.html (Partie 1) pointent bien vers :
// - 'view-plan-alimentaire'
// - 'view-aliments' (pas encore créé)

// --- BARRE DE RECHERCHE ---
const searchInput = document.getElementById('globalSearch');
if(searchInput) {
    searchInput.addEventListener('input', (e) => {
        // Logique future de recherche
        console.log("Recherche:", e.target.value);
    });
}
