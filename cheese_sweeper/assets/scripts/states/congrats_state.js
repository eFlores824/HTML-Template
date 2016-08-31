var currentScoreText;

var congratsState = {
	onEnter: function () {
		screenManager.toCongratsScreen();
		if (currentScoreText == undefined) {
			currentScoreText = draw.writeText("Score: " + score, "20px Arial", "#000000", 325, 250);
		}
		else {
			currentScoreText.text = "Score: " + score;
			currentScoreText.visible = true;
		}
		level += 1;
		console.log(level);
		buttons.cont.visible = true;
		buttons.menu.visible = true;
		
		buttons.cont.x = 300;
		buttons.cont.y = 300;
		buttons.menu.x = 300;
		buttons.menu.y = 350;

		
		btn.setButtonFunctions(buttons.cont, goToGame, "continue");
		btn.setButtonFunctions(buttons.menu, goToTitle, "menu");
	},
	execute: function () {},
	onExit: function () {
		buttons.cont.visible = false;
		buttons.menu.visible = false;
		currentScoreText.visible = false;
	}
};