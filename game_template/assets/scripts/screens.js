var screenManager = {
	addScreensToStage: function() {
		stage.addChild(screens.titleScreen);
		stage.addChild(screens.backgroundScreen);
		stage.addChild(screens.instructionScreen);
		stage.addChild(screens.gameOverScreen);
	},
	toStartScreen: function () {
		screens.titleScreen.visible = true;
		screens.backgroundScreen.visible = false;
		screens.gameOverScreen.visible = false;
		screens.instructionScreen.visible = false;
	},
	toBackgroundScreen: function () {
		screens.backgroundScreen.visible = true;
		screens.titleScreen.visible = false;
		screens.gameOverScreen.visible = false;
		screens.instructionScreen.visible = false;
	},
	toInstructionScreen: function () {
		screens.instructionScreen.visible = true;
		screens.titleScreen.visible = false;
		screens.backgroundScreen.visible = false;
		screens.gameOverScreen.visible = false;
	},
	toGameOverScreen: function () {
		screens.gameOverScreen.visible = true;
		screens.titleScreen.visible = false;
		screens.backgroundScreen.visible = false;
		screens.instructionScreen.visible = false;
	}
};