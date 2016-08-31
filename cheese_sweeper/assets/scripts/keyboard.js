var currentKeyDown;
var keyDownFunctions = {};
var keyUpFunctions = {};

var keycodes = {
	j: 74,
	w: 87,
	a: 65,
	s: 83,
	d: 68,
	space: 32,
	up: 38,
	down: 40,
	left: 37,
	right: 39
}

function handleKeyDown(evt) {
	if(!evt){ var evt = window.event; }
	if (keyDownFunctions[evt.keyCode] != undefined && keyDownFunctions[evt.keyCode] != null) {
		keyDownFunctions[evt.keyCode]();
	}
}

function handleKeyUp(evt) {
	if(!evt){ var evt = window.event; }
	if (keyUpFunctions[evt.keyCode] != undefined && keyUpFunctions[evt.keyCode] != null) {
		keyUpFunctions[evt.keyCode]();
	}
}

function addKeyDownFunction(key, callback) {
	keyDownFunctions[key] = callback;
}

function addKeyUpFunction(key, callback) {
	keyUpFunctions[key] = callback;
}

function clearKeyFunctions() {
	keyDownFunctions = {};
	keyUpFunctions = {};
}

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;