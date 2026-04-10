const list = document.getElementById("list");
const search = document.getElementById("search");
const card = document.getElementById("card");

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

// Render list
function render(playersData) {
  list.innerHTML = "";

  playersData.forEach(p => {
    const div = document.createElement("div");
    div.className = "player " + (p.trueValue > 0 ? "underrated" : "overrated");
    div.innerHTML = `${p.name} (${p.trueValue.toFixed(2)})`;

    div.onclick = () => showPlayer(p);
    list.appendChild(div);
  });
}

// Show player card
function showPlayer(p) {
  const label = p.trueValue > 0 ? "UNDERRATED" : "OVERRATED";

  card.innerHTML = `
    <h3>${p.name}</h3>
    <p><b>Status:</b> ${label}</p>
    <p><b>Performance:</b> ${p.performance}</p>
    <p><b>Expectation:</b> ${p.expectation}</p>
    <p><b>Gap:</b> ${p.trueValue.toFixed(2)}</p>
  `;
}

// Search
search.addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  render(players.filter(p => p.name.toLowerCase().includes(q)));
});

// Compare
function compare() {
  const a = players.find(p => p.name === p1.value);
  const b = players.find(p => p.name === p2.value);

  document.getElementById("compareResult").innerHTML = `
    <h3>Comparison</h3>
    <p>${a.name}: ${a.trueValue.toFixed(2)}</p>
    <p>${b.name}: ${b.trueValue.toFixed(2)}</p>
    <h4>Winner: ${a.trueValue > b.trueValue ? a.name : b.name}</h4>
  `;
}

// Fill dropdowns
function fillSelects() {
  players.forEach(p => {
    const opt1 = document.createElement("option");
    const opt2 = document.createElement("option");

    opt1.value = opt2.value = p.name;
    opt1.textContent = opt2.textContent = p.name;

    p1.appendChild(opt1);
    p2.appendChild(opt2);
  });
}

// Share card (simple canvas export)
function downloadCard() {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 400;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0b0f19";
  ctx.fillRect(0, 0, 800, 400);

  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(card.innerText, 50, 100);

  const link = document.createElement("a");
  link.download = "nba-card.png";
  link.href = canvas.toDataURL();
  link.click();
}

// init
render(players);
fillSelects();
