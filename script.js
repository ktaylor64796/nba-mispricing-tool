const list = document.getElementById("list");
const search = document.getElementById("search");
const card = document.getElementById("card");

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

const compareResult = document.getElementById("compareResult");

// =========================
// RENDER TOP + BOTTOM 10
// =========================
function render() {
  list.innerHTML = "";

  const sorted = [...players].sort((a, b) => b.trueValue - a.trueValue);

  const top10 = sorted.slice(0, 10);
  const bottom10 = sorted.slice(-10).reverse();

  // TOP 10
  const topHeader = document.createElement("div");
  topHeader.innerHTML = "<h3>Top 10 Underrated</h3>";
  list.appendChild(topHeader);

  top10.forEach(p => {
    const div = document.createElement("div");
    div.className = "player underrated";
    div.innerHTML = `${p.name} (${p.trueValue.toFixed(2)})`;

    div.onclick = () => showPlayer(p);
    list.appendChild(div);
  });

  // BOTTOM 10
  const bottomHeader = document.createElement("div");
  bottomHeader.innerHTML = "<h3 style='margin-top:20px;'>Top 10 Overrated</h3>";
  list.appendChild(bottomHeader);

  bottom10.forEach(p => {
    const div = document.createElement("div");
    div.className = "player overrated";
    div.innerHTML = `${p.name} (${p.trueValue.toFixed(2)})`;

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
// SEARCH (still searches full dataset)
// =========================
search.addEventListener("input", e => {
  const q = e.target.value.toLowerCase().trim();

  if (!q) {
    render();
    return;
  }

  const results = players.filter(p =>
    p.name.toLowerCase().includes(q)
  );

  list.innerHTML = "";

  results.forEach(p => {
    const div = document.createElement("div");
    div.className = "player " + (p.trueValue >= 0 ? "underrated" : "overrated");
    div.innerHTML = `${p.name} (${p.trueValue.toFixed(2)})`;
    div.onclick = () => showPlayer(p);
    list.appendChild(div);
  });
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
// DROPDOWNS
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

  // default selections (IMPORTANT FIX)
  p1.value = players[0].name;
  p2.value = players[1].name;
}

// =========================
// DOWNLOAD CARD
// =========================
function downloadCard() {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 400;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0b0f19";
  ctx.fillRect(0, 0, 800, 400);

  ctx.fillStyle = "white";
  ctx.font = "22px Arial";

  const lines = card.innerText.split("\n");

  lines.forEach((line, i) => {
    ctx.fillText(line, 50, 80 + i * 30);
  });

  const link = document.createElement("a");
  link.download = "nba-card.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// =========================
// INIT
// =========================
render();
fillSelects();
