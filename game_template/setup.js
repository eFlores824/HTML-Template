var canvas, stage, queue;
var mouseX, mouseY;
var screens = {};
var buttons = {};
var walk;
var levelSign;

var date = new Date();
var cacheVersion = date.getTime();

var WIDTH = 800;
var HEIGHT = 600;
var FPS = 30;

var manifest = [
	{src: "scripts/buttons.js"},
	{src: "scripts/timer.js"},
	{src: "scripts/keyboard.js"},
	{src: "scripts/screens.js"},
	{src: "scripts/draw.js"},
	{src: "scripts/states/transfers.js"},
	{src: "scripts/states/title_state.js"},
	{src: "scripts/states/game_state.js"},
	{src: "scripts/states/instruction_state.js"},
	{src: "scripts/states/game_over_state.js"},
	{src: "scripts/loop.js"},
	{src: "images/buttons.png", id: "button"},
	{src: "images/sprites.png", id: "sprites"},
	{src: "images/gameover.jpg", id: "gameover"},
	{src: "images/title.jpg", id: "title"},
	{src: "images/background.jpg", id: "background"},
	{src: "images/instructions.jpg", id: "instructions"},
	{src: "images/level_sign.jpg", id: "levelSign"}
];

function setupCanvas() {
	canvas = document.getElementById("game");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	stage = new createjs.Stage(canvas);
	stage.enableMouseOver();
}

function mouseInit() {
 	stage.on("stagemousemove", function (evt) {
		mouseX = Math.floor(evt.stageX);
		mouseY = Math.floor(evt.stageY);
 	});
}

function setup() {
	setupCanvas();
	mouseInit();
}

function loadComplete(evt) {
	var walkSheet = new createjs.SpriteSheet({
		images: [queue.getResult("sprites")],
		frames: [[160,0,19,49,0,10.05,48.6],[179,0,34,44,0,17.05,43.6],[213,0,22,46,0,9.05,45.6],[235,0,17,49,0,8.05,48.6],[0,49,25,49,0,10.05,48.6],[25,49,31,46,0,14.05,45.6],[56,49,33,44,0,16.05,43.6],[89,49,30,44,0,17.05,43.6],[119,49,28,46,0,17.05,45.6],[147,49,19,49,0,10.05,48.6],[166,49,23,49,0,14.05,48.6],[189,49,31,46,0,16.05,45.6],[220,49,34,44,0,17.05,43.6],[0,98,19,49,0,9.05,48.6],[19,98,34,44,0,17.05,43.6],[53,98,22,46,0,13.05,45.6],[75,98,17,49,0,9.05,48.6],[92,98,25,49,0,15.05,48.6],[117,98,31,46,0,17.05,45.6],[148,98,33,44,0,17.05,43.6],[181,98,30,44,0,13.05,43.6],[211,98,28,46,0,11.05,45.6],[0,147,19,49,0,9.05,48.6],[19,147,23,49,0,9.05,48.6],[42,147,31,46,0,15.05,45.6],[73,147,34,44,0,17.05,43.6]],
		animations: {
			standRight: [0, 0, "standRight"],
			walkRight: [1, 12, "walkRight", 0.5],
			standLeft: [13, 13, "standLeft"],
			walkLeft: [14, 25, "walkLeft", 0.5]
		}
	});
	var buttonSheet = new createjs.SpriteSheet({
		images: [queue.getResult("button")],
		frames: [[0,0,94,33,0,1,1],[94,0,94,33,0,1,1],[0,33,94,33,0,1,1],[94,33,94,33,0,1,1],[0,66,94,33,0,1,1],[94,66,94,33,0,1,1],[0,99,94,33,0,1,1],[94,99,94,33,0,1,1],[0,132,94,33,0,1,1],[94,132,94,33,0,1,1],[0,165,94,33,0,1,1],[94,165,94,33,0,1,1],[0,198,94,33,0,1,1],[94,198,94,33,0,1,1],[0,231,94,33,0,1,1],[94,231,31,31,0,0,0],[125,231,31,31,0,0,0]],
		animations: {
			playUp: [0, 0, "playUp"],
			playOver: [1, 1, "playOver"],
			playDown: [2, 2, "playDown"],
			instructUp: [3, 3, "instructUp"],
			instructOver: [4, 4, "instructOver"],
			instructDown: [5, 5, "instructDown"],
			menuUp: [6, 6, "menuUp"],
			menuOver: [7, 7, "menuOver"],
			menuDown: [8, 8, "menuDown"],
			continueUp: [9, 9, "continueUp"],
			continueOver: [10, 10, "continueOver"],
			continueDown: [11, 11, "continueDown"],
			playAgainUp: [12, 12, "playAgainUp"],
			playAgainOver: [13, 13, "playAgainOver"],
			playAgainDown: [14, 14, "playAgainDown"],
			muteOff: [15, 15, "muteOff"],
			muteOn: [16, 16, "muteOn"]
		}
	});
	
	screens.titleScreen = new createjs.Bitmap(queue.getResult("title"));
	screens.gameOverScreen = new createjs.Bitmap(queue.getResult("gameover"));
	screens.backgroundScreen = new createjs.Bitmap(queue.getResult("background"));
	screens.instructionScreen = new createjs.Bitmap(queue.getResult("instructions"));
	levelSign = new createjs.Bitmap(queue.getResult("levelSign"));
	
	walk = new createjs.Sprite(walkSheet);
	buttons.play = new createjs.Sprite(buttonSheet);
	buttons.instruction = new createjs.Sprite(buttonSheet);
	buttons.menu = new createjs.Sprite(buttonSheet);
	buttons.cont = new createjs.Sprite(buttonSheet);
	buttons.playAgain = new createjs.Sprite(buttonSheet);
	buttons.mute = new createjs.Sprite(buttonSheet);

	screenManager.addScreensToStage();
	btn.addButtons();
	stage.addChild(walk);
	walk.visible = false;
	
	switchStates(titleState);
	
	createjs.Ticker.addEventListener("tick", loop);
	createjs.Ticker.setFPS(FPS);
}

function loadFiles() {
	queue = new createjs.LoadQueue(true, "/assets/");
	queue.on("complete", loadComplete, this);
	queue.loadManifest(manifest);
}

function main() {
	setup();
	loadFiles();
}
main();