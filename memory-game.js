var cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var brojac = 0;

var highScores = [];

var newGameBtn = document.getElementById("newGameBtn");
var stopGameBtn = document.getElementById("stopGameBtn");
var scoreInputField = document.getElementById("score-input");
var resetScores = document.getElementById('delete-scores-btn')
var table = document.getElementById("table");
var timer = document.getElementById("timer");
var interval;
var timeLeft = 60;


resetScores.addEventListener("click", () => {
  try{
    localStorage.removeItem('scoreArray');
    table.innerHTML = "";
    let tr = document.createElement("tr");
    tr.setAttribute("class", "tbl-row");
    let thPozicija = tr.appendChild(document.createElement("th"));
    let thIme = tr.appendChild(document.createElement("th"));
    let thBodovi = tr.appendChild(document.createElement("th"));
    thPozicija.setAttribute("class", "tbl-naziv-kolone");
    thPozicija.innerHTML = "Pozicija";
    thIme.setAttribute("class", "tbl-naziv-kolone");
    thIme.innerHTML = "Ime";
    thBodovi.setAttribute("class", "tbl-naziv-kolone");
    thBodovi.innerHTML = "Bodovi";
    table.appendChild(tr);
  }
  catch(e){
    console.log('Local storage is empty')
  }

});


newGameBtn.addEventListener("click", () => {
  cards.forEach(card => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
    setTimeout(() => {
      // let randomPas = Math.floor(Math.random() * 16);
      // card.style.order = randomPas;
    }, 500);
  });

  newGameBtn.style.visibility = "hidden";
  stopGameBtn.style.visibility = "visible";
  startTimer();
});

stopGameBtn.addEventListener("click", () => {
  cards.forEach(card => {
    card.removeEventListener("click", flipCard);
    card.classList.remove("flip");
  });
  newGameBtn.style.visibility = "visible";
  stopGameBtn.style.visibility = "hidden";
  timer.innerHTML = "Dobrodosli";
  clearInterval(interval);
  timeLeft = 60;
});

scoreInputField.addEventListener("change", () => {
  newGameBtn.style.visibility = "visible";
  scoreInputField.style.visibility = "hidden";
  var elem = { ime: scoreInputField.value, bodovi: timeLeft * 10 };
  highScores.push(elem);
  highScores.sort((a, b) =>
    a.bodovi > b.bodovi ? -1 : a.bodovi < b.bodovi ? 1 : 0
  );
  window.history.scoreArray = highScores;

  console.log('hist',window.history)

  table.innerHTML = "";
  let tr = document.createElement("tr");
  tr.setAttribute("class", "tbl-row");
  let thPozicija = tr.appendChild(document.createElement("th"));
  let thIme = tr.appendChild(document.createElement("th"));
  let thBodovi = tr.appendChild(document.createElement("th"));
  thPozicija.setAttribute("class", "tbl-naziv-kolone");
  thPozicija.innerHTML = "Pozicija";
  thIme.setAttribute("class", "tbl-naziv-kolone");
  thIme.innerHTML = "Ime";
  thBodovi.setAttribute("class", "tbl-naziv-kolone");
  thBodovi.innerHTML = "Bodovi";
  table.appendChild(tr);

  localStorage.setItem('scoreArray',JSON.stringify(highScores));

  console.log(localStorage)

  scoreInputField.value = "";
  highScores.forEach(e => {
    let tr = document.createElement("tr");
    tr.setAttribute("class", "tbl-row");
    let tdPozicija = tr.appendChild(document.createElement("td"));
    let tdIme = tr.appendChild(document.createElement("td"));
    let tdBodovi = tr.appendChild(document.createElement("td"));
    tdPozicija.innerHTML = highScores.indexOf(e) + 1;
    tdIme.innerHTML = e.ime;
    tdBodovi.innerHTML = e.bodovi;
    table.appendChild(tr);
  });
});

startTimer = () => {
  timeLeft = 60;
  timer.innerHTML = "Time left: " + timeLeft;
  interval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft = timeLeft - 1;
      timer.innerHTML = "Time left: " + timeLeft;
    } else {
      timer.innerHTML = "Game Over";
      newGameBtn.style.visibility = "visible";
      cards.forEach(card => {
        card.removeEventListener("click", flipCard);
        card.classList.remove("flip");
        brojac = 0;
      });
      clearInterval(interval);
      return;
    }
  }, 1000);
};

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  proveriPogodak();
}
function proveriPogodak() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  brojac++;
  if (brojac == 1) {
    timer.innerHTML = "POBEDA!!!";
    newGameBtn.style.visibility = "visible";
    cards.forEach(card => {
      card.removeEventListener("click", flipCard);
      brojac = 0;
      newGameBtn.style.visibility = "hidden";
      scoreInputField.style.visibility = "visible";
    });
    clearInterval(interval);
  }
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
(function shuffle() {
  highScores= JSON.parse(localStorage.getItem('scoreArray')) || [];
  scoreInputField.value = "";
  highScores.forEach(e => {
    let tr = document.createElement("tr");
    tr.setAttribute("class", "tbl-row");
    let tdPozicija = tr.appendChild(document.createElement("td"));
    let tdIme = tr.appendChild(document.createElement("td"));
    let tdBodovi = tr.appendChild(document.createElement("td"));
    tdPozicija.innerHTML = highScores.indexOf(e) + 1;
    tdIme.innerHTML = e.ime;
    tdBodovi.innerHTML = e.bodovi;
    table.appendChild(tr);
  });

  cards.forEach(card => {
    let randomPas = Math.floor(Math.random() * 16);
    card.style.order = randomPas;
  });
})();
