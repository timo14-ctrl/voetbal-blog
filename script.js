const API_KEY = "123";
const scoresDiv = document.getElementById("scores");

fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventspastleague.php?id=4337`)
  .then(response => response.json())
  .then(data => {
    scoresDiv.innerHTML = "";
    data.events.slice(0, 5).forEach(match => {
      scoresDiv.innerHTML += `
        <div class="match">
          <strong>${match.strHomeTeam}</strong>
          ${match.intHomeScore} - ${match.intAwayScore}
          <strong>${match.strAwayTeam}</strong><br>
          <small>${match.dateEvent}</small>
        </div>
      `;
    });
  })
  .catch(() => {
    scoresDiv.innerHTML = "Uitslagen niet beschikbaar.";
  });
const newsDiv = document.getElementById("news");

fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/latestsoccernews.php`)
  .then(response => response.json())
  .then(data => {
    newsDiv.innerHTML = "";
    data.news.slice(0, 5).forEach(item => {
      newsDiv.innerHTML += `
        <div class="match">
          <strong>${item.strTitle}</strong><br>
          <small>${item.strDescription}</small>
        </div>
      `;
    });
  })
  .catch(() => {
    newsDiv.innerHTML = "Nieuws niet beschikbaar.";
  });
