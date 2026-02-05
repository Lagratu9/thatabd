// État de l'application
const appState = {
    currentView: 'view-home'
};

// Système de navigation simple (SPA)
function navigateTo(viewId) {
    console.log(`Navigation vers : ${viewId}`);
    
    // 1. Masquer toutes les vues (logique future quand on en aura plusieurs)
    // document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));

    // 2. Afficher la vue cible
    // Note: Pour l'instant, nous n'avons que la page d'accueil.
    // Dans la prochaine étape, nous ajouterons la logique pour changer de vue.
    
    if (viewId === 'plan-alimentaire') {
        alert("Vers la page Plan Alimentaire (Prochaine étape)");
    } else if (viewId === 'aliments') {
        alert("Vers la page Aliments (À venir)");
    } else if (viewId === 'informations') {
        alert("Vers la page Informations (À venir)");
    }
}

// Gestion de la recherche (Debouncing)
const searchInput = document.getElementById('globalSearch');
let debounceTimer;

searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const query = e.target.value.toLowerCase();
        console.log(`Recherche pour : ${query}`);
        // Logique de filtrage à implémenter plus tard
    }, 300); // 300ms de délai (Debounce)
});
