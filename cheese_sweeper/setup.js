var canvas, stage, queue;
var cheese, mousetrap;
var mouseX, mouseY;
var screens = {};
var buttons = {};
var levelSign;
var mouse;

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
	{src: "scripts/cheese_blocks.js"},
	{src: "scripts/states/transfers.js"},
	{src: "scripts/states/title_state.js"},
	{src: "scripts/states/game_state.js"},
	{src: "scripts/states/instruction_state.js"},
	{src: "scripts/states/game_over_state.js"},
	{src: "scripts/loop.js"},
	{src: "images/sprites/buttons.png", id: "button"},
	{src: "images/sprites/mouse.png", id: "mouse"},
	{src: "images/screens/gameover.jpg", id: "gameover"},
	{src: "images/screens/title.jpg", id: "title"},
	{src: "images/screens/background.jpg", id: "background"},
	{src: "images/screens/instructions.jpg", id: "instructions"},
	{src: "images/screens/level_sign.jpg", id: "levelSign"},
	{src: "images/mousetrap.png", id: "mousetrap"},
	{src: "images/cheese.png", id: "cheese"},
	{src: "sounds/bite.ogg", id: "biteSound"},
	{src: "sounds/mousetrap.ogg", id: "mousetrapSound"},
	{src: "sounds/melodyloops-this-beautiful-life.ogg", id:"melody"}
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

function loadComplete(evt) {
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
	var mouseSheet = new createjs.SpriteSheet({
		images: [queue.getResult("mouse")],
		frames: [[0,0,101,51],[0,52,101,51]],
		animations: {
			jitter: [0, 1, "jitter", 0.15]
		}
	});
	
	screens.titleScreen = new createjs.Bitmap(queue.getResult("title"));
	screens.gameOverScreen = new createjs.Bitmap(queue.getResult("gameover"));
	screens.backgroundScreen = new createjs.Bitmap(queue.getResult("background"));
	screens.instructionScreen = new createjs.Bitmap(queue.getResult("instructions"));
	screens.congratsScreen = new createjs.Bitmap(queue.getResult("congrats"));
	levelSign = new createjs.Bitmap(queue.getResult("levelSign"));
	
	buttons.play = new createjs.Sprite(buttonSheet);
	buttons.instruction = new createjs.Sprite(buttonSheet);
	buttons.menu = new createjs.Sprite(buttonSheet);
	buttons.cont = new createjs.Sprite(buttonSheet);
	buttons.playAgain = new createjs.Sprite(buttonSheet);
	buttons.mute = new createjs.Sprite(buttonSheet);
	
	//mouse = new createjs.Bitmap(queue.getResult("mouse"));
	mouse = new createjs.Sprite(mouseSheet);
	mouse.gotoAndPlay("jitter");
	mouse.visible = false;

	screenManager.addScreensToStage();
	btn.addButtons();
	cheese = new createjs.Bitmap(queue.getResult("cheese"));
	mousetrap = new createjs.Bitmap(queue.getResult("mousetrap"));
	stage.addChild(mouse);
	
	music = createjs.Sound.play("melody", {loop: -1});
	buttons.mute.x = 10;
	buttons.mute.y = 500;
	buttons.mute.visible = true;
	
	switchStates(titleState);
	
	createjs.Ticker.addEventListener("tick", loop);
	createjs.Ticker.setFPS(FPS);
}

function loadFiles() {
	createjs.Sound.alternateExtensions = ["mp3"];
	queue = new createjs.LoadQueue(true, "assets/");
	queue.installPlugin(createjs.Sound);
	queue.on("complete", loadComplete, this);
	queue.loadManifest(manifest);
}

function main() {
	setupCanvas();
	mouseInit();
	loadFiles();
}
main();