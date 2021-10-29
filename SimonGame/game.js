const COLORS = ["red", "blue", "green", "yellow"];
const GAME_OVER_DELAY = 200;
const LEVEL_DELAY = 1000;
const MIN = 0;
const MAX = 3;
const PREFIX = "sounds/";
const SUFFIX = ".mp3";
const TIMEOUT = 500;

var hasStarted = false;
var level = 0;
var pattern = [];
var userClickedPattern = [];

function nextSequence() {
	$("#level-title").text("Level " + level);
	var randNum = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
	var randColor = COLORS[randNum];
	pattern.push(randColor);
	$("#" + randColor).fadeOut(TIMEOUT).fadeIn(TIMEOUT);
	playSound(randColor);
	level++;
}

function playSound(color) {
	var audio = new Audio(PREFIX + color + SUFFIX);
	audio.play();
}

function animatePress(color) {
	$("#" + color).addClass("pressed");
	setTimeout(function(){
        $("#" + color).removeClass("pressed");
    }, TIMEOUT);
}

function checkAnswer(level) {
	var index = userClickedPattern.length - 1;
	if (userClickedPattern[index] === pattern[index]) {
		if (index === level - 1) {
			setTimeout(nextSequence, LEVEL_DELAY);
			userClickedPattern = [];
		}
	}
	else {
		$("body").addClass("game-over");
		hasStarted = false;
		userClickedPattern = [];
		pattern = [];
		$("#level-title").text("Game Over, Press Any Key to Restart");
		setTimeout(function(){
			$("body").removeClass("game-over");
        }, GAME_OVER_DELAY);
	}
}

COLORS.forEach(color => {
	$("#" + color).on("click", function() {
		userClickedPattern.push(color);
        playSound(color);
        animatePress(color);
        checkAnswer(level);
    })
});

$(document).on("keypress", function() {
	if (!hasStarted) {
		level = 0;
		hasStarted = true;
		nextSequence();
	}
});








