var movementInstructions, warningMessage, spaceInstructions, numberInstructions, credits;

var instructionState = {
	onEnter: function () {
		screenManager.toInstructionScreen();
		if (movementInstructions == undefined) {
			movementInstructions = draw.writeText("Grab as many cheese pieces as you can by pressing SPACE over one", "20px Arial", "#000000", 100, 200);
			warningMessage = draw.writeText("Be careful though. It might be a mousetrap.", "20px Arial", "#000000", 100, 250);
			numberInstructions = draw.writeText("The numbers show how many mousetraps are near", "20px Arial", "#000000", 100, 300);
			spaceInstructions = draw.writeText("Use the arrow keys and WASD to move the character to the next square", "20px Arial", "#000000", 100, 350);
			credits = draw.writeText("Designer/Developer: Eduardo Flores", "20px Arial", "#000000", 100, 400);
		}
		else {
			movementInstructions.visible = true;
			spaceInstructions.visible = true;
			warningMessage.visible = true;
			credits.visible = true;
		}
		buttons.menu.visible = true;
		buttons.play.visible = true;

		buttons.menu.x = 300;
		buttons.menu.y = 450;
		buttons.play.x = 300;
		buttons.play.y = 500;
		
		btn.setButtonFunctions(buttons.menu, goToTitle, "menu");
		btn.setButtonFunctions(buttons.play, goToGame, "play");
	},
	execute: function () {},
	onExit: function () {
		buttons.menu.visible = false;
		buttons.play.visible = false;
		warningMessage.visible = false;
		movementInstructions.visible = false;
		spaceInstructions.visible = false;
		credits.visible = false;
		numberInstructions.visible = false;
	}
};