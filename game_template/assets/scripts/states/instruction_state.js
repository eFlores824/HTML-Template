var movementInstructions;
var spaceInstructions

var instructionState = {
	onEnter: function () {
		screenManager.toInstructionScreen();
		if (movementInstructions == undefined) {
			movementInstructions = draw.writeText("Use the arrow keys and WASD to move the character", "20px Arial", "#000000", 300, 100);
			spaceInstructions = draw.writeText("Press the space bar to stop/start their animation", "20px Arial", "#000000", 300, 200);
		}
		else {
			movementInstructions.visible = true;
			spaceInstructions.visible = true;
		}
		buttons.menu.visible = true;
		buttons.play.visible = true;

		buttons.menu.x = 300;
		buttons.menu.y = 300;
		buttons.play.x = 300;
		buttons.play.y = 400;
		
		btn.setButtonFunctions(buttons.menu, goToTitle, "menu");
		btn.setButtonFunctions(buttons.play, goToGame, "play");
	},
	execute: function () {},
	onExit: function () {
		buttons.menu.visible = false;
		buttons.play.visible = false;
		movementInstructions.visible = false;
		spaceInstructions.visible = false;
	}
};