var screenManager = {
	addScreensToStage: function() {
		stage.addChild(screens.titleScreen);
		stage.addChild(screens.backgroundScreen);
		stage.addChild(screens.instructionScreen);
		stage.addChild(screens.gameOverScreen);
		stage.addChild(screens.congratsScreen);
	},
	toStartScreen: function () {
		screens.titleScreen.visible = true;
		screens.backgroundScreen.visible = false;
		screens.gameOverScreen.visible = false;
		screens.instructionScreen.visible = false;
		screens.congratsScreen.visible = false;
	},
	toBackgroundScreen: function () {
		screens.backgroundScreen.visible = true;
		screens.titleScreen.visible = false;
		screens.gameOverScreen.visible = false;
		screens.instructionScreen.visible = false;
		screens.congratsScreen.visible = false;
	},
	toInstructionScreen: function () {
		screens.instructionScreen.visible = true;
		screens.titleScreen.visible = false;
		screens.backgroundScreen.visible = false;
		screens.gameOverScreen.visible = false;
		screens.congratsScreen.visible = false;
	},
	toGameOverScreen: function () {
		screens.gameOverScreen.visible = true;
		screens.titleScreen.visible = false;
		screens.backgroundScreen.visible = false;
		screens.instructionScreen.visible = false;
		screens.congratsScreen.visible = false;
	},
	toCongratsScreen: function () {
		screens.congratsScreen.visible = true;
		screens.gameOverScreen.visible = false;
		screens.titleScreen.visible = false;
		screens.backgroundScreen.visible = false;
		screens.instructionScreen.visible = false;
	}
};