const featuredGrid = document.getElementById("featured-grid");
const card = document.getElementById("card");
const search = document.getElementById("search");

// Suggested players to show on load
const SUGGESTED_NAMES = ["Nikola Jokić", "LeBron James", "Shai Gilgeous-Alexander", "Chet Holmgren"];

function getHeadshot(id) {
    return id ? `https://a.espncdn.com/i/headshots/nba/players/full/${id}.png` : 'https://a.espncdn.com/combiner/i?img=/i/headshots/noplayer.png';
}

function init() {
    renderSuggestions(players.filter(p => SUGGESTED_NAMES.includes(p.name)));
    fillSelects();
}

function renderSuggestions(data) {
    featuredGrid.innerHTML = "";
    data.forEach(p => {
        const div = document.createElement("div");
        div.className = "mini-card";
        div.onclick = () => showPlayer(p);
        div.innerHTML = `
            <div class="mini-avatar"><img src="${getHeadshot(p.espnId)}"></div>
            <div class="mini-name">${p.name}</div>
        `;
        featuredGrid.appendChild(div);
    });
}

function showPlayer(p) {
    const isUnderrated = p.trueValue >= 0;
    const color = isUnderrated ? "#42f5c5" : "#ff4d4d";
    
    card.innerHTML = `
        <div class="card-header" style="background: ${isUnderrated ? 'linear-gradient(90deg, #1CFFC3, #13B89A)' : 'linear-gradient(90deg, #ff4d4d, #a30000)'}">
            <div class="rank-badge">#${p.rank}</div>
            <img class="main-photo" src="${getHeadshot(p.espnId)}">
        </div>
        <div class="card-body">
            <h2 class="player-name">${p.name.toUpperCase()}</h2>
            <div class="status-tag" style="color: ${color}">${isUnderrated ? 'UNDERRATED' : 'OVERRATED'}</div>
            <div class="stats-row">
                <div class="stat"><small>PERFORMANCE</small><div>${p.performance}</div></div>
                <div class="stat"><small>EXPECTATION</small><div>${p.expectation}</div></div>
            </div>
            <div class="gap-score">
                <small>VALUE GAP SCORE</small>
                <div class="score" style="color: ${color}">${p.trueValue.toFixed(2)}</div>
            </div>
        </div>
    `;
    card.dataset.currentPlayer = JSON.stringify(p);
}

// Logic for search, compare, and fillSelects remains similar but styled...
search.addEventListener("input", e => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
        document.getElementById("suggestions-label").textContent = "Featured Players";
        renderSuggestions(players.filter(p => SUGGESTED_NAMES.includes(p.name)));
        return;
    }
    const results = players.filter(p => p.name.toLowerCase().includes(q)).slice(0, 6);
    document.getElementById("suggestions-label").textContent = "Search Results";
    renderSuggestions(results);
});

init();
