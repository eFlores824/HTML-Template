var scoreText;
var nearbyCheeseTexts = [];

var xMaxBounds, xMinBounds;
var yMinBounds, yMaxBounds;

var rowHeight = 80;
var columnWidth = 70;

var currentColumn = 0;
var currentRow = 0;

var rows = 5;
var columns = 8;
var numTraps;
var minTraps = 5;

var level = 0;
var cheeseFound = 0;
var tweening = false;

var clearCheeseTexts = function() {
	for (i = 0; i < nearbyCheeseTexts.length; ++i) {
		nearbyCheeseTexts[i].visible = false;
		stage.removeChild(nearbyCheeseTexts[i]);
	}
	nearbyCheeseTexts = [];
}

var nextLevel = function() {
	clearCheeseBlocks();
	clearCheeseTexts();
	level += 1;
	mouse.x = 80;
	mouse.y = 110;
	currentColumn = 0;
	currentRow = 0;
	cheeseFound = 0;

	createCheeseBlocks(100, 100, rows, columns, rowHeight, columnWidth);
	
	numTraps = minTraps + level;
	if (numTraps >= cheeseBlocks.length - 8) {
		numTraps -= 8;
	}
	setTraps(numTraps);	
	assignNumNearbyTraps();
	
	stage.setChildIndex(mouse, stage.getNumChildren() - 1);
	tweening = true;
	draw.tween("Level: " + level, 150, 100, levelSignGone);
}

var stuff = function() {
	draw.unTweenContinue(nextLevel);
}

var moveUp = function () {
	if (!tweening && mouse.y != yMinBounds) {
		mouse.y -= rowHeight;
		currentRow -= 1;
	}
}

var moveDown = function () {
	if (!tweening && mouse.y != yMaxBounds) {
		mouse.y += rowHeight;
		currentRow += 1;
	}
}

var moveLeft = function () {
	if (!tweening && mouse.x != xMinBounds) {
		mouse.x -= columnWidth;
		currentColumn -= 1;
	}
}

var moveRight = function () {
	if (!tweening && mouse.x != xMaxBounds) {
		mouse.x += columnWidth;
		currentColumn += 1;
	}
}

var revealPiece = function () {
	if (tweening) {
		return;
	}
	var result = checkTrap(currentRow, currentColumn);
	if ( result == cheesePossibilities.TRAP) {
		createjs.Sound.play("mousetrapSound", {volume: currentVolume});
		tweening = true;
		draw.tween("You triggered a mousetrap", 90, 100, goToGameOver);
	}
	else if (result == cheesePossibilities.CHEESE) {
		createjs.Sound.play("biteSound", {volume: currentVolume});
		
		var text = draw.writeText(getCheeseBlock(currentRow, currentColumn).numTraps, "20px Impact", "#000000", mouse.x + mouse.getBounds().width / 2, mouse.y + mouse.getBounds().height / 2);
		nearbyCheeseTexts.push(text);
		
		cheeseFound += 1;
		score += 100;
		if (cheeseFound == cheeseBlocks.length - numTraps) {
			tweening = true;
			draw.tweenContinue(score, stuff);
		}
	}
}

var jamieButton = function () {
	if (!tweening) {
		revealTraps();
	}
}

var levelSignGone = function () {
	resetGameTimer();
	tweening = false;
}

var gameState = {
	onEnter: function () {
		screenManager.toBackgroundScreen();
		
		if (scoreText == undefined) {
			scoreText = draw.writeText("Score: 0", "20px Arial", "#000000", 10, 10);
		}
		else {
			scoreText.visible = true;
			scoreText.text = "Score: 0";
		}
		
		mouse.visible = true;
		mouse.x = 80;
		mouse.y = 110;
		currentColumn = 0;
		currentRow = 0;
		cheeseFound = 0;
		score = 0;
		level = 1;
		
		numTraps = minTraps;
		createCheeseBlocks(100, 100, rows, columns, rowHeight, columnWidth);
		setTraps(numTraps);
		assignNumNearbyTraps();
		
		xMaxBounds = 80 + ((columns - 1) * columnWidth);
		xMinBounds = 80;
		yMaxBounds = 110 + ((rows - 1) * rowHeight);
		yMinBounds = 110;
		
		addKeyDownFunction(keycodes.w, moveUp);
		addKeyDownFunction(keycodes.a, moveLeft);
		addKeyDownFunction(keycodes.s, moveDown);
		addKeyDownFunction(keycodes.d, moveRight);
		addKeyDownFunction(keycodes.up, moveUp);
		addKeyDownFunction(keycodes.left, moveLeft);
		addKeyDownFunction(keycodes.down, moveDown);
		addKeyDownFunction(keycodes.right, moveRight);
		addKeyDownFunction(keycodes.space, revealPiece);
		addKeyDownFunction(keycodes.j, jamieButton);
		
		stage.setChildIndex(mouse, stage.getNumChildren() - 1);
		tweening = true;
		draw.tween("Level: " + level, 150, 100, levelSignGone);
	},
	execute: function () {
		stage.setChildIndex(mouse, stage.getNumChildren() - 2);
		scoreText.text = "Score: " + score;
		if (tweening) {
			return;
		}
		stage.setChildIndex(mouse, stage.getNumChildren() - nearbyCheeseTexts.length - 1);
	},
	onExit: function () {
		clearKeyFunctions();
		mouse.visible = false;
		scoreText.visible = false;
		clearCheeseTexts();
		clearCheeseBlocks();
	}
};