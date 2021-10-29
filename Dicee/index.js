const MIN = 1;
const MAX = 6;
const SRC_PREFIX = "images/dice"
const SRC_SUFFIX = ".png"

function diceRoll(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

var randNum1 = diceRoll(MIN, MAX);
document.querySelector(".dice #img1").src = SRC_PREFIX + randNum1 + SRC_SUFFIX;
var randNum2 = diceRoll(MIN, MAX);
document.querySelector(".dice #img2").src = SRC_PREFIX + randNum2 + SRC_SUFFIX;

if (randNum1 > randNum2) {
	document.querySelector("h1").textContent = "Player 1 wins!";
}
else if (randNum1 < randNum2) {
	document.querySelector("h1").textContent = "Player 2 wins!";
}
else {
	document.querySelector("h1").textContent = "Draw!";
}

