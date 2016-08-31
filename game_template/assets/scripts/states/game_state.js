var mousePositionText;
var timerText;
var currentWalkState;

var switchAnimation = function () {
	currentWalkState = currentWalkState == "walkRight"? "standRight": "walkRight";
					walk.gotoAndPlay(currentWalkState);
}

var moveUp = function () {
	walk.y -= 5;
}

var moveDown = function () {
	walk.y += 5;
}

var moveLeft = function () {
	walk.x -= 5;
}

var moveRight = function () {
	walk.x += 5;
}

var gameState = {
	onEnter: function () {
		resetGameTimer();
		screenManager.toBackgroundScreen();
		if (mousePositionText == undefined) {
			mousePositionText = draw.writeText("Mouse Position: {'0, 0'}", "12px Arial", "#ffffff", 10, 10);
			timerText = draw.writeText("Time Passed: 0", "12px Arial", "#ffffff", 10, 20);	
		}
		else {
			mousePositionText.visible = true;
			timerText.visible = true;
		}
		walk.visible = true;
		walk.x = 100;
		walk.y = 100;
		walk.gotoAndPlay("walkRight");
		currentWalkState = "walkRight";
		
		addKeyUpFunction(keys.space, switchAnimation);
		addKeyDownFunction(keys.w, moveUp);
		addKeyDownFunction(keys.a, moveLeft);
		addKeyDownFunction(keys.s, moveDown);
		addKeyDownFunction(keys.d, moveRight);
		addKeyDownFunction(keys.up, moveUp);
		addKeyDownFunction(keys.left, moveLeft);
		addKeyDownFunction(keys.down, moveDown);
		addKeyDownFunction(keys.right, moveRight);
	},
	execute: function () {
		mousePositionText.text = "Mouse Position = {" + mouseX + "," + mouseY + "}";
		timerText.text = "Time Passed: " + gameTimer + " seconds";
		if (gameTimer >= 10) {
			switchStates(gameoverState);
		}
	},
	onExit: function () {
		mousePositionText.visible = false;
		timerText.visible = false;
		walk.visible = false;
		clearKeyFunctions();
	}
};