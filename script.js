const API_KEY = "123";
const REFRESH_TIME = 60000; // 60 seconden

const competitions = [
  { name: "Eredivisie", id: 4337 },
  { name: "Premier League", id: 4328 },
  { name: "La Liga", id: 4335 },
  { name: "Bundesliga", id: 4331 },
  { name: "Serie A", id: 4332 }
];

function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.remove("active");
  });
  document.querySelectorAll(".tab").forEach(btn => {
    btn.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");
  event.target.classList.add("active");
}

/* ======================
   UITSLAGEN LADEN
====================== */
function loadScores() {
  const competitionsDiv = document.getElementById("competitions");
  competitionsDiv.innerHTML = "";

  competitions.forEach(league => {
    fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventspastleague.php?id=${league.id}`)
      .then(res => res.json())
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
      });
  });
}

/* ======================
   NIEUWS LADEN
====================== */
function loadNews() {
  const newsDiv = document.getElementById("newsContainer");
  newsDiv.innerHTML = "";

  fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/latestsoccernews.php`)
    .then(res => res.json())
    .then(data => {
      if (!data.news) {
        newsDiv.innerHTML = "Geen nieuws beschikbaar.";
        return;
      }

      data.news.slice(0, 10).forEach(item => {
        newsDiv.innerHTML += `
          <div class="news-item">
            <strong>${item.strTitle}</strong><br>
            <small>${item.strDescription}</small>
          </div>
        `;
      });
    })
    .catch(() => {
      newsDiv.innerHTML = "Nieuws kan niet geladen worden.";
    });
}

/* ======================
   INITIAL LOAD
====================== */
loadScores();
loadNews();

/* ======================
   AUTO REFRESH
====================== */
setInterval(() => {
  loadScores();
  loadNews();
}, REFRESH_TIME);
