var finalScore;

var gameoverState = {
	onEnter: function () {
		screenManager.toGameOverScreen();
		if (finalScore == undefined) {
			finalScore = draw.writeText("Score: " + score, "20px Arial", "#000000", 325, 225);
		}
		else {
			finalScore.text = "Score: " + score;
			finalScore.visible = true;
		}
		level = 1;
		buttons.playAgain.visible = true;
		buttons.menu.visible = true;
		
		buttons.playAgain.x = 325;
		buttons.playAgain.y = 275;
		buttons.menu.x = 325;
		buttons.menu.y = 325;
		
		btn.setButtonFunctions(buttons.playAgain, goToGame, "playAgain");
		btn.setButtonFunctions(buttons.menu, goToTitle, "menu");
	},
	execute: function () {},
	onExit: function () {
		buttons.playAgain.visible = false;
		buttons.menu.visible = false;
		finalScore.visible = false;
	}
};