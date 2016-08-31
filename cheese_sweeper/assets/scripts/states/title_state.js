var titleState = {
	onEnter: function () {
		screenManager.toStartScreen();
		buttons.play.visible = true;
		buttons.instruction.visible = true;
		level = 1;
		
		buttons.play.x = 300;
		buttons.play.y = 300;
		buttons.instruction.x = 300;
		buttons.instruction.y = 350;
		
		btn.setButtonFunctions(buttons.play, goToGame, "play");
		btn.setButtonFunctions(buttons.instruction, goToInstruction, "instruct");
	},
	execute: function () {},
	onExit: function () {
		buttons.play.visible = false;
		buttons.instruction.visible = false;
	}
};