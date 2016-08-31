var gameoverState = {
	onEnter: function () {
		screenManager.toGameOverScreen();
		buttons.playAgain.visible = true;
		buttons.menu.visible = true;
		
		buttons.playAgain.x = 300;
		buttons.playAgain.y = 300;
		buttons.menu.x = 300;
		buttons.menu.y = 350;
		
		btn.setButtonFunctions(buttons.playAgain, goToGame, "playAgain");
		btn.setButtonFunctions(buttons.menu, goToTitle, "menu");
	},
	execute: function () {},
	onExit: function () {
		buttons.playAgain.visible = false;
		buttons.menu.visible = false;
	}
};