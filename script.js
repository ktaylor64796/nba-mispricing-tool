const list = document.getElementById("featured-grid");
const search = document.getElementById("search");
const card = document.getElementById("card");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const compareResult = document.getElementById("compareResult");

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
    list.innerHTML = "";
    data.forEach(p => {
        const div = document.createElement("div");
        div.className = "mini-card";
        div.onclick = () => showPlayer(p);
        div.innerHTML = `
            <div class="mini-avatar"><img src="${getHeadshot(p.espnId)}"></div>
            <div class="mini-name">${p.name}</div>
        `;
        list.appendChild(div);
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

search.addEventListener("input", e => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
        renderSuggestions(players.filter(p => SUGGESTED_NAMES.includes(p.name)));
        return;
    }
    const results = players.filter(p => p.name.toLowerCase().includes(q)).slice(0, 6);
    renderSuggestions(results);
});

function compare() {
    const playerA = players.find(p => p.name === p1.value);
    const playerB = players.find(p => p.name === p2.value);

    if (!playerA || !playerB) return;

    const aColor = playerA.trueValue >= 0 ? "#42f5c5" : "#ff4d4d";
    const bColor = playerB.trueValue >= 0 ? "#42f5c5" : "#ff4d4d";
    const winner = playerA.trueValue > playerB.trueValue ? playerA : playerB;

    compareResult.innerHTML = `
        <div class="compare-display">
            <div class="compare-column">
                <img src="${getHeadshot(playerA.espnId)}" class="compare-photo" style="border-color: ${aColor}">
                <div class="compare-name">${playerA.name.toUpperCase()}</div>
                <div class="compare-value" style="color: ${aColor}">${playerA.trueValue.toFixed(2)}</div>
            </div>
            <div class="vs-divider">VS</div>
            <div class="compare-column">
                <img src="${getHeadshot(playerB.espnId)}" class="compare-photo" style="border-color: ${bColor}">
                <div class="compare-name">${playerB.name.toUpperCase()}</div>
                <div class="compare-value" style="color: ${bColor}">${playerB.trueValue.toFixed(2)}</div>
            </div>
        </div>
        <div class="compare-footer">
            <div class="winner-label">ANALYSIS WINNER</div>
            <div class="winner-name" style="color: #42f5c5">${winner.name.toUpperCase()}</div>
        </div>
    `;
}

function fillSelects() {
    const sorted = [...players].sort((a,b) => a.name.localeCompare(b.name));
    p1.innerHTML = ""; p2.innerHTML = "";
    sorted.forEach(p => {
        p1.add(new Option(p.name, p.name));
        p2.add(new Option(p.name, p.name));
    });
    p1.value = "Nikola Jokić";
    p2.value = "LeBron James";
}

init();
