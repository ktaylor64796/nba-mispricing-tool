const list = document.getElementById("list");
const search = document.getElementById("search");
const card = document.getElementById("card");

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

const compareResult = document.getElementById("compareResult");

let currentView = "all"; // all | underrated | overrated

// =========================
// RENDER LIST
// =========================
function render(playersData) {
  list.innerHTML = "";

  playersData.forEach(p => {
    const div = document.createElement("div");

    const type = p.trueValue >= 0 ? "underrated" : "overrated";

    div.className = "player " + type;

    div.innerHTML = `
      <span class="name">${p.name}</span>
      <span class="value">${p.trueValue.toFixed(2)}</span>
    `;

    div.onclick = () => showPlayer(p);
    list.appendChild(div);
  });
}

// =========================
// PLAYER CARD
// =========================
function showPlayer(p) {
  const label = p.trueValue >= 0 ? "UNDERRATED" : "OVERRATED";

  card.innerHTML = `
    <h3>${p.name}</h3>
    <p><b>Status:</b> ${label}</p>
    <p><b>Performance:</b> ${p.performance}</p>
    <p><b>Expectation:</b> ${p.expectation}</p>
    <p><b>Gap:</b> ${p.trueValue.toFixed(2)}</p>
  `;
}

// =========================
// SEARCH
// =========================
search.addEventListener("input", e => {
  const q = e.target.value.toLowerCase().trim();

  if (!q) {
    render(players);
    return;
  }

  render(players.filter(p =>
    p.name.toLowerCase().includes(q)
  ));
});

// =========================
// COMPARE PLAYERS
// =========================
function compare() {
  const a = players.find(p => p.name === p1.value);
  const b = players.find(p => p.name === p2.value);

  if (!a || !b) {
    compareResult.innerHTML = "<p>Select two players.</p>";
    return;
  }

  compareResult.innerHTML = `
    <h3>Comparison</h3>
    <p><b>${a.name}</b>: ${a.trueValue.toFixed(2)}</p>
    <p><b>${b.name}</b>: ${b.trueValue.toFixed(2)}</p>
    <h4>Winner: ${a.trueValue > b.trueValue ? a.name : b.name}</h4>
  `;
}

// =========================
// FILL DROPDOWNS
// =========================
function fillSelects() {
  players.forEach(p => {
    const opt1 = document.createElement("option");
    const opt2 = document.createElement("option");

    opt1.value = opt2.value = p.name;
    opt1.textContent = opt2.textContent = p.name;

    p1.appendChild(opt1);
    p2.appendChild(opt2);
  });

  // IMPORTANT FIX: default selections
  p1.value = players[0].name;
  p2.value = players[1].name;
}

// =========================
// DOWNLOAD CARD (FIXED WRAP)
// =========================
function downloadCard() {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 400;

  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "#0b0f19";
  ctx.fillRect(0, 0, 800, 400);

  ctx.fillStyle = "white";
  ctx.font = "24px Arial";

  const lines = card.innerText.split("\n");

  lines.forEach((line, i) => {
    ctx.fillText(line, 50, 80 + i * 35);
  });

  const link = document.createElement("a");
  link.download = "nba-card.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// =========================
// OPTIONAL FILTER BUTTONS (SAFE)
// =========================
function setView(type) {
  currentView = type;

  let filtered = players;

  if (type === "underrated") {
    filtered = players.filter(p => p.trueValue >= 0);
  }

  if (type === "overrated") {
    filtered = players.filter(p => p.trueValue < 0);
  }

  render(filtered);
}

// =========================
// INIT
// =========================
render(players);
fillSelects();
