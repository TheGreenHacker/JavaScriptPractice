
function playSound(c) {
	var file = "";
	switch (c) {
		case "w":
			file = "sounds/crash.mp3";
			break;
		case "a":
			file = "sounds/kick-bass.mp3";
			break;
		case "s":
			file = "sounds/snare.mp3";
			break;
		case "d":
			file = "sounds/tom-1.mp3";
			break;
		case "j":
			file = "sounds/tom-2.mp3";
			break;
		case "k":
			file = "sounds/tom-3.mp3";
			break;
		case "l":
			file = "sounds/tom-4.mp3";
			break;
		default:
			break;
	}

	new Audio(file).play();
}

function animate(c) {
	var key = document.querySelector("." + c);
	key.classList.add("pressed");
	setTimeout(function () { 
        document.querySelector("." + c).classList.remove("pressed");
    }, 500);
}


document.querySelectorAll(".drum").forEach(button => {
	button.addEventListener("click", function() {
		playSound(button.innerHTML);
        animate(button.innerHTML);
	});
});

document.addEventListener("keypress", function (event) {
    playSound(event.key);
    animate(event.key);
});
