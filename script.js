const API_KEY = "123";

const competitions = [
  { name: "Eredivisie", id: 4337 },
  { name: "Premier League", id: 4328 },
  { name: "La Liga", id: 4335 },
  { name: "Bundesliga", id: 4331 },
  { name: "Serie A", id: 4332 }
];

const competitionsDiv = document.getElementById("competitions");
competitionsDiv.innerHTML = "";

competitions.forEach(league => {
  fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventspastleague.php?id=${league.id}`)
    .then(response => response.json())
    .then(data => {
      if (!data.events) return;

      let html = `<h3>${league.name}</h3>`;

      data.events.slice(0, 5).forEach(match => {
        html += `
          <div class="match">
            <strong>${match.strHomeTeam}</strong>
            ${match.intHomeScore} - ${match.intAwayScore}
            <strong>${match.strAwayTeam}</strong><br>
            <small>${match.dateEvent}</small>
          </div>
        `;
      });

      competitionsDiv.innerHTML += html;
    })
    .catch(() => {
      competitionsDiv.innerHTML += `<p>Kan ${league.name} niet laden.</p>`;
    });
});
