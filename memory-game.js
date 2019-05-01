var cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

var newGameBtn = document.getElementById("newGameBtn");
var stopGameBtn = document.getElementById("stopGameBtn");
var timer = document.getElementById("timer");
var interval;

newGameBtn.addEventListener("click", () => {
  cards.forEach(card => {
    card.addEventListener("click", flipCard);
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
  timer.innerHTML = "Welcome";
  clearInterval(interval);
});

startTimer = () => {
  let timeLeft = 45;
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
      });
      clearInterval(x);
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
  cards.forEach(card => {
    let randomPas = Math.floor(Math.random() * 16);
    card.style.order = randomPas;
  });
})();
